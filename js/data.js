'use strict';
const A=[
 {id:1,name:'Marcus Webb',photo:'https://randomuser.me/api/portraits/men/33.jpg',
  title:'Network engineer',yrs:15,rate:75,onsite:true,remote:true,evenings:true,weekends:false,
  checkins:true,business:true,rating:4.9,reviews:132,past:true,intro:true,nextAvail:'Thu 7/31',
  platforms:['Windows','Mac'],personality:'Calm and reassuring',
  specs:['Wi-Fi & internet','Cybersecurity','Smart home'],
  futures:['Home networking','Cybersecurity','Smart home devices'],
  bio:'Fifteen years keeping Berkshire homes and small offices online. Marcus rebuilds Wi-Fi dead zones, secures routers properly, and leaves you a one-page map of your own network.'},
 {id:2,name:'Priya Raman',photo:'https://randomuser.me/api/portraits/women/65.jpg',
  title:'Security specialist',yrs:12,rate:90,onsite:true,remote:true,evenings:false,weekends:true,
  checkins:true,business:true,rating:5.0,reviews:87,intro:true,nextAvail:'Sat 8/2',
  platforms:['Windows','Mac'],personality:'Highly technical expert',
  specs:['Cybersecurity','Data backup','Computers & laptops'],
  futures:['Cybersecurity','Data backup','Privacy'],
  bio:'Former hospital IT security lead. Priya builds bulletproof backup and recovery plans, then runs a fire drill with you so you know \u2014 not hope \u2014 that they work.'},
 {id:3,name:'Dan Kowalski',photo:'https://randomuser.me/api/portraits/men/11.jpg',
  title:'Repair technician',yrs:20,rate:55,onsite:true,remote:false,evenings:false,weekends:true,
  checkins:false,business:false,rating:4.8,reviews:214,intro:false,nextAvail:'Sat 8/2',
  platforms:['Windows'],personality:'Efficient problem solver',
  specs:['Printers & peripherals','Computers & laptops','Wi-Fi & internet'],
  futures:['New computers','Home networking'],
  bio:'The Adams area\u2019s go-to fixer for two decades. Printers that finally print, laptops that boot again, and straight answers about when a machine is worth saving.'},
 {id:4,name:'Sof\u00eda Delgado',photo:'https://randomuser.me/api/portraits/women/21.jpg',
  title:'Apple specialist',yrs:9,rate:70,onsite:true,remote:true,evenings:true,weekends:false,
  checkins:true,business:false,rating:4.9,reviews:96,intro:true,nextAvail:'Wed 7/30',
  platforms:['Mac'],personality:'Patient teacher',
  specs:['Phones & tablets','Smart home','Wi-Fi & internet'],
  futures:['Phone setup','Smart home devices','Family tech support'],
  bio:'Ex-Genius Bar lead. Sof\u00eda untangles iCloud, moves a lifetime of photos safely between devices, and sets up smart homes the whole family can actually use.'},
 {id:5,name:'Ethan Park',photo:'https://randomuser.me/api/portraits/men/41.jpg',
  title:'Security consultant',yrs:8,rate:95,onsite:false,remote:true,evenings:true,weekends:true,
  checkins:false,business:true,rating:4.7,reviews:61,intro:true,nextAvail:'Tonight',
  platforms:['Windows','Mac'],personality:'Highly technical expert',
  specs:['Cybersecurity','Computers & laptops','AI tools'],
  futures:['Cybersecurity','AI tools','Privacy'],
  bio:'Works entirely over screen-share, anywhere. Ethan hardens accounts, removes what shouldn\u2019t be there, and audits exactly what\u2019s watching you.'},
 {id:6,name:'Ruth Adler',photo:'https://randomuser.me/api/portraits/women/58.jpg',
  title:'Technology educator',yrs:18,rate:60,onsite:true,remote:true,evenings:false,weekends:false,
  checkins:true,business:false,rating:4.8,reviews:178,intro:true,nextAvail:'Thu 7/31',
  platforms:['Windows'],personality:'Patient teacher',
  specs:['Computers & laptops','Printers & peripherals','Phones & tablets'],
  futures:['Tech education','Family tech support','New computers'],
  bio:'Retired school IT director who teaches as she fixes. Ruth\u2019s clients keep a notebook of what they learned \u2014 and call her a little less every year.'},
 {id:7,name:'Jamal Carter',photo:'https://randomuser.me/api/portraits/men/86.jpg',
  title:'Smart home installer',yrs:11,rate:85,onsite:true,remote:true,evenings:true,weekends:true,
  checkins:true,business:true,rating:4.9,reviews:104,intro:true,nextAvail:'Sat 8/2',
  platforms:['Windows','Mac'],personality:'Friendly conversationalist',
  specs:['Smart home','Wi-Fi & internet','Cybersecurity'],
  futures:['Smart home devices','Home networking','Cybersecurity'],
  bio:'Installer turned advisor. Jamal brings cameras, doorbells, thermostats, and TVs into one calm, secured system you control from a single screen.'},
 {id:8,name:'Linh Tr\u1ea7n',photo:'https://randomuser.me/api/portraits/women/45.jpg',
  title:'Mobile specialist',yrs:7,rate:65,onsite:true,remote:true,evenings:false,weekends:true,
  checkins:false,business:false,rating:4.9,reviews:143,intro:true,nextAvail:'Sat 8/2',
  platforms:['Windows','Mac'],personality:'Friendly conversationalist',
  specs:['Phones & tablets','Computers & laptops','Smart home'],
  futures:['Phone setup','Family tech support','Cloud storage'],
  bio:'Linh migrates you to a new phone without losing a single photo, quiets the notification storm, and sets up family sharing that respects privacy.'},
 {id:9,name:'Gene Ostrowski',photo:'https://randomuser.me/api/portraits/men/60.jpg',
  title:'House-call technician',yrs:26,rate:50,onsite:true,remote:false,evenings:false,weekends:false,
  checkins:false,business:false,rating:4.6,reviews:257,intro:false,nextAvail:'Mon 8/4',
  platforms:['Windows'],personality:'Calm and reassuring',
  specs:['Printers & peripherals','Wi-Fi & internet','Computers & laptops'],
  futures:['New computers','Home networking'],
  bio:'Gene has made house calls since dial-up. He shows up, fixes it, labels the cables, and charges fairly. Ask about the printer museum in his garage.'},
];

