import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, TrendingUp, GraduationCap, Briefcase } from 'lucide-react';

const sectors = [
  {
    icon: Landmark,
    title: 'Chambers of Commerce',
    subtitle: 'The Future of Chamber Management',
    description: 'Transform your membership directory into a living business ecosystem. Your members need Visibility, Connectivity, Engagement, and Business Opportunities.',
    result: 'Stronger Businesses. Stronger Chambers. Stronger Economies.',
    accent: '#22d3ee',
    bg: 'rgba(6,182,212,0.05)',
    border: 'rgba(6,182,212,0.2)',
    iconBg: 'rgba(6,182,212,0.15)',
  },
  {
    icon: TrendingUp,
    title: 'Stock Exchanges',
    subtitle: 'Beyond Listed Companies',
    description: 'Create Investor Circles, Listed Company Circles, SME Growth Circles, Innovation Circles, and Entrepreneur Networks.',
    result: 'The future of capital markets is community, trust, and connectivity.',
    accent: '#60a5fa',
    bg: 'rgba(59,130,246,0.05)',
    border: 'rgba(59,130,246,0.2)',
    iconBg: 'rgba(59,130,246,0.15)',
  },
  {
    icon: GraduationCap,
    title: 'Universities',
    subtitle: 'Transform Students into Innovators',
    description: 'Create Student, Alumni, Research, Innovation, and Entrepreneurship Circles. Connect students, researchers, mentors, investors, and alumni.',
    result: 'From learning to opportunity. From ideas to startups. From talent to impact.',
    accent: '#a78bfa',
    bg: 'rgba(139,92,246,0.05)',
    border: 'rgba(139,92,246,0.2)',
    iconBg: 'rgba(139,92,246,0.15)',
  },
  {
    icon: Briefcase,
    title: 'Companies',
    subtitle: 'Your Community Is Your Greatest Asset',
    description: 'Create your own company circle where customers, partners, suppliers, and followers interact directly with your brand.',
    result: "In today's economy, communities grow faster than advertising.",
    accent: '#fbbf24',
    bg: 'rgba(245,158,11,0.05)',
    border: 'rgba(245,158,11,0.2)',
    iconBg: 'rgba(245,158,11,0.15)',
  },
];

export default function SectorCardsSection() {
  return (
    <section id="businesses" className="relative py-24 sm:py-32" style={{ background: '#030712' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.03), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Built For Every Sector</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">From government institutions to private enterprises, Investrade adapts to your ecosystem.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {sectors.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border p-8 hover:scale-[1.01] transition-transform"
                style={{ background: s.bg, borderColor: s.border }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: s.iconBg }}>
                  <Icon className="w-6 h-6" style={{ color: s.accent }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{s.title}</h3>
                <p className="text-sm font-semibold mb-4" style={{ color: s.accent }}>{s.subtitle}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.description}</p>
                <p className="text-gray-300 text-sm font-medium italic">{s.result}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}