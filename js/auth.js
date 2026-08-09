/* ============================================================
   GREYLOCK TRUST — auth.js  (Supabase)
   Requires @supabase/supabase-js loaded BEFORE this file.
   All functions are async.
   ============================================================ */
'use strict';


const SB = supabase.createClient(
  'https://yltwbacfsktbtgqovnnm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdHdiYWNmc2t0YnRncW92bm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMjA0NTksImV4cCI6MjEwMTY5NjQ1OX0.Wmt8et2kJGbMgGXZs98TvyEjf7yQIhA0laeYHGxZb0c'
);


const GT_AUTH = (function(){


async function profileFor(user){
    const meta = user.user_metadata || {};
    const fallback = meta.full_name || meta.name || user.email.split('@')[0];
    const { data, error } = await SB
      .from('profiles').select('*').eq('id', user.id).maybeSingle();
    if(error || !data){
      return { id:user.id, email:user.email, role:'client', name:fallback,
               photo:'', advisorId:null, quiz:null, availability:null, incomplete:true };
    }
    // profile exists but the name never landed — repair it once
    if(!data.full_name && meta.full_name){
      SB.from('profiles').update({ full_name: meta.full_name }).eq('id', user.id);
    }
    return { id:user.id, email:user.email, role:data.role,
             name: data.full_name || fallback,
             photo:data.photo_url, advisorId:data.advisor_id,
             quiz:data.quiz, availability:data.availability };
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
                emailRedirectTo: location.origin + '/login.html' }    });
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


async function currentUser(){
    const { data:{ session } } = await SB.auth.getSession();
    return session ? session.user : null;
  }
async function saveQuiz(quiz){
    const u = await currentUser();
    if(!u) return { ok:false, error:'Not signed in.' };
    const { data, error } = await SB.from('profiles')
      .upsert({ id:u.id, quiz }, { onConflict:'id' })
      .select('id');
    if(error) return { ok:false, error:error.message };
    if(!data || !data.length) return { ok:false, error:'No profile row for this user.' };
    return { ok:true };
  }

  async function chooseAdvisor(advisorId){
    const u = await currentUser();
    if(!u) return { ok:false, error:'Not signed in.' };
    const { data, error } = await SB.from('profiles')
      .upsert({ id:u.id, advisor_id: advisorId }, { onConflict:'id' })
      .select('id');
    if(error) return { ok:false, error:error.message };
    if(!data || !data.length) return { ok:false, error:'No profile row for this user.' };
    return { ok:true };
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

return { signIn, signUp, signOut, session, reset, require, initials, home, SB,
           saveQuiz, chooseAdvisor, currentUser, stashQuiz, flushPendingQuiz };})();
