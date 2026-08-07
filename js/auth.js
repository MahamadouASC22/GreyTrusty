/* ============================================================
   GREYLOCK TRUST — auth.js  (Supabase)
   Requires @supabase/supabase-js loaded BEFORE this file.
   All functions are async.
   ============================================================ */
'use strict';


const SB = supabase.createClient(
  'https://wepcjnbfjybpruiwrpdo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcGNqbmJmanlicHJ1aXdycGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4OTgwODYsImV4cCI6MjEwMTQ3NDA4Nn0.RIEXuHVWjuyLxY9ZV6leOJplbbwp0day_uM_Kf61_I0'
);


const GT_AUTH = (function(){


  async function profileFor(user){
    const { data, error } = await SB
      .from('profiles').select('*').eq('id', user.id).maybeSingle();
    if(error || !data){
      // signed in but no profile row yet — treat as a client
      return { email:user.email, role:'client', name:user.email.split('@')[0],
               photo:'', advisorId:null, incomplete:true };
    }
    return { email:user.email, role:data.role, name:data.full_name,
             photo:data.photo_url, advisorId:data.advisor_id };
  }


  async function signIn(email, password){
    const { data, error } = await SB.auth.signInWithPassword({
      email: String(email).trim(), password
    });
    if(error) return { ok:false, error: friendly(error.message) };
    return { ok:true, session: await profileFor(data.user) };
  }


  async function signUp(email, password, fullName){
    const { data, error } = await SB.auth.signUp({
      email: String(email).trim(), password,
      options:{ data:{ full_name: fullName } }
    });
    if(error) return { ok:false, error: friendly(error.message) };
    if(data.user){
      await SB.from('profiles').insert({
        id: data.user.id, role:'client', full_name: fullName
      });
    }
    // email confirmation on? then there is no session yet
    return { ok:true, needsConfirm: !data.session };
  }


  async function signOut(){ await SB.auth.signOut(); }


  async function session(){
    const { data:{ session } } = await SB.auth.getSession();
    if(!session) return null;
    return await profileFor(session.user);
  }


  async function reset(email){
    const { error } = await SB.auth.resetPasswordForEmail(String(email).trim(), {
      redirectTo: location.origin + '/login.html'
    });
    return error ? { ok:false, error:error.message } : { ok:true };
  }


  /* redirect if the wrong person (or nobody) is here */
  async function require(role, fallback){
    const s = await session();
    if(!s || (role && s.role !== role)){
      location.replace((fallback || 'login.html') + '?next=' +
        encodeURIComponent(location.pathname.split('/').pop()));
      return null;
    }
    return s;
  }


  function friendly(m){
    if(/invalid login/i.test(m)) return 'That email and password don\u2019t match an account.';
    if(/confirm/i.test(m))       return 'Please confirm your email address first — check your inbox.';
    if(/already registered/i.test(m)) return 'An account with that email already exists. Try signing in.';
    return m;
  }
  function initials(n){ return (n||'?').split(' ').map(w=>w[0]).join('').slice(0,2); }
  function home(s){ return s && s.role==='advisor' ? 'provider-dashboard.html' : 'client-dashboard.html'; }


  return { signIn, signUp, signOut, session, reset, require, initials, home, SB };
})();

