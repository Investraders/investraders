/**
 * WisdomNet Complete Website — Single Self-Contained File
 * All sections inlined: Navbar, Hero, HumanMachineCoexistence, WisdomEconomy,
 * VisionMission, AreasOfExcellence, InvestradersFlagship, PowerOfCircles,
 * WisdomEcosystems, ArtificialWisdom, InternationalRecognition, JoinWisdom, Footer
 *
 * Dependencies: react, framer-motion, lucide-react
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, BrainCircuit, ArrowRight, Sparkles, Cpu,
  Brain, Scale, Eye, Globe, Leaf, Shield, Telescope,
  TrendingUp, Building2, Database, Network, Users,
  Target, Check, Circle, Rocket, GraduationCap, Lightbulb,
  Award, Globe2, ExternalLink, Bot, User,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Wisdom Economy', href: '#wisdom-economy' },
  { label: 'Excellence', href: '#excellence' },
  { label: 'Investraders', href: '#investraders' },
  { label: 'Circles', href: '#circles' },
  { label: 'Recognition', href: '#recognition' },
];

function WisdomNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(15,23,42,0.08)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #22d3ee, #a78bfa)', boxShadow: '0 0 20px rgba(34,211,238,0.35)' }}>
            <BrainCircuit className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-wide" style={{ color: '#0f172a' }}>
            WISDOM<span style={{ color: '#0891b2' }}>NET</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors">
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => scrollTo('#join')}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #f5d77a, #d4af37)', boxShadow: '0 4px 20px rgba(212,175,55,0.35)' }}
          >
            Join the Movement
          </button>
        </div>

        <button className="md:hidden text-amber-600" onClick={() => setOpen(v => !v)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(15,23,42,0.08)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left py-2.5 text-slate-600 hover:text-amber-600 transition-colors">
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#join')}
                className="mt-2 py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #f5d77a, #d4af37)' }}
              >
                Join the Movement
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Particle({ delay, duration, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%`, background: color, boxShadow: `0 0 ${size * 3}px ${color}` }}
      animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function WisdomHero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: '#ffffff' }}>
      <div className="absolute bottom-0 inset-x-0 h-1/2 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(8,145,178,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        transform: 'perspective(400px) rotateX(60deg)',
        transformOrigin: 'bottom',
        maskImage: 'linear-gradient(to top, black, transparent)',
        WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
      }} />
      <div className="absolute pointer-events-none" style={{ top: '8%', left: '5%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '5%', right: '5%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(167,139,250,0.14), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none" style={{ top: '35%', left: '42%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)', filter: 'blur(50px)' }} />

      {Array.from({ length: 24 }).map((_, i) => (
        <Particle key={i} delay={i * 0.3} duration={3 + (i % 5)} x={(i * 37) % 100} y={(i * 53) % 100} size={2 + (i % 3)} color={['#0891b2', '#7c3aed', '#d4af37'][i % 3]} />
      ))}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.25em] mb-6"
          style={{ borderColor: 'rgba(8,145,178,0.3)', background: 'rgba(8,145,178,0.06)', color: '#0891b2' }}
        >
          <Cpu className="w-3.5 h-3.5" /> The Future of Intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          Building the{' '}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0891b2, #7c3aed, #d4af37)' }}>Wisdom Economy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-3xl"
          style={{ color: 'rgba(15,23,42,0.65)' }}
        >
          Where humans and machines coexist — guided by wisdom, powered by AI, building prosperity for all. Transforming Intelligence into{' '}
          <span className="font-medium" style={{ color: '#b8860b' }}>Wisdom</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollTo('#wisdom-economy')}
            className="px-7 py-3.5 rounded-lg font-semibold text-white transition-transform hover:scale-105 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 6px 30px rgba(8,145,178,0.35)' }}
          >
            Explore Our Vision <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo('#join')}
            className="px-7 py-3.5 rounded-lg font-semibold border transition-colors"
            style={{ borderColor: 'rgba(184,134,11,0.4)', color: '#b8860b', background: 'rgba(212,175,55,0.06)' }}
          >
            Join the Movement
          </button>
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(15,23,42,0.4)' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(8,145,178,0.6), transparent)' }} />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HUMAN-MACHINE COEXISTENCE
───────────────────────────────────────────── */
const COEXIST_PILLARS = [
  { icon: Users, title: 'Collaboration', desc: "Humans and AI working side by side, each amplifying the other's strengths to solve challenges no single mind can solve alone.", color: '#0891b2' },
  { icon: BrainCircuit, title: 'Augmentation', desc: 'Technology that enhances human potential rather than replacing it — extending our reach, our memory, and our foresight.', color: '#7c3aed' },
  { icon: Shield, title: 'Ethical Guardrails', desc: 'Wisdom-guided AI systems built on trust, transparency, accountability, and the dignity of every human life.', color: '#b8860b' },
];

