'use strict';
/* ============================================================
   GREYLOCK TRUST — data.js
   Advisors now come from Supabase. The hardcoded array below is a
   fallback only: it keeps the site standing if the fetch fails, and
   keeps the nine demo profiles working while you seed real ones.

   Pages must wait for GT_DATA.ready before reading A.
   ============================================================ */

/* `A` is mutated in place, never reassigned, so every page that already
   holds a reference to it sees the loaded rows. */
const A = [

{ id:1, name:'Marcus Webb', photo:'https://randomuser.me/api/portraits/men/33.jpg',
  title:'Privacy Advisor', yrs:15, rate:75, onsite:true, remote:true, evenings:true,
  weekends:false, checkins:true, business:false, rating:4.9, reviews:132, past:true,
  intro:true, nextAvail:'Thu 7/31', platforms:['Windows','Mac'],
  personality:'Calm and reassuring',
  specs:['Wi-Fi & Internet','Data Protection','Computers & Laptops'],
  futures:['Home networking','Device security','Digital organization'],
  bio:'Marcus helps people create a safer, more organized digital life. He improves home networks, strengthens security settings, and explains technology clearly so clients feel confident using their devices.' },

{ id:2, name:'Priya Raman', photo:'https://randomuser.me/api/portraits/women/65.jpg',
  title:'Privacy Advisor', yrs:12, rate:90, onsite:true, remote:true, evenings:false,
  weekends:true, checkins:true, business:false, rating:5.0, reviews:87, intro:true,
  nextAvail:'Sat 8/2', platforms:['Windows','Mac'], personality:'Highly technical expert',
  specs:['Data Protection','Email & Accounts','Computers & Laptops'],
  futures:['Privacy improvements','Password organization','Data backup'],
  bio:'Priya helps clients protect their accounts, personal information, and devices. She turns complicated security concerns into practical steps people can understand and maintain.' },

{ id:3, name:'Dan Kowalski', photo:'https://randomuser.me/api/portraits/men/11.jpg',
  title:'Privacy Advisor', yrs:20, rate:55, onsite:true, remote:false, evenings:false,
  weekends:true, checkins:false, business:false, rating:4.8, reviews:214, intro:false,
  nextAvail:'Sat 8/2', platforms:['Windows'], personality:'Efficient problem solver',
  specs:['Setup, Repairs & Troubleshooting','Computers & Laptops','Wi-Fi & Internet'],
  futures:['New computer setup','Technology organization'],
  bio:'Dan helps clients solve everyday technology problems without confusion. From device setup to troubleshooting, he provides straightforward guidance and practical solutions.' },

{ id:4, name:'Sofía Delgado', photo:'https://randomuser.me/api/portraits/women/21.jpg',
  title:'Privacy Advisor', yrs:9, rate:70, onsite:true, remote:true, evenings:true,
  weekends:false, checkins:true, business:false, rating:4.9, reviews:96, intro:true,
  nextAvail:'Wed 7/30', platforms:['Mac'], personality:'Patient teacher',
  specs:['Phones & Tablets','Email & Accounts','Wi-Fi & Internet'],
  futures:['Device setup','Family technology support','Digital organization'],
  bio:'Sofía helps people feel comfortable with the technology they use every day. She specializes in device setup, account organization, and making digital routines easier.' },

{ id:5, name:'Ethan Park', photo:'https://randomuser.me/api/portraits/men/41.jpg',
  title:'Privacy Advisor', yrs:8, rate:95, onsite:false, remote:true, evenings:true,
  weekends:true, checkins:false, business:false, rating:4.7, reviews:61, intro:true,
  nextAvail:'Tonight', platforms:['Windows','Mac'], personality:'Highly technical expert',
  specs:['Data Protection','Email & Accounts','Computers & Laptops'],
  futures:['Privacy improvements','Account security','Technology planning'],
  bio:'Ethan helps clients strengthen their digital security through careful reviews of accounts, devices, and privacy settings. He works remotely to make technology safer and easier to manage.' },

{ id:6, name:'Ruth Adler', photo:'https://randomuser.me/api/portraits/women/58.jpg',
  title:'Privacy Advisor', yrs:18, rate:60, onsite:true, remote:true, evenings:false,
  weekends:false, checkins:true, business:false, rating:4.8, reviews:178, intro:true,
  nextAvail:'Thu 7/31', platforms:['Windows'], personality:'Patient teacher',
  specs:['Computers & Laptops','Phones & Tablets','Setup, Repairs & Troubleshooting'],
  futures:['Technology education','Family technology support','New devices'],
  bio:'Ruth believes technology should feel approachable. She teaches while helping, giving clients the knowledge and confidence to manage their digital lives.' },

{ id:7, name:'Jamal Carter', photo:'https://randomuser.me/api/portraits/men/86.jpg',
  title:'Privacy Advisor', yrs:11, rate:85, onsite:true, remote:true, evenings:true,
  weekends:true, checkins:true, business:false, rating:4.9, reviews:104, intro:true,
  nextAvail:'Sat 8/2', platforms:['Windows','Mac'], personality:'Friendly conversationalist',
  specs:['Wi-Fi & Internet','Data Protection','Setup, Repairs & Troubleshooting'],
  futures:['Smart home security','Home networking','Device protection'],
  bio:'Jamal helps clients build technology setups that are secure, reliable, and easy to use. He focuses on creating systems that work together while keeping privacy in mind.' },

{ id:8, name:'Linh Trần', photo:'https://randomuser.me/api/portraits/women/45.jpg',
  title:'Privacy Advisor', yrs:7, rate:65, onsite:true, remote:true, evenings:false,
  weekends:true, checkins:false, business:false, rating:4.9, reviews:143, intro:true,
  nextAvail:'Sat 8/2', platforms:['Windows','Mac'], personality:'Friendly conversationalist',
  specs:['Phones & Tablets','Computers & Laptops','Email & Accounts'],
  futures:['Phone setup','Cloud storage','Family technology support'],
  bio:'Linh helps clients organize their devices, transfer important information safely, and create easier ways to manage their everyday technology.' },

{ id:9, name:'Gene Ostrowski', photo:'https://randomuser.me/api/portraits/men/60.jpg',
  title:'Privacy Advisor', yrs:26, rate:50, onsite:true, remote:false, evenings:false,
  weekends:false, checkins:false, business:false, rating:4.6, reviews:257, intro:false,
  nextAvail:'Mon 8/4', platforms:['Windows'], personality:'Calm and reassuring',
  specs:['Setup, Repairs & Troubleshooting','Wi-Fi & Internet','Computers & Laptops'],
  futures:['New computer setup','Home technology organization'],
  bio:'Gene has spent decades helping people feel comfortable with technology. He provides patient guidance, fixes problems, and helps clients understand the tools they rely on.' }

];