/* shared reference data */
const SPECS=['Wi-Fi & internet','Computers & laptops','Email & Accounts','Phones & tablets','Setup, Repairs & Troubleshooting','Cybersecurity & Protection'];
const PERSONALITIES=['Patient teacher','Friendly conversationalist','Efficient problem solver','Highly technical expert','Calm and reassuring'];
const FUTURES=['Home networking','Smart home devices','Cybersecurity','AI tools','New computers','Phone setup','Family tech support','Data backup','Cloud storage','Privacy','Tech education'];
const CARE=[
 {t:'Wi-Fi & internet',s:'Dead zones, slow speeds, new routers',k:'Wi-Fi & internet'},
 {t:'Computers & laptops',s:'Slow machines, setup, repairs, upgrades',k:'Computers & laptops'},
 {t:'Cybersecurity',s:'Scams, breaches, passwords, protection',k:'Cybersecurity'},
 {t:'Phones & tablets',s:'New devices, photos, backups, syncing',k:'Phones & tablets'},
 {t:'Smart home',s:'Cameras, doorbells, thermostats, TVs',k:'Smart home'},
 {t:'Printers & peripherals',s:'The printer that never works',k:'Printers & peripherals'},
];
/* scheduling helpers (shared by marketplace + profile) */
const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS=['January','February','March','April','May','June','July',
              'August','September','October','November','December'];
const BASE=['9:30 AM','11:00 AM','1:00 PM','3:00 PM'];
const INTRO_TIMES=['9:00 AM','9:20 AM','11:40 AM','12:40 PM','4:30 PM'];
function availFor(a,date,intro){
  const today=new Date();today.setHours(0,0,0,0);
  const horizon=new Date(today);horizon.setDate(horizon.getDate()+60);
  if(date<=today||date>horizon)return [];
  const dow=date.getDay();
  if(dow===0)return [];
  if(dow===6&&!a.weekends)return [];
  if((a.id+date.getDate())%5===0)return [];
  const src=intro?INTRO_TIMES:BASE;
  let t=src.filter((x,i)=>(a.id+date.getDate()+i)%3!==0);
  if(!intro&&a.evenings&&date.getDate()%2===1)t=t.concat('6:00 PM');
  if(!t.length)t=[src[(a.id+date.getDate())%src.length]];
  return t;
}
function dLabel(d){return DOW[d.getDay()]+' '+(d.getMonth()+1)+'/'+d.getDate();}
function initials(n){return n.split(' ').map(w=>w[0]).join('');}
function stars(n){return '\u2605'.repeat(n)+'\u2606'.repeat(5-n);}
function ringHTML(pct,size){
  const S=size||58,R=S/2-4,C=2*Math.PI*R,off=C*(1-pct/100);
  return `<div class="ring" style="width:${S}px;height:${S}px">
    <svg viewBox="0 0 ${S} ${S}" style="width:${S}px;height:${S}px">
    <circle class="bgc" cx="${S/2}" cy="${S/2}" r="${R}" fill="none" stroke-width="4"/>
    <circle class="arc" cx="${S/2}" cy="${S/2}" r="${R}" fill="none" stroke-width="4"
      stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg>
    <div class="rt"><b>${pct}%</b><span>match</span></div></div>`;
}
function avatarHTML(a,cls,fbcls){
  return `<img class="${cls}" src="${a.photo}" alt="${a.name}"
    onerror="this.outerHTML='<div class=&quot;${fbcls}&quot;>${initials(a.name)}</div>'">`;
}