function HumanMachineCoexistence() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(8,145,178,0.06), transparent 65%)' }} />
      <div className="absolute pointer-events-none" style={{ top: '20%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#0891b2' }}>The Future</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>
            Humans & Machines,{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0891b2, #7c3aed)' }}>Together</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>
            The future is not humans versus machines. It is humans and machines — guided by wisdom — co-creating a world of shared prosperity, expanded opportunity, and responsible intelligence.
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative my-12 mx-auto max-w-3xl"
        >
          <div className="absolute pointer-events-none" style={{ inset: '-20px', background: 'radial-gradient(ellipse at 50% 50%, rgba(8,145,178,0.18), rgba(124,58,237,0.12), transparent 70%)', filter: 'blur(30px)' }} />
          <div className="relative rounded-3xl overflow-hidden border" style={{ borderColor: 'rgba(15,23,42,0.1)', boxShadow: '0 20px 60px rgba(15,23,42,0.18)' }}>
            <img
              src="https://media.base44.com/images/public/6a24647fa35a48a782a639ea/fa31a32f1_generated_image.png"
              alt="A human and a robot smiling warmly and shaking hands"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {COEXIST_PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-7 border"
              style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 4px 24px rgba(15,23,42,0.05)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${p.color}18`, border: `1px solid ${p.color}33` }}>
                <p.icon className="w-7 h-7" style={{ color: p.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-xl sm:text-2xl font-semibold leading-relaxed" style={{ color: 'rgba(15,23,42,0.75)', fontFamily: 'Playfair Display, Georgia, serif' }}>
            "Artificial Intelligence must evolve into{' '}
            <span style={{ color: '#b8860b' }}>Artificial Wisdom</span> — where technology serves humanity, and humanity guides technology."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WISDOM ECONOMY
───────────────────────────────────────────── */
const ECONOMIES = [
  { name: 'Industrial', created: 'factories' },
  { name: 'Information', created: 'the Internet' },
  { name: 'Knowledge', created: 'innovation' },
  { name: 'Artificial Intelligence', created: 'unprecedented productivity' },
];
const ECONOMY_PILLARS = [
  { icon: Brain, title: 'Wisdom', desc: 'Making better long-term decisions rather than simply faster decisions.', color: '#b8860b' },
  { icon: Scale, title: 'Equitability', desc: 'Ensuring that technological progress creates opportunities for everyone.', color: '#2563eb' },
  { icon: Eye, title: 'Future Thinking', desc: 'Preparing societies for the opportunities and disruptions of tomorrow.', color: '#7c3aed' },
  { icon: Globe, title: 'Global Awareness', desc: 'Connecting people, institutions and economies beyond borders.', color: '#059669' },
  { icon: Leaf, title: 'Sustainable Prosperity', desc: 'Creating lasting value for present and future generations.', color: '#ea580c' },
];

function WisdomEconomy() {
  return (
    <section id="wisdom-economy" className="relative py-24 sm:py-32" style={{ background: '#f8fafc' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06), transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>The Next Evolution</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>What is the Wisdom Economy?</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-20 space-y-4">
          {ECONOMIES.map((e, i) => (
            <motion.div key={e.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-xl border" style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 2px 12px rgba(15,23,42,0.04)' }}>
              <span className="text-sm font-mono" style={{ color: 'rgba(15,23,42,0.35)' }}>0{i + 1}</span>
              <div className="flex-1">
                <span className="font-medium" style={{ color: '#0f172a' }}>The {e.name} Economy</span>
                <span style={{ color: 'rgba(15,23,42,0.5)' }}> created </span>
                <span className="italic" style={{ color: '#b8860b' }}>{e.created}.</span>
              </div>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="flex items-center gap-4 p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))', border: '1px solid rgba(212,175,55,0.35)' }}>
            <span className="text-sm font-mono" style={{ color: '#b8860b' }}>05</span>
            <div className="flex-1">
              <span className="font-bold text-lg" style={{ color: '#b8860b' }}>The Wisdom Economy</span>
              <p className="text-sm mt-1" style={{ color: 'rgba(15,23,42,0.65)' }}>where technology serves humanity, opportunities are expanded rather than concentrated, and intelligent systems are guided by ethical governance, strategic foresight, and inclusive prosperity.</p>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>Founded on Five Pillars</h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {ECONOMY_PILLARS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
              className="rounded-2xl p-6 border" style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 4px 24px rgba(15,23,42,0.05)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${p.color}18`, border: `1px solid ${p.color}33` }}>
                <p.icon className="w-6 h-6" style={{ color: p.color }} />
              </div>
              <h4 className="font-semibold text-lg mb-2" style={{ color: '#0f172a' }}>{p.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VISION & MISSION
───────────────────────────────────────────── */
function VisionMission() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.05), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.05), transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 lg:p-10 border" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.05), rgba(37,99,235,0.02))', borderColor: 'rgba(37,99,235,0.2)', boxShadow: '0 4px 24px rgba(37,99,235,0.06)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(37,99,235,0.12)' }}>
              <Eye className="w-6 h-6" style={{ color: '#2563eb' }} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#2563eb' }}>Our Vision</span>
            <p className="text-xl sm:text-2xl font-semibold mt-4 leading-relaxed" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>
              To become a global catalyst for the transition toward a Wisdom Economy where artificial intelligence empowers humanity, institutions operate with transparency and wisdom, and every individual has access to meaningful opportunities regardless of geography or background.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 lg:p-10 border" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))', borderColor: 'rgba(212,175,55,0.25)', boxShadow: '0 4px 24px rgba(212,175,55,0.06)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(212,175,55,0.14)' }}>
              <Target className="w-6 h-6" style={{ color: '#b8860b' }} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>Our Mission</span>
            <p className="text-xl sm:text-2xl font-semibold mt-4 leading-relaxed" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>
              To develop innovative digital ecosystems, strategic frameworks and AI-enabled platforms that empower governments, businesses, educational institutions and communities to build resilient, connected and opportunity-driven societies.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   AREAS OF EXCELLENCE