/* ---------- database row -> the shape every page already expects ---------- */
function rowToAdvisor(r){
  return {
    id: r.id,
    name: r.name,
    photo: r.photo_url || '',
    title: r.title || 'Privacy Advisor',
    yrs: r.years ?? 0,
    rate: Number(r.rate ?? 0),
    onsite: r.onsite === true,
    remote: r.remote === true,
    evenings: r.evenings === true,
    weekends: r.weekends === true,
    checkins: r.checkins === true,
    business: r.business === true,
    intro: r.intro === true,
    rating: Number(r.rating ?? 0),
    reviews: Number(r.reviews ?? 0),
    past: false,
    nextAvail: r.next_avail || 'This week',
    platforms: Array.isArray(r.platforms) && r.platforms.length ? r.platforms : ['Windows','Mac'],
    personality: r.personality || 'Patient teacher',
    specs: Array.isArray(r.specs) ? r.specs : [],
    futures: Array.isArray(r.futures) ? r.futures : [],
    bio: r.bio || '',
    slug: r.slug || null,
    availability: r.availability || null,
  };
}

const GT_DATA = (function(){
  let loaded = false;

  async function load(){
    if(loaded) return A;
    if(typeof GT_AUTH === 'undefined' || !GT_AUTH.SB){
console.info('[GT] no published advisors yet — showing the built-in list');
      loaded = true;
      return A;
    }
    try{
      const { data, error } = await GT_AUTH.SB
        .from('advisors').select('*').eq('published', true).order('id');

      if(error) throw error;

      /* An advisor previewing their own unpublished page needs to find
         themselves. RLS already limits this to their own row. */
      let mine = null;
      try{
        const { data:{ session } } = await GT_AUTH.SB.auth.getSession();
        if(session){
          const { data: own } = await GT_AUTH.SB.from('advisors')
            .select('*').eq('user_id', session.user.id).maybeSingle();
          if(own && !own.published) mine = own;
        }
      }catch(e){}

      if(mine) (data || []).push(mine);

      if(data && data.length){
        A.length = 0;                       // mutate, never reassign
        data.forEach(r => A.push(rowToAdvisor(r)));
      }else{
        console.warn('[GT] no published advisors — using built-in list');
      }
    }catch(e){
      console.warn('[GT] advisor load failed, using built-in list:', e.message || e);
    }
    loaded = true;
    return A;
  }

/* Wait for every <script> on the page before looking for GT_AUTH.SB —
     data.js is loaded before auth.js on several pages. */
  const ready = new Promise(resolve => {
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', () => resolve(load()));
    }else{
      resolve(load());
    }
  });

  return { load, ready, rowToAdvisor };
})();


/* ---------- shared reference data ---------- */
const SPECS = ['Wi-Fi & Internet','Data Protection','Computers & Laptops',
  'Phones & Tablets','Setup, Repairs & Troubleshooting','Email & Accounts'];

