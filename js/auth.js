/* ============================================================
   GREYLOCK TRUST — auth.js  (Supabase)
   Requires @supabase/supabase-js loaded BEFORE this file.
   All functions are async.
   ============================================================ */
'use strict';



const SB = supabase.createClient(
  'https://yltwbacfsktbtgqovnnm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdHdiYWNmc2t0YnRncW92bm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMjA0NTksImV4cCI6MjEwMTY5NjQ1OX0.Wmt8et2kJGbMgGXZs98TvyEjf7yQIhA0laeYHGxZb0c',   // leave your key as-is
  { auth: { flowType: 'implicit', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true } }
);

/* A recovery or invite link can land on any page. Let supabase-js exchange
   the token here, then go to reset.html with NO hash — so this can never
   re-trigger and loop. */

/* Every origin used here MUST be listed in
   Supabase → Authentication → URL Configuration → Redirect URLs,
   or the email link silently falls back to Site URL and the browser
   lands on a host that doesn't exist. */
const GT_SITE = location.origin;

const GT_AUTH = (function(){

  async function profileFor(user){
    const meta = user.user_metadata || {};
    const fallback = meta.full_name || meta.name || user.email.split('@')[0];

    const { data, error } = await SB
      .from('profiles').select('*').eq('id', user.id).maybeSingle();

    if(error || !data){
      return { id:user.id, email:user.email, role:'client', name:fallback,
               photo:'', advisorId:null, advisor:null,
               quiz:null, availability:null, incomplete:true };
    }

    if(!data.full_name && meta.full_name){
      SB.from('profiles').update({ full_name: meta.full_name }).eq('id', user.id);
    }

    /* An advisor is whoever owns a row in `advisors`. profiles.role is a
       convenience mirror — the advisors row is the source of truth. */
    let advisor = null;
    if(data.role === 'advisor'){
      const { data: a } = await SB.from('advisors')
        .select('*').eq('user_id', user.id).maybeSingle();
      advisor = a || null;
    }
return { id:user.id, email:user.email, role:data.role,
             name: data.full_name || fallback,
             photo: (advisor && advisor.photo_url) || data.photo_url,
             advisorId: advisor ? advisor.id : data.advisor_id,
             advisor,
             quiz:data.quiz, availability:data.availability,
             layout:data.layout };
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
      options:{ data:{ full_name: fullName },
                emailRedirectTo: GT_SITE + '/login.html' }
    });
    if(error) return { ok:false, error: friendly(error.message) };
    return { ok:true, needsConfirm: !data.session, user: data.user };
  }

  async function signOut(){ await SB.auth.signOut(); }

  async function session(){
    const { data:{ session } } = await SB.auth.getSession();
    if(!session) return null;
    return await profileFor(session.user);
  }

  async function reset(email){
    const { error } = await SB.auth.resetPasswordForEmail(String(email).trim(), {
      redirectTo: GT_SITE + '/reset.html'
    });
    return error ? { ok:false, error:error.message } : { ok:true };
  }

  async function updatePassword(password){
    const { error } = await SB.auth.updateUser({ password });
    if(error){
      if(/session/i.test(error.message))
        return { ok:false, error:'That reset link has expired. Request a new one.' };
      return { ok:false, error:error.message };
    }
    return { ok:true };
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

  /* Advisor-only pages. Also catches the case where role='advisor' but the
     advisors row is missing or paused — better a clear message than a
     dashboard quietly falling back to demo advisor #1. */
  async function requireAdvisor(){
    const s = await session();
    if(!s){
      location.replace('provider-portal.html?next=' +
        encodeURIComponent(location.pathname.split('/').pop()));
      return null;
    }
    if(s.role !== 'advisor' || !s.advisor){
      return { blocked:true, session:s };
    }
    return { blocked:false, session:s, advisor:s.advisor };
  }

  function friendly(m){
    if(/invalid login/i.test(m)) return 'That email and password don\u2019t match an account.';
    if(/confirm/i.test(m))       return 'Please confirm your email address first — check your inbox.';
    if(/already registered/i.test(m)) return 'An account with that email already exists. Try signing in.';
    return m;
  }
  function initials(n){ return (n||'?').split(' ').map(w=>w[0]).join('').slice(0,2); }
  function home(s){ return s && s.role==='advisor' ? 'provider-dashboard.html' : 'client-dashboard.html'; }

  async function currentUser(){
    const { data:{ session } } = await SB.auth.getSession();
    return session ? session.user : null;
  }

  /* update first, insert only if the trigger never made the row.
     upsert() was failing whenever the INSERT policy wasn't present. */
  async function saveQuiz(quiz){
    const u = await currentUser();
    if(!u) return { ok:false, error:'Not signed in.' };

    const { data, error } = await SB.from('profiles')
      .update({ quiz }).eq('id', u.id).select('id');
    if(error) return { ok:false, error:error.message };
    if(data && data.length) return { ok:true };

    const { error: insErr } = await SB.from('profiles')
      .insert({ id:u.id, quiz, role:'client' });
    return insErr ? { ok:false, error:insErr.message } : { ok:true };
  }

  async function chooseAdvisor(advisorId){
    const u = await currentUser();
    if(!u) return { ok:false, error:'Not signed in.' };
    const { error } = await SB.from('profiles')
      .update({ advisor_id: advisorId }).eq('id', u.id);
    return error ? { ok:false, error:error.message } : { ok:true };
  }

  const PENDING = 'greylockPendingQuiz';

  function stashQuiz(quiz){
    try{ localStorage.setItem(PENDING, JSON.stringify(quiz)); }catch(e){}
  }

  async function flushPendingQuiz(){
    let raw=null;
    try{ raw = localStorage.getItem(PENDING); }catch(e){ return; }
    if(!raw) return;
    if(!await currentUser()) return;
    const r = await saveQuiz(JSON.parse(raw));
    if(r.ok){ try{ localStorage.removeItem(PENDING); }catch(e){} }
    else console.warn('[GT] quiz flush failed:', r.error);
  }

  return { signIn, signUp, signOut, session, reset, updatePassword, require,
           requireAdvisor, initials, home, SB, SITE:GT_SITE,
           saveQuiz, chooseAdvisor, currentUser,
           stashQuiz, flushPendingQuiz };
})();