───────────────────────────────────────────── */
const EXCELLENCE_AREAS = [
  { icon: Shield, title: 'AI Governance & Trust', desc: 'Designing responsible AI governance frameworks that promote trust, transparency, accountability and security.', color: '#2563eb' },
  { icon: Telescope, title: 'Strategic Foresight', desc: 'Helping organizations anticipate change rather than react to it.', color: '#7c3aed' },
  { icon: TrendingUp, title: 'Future Economies', desc: 'Supporting countries and institutions in preparing for AI-driven economic transformation.', color: '#b8860b' },
  { icon: Building2, title: 'Organizational Governance', desc: 'Building modern governance systems for governments, corporations, chambers of commerce, universities and non-profits.', color: '#059669' },
  { icon: Database, title: 'Enterprise Intelligence', desc: 'Transforming fragmented organizational data into actionable intelligence for better decision-making.', color: '#ea580c' },
  { icon: Network, title: 'Opportunity Ecosystems', desc: 'Creating digital environments where people and organizations connect, collaborate and create value together.', color: '#0891b2' },
];

function AreasOfExcellence() {
  return (
    <section id="excellence" className="relative py-24 sm:py-32" style={{ background: '#f8fafc' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05), transparent 70%)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>What We Do</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>Our Areas of Excellence</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(15,23,42,0.6)' }}>Six domains where we help organizations build wisdom into their foundations.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXCELLENCE_AREAS.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
              className="group rounded-2xl p-7 border transition-colors" style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 4px 24px rgba(15,23,42,0.05)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: `${a.color}18`, border: `1px solid ${a.color}33` }}>
                <a.icon className="w-7 h-7" style={{ color: a.color }} />
              </div>
              <span className="text-xs font-mono" style={{ color: 'rgba(15,23,42,0.35)' }}>0{i + 1}</span>
              <h3 className="text-xl font-bold mt-1 mb-3" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>{a.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   INVESTRADERS FLAGSHIP
───────────────────────────────────────────── */
const MINDSET_ROLES = [
  'an entrepreneur', 'a student', 'a university', 'a chamber of commerce',
  'a corporation', 'a government agency', 'an investor', 'or simply someone with a passion',
];

function InvestradersFlagship() {
  return (
    <section id="investraders" className="relative py-24 sm:py-32" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.07), transparent 65%)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.08)', color: '#b8860b' }}>
            <Sparkles className="w-3.5 h-3.5" /> The Flagship Platform
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>
            Introducing{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #d4af37, #b8860b)' }}>Investraders</span>
          </h2>
          <p className="text-xl mb-6" style={{ color: 'rgba(15,23,42,0.65)' }}>The practical embodiment of the Wisdom Economy.</p>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(15,23,42,0.55)' }}>
            It is not simply another social platform. It is an <span className="font-medium" style={{ color: '#b8860b' }}>Opportunity Ecosystem</span> where individuals, companies and institutions transform relationships into opportunities, communities into value, and engagement into sustainable income.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 mb-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.03))', border: '1px solid rgba(212,175,55,0.35)' }}>
          <div className="absolute" style={{ top: '-40px', right: '-40px', width: 200, height: 200, background: 'radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)', filter: 'blur(40px)' }} />
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f5d77a, #d4af37)', boxShadow: '0 8px 30px rgba(212,175,55,0.35)' }}>
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: '#b8860b', fontFamily: 'Playfair Display, Georgia, serif' }}>Make Money Meanwhile (3M)</h3>
              <p className="mt-2" style={{ color: 'rgba(15,23,42,0.65)' }}>Instead of spending time only consuming content, people can create value while interacting with their communities.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>The Mindset</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 mb-6" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>A New Mindset for the AI Age</h3>
            <p className="leading-relaxed mb-4" style={{ color: 'rgba(15,23,42,0.65)' }}>
              Artificial Intelligence will eliminate many repetitive tasks. But it will also create unprecedented opportunities for people capable of building communities, trust, knowledge and meaningful relationships.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgba(15,23,42,0.65)' }}>
              The future belongs to those who <span className="font-semibold" style={{ color: '#b8860b' }}>create value for others</span>. Investraders enables everyone to do exactly that.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-sm mb-4" style={{ color: 'rgba(15,23,42,0.55)' }}>Whether you are:</p>
            <div className="flex flex-col gap-2">
              {MINDSET_ROLES.map((role, i) => (
                <motion.div key={role} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border" style={{ background: '#ffffff', borderColor: 'rgba(212,175,55,0.2)', boxShadow: '0 2px 10px rgba(15,23,42,0.03)' }}>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#b8860b' }} />
                  <span className="text-sm capitalize" style={{ color: '#0f172a' }}>{role}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-center font-medium" style={{ color: '#b8860b' }}>— You can build your own opportunity ecosystem.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   POWER OF CIRCLES
───────────────────────────────────────────── */
const CIRCLE_TYPES = [
  'A Chamber of Commerce', 'A Stock Exchange', 'A University', 'A Company',
  'A Municipality', 'A Professional Association', 'A Startup Community', 'A Family Business',
  'A Local Community', 'A Research Group', 'A Personal Brand',
];

function PowerOfCircles() {
  return (
    <section id="circles" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#f8fafc' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.06), transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex justify-center order-2 lg:order-1">
            <div className="relative" style={{ width: 360, height: 360, maxWidth: '90vw' }}>
              <div className="absolute rounded-full flex items-center justify-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 120, height: 120, background: 'radial-gradient(circle at 38% 30%, #7ec0f0, #2563eb 50%, #1e3a8a)', boxShadow: '0 8px 40px rgba(37,99,235,0.4)', border: '1px solid rgba(147,197,253,0.4)' }}>
                <Circle className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>
              {Array.from({ length: 7 }).map((_, i) => {
                const deg = (i * 360) / 7;
                const rad = (deg * Math.PI) / 180;
                const r = 150;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return (
                  <motion.div key={i} className="absolute rounded-full"
                    style={{ width: 44, height: 44, left: '50%', top: '50%', marginLeft: -22, marginTop: -22, background: 'linear-gradient(135deg, #f5d77a, #d4af37)', border: '2px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 16px rgba(212,175,55,0.35)' }}
                    animate={{ x: [x, Math.cos(rad + 0.8) * r, x], y: [y, Math.sin(rad + 0.8) * r, y] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                );
              })}
              <div className="absolute rounded-full border border-dashed" style={{ left: '50%', top: '50%', width: 300, height: 300, transform: 'translate(-50%,-50%)', borderColor: 'rgba(15,23,42,0.1)' }} />
            </div>
          </motion.div>
          <div className="order-1 lg:order-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>The Power of Circles</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>Communities That Create Value</h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(15,23,42,0.65)' }}>
                Unlike traditional social media that focuses on content consumption, Circles are <span className="font-medium" style={{ color: '#b8860b' }}>intelligent communities</span> built around shared interests, businesses, institutions, professions, or local ecosystems.
              </p>
            </motion.div>
            <p className="text-sm font-semibold mb-4" style={{ color: 'rgba(15,23,42,0.55)' }}>A Circle can represent:</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {CIRCLE_TYPES.map((c, i) => (
                <motion.div key={c} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,175,55,0.18)' }}>
                    <Check className="w-3 h-3" style={{ color: '#b8860b' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(15,23,42,0.75)' }}>{c}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WISDOM ECOSYSTEMS
───────────────────────────────────────────── */
const INSTITUTION_TYPES = [
  'Chambers of Commerce', 'Stock Exchanges', 'Universities', 'Government Agencies',
  'Business Associations', 'Export Promotion Agencies', 'Technology Parks', 'Free Zones', 'Innovation Hubs',
];

function WisdomEcosystems() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.05), transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ borderColor: 'rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.08)', color: '#2563eb' }}>
              <Building2 className="w-3.5 h-3.5" /> For Institutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>Empowering Business Ecosystems</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(15,23,42,0.65)' }}>
              Wisdom Net believes institutions are the <span className="font-medium" style={{ color: '#2563eb' }}>architects of prosperous societies</span>. Through Investraders, institutions can create intelligent digital ecosystems that improve stakeholder engagement and strategic visibility.
            </p>
            <div className="flex flex-wrap gap-2">
              {INSTITUTION_TYPES.map(t => (
                <span key={t} className="px-3.5 py-1.5 rounded-full border text-xs" style={{ background: 'rgba(37,99,235,0.06)', borderColor: 'rgba(37,99,235,0.2)', color: 'rgba(37,99,235,0.9)' }}>{t}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
            {[
              { label: 'Stakeholder Engagement', val: 'Real-time' },
              { label: 'Strategic Visibility', val: 'End-to-end' },
              { label: 'Collaboration', val: 'Cross-border' },
              { label: 'Investment & Trade', val: 'Enabled' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-6 border" style={{ background: '#ffffff', borderColor: 'rgba(37,99,235,0.15)', boxShadow: '0 4px 24px rgba(37,99,235,0.05)' }}>
                <div className="font-bold text-xl" style={{ color: '#2563eb', fontFamily: 'Playfair Display, Georgia, serif' }}>{s.val}</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(15,23,42,0.6)' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
            <div className="rounded-3xl p-8 border" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))', borderColor: 'rgba(212,175,55,0.3)', boxShadow: '0 4px 24px rgba(212,175,55,0.06)' }}>
              <p className="leading-relaxed mb-4" style={{ color: 'rgba(15,23,42,0.65)' }}>
                Every person possesses knowledge. Every person possesses talent. Every person possesses relationships. <span className="font-medium" style={{ color: '#b8860b' }}>These are valuable assets.</span>
              </p>
              <p className="leading-relaxed" style={{ color: 'rgba(15,23,42,0.65)' }}>Investraders enables individuals to transform these assets into thriving communities that create opportunities, partnerships and sustainable income.</p>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
                <Sparkles className="w-5 h-5" style={{ color: '#b8860b' }} />
                <span className="font-bold text-lg" style={{ color: '#b8860b', fontFamily: 'Playfair Display, Georgia, serif' }}>We call this philosophy: Make Money Meanwhile (3M)</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.08)', color: '#b8860b' }}>
              <Users className="w-3.5 h-3.5" /> For Individuals
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>Where Dreams Become Opportunities</h2>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(15,23,42,0.65)' }}>
              Instead of spending time only consuming content, people can <span className="font-medium" style={{ color: '#b8860b' }}>create value while interacting with their communities</span> — transforming passion, skill and relationships into thriving opportunity ecosystems.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ARTIFICIAL WISDOM
───────────────────────────────────────────── */
const AW_COMBINES = [
  'ethical governance', 'strategic foresight', 'contextual understanding',
  'trust', 'transparency', 'responsible decision-making',
];

function ArtificialWisdom() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#f8fafc' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.06), transparent 65%)' }} />
      <div className="absolute" style={{ top: '20%', left: '15%', width: 280, height: 280, background: 'radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)', filter: 'blur(50px)' }} />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.25), transparent 70%)', filter: 'blur(20px)' }} />
            <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(124,58,237,0.18))', border: '1px solid rgba(212,175,55,0.4)' }}>
              <BrainCircuit className="w-10 h-10" style={{ color: '#b8860b' }} />
            </div>
          </div>
        </motion.div>
        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>
          Beyond Artificial Intelligence
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>
          Artificial{' '}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #b8860b, #7c3aed)' }}>Wisdom</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(15,23,42,0.65)' }}>
          At Wisdom Net, we believe that Artificial Intelligence must evolve into <span className="font-semibold" style={{ color: '#b8860b' }}>Artificial Wisdom</span>. It is the next frontier of digital transformation and a key pillar of our long-term research and innovation agenda.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {AW_COMBINES.map((c, i) => (
            <motion.div key={c} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border" style={{ background: '#ffffff', borderColor: 'rgba(212,175,55,0.25)', boxShadow: '0 2px 12px rgba(15,23,42,0.04)' }}>
              <Check className="w-3.5 h-3.5" style={{ color: '#b8860b' }} />
              <span className="text-sm capitalize" style={{ color: '#0f172a' }}>{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PARTNER LOGOS
───────────────────────────────────────────── */
const SEGMENT_COLORS = [
  '#FF0000', '#FF8C00', '#FFD700', '#9ACD32', '#32CD32', '#228B22',
  '#008080', '#00BFFF', '#1E90FF', '#4B0082', '#FF00FF', '#FF1493',
];

function AIHubPinwheel({ size = 38 }) {
  const cx = 15, cy = 15, r = 9;
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" style={{ overflow: 'visible' }}>
      <g>
        {SEGMENT_COLORS.map((color, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return (
            <motion.rect key={i} x={-1.1} y={-4} width={2.2} height={4} rx={1} fill={color}
              style={{ transformOrigin: `${x}px ${y}px` }}
              animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
          );
        })}
      </g>
      <circle cx="15" cy="15" r="3.4" fill="#0f172a" />
    </svg>
  );
}

function AIHubLogo() {
  return (
    <div className="flex items-center gap-3">
      <AIHubPinwheel size={40} />
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-base" style={{ color: '#0f172a' }}>AI Hub</span>
        <span className="text-[10px] font-medium" style={{ color: 'rgba(15,23,42,0.5)' }}>for Sustainable Development</span>
      </div>
    </div>
  );
}
function MicrosoftLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 26 26">
        <rect x="1" y="1" width="11" height="11" fill="#F25022" />
        <rect x="14" y="1" width="11" height="11" fill="#7FBA00" />
        <rect x="1" y="14" width="11" height="11" fill="#00A4EF" />
        <rect x="14" y="14" width="11" height="11" fill="#FFB900" />
      </svg>
      <span className="font-semibold text-lg tracking-tight" style={{ color: '#0f172a' }}>Microsoft</span>
    </div>
  );
}
function AWSLogo() {
  return (
    <div className="flex flex-col items-start">
      <span className="font-bold text-xl" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>aws</span>
      <svg width="60" height="18" viewBox="0 0 60 18" className="-mt-0.5">
        <motion.path d="M2 8 C 15 16, 30 16, 44 6" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
        <motion.path d="M40 4 L 46 7 L 42 12" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }} />
      </svg>
    </div>
  );
}
function CinecaLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0093DD, #005baa)' }}>
        <span className="text-white font-bold text-sm">C</span>
      </div>
      <span className="font-bold text-lg tracking-tight" style={{ color: '#0093DD' }}>CINECA</span>
    </div>
  );
}

const PARTNERS = [
  { Comp: AIHubLogo, label: 'UNDP Initiative', url: 'https://www.undp.org/romecentre/ai-hub-sustainable-development', accent: '#16a34a' },
  { Comp: MicrosoftLogo, label: 'Technical Partner', url: 'https://www.microsoft.com', accent: '#00A4EF' },
  { Comp: AWSLogo, label: 'Technical Partner', url: 'https://aws.amazon.com', accent: '#FF9900' },
  { Comp: CinecaLogo, label: 'Technical Partner', url: 'https://www.cineca.it', accent: '#0093DD' },
];

function FlipLogoCard({ Comp, label, url, accent, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a href={url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      className="relative block cursor-pointer" style={{ perspective: 1000, minHeight: 130 }}>
      <motion.div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', minHeight: 130 }}
        animate={{ rotateY: hovered ? 180 : 0 }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl px-8 py-7 border"
          style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.1)', boxShadow: '0 4px 24px rgba(15,23,42,0.06)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
          <Comp />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(15,23,42,0.4)' }}>{label}</span>
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${accent}1a, transparent 70%)` }} animate={{ opacity: hovered ? 1 : 0 }} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl px-8 py-7 border"
          style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}08)`, borderColor: `${accent}66`, boxShadow: '0 4px 24px rgba(15,23,42,0.06)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <ExternalLink className="w-6 h-6" style={{ color: accent }} />
          <span className="text-sm font-semibold" style={{ color: accent }}>Visit Website</span>
          <span className="text-[10px] truncate max-w-full" style={{ color: 'rgba(15,23,42,0.5)' }}>{url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
        </div>
      </motion.div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   INTERNATIONAL RECOGNITION
───────────────────────────────────────────── */
function InternationalRecognition() {
  return (
    <section id="recognition" className="relative py-24 sm:py-32" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.06), transparent 65%)' }} />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-12 border relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.05), rgba(212,175,55,0.03))', borderColor: 'rgba(34,197,94,0.2)' }}>
          <div className="absolute" style={{ top: '-60px', right: '-60px', width: 240, height: 240, background: 'radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)', filter: 'blur(50px)' }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                <Award className="w-6 h-6" style={{ color: '#16a34a' }} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#16a34a' }}>International Recognition</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>
              Driving Responsible AI for Sustainable Development
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'rgba(15,23,42,0.65)' }}>
              Wisdom Net is proud to be among the selected innovators participating in the{' '}
              <span className="font-semibold" style={{ color: '#16a34a' }}>AI Hub for Sustainable Development</span>, a global initiative supported by the Government of Italy and implemented by the{' '}
              <span className="font-semibold" style={{ color: '#16a34a' }}>United Nations Development Programme (UNDP)</span>. The initiative brings together innovators with international technical partners including Microsoft, AWS, CINECA and other leading organizations to strengthen trusted and sustainable AI ecosystems.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
              <Globe2 className="w-5 h-5" style={{ color: '#16a34a' }} />
              <span className="text-sm font-medium" style={{ color: 'rgba(15,23,42,0.7)' }}>Advancing AI Trust, responsible AI governance, and inclusive economic growth.</span>
            </div>
            {/* Partner logos */}
            <div className="mt-12">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] mb-8" style={{ color: 'rgba(15,23,42,0.45)' }}>In Partnership With</p>
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5">
                {PARTNERS.map((p, i) => <FlipLogoCard key={i} Comp={p.Comp} label={p.label} url={p.url} accent={p.accent} index={i} />)}
              </div>
              <div className="sm:hidden overflow-hidden">
                <motion.div className="flex gap-4" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
                  {[...PARTNERS, ...PARTNERS].map((p, i) => (
                    <div key={i} className="flex-shrink-0 w-[200px]">
                      <FlipLogoCard Comp={p.Comp} label={p.label} url={p.url} accent={p.accent} index={0} />
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="relative mt-10 h-px max-w-2xl mx-auto">
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(22,163,74,0.3), rgba(34,211,238,0.3), transparent)' }} />
                <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{ background: '#16a34a', boxShadow: '0 0 12px #16a34a' }}
                  animate={{ left: ['0%', '100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
              </div>
              <p className="text-center text-xs mt-4" style={{ color: 'rgba(15,23,42,0.4)' }}>Hover to flip · Click to visit the official website</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   JOIN WISDOM
───────────────────────────────────────────── */
const ARCHITECTURE = [
  { icon: Lightbulb, name: 'Wisdom Net', role: 'The global think tank and innovation company behind the Wisdom Economy.', color: '#b8860b' },
  { icon: Rocket, name: 'Investraders', role: 'The flagship digital platform implementing the Wisdom Economy through AI-powered Circles.', color: '#2563eb' },
  { icon: BrainCircuit, name: 'Artificial Wisdom Initiative', role: 'Research & governance initiative focused on AI Trust, AI Governance, Security, and Responsible AI.', color: '#7c3aed' },
  { icon: GraduationCap, name: 'Wisdom Net Academy', role: 'Executive education & certification arm, including the Certified Investraders Master Trainer (CIMT) program.', color: '#059669' },
];
const JOIN_ACTIONS = ['Explore Investraders', 'Partner with Wisdom Net', 'Build Your Circle', 'Shape the Future'];

function JoinWisdom() {
  return (
    <section id="join" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.1), transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>The Reason</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>Why Wisdom Net?</h2>
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'rgba(15,23,42,0.65)' }}>
            Because tomorrow's economy will not be built solely by technology. It will be built by people who know how to use technology wisely. We help governments, institutions, businesses and individuals prepare for that future.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] mb-10" style={{ color: 'rgba(15,23,42,0.4)' }}>A Unified Architecture</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ARCHITECTURE.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                className="rounded-2xl p-6 border" style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 4px 24px rgba(15,23,42,0.05)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${a.color}18`, border: `1px solid ${a.color}33` }}>
                  <a.icon className="w-6 h-6" style={{ color: a.color }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>{a.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>{a.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="rounded-3xl p-10 sm:p-14 text-center border relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(37,99,235,0.06))', borderColor: 'rgba(212,175,55,0.3)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15), transparent 60%)' }} />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5" style={{ color: '#0f172a', fontFamily: 'Playfair Display, Georgia, serif' }}>
              Join the{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #d4af37, #b8860b)' }}>Wisdom Economy</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(15,23,42,0.65)' }}>
              Whether you are building a nation, an institution, a company or a personal dream — the future belongs to those who create opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {JOIN_ACTIONS.map((a, i) => (
                <button key={a}
                  className={i === 0 ? 'px-6 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105 flex items-center gap-2' : 'px-6 py-3 rounded-lg font-semibold border transition-colors hover:bg-amber-50'}
                  style={i === 0 ? { background: 'linear-gradient(135deg, #f5d77a, #d4af37)', boxShadow: '0 6px 30px rgba(212,175,55,0.35)' } : { borderColor: 'rgba(212,175,55,0.4)', color: '#b8860b' }}>
                  {a} {i === 0 && <ArrowRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function WisdomFooter() {
  return (
    <footer className="relative py-12 border-t" style={{ background: '#f8fafc', borderColor: 'rgba(15,23,42,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #22d3ee, #a78bfa)' }}>
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wide" style={{ color: '#0f172a' }}>
                WISDOM<span style={{ color: '#0891b2' }}>NET</span>
              </span>
              <p className="text-xs" style={{ color: 'rgba(15,23,42,0.5)' }}>Building the Wisdom Economy</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm" style={{ color: 'rgba(15,23,42,0.6)' }}>
            {['#wisdom-economy', '#excellence', '#investraders', '#circles', '#recognition', '#join'].map((href, i) => (
              <a key={href} href={href} className="hover:text-cyan-600 transition-colors">
                {['Wisdom Economy', 'Excellence', 'Investraders', 'Circles', 'Recognition', 'Join'][i]}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t text-center" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(15,23,42,0.45)' }}>
            © {new Date().getFullYear()} Wisdom Net — Transforming Intelligence into Wisdom. Transforming Opportunities into Prosperity.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT PAGE EXPORT
───────────────────────────────────────────── */
export default function WisdomNetSite() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#ffffff' }}>
      <WisdomNavbar />
      <WisdomHero />
      <HumanMachineCoexistence />
      <WisdomEconomy />
      <VisionMission />
      <AreasOfExcellence />
      <InvestradersFlagship />
      <PowerOfCircles />
      <WisdomEcosystems />
      <ArtificialWisdom />
      <InternationalRecognition />
      <JoinWisdom />
      <WisdomFooter />
    </div>
  );
}