const PERSONALITIES = ['Patient teacher','Friendly conversationalist',
  'Efficient problem solver','Highly technical expert','Calm and reassuring'];

const FUTURES = ['Home networking','Smart home security','Account Security','AI tools',
  'New computers','Phone setup','Family technology support','Data backup',
  'Cloud storage','Privacy improvements','Technology education'];

const CARE = [
 { t:'Wi-Fi & Internet', s:'Slow speeds, connection problems, improving your home network', k:'Wi-Fi & Internet' },
 { t:'Data Protection', s:'Scams, passwords, privacy settings, and account protection', k:'Data Protection' },
 { t:'Computers & Laptops', s:'Setup, repairs, upgrades, and understanding your devices', k:'Computers & Laptops' },
 { t:'Phones & Tablets', s:'New devices, transfers, backups, and organization', k:'Phones & Tablets' },
 { t:'Setup, Repairs & Troubleshooting', s:'Help fixing technology problems and getting things working', k:'Setup, Repairs & Troubleshooting' },
 { t:'Email & Accounts', s:'Organizing accounts, improving security, and staying protected', k:'Email & Accounts' }
];


/* ---------- scheduling helpers ---------- */
const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June',
  'July','August','September','October','November','December'];
const BASE = ['9:30 AM','11:00 AM','1:00 PM','3:00 PM'];
const INTRO_TIMES = ['9:00 AM','9:20 AM','11:40 AM','12:40 PM','4:30 PM'];

/* Advisor ids are now database ids, which can be large. Hash them to keep
   the generated schedule stable and evenly spread. */
function seedOf(a){
  const s = String(a.id);
  let h = 0;
  for(let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997;
  return h;
}

/* Slots for one advisor on one date.
   Uses their own schedule when they've set one; falls back to the generated
   pattern so the demo advisors keep working. */
function availFor(a, date, intro){
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(date); target.setHours(0,0,0,0);

  const av = a.availability;
  const lead = av && Number.isFinite(av.lead) ? av.lead : 1;

  const earliest = new Date(today);
  earliest.setDate(earliest.getDate() + Math.max(0, lead));
  if(target < earliest) return [];

  const horizon = new Date(today); horizon.setDate(horizon.getDate() + 60);
  if(target > horizon) return [];

  /* ---- their own schedule ---- */
  if(av && av.days){
    const iso = target.getFullYear() + '-' +
                String(target.getMonth()+1).padStart(2,'0') + '-' +
                String(target.getDate()).padStart(2,'0');
    if(Array.isArray(av.blocked) && av.blocked.includes(iso)) return [];

    const slots = av.days[String(target.getDay())];
    if(!Array.isArray(slots) || !slots.length) return [];

    /* Intro calls are short, so offer the first two slots of the day only. */
    return intro ? slots.slice(0, 2) : slots.slice();
  }

  /* ---- fallback: the old generated pattern ---- */
  const dow = target.getDay();
  if(dow === 0) return [];
  if(dow === 6 && !a.weekends) return [];

  const seed = seedOf(a);
  if((seed + target.getDate()) % 5 === 0) return [];

  const src = intro ? INTRO_TIMES : BASE;
  let t = src.filter((x,i) => (seed + target.getDate() + i) % 3 !== 0);
  if(!intro && a.evenings && target.getDate() % 2 === 1) t = t.concat('6:00 PM');
  if(!t.length) t = [src[(seed + target.getDate()) % src.length]];
  return t;
}

function dLabel(d){ return DOW[d.getDay()] + ' ' + (d.getMonth()+1) + '/' + d.getDate(); }
function initials(n){ return String(n||'?').split(' ').map(w=>w[0]).join('').slice(0,2); }
function stars(n){ return '★'.repeat(n) + '☆'.repeat(5-n); }

function ringHTML(pct, size){
  const S = size || 58, R = S/2 - 4, C = 2*Math.PI*R, off = C*(1 - pct/100);
  return `
<div class="ring" style="width:${S}px;height:${S}px">
<svg viewBox="0 0 ${S} ${S}" style="width:${S}px;height:${S}px">
<circle class="bgc" cx="${S/2}" cy="${S/2}" r="${R}" fill="none" stroke-width="4"/>
<circle class="arc" cx="${S/2}" cy="${S/2}" r="${R}" fill="none" stroke-width="4"
stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/>
</svg>
<div class="rt"><b>${pct}%</b><span>match</span></div>
</div>`;
}

function avatarHTML(a, cls, fbcls){
  if(!a.photo) return `<div class="${fbcls}">${initials(a.name)}</div>`;
  return `<img class="${cls}" src="${a.photo}" alt="${a.name}"
    onerror="this.outerHTML='<div class=&quot;${fbcls}&quot;>${initials(a.name)}</div>'">`;
}