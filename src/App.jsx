import { useEffect, useRef, useState } from 'react'

const CALENDLY = 'https://calendly.com/lucacrimi0526/hawx-services-m1'

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  )
}

function StaggerReveal({ children, className = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`stagger ${className}`}>
      {children}
    </div>
  )
}

/* ── Sticky Nav with scroll detection ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'nav-top'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <span className="text-lg font-bold tracking-[0.15em] text-white">HAW<span className="text-hawx-green">X</span></span>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 min-h-[44px] inline-flex items-center ${
            scrolled
              ? 'bg-hawx-green text-hawx-black hover:bg-hawx-green/90'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
          }`}
        >
          Schedule Your Call
        </a>
      </div>
    </nav>
  )
}

/* ── CTA Button ── */
function CTA({ children, size = 'lg' }) {
  const sizes = {
    lg: 'px-10 py-4 text-base',
    xl: 'px-12 py-5 text-lg',
  }
  return (
    <a
      href={CALENDLY}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta-btn inline-flex items-center gap-2 bg-hawx-green text-hawx-black font-semibold rounded-full ${sizes[size]} tracking-wide`}
    >
      {children}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  )
}

/* ── Stat ── */
function Stat({ value, label, suffix = '' }) {
  return (
    <div className="group">
      <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white">
        {value}<span className="text-hawx-green">{suffix}</span>
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-neutral-500 font-medium">{label}</div>
    </div>
  )
}

/* ── Benefit Row ── */
function Benefit({ num, title, desc }) {
  return (
    <div className="hover-card group grid grid-cols-[auto_1fr] gap-6 md:gap-8 py-8 border-b border-white/[0.06] items-start">
      <span className="text-xs font-mono text-hawx-green/60 pt-1 tracking-wider">{num}</span>
      <div>
        <h3 className="text-xl md:text-2xl font-medium text-white mb-2 group-hover:text-hawx-green transition-colors duration-300">{title}</h3>
        <p className="text-neutral-400 leading-relaxed max-w-xl text-[15px]">{desc}</p>
      </div>
    </div>
  )
}

/* ── Hero Geometric Visual ── */
function HeroVisual() {
  return (
    <div className="hero-visual relative w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-hawx-green/20 hero-ring" />
      <div className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border border-hawx-green/30 translate-x-8 -translate-y-6 hero-ring-2" />
      <div className="absolute z-10 hero-stat-card bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-8 py-6 text-center">
        <div className="text-5xl md:text-6xl font-extralight text-hawx-green tracking-tight">$4.3K</div>
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mt-2 font-medium">Avg. Monthly Pay</div>
      </div>
      <div className="absolute top-12 right-8 w-3 h-3 rounded-full bg-hawx-green/40 hero-dot" />
      <div className="absolute top-20 right-16 w-2 h-2 rounded-full bg-hawx-green/25 hero-dot-2" />
      <div className="absolute bottom-16 left-12 w-2.5 h-2.5 rounded-full bg-hawx-green/30 hero-dot-3" />
      <svg className="absolute w-full h-full" viewBox="0 0 400 400" fill="none" style={{ opacity: 0.1 }}>
        <line x1="50" y1="350" x2="350" y2="50" stroke="#637675" strokeWidth="0.5" />
        <line x1="80" y1="380" x2="380" y2="80" stroke="#637675" strokeWidth="0.3" />
      </svg>
    </div>
  )
}

/* ── Testimonial Card ── */
function TestimonialCard({ initials, name, title, quote, accent = false }) {
  return (
    <div className={`testimonial-card relative p-8 md:p-10 rounded-2xl border overflow-hidden ${
      accent
        ? 'bg-gradient-to-br from-hawx-green/[0.08] to-white/[0.02] border-hawx-green/20'
        : 'bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/[0.08]'
    }`}>
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${accent ? 'from-hawx-green/80 via-hawx-green/30' : 'from-hawx-green/40 via-hawx-green/10'} to-transparent`} />
      <svg className="absolute top-6 right-8 opacity-[0.06]" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11.083 13.26 11.083 15.176c0 .99-.398 1.936-1.104 2.634a3.77 3.77 0 01-2.646 1.078c-1.13 0-2.165-.476-2.75-1.567zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.986.178 3.478 1.748 3.478 3.664 0 .99-.398 1.936-1.104 2.634a3.77 3.77 0 01-2.646 1.078c-1.13 0-2.165-.476-2.75-1.567z" />
      </svg>
      <blockquote className="relative text-lg md:text-xl text-neutral-200 leading-relaxed font-light mb-8" style={{ fontStyle: 'normal' }}>
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ring-2 ${
          accent ? 'bg-hawx-green/30 ring-hawx-green/20' : 'bg-hawx-green/15 ring-hawx-green/10'
        }`}>
          <span className="text-hawx-green font-bold text-sm">{initials}</span>
        </div>
        <div>
          <div className="text-base font-semibold text-white tracking-tight">{name}</div>
          <div className="text-sm text-neutral-500 mt-0.5">{title}</div>
        </div>
      </div>
    </div>
  )
}

/* ── HAWX Values Letter ── */
function HAWXLetter({ letter, word, desc, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="hawx-value-card group relative">
        <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
          <div className="hawx-letter-glow relative flex-shrink-0">
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-hawx-green/90 leading-none tracking-tighter group-hover:text-hawx-green transition-colors duration-500">
              {letter}
            </span>
          </div>
          <div className="pt-1 sm:pt-2 md:pt-4 min-w-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">{word}</h3>
            <p className="text-neutral-400 leading-relaxed text-sm sm:text-[15px] max-w-md">{desc}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* ── US Map using real SVG ── */
function USMapReal() {
  const mapRef = useRef()
  const hawxStates = ['az','ca','ga','il','in','la','md','mo','nc','oh','tn','tx','ut']

  useEffect(() => {
    if (!mapRef.current) return
    fetch('/us-map.svg')
      .then(function(r) { return r.text() })
      .then(function(svg) {
        mapRef.current.innerHTML = svg
        var svgEl = mapRef.current.querySelector('svg')
        if (svgEl) {
          svgEl.setAttribute('viewBox', '0 0 959 593')
          svgEl.setAttribute('width', '100%')
          svgEl.removeAttribute('height')
          svgEl.style.maxWidth = '800px'
          svgEl.style.margin = '0 auto'
          svgEl.style.display = 'block'
          // Override internal styles
          var styleEl = svgEl.querySelector('style')
          if (styleEl) {
            styleEl.textContent = '.state{fill:#1a1a1a} .borders{stroke:#333;stroke-width:0.5} .separator1{stroke:#333;stroke-width:1} .dccircle{display:none}'
          }
        }
        // Style all state paths
        var paths = mapRef.current.querySelectorAll('path')
        paths.forEach(function(p) {
          var cls = p.getAttribute('class') || ''
          var isHawx = hawxStates.some(function(s) { return cls === s })
          if (isHawx) {
            p.style.fill = '#7a9e9d'
            p.style.opacity = '0.9'
            p.style.filter = 'drop-shadow(0 0 6px rgba(122,158,157,0.4))'
            p.style.transition = 'opacity 0.3s'
          } else if (cls && !cls.includes('-') && cls !== 'borders' && cls !== 'state' && cls !== 'separator1' && cls !== 'dccircle') {
            p.style.fill = '#1a1a1a'
            p.style.opacity = '0.7'
          }
          // Hide border lines (classes with hyphens like "al-ga")
          if (cls.includes('-')) {
            p.style.stroke = '#333'
            p.style.strokeWidth = '0.5'
          }
        })
      })
  }, [])

  return (
    <div className="us-map-real relative max-w-3xl mx-auto py-4">
      <div ref={mapRef} className="w-full" style={{ filter: 'drop-shadow(0 0 20px rgba(122,158,157,0.1))' }} />
      <div className="flex items-center justify-center gap-6 mt-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#7a9e9d]" />
          <span className="text-xs text-neutral-400 tracking-wide">Hawx Markets</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-neutral-800" />
          <span className="text-xs text-neutral-500 tracking-wide">Expanding Soon</span>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════ */
export default function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true))
  }, [])

  return (
    <div className={`bg-hawx-black text-white min-h-screen font-[Inter,system-ui,sans-serif] ${loaded ? 'page-loaded' : 'page-loading'}`}>

      {/* ── NAV ── */}
      <Nav />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center grain overflow-hidden">
        <div className="orb absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-hawx-green/[0.04] blur-[100px]" />
        <div className="orb orb-delay absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full bg-hawx-green/[0.06] blur-[80px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="hero-entrance hero-entrance-1">
                <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-hawx-green animate-pulse" />
                  <span className="text-xs font-medium tracking-wide text-neutral-400 uppercase">Now Recruiting · Summer 2026</span>
                </div>
              </div>
              
              <div className="hero-entrance hero-entrance-2">
                <h1 className="text-[clamp(2.5rem,7vw,6.5rem)] font-extralight leading-[0.95] tracking-tight mb-8">
                  One summer.<br />
                  <span className="font-semibold text-hawx-green">Real skills.<br />Real money.</span>
                </h1>
              </div>

              <div className="hero-entrance hero-entrance-3">
                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-lg mb-10">
                  Sell door-to-door for Hawx Pest Control. Earn <span className="text-white font-medium">$4,300/month average</span>. 
                  Build real sales skills that transfer to literally any career.
                </p>
              </div>

              <div className="hero-entrance hero-entrance-4">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <CTA size="xl">Schedule Your Call</CTA>
                  <span className="text-sm text-neutral-500 sm:pt-4">15-min intro with Luca · No commitment</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block hero-entrance hero-entrance-3">
              <HeroVisual />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ── MARQUEE STRIP ── */}
      <section className="py-5 border-b border-white/[0.04] overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mr-8">
              {['14 States', '24+ Locations', '$4,300/mo Avg Pay', 'Furnished Housing', 'AI-Powered Tech', 'Founded 2013', 'Top Workplaces 2023', 'Now Hiring 2026'].map((t, j) => (
                <span key={j} className="flex items-center gap-8">
                  <span className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-500">{t}</span>
                  <span className="text-hawx-green/30 text-xs">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-28 md:py-36 mesh-bg">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-hawx-green/70 mb-16 font-medium">By the numbers</p>
          </Reveal>
          <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            <Stat value="$4,300" label="Monthly intern pay" />
            <Stat value="24" label="Locations nationwide" suffix="+" />
            <Stat value="14" label="States and growing" suffix="+" />
            <Stat value="2013" label="Founded" />
          </StaggerReveal>
        </div>
      </section>

      {/* ── WHAT YOU'LL ACTUALLY DO ── */}
      <section className="border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-hawx-green/70 mb-4 font-medium">Straight talk</p>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight">
                What you'll<br /><span className="font-semibold">actually do.</span>
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <div className="space-y-6 text-neutral-400 leading-relaxed">
                <p className="text-lg">
                  You'll sell Hawx's pest control services <span className="text-white">directly to homeowners, face to face</span>. Door to door. Every day.
                </p>
                <p>
                  It's not easy. The days are long, the sun is hot, and you'll hear "no" more than you hear "yes." 
                  But the people who lean in? They build <span className="text-hawx-green">communication, resilience, and negotiation skills</span> that transfer to literally any career. sales, law, startups, you name it.
                </p>
                <p>
                  We're telling you this upfront because we want people who are <span className="text-white">serious about growth</span>, not surprised on day one. If that's you, keep reading.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  {['Face-to-Face Sales', 'Full Training Provided', 'Commission-Based Pay', 'No Experience Needed'].map((tag) => (
                    <span key={tag} className="text-xs font-medium tracking-wide uppercase text-neutral-500 bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP (enhanced) ── */}
      <section className="border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight">
              Not your average<br /><span className="font-semibold">internship.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="space-y-6 text-neutral-400 leading-relaxed">
              <p className="text-lg">
                43% of US internships are unpaid. Hawx pays <span className="text-white">more than double</span> the national average. because real work deserves real money.
              </p>
              <p>
                You'll get real sales training from industry veterans, furnished housing so you can focus on work, and a team that actually has your back. No corporate hand-waving. Just results.
              </p>
              <p className="text-white font-medium">
                This is where closers get built.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HAWX VALUES ── */}
      <section className="py-28 md:py-36 mesh-bg overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-hawx-green/70 mb-4 font-medium">Our DNA</p>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6">
              It's in the <span className="font-semibold">name.</span>
            </h2>
            <p className="text-neutral-500 text-lg mb-16 max-w-xl">HAWX isn't just a brand. it's a code. Every letter stands for something we live by.</p>
          </Reveal>

          <div className="grid gap-12 md:gap-16">
            <HAWXLetter
              letter="H"
              word="Honesty"
              desc="No games, no fine print. We tell you what this job is, what it pays, and what it takes. Trust is the foundation."
              delay={0}
            />
            <div className="h-px bg-gradient-to-r from-hawx-green/20 via-hawx-green/5 to-transparent" />
            <HAWXLetter
              letter="A"
              word="Attitude"
              desc="You'll hear 'no' a hundred times. The people who win here are the ones who knock on the next door anyway."
              delay={0}
            />
            <div className="h-px bg-gradient-to-r from-hawx-green/20 via-hawx-green/5 to-transparent" />
            <HAWXLetter
              letter="W"
              word="Work Ethic"
              desc="Nobody's going to hand you anything. But if you put in the reps, the results come. Every top earner started where you are."
              delay={0}
            />
            <div className="h-px bg-gradient-to-r from-hawx-green/20 via-hawx-green/5 to-transparent" />
            <HAWXLetter
              letter="X"
              word="eXcellence"
              desc="Good enough isn't good enough. We push for the best in our service, our tech, our people. That's how Hawx keeps growing."
              delay={0}
            />
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-hawx-green/70 mb-4 font-medium">What you get</p>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-16">
              Everything to <span className="font-semibold">launch.</span>
            </h2>
          </Reveal>

          <Reveal>
            <Benefit num="01" title="Serious Compensation" desc="Average intern pay of $4,300/month. more than double the national intern average. Commission-based with uncapped upside." />
          </Reveal>
          <Reveal>
            <Benefit num="02" title="Furnished Housing" desc="Show up and get to work. Company-provided housing so you can focus on selling, not apartment hunting." />
          </Reveal>
          <Reveal>
            <Benefit num="03" title="Proven Sales System" desc="You're not figuring this out alone. Hawx gives you a tested playbook, a territory, and a manager who's done it before." />
          </Reveal>
          <Reveal>
            <Benefit num="04" title="Career Launchpad" desc="D2D alumni go on to crush it in tech sales, real estate, finance, and startups. The skills you build here transfer everywhere." />
          </Reveal>
          <Reveal>
            <Benefit num="05" title="Real Sales Training" desc="Learn from industry veterans. Build the face-to-face communication and closing skills that every career needs." />
          </Reveal>
          <Reveal>
            <Benefit num="06" title="Team Culture" desc="Weekly team events, mentorship from top performers, and a crew that pushes each other. You won't do this alone." />
          </Reveal>
        </div>
      </section>

      {/* ── ACCENT QUOTE ── */}
      <section className="border-y border-white/[0.06] py-16 md:py-20">
        <Reveal>
          <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white/80 leading-snug tracking-tight" style={{ fontStyle: 'normal' }}>
              "Time is more valuable than money."
            </blockquote>
            <p className="text-sm text-hawx-green/60 mt-6 font-medium tracking-wide">Michael Paulus, Executive Chairman</p>
          </div>
        </Reveal>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="mesh-bg overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 md:gap-24 items-start">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-hawx-green/70 mb-4 font-medium">Leadership</p>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight">
                Backed by<br /><span className="font-semibold">proven builders.</span>
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <div className="space-y-8">
                <div className="quote-card relative p-10 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-hawx-green/60 via-hawx-green/20 to-transparent" />
                  <svg className="absolute top-6 right-8 opacity-[0.06]" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11.083 13.26 11.083 15.176c0 .99-.398 1.936-1.104 2.634a3.77 3.77 0 01-2.646 1.078c-1.13 0-2.165-.476-2.75-1.567zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.986.178 3.478 1.748 3.478 3.664 0 .99-.398 1.936-1.104 2.634a3.77 3.77 0 01-2.646 1.078c-1.13 0-2.165-.476-2.75-1.567z" />
                  </svg>
                  <blockquote className="relative text-xl md:text-2xl text-neutral-200 leading-relaxed font-light mb-8" style={{ fontStyle: 'normal' }}>
                    "I love being in the fight and I love being the underdog in industries. I like to think of identifying myself still as that kind of <span className="text-hawx-green font-normal">gritty entrepreneur</span> and not as the person that's made it and is on their yacht in the Caribbean."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full ring-2 ring-hawx-green/10 overflow-hidden">
                      <img src="/images/paulus.jpg" alt="Michael Paulus" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-white tracking-tight">Michael Paulus</div>
                      <div className="text-sm text-neutral-500 mt-0.5">Executive Chairman · Founder's Story Podcast, Ep. 192</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    'PCM Growth Backed',
                    '$3.5B Exit Track Record',
                    'Targeting $1B Valuation',
                  ].map((tag) => (
                    <span key={tag} className="text-xs font-medium tracking-wide uppercase text-neutral-500 bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 md:py-36 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-hawx-green/70 mb-4 font-medium">From the team</p>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-16">
              Don't take our word<br /><span className="font-semibold">for it.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Reveal>
              <TestimonialCard
                initials="DJ"
                name="Dallan Jones"
                title="Sr. Sales Manager"
                quote="I had zero interest in sales when I got to BYU... I ended up selling five my first day. I made about $1,000 that day."
                accent={true}
              />
            </Reveal>
            <Reveal delay={1}>
              <TestimonialCard
                initials="BR"
                name="Brayden Rhoton"
                title="Regional Sales Manager"
                quote="The amount of experience and income potential you can gain from knocking doors for one summer is unmatched in my opinion, at least for college aged people."
              />
            </Reveal>
            <Reveal delay={2}>
              <TestimonialCard
                initials="EB"
                name="Ezra B."
                title="Hawx Employee"
                quote="Everything I have put into Hawx has been multiplied in return. I love the people, the opportunities, and most importantly the work that we do."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY STRIP ── */}
      <section className="py-4 overflow-hidden border-y border-white/[0.06]">
        <div className="flex gap-4 photo-scroll">
          {['/images/eric1.jpg', '/images/gallery3.jpg', '/images/eric2.jpg', '/images/gallery4.jpg', '/images/eric3.jpg', '/images/gallery5.jpg', '/images/gallery6.jpg'].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-48 h-64 md:w-56 md:h-72 rounded-xl overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105" loading="lazy" />
            </div>
          ))}
          {/* Duplicate for seamless scroll */}
          {['/images/eric1.jpg', '/images/gallery3.jpg', '/images/eric2.jpg', '/images/gallery4.jpg', '/images/eric3.jpg', '/images/gallery5.jpg', '/images/gallery6.jpg'].map((src, i) => (
            <div key={`dup-${i}`} className="flex-shrink-0 w-48 h-64 md:w-56 md:h-72 rounded-xl overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ── DEREK / THE TRIBE ── */}
      <section className="border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-16 items-center">
            <Reveal>
              <div className="relative">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-hawx-green/15">
                  <img src="/images/derek-profile.jpg" alt="Derek Childs" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-hawx-green/20 border border-hawx-green/30 rounded-lg px-3 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-hawx-green">The Tribe</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-hawx-green/70 mb-3 font-medium">Your mentor</p>
                <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-2">
                  Derek <span className="font-semibold">Childs</span>
                </h2>
                <p className="text-sm text-neutral-500 mb-6">Regional Sales Manager · Founder, The Tribe Region</p>
                <div className="space-y-4 text-neutral-400 leading-relaxed">
                  <p>
                    At 20 years old, Derek had <span className="text-white">$6 in his bank account</span>. Three years in pest control sales later, he founded his own region within Hawx. The Tribe.
                  </p>
                  <p>
                    "Working in pest control sales has opened up doors that I don't think would have been possible any other way. My social skills, business ability, income, and goals are higher than they have ever been. <span className="text-hawx-green">The culture and friendships have been life changing.</span>"
                  </p>
                  <p className="text-white text-sm font-medium">
                    Derek is who you'll work under. He's been where you are.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ACCENT QUOTE 2 ── */}
      <section className="py-14 md:py-16">
        <Reveal>
          <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
            <blockquote className="text-xl md:text-2xl font-extralight text-white/60 leading-snug tracking-tight" style={{ fontStyle: 'normal' }}>
              "Time is more valuable than money. Invest it wisely."
            </blockquote>
            <p className="text-sm text-hawx-green/40 mt-4 font-medium tracking-wide">Michael Paulus</p>
          </div>
        </Reveal>
      </section>

      {/* ── LOCATIONS ── */}
      <section className="py-28 md:py-36 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-hawx-green/70 mb-4 font-medium">Reach</p>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-16">
              Coast to <span className="font-semibold">coast.</span>
            </h2>
          </Reveal>
          <Reveal>
            <USMapReal />
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-hawx-black via-hawx-green/[0.03] to-hawx-black" />
        <div className="orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-hawx-green/[0.04] blur-[120px]" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 py-32 md:py-44 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-hawx-green/70 mb-6 font-medium">Your move</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight mb-6">
              Your career won't<br /><span className="font-semibold">wait for you.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-md mx-auto">
              15 minutes with Luca could change the trajectory of your next year. Spots fill fast.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <CTA size="xl">Schedule Your Call</CTA>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">© {new Date().getFullYear()} Hawx Pest Control</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-neutral-600">
            <span>14 States</span>
            <span>·</span>
            <span>24+ Locations</span>
            <span>·</span>
            <span>Founded 2013</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
