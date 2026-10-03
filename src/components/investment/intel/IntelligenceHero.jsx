import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Map, Search, Network, Globe, BarChart3, Bot } from 'lucide-react';
import AISemanticSearch from './AISemanticSearch';

const CAPS = [
  { icon: Bot, label: 'AI Matchmaking' },
  { icon: Map, label: 'Investment Map' },
  { icon: Globe, label: 'Global Network' },
  { icon: BarChart3, label: 'Market Intelligence' },
];

export default function IntelligenceHero({ orgs, projects, sectors }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl bg-[#071A2B] text-white p-6 sm:p-10 mb-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#1769FF]/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#16C7B7]/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#16C7B7] mb-3">
          <Network className="w-4 h-4" /> Investraders · Investment Intelligence Network
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-3 max-w-3xl">
          Connect Capital. Discover Opportunities. Grow Globally.
        </h1>
        <p className="text-white/70 max-w-2xl mb-6">
          AI-powered investment matchmaking connecting businesses, investors, institutions and markets across Tunisia, Africa, Europe and beyond.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <Link to="/investment-map" className="inline-flex items-center gap-2 rounded-xl bg-[#1769FF] hover:bg-[#1769FF]/90 px-5 py-3 text-sm font-semibold">
            <Map className="w-4 h-4" /> Explore Opportunities
          </Link>
          <a href="#directory" className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 text-sm font-semibold">
            <Search className="w-4 h-4" /> Find Investors
          </a>
        </div>

        <AISemanticSearch orgs={orgs} projects={projects} sectors={sectors} />

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-6 border-t border-white/10">
          {CAPS.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-sm text-white/80">
              <c.icon className="w-4 h-4 text-[#16C7B7]" /> {c.label}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}