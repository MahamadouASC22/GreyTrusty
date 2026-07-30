GREYLOCK TRUST — marketplace site
======================================================================
WHAT'S HERE

  index.html            Homepage — hero, "find help" category grid,
                        how-it-works, advisor preview, pricing band,
                        reviews, closing CTA
  marketplace.html      The questionnaire + matched advisor list,
                        pill filters, and the slide-in booking panel
  advisor.html          Per-advisor profile page. Loads whichever
                        advisor is in the URL: advisor.html?id=4
                        Includes Q&A, reviews with rating breakdown,
                        and that advisor's own booking calendar
  how-it-works.html     Our Approach → How It Works
  for-clients.html      Our Approach → For Clients
  provider-portal.html  For Providers → Provider Portal (preview)
  join.html             For Providers → Join (with application form)
  our-suite.html        Resources → Our Suite (tools we recommend)
  faqs.html             Resources → FAQs (16 questions, accordion)
  login.html            Sign in (client / advisor tabs)
  get-started.html      Questionnaire vs. create-account fork
  support.html          Contact + support form

  css/site.css          One stylesheet for every page
  js/nav.js             Injects the shared navbar + footer, runs the
                        scroll animation, dropdowns, mobile menu
  js/data.js            The nine demo advisors + shared helpers
                        (match ring, avatars, availability engine)
  img/                  Drop your logo + illustrations here (see
                        img/README.txt for the exact filenames)

======================================================================
HOW TO RUN

  Just open index.html in a browser — everything is static.
  For local testing with clean paths:  python3 -m http.server
  then visit http://localhost:8000

======================================================================
THE NAVBAR (identical on every page)

  Our Approach ▾   How It Works · For Clients
  For Providers ▾  Provider Portal · Join Greylock
  Resources ▾      Our Suite · FAQs
  Find an Advisor
  Right side:      Login · Get Started

  Scroll animation: past 40px the bar gains a white background and
  shadow, the logo shrinks 46px → 38px, and the "GREYLOCK TRUST"
  wordmark retracts to the left, leaving just the mark.

  To change any nav item, edit the MENU array at the top of js/nav.js
  once — every page updates.

======================================================================
NOT YET WIRED (deliberate next steps)

  1. Forms (join, login, get-started, support) show a demo message.
     Point them at Supabase or Formspree to go live.
  2. Booking "Continue" hands off to book.html with the advisor, kind,
     day and time in the URL:
       book.html?advisor=4&kind=intro&day=Thu%208%2F6&time=1%3A00%20PM
     Read those params in your existing booking engine to pre-fill.
  3. Advisor data is the nine fictional demos in js/data.js. Replace
     with real advisors, or load them from a Supabase table.
  4. Reviews and Q&A on advisor.html are demo content, clearly
     labelled as such on the page.
