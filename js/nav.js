/* ============================================================
   GREYLOCK TRUST — nav.js
   Shared navbar + footer. On scroll only the GREYLOCK TRUST
   wordmark fades away; nothing else moves (the wordmark is
   absolutely positioned so it never affects layout).
   ============================================================ */
'use strict';
(function(){
const CV=`<svg class="cv" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4"
  stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;

const MENU=[
 {label:'For Providers',items:[
   {t:'Provider Portal',s:'Manage your calendar and clients',h:'provider-portal.html'},
   {t:'Join Greylock Trust',s:'Apply to advise on the platform',h:'join.html'}]},
 {label:'Find an Advisor',href:'marketplace.html'},
];

const navHTML=`
<nav class="site-nav" id="siteNav">
  <div class="nav-inner">
    <a class="brand" href="index.html" aria-label="Greylock Trust — home">
      <img src="img/logo.png" alt="Greylock Trust" onerror="this.style.display='none'">
      <span class="brand-text">Greylock <b>Trust</b></span>
    </a>
    <div class="nav-right">
      <ul class="nav-menu">
        ${MENU.map(m=>m.items?`
        <li class="nav-item">
          <button class="nav-link">${m.label}${CV}</button>
          <div class="drop">${m.items.map(it=>
            `<a href="${it.h}"><span class="dt">${it.t}</span><span class="ds">${it.s}</span></a>`).join('')}</div>
        </li>`:`
        <li class="nav-item"><a class="nav-link" href="${m.href}">${m.label}</a></li>`).join('')}
      </ul>
      <a class="nav-login" href="login.html">Login</a>
      <a class="pill pill-gold pill-sm" href="get-started.html">Get Started</a>
      <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">
        <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</nav>
<div class="mnav" id="mnav">
  ${MENU.map(m=>m.items?`<div class="mgroup"><div class="mtitle">${m.label}</div>
    ${m.items.map(it=>`<a href="${it.h}">${it.t}</a>`).join('')}</div>`
   :`<div class="mgroup"><a href="${m.href}">${m.label}</a></div>`).join('')}
  <div class="mcta">
    <a class="pill pill-soft" href="login.html">Login</a>
    <a class="pill pill-gold" href="get-started.html">Get Started</a>
  </div>
</div>`;

const footHTML=`
<footer>
  <div class="wrap">
    <div class="foot">
      <div>
        <div class="fb">
          <img src="img/logo.png" alt="" onerror="this.style.display='none'">
          <span>Greylock <b>Trust</b></span>
        </div>
        <p>Vetted technology advisors, matched to how you actually live and work — then supported for as long as you need us.</p>
      </div>
      <div><a href="marketplace.html">Find an Advisor</a></div>
      <div><h4>For Providers</h4><ul>
        <li><a href="provider-portal.html">Provider Portal</a></li>
        <li><a href="join.html">Join Greylock Trust</a></li>
      </ul></div>
     
    </div>
    <div class="foot-bot">
      <span>© ${new Date().getFullYear()} Greylock Trust. All rights reserved.</span>
      <span>Privacy</span><span>Terms</span>
    </div>
  </div>
</footer>`;

function mount(){
  const n=document.getElementById('nav'); if(n)n.outerHTML=navHTML;
  const f=document.getElementById('footer'); if(f)f.outerHTML=footHTML;

  const nav=document.getElementById('siteNav');
  const solid=document.body.classList.contains('nav-solid');
  const onScroll=()=>{ if(nav) nav.classList.toggle('scrolled', window.scrollY>40); };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  document.querySelectorAll('.nav-item').forEach(li=>{
    const btn=li.querySelector('button.nav-link'); if(!btn)return;
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const was=li.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(x=>x.classList.remove('open'));
      if(!was)li.classList.add('open');
    });
    li.addEventListener('mouseenter',()=>{ if(window.innerWidth>1000){
      document.querySelectorAll('.nav-item.open').forEach(x=>x.classList.remove('open'));
      li.classList.add('open');}});
    li.addEventListener('mouseleave',()=>{ if(window.innerWidth>1000)li.classList.remove('open');});
  });
  document.addEventListener('click',()=>
    document.querySelectorAll('.nav-item.open').forEach(x=>x.classList.remove('open')));

  const b=document.getElementById('burger'),mn=document.getElementById('mnav');
  if(b&&mn)b.addEventListener('click',()=>{
    const on=mn.classList.toggle('on');
    b.setAttribute('aria-expanded',on?'true':'false');
  });

  const targets=document.querySelectorAll('.rv');
  if(targets.length){
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
    }),{threshold:.1,rootMargin:'0px 0px -50px 0px'});
    targets.forEach(t=>io.observe(t));
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
else mount();
})();
