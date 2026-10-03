import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { matchInvestorsToProject, matchProjectsToInvestor } from '@/lib/investmentNetwork';
import { ProjectMatches, InvestorMatches } from '@/components/investment/MatchResults';
import { Button } from '@/components/ui/button';

const ROLES = ['Investor', 'Company', 'Startup', 'Project Owner', 'Institution', 'Chamber', 'Government'];
const LOOKING = ['Investment', 'Partner', 'Distributor', 'Supplier', 'Market', 'Acquisition', 'Joint Venture'];
const chipCls = (on) => `text-sm px-3 py-1.5 rounded-full border transition-colors ${on ? 'border-[#1769FF] bg-[#1769FF]/10 text-[#1769FF]' : 'bg-card text-muted-foreground hover:text-foreground'}`;
const inputCls = 'w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769FF]/40';

export default function MatchmakingWizard({ orgs, projects, sectors, governorates }) {
  const [role, setRole] = useState('');
  const [looking, setLooking] = useState('');
  const [sectorName, setSectorName] = useState('');
  const [geo, setGeo] = useState('');
  const [ticket, setTicket] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const find = () => {
    setLoading(true);
    setTimeout(() => {
      const findInvestors = ['Investment', 'Acquisition'].includes(looking);
      let res;
      if (findInvestors) {
        const synthetic = {
          investment_required: ticket ? Number(ticket) : 10,
          investment_stage: 'READY_FOR_INVESTMENT',
          project_type: 'GREENFIELD',
          seeking: ['EQUITY_INVESTOR'],
        };
        res = { kind: 'investors', items: matchInvestorsToProject(orgs, synthetic, sectorName).slice(0, 6) };
      } else {
        const syntheticOrg = {
          investment_focus: sectorName ? [sectorName] : [],
          geographic_focus: geo ? [geo] : [],
          minimum_ticket: ticket ? Number(ticket) * 0.5 : null,
          maximum_ticket: ticket ? Number(ticket) : null,
          investment_stages: [],
          project_types: [],
        };
        res = { kind: 'projects', items: matchProjectsToInvestor(projects, syntheticOrg, sectors, governorates).slice(0, 6) };
      }
      setResults(res);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="rounded-2xl border bg-card p-5 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#1769FF]/10 flex items-center justify-center"><Bot className="w-4 h-4 text-[#1769FF]" /></div>
        <div>
          <h2 className="font-semibold leading-tight">Find Your Match</h2>
          <p className="text-xs text-muted-foreground">AI matchmaking across the network</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">I am</div>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => <button key={r} onClick={() => setRole(r)} className={chipCls(role === r)}>{r}</button>)}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">I am looking for</div>
          <div className="flex flex-wrap gap-2">
            {LOOKING.map((r) => <button key={r} onClick={() => setLooking(r)} className={chipCls(looking === r)}>{r}</button>)}
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium mb-1 block">Sector</label>
            <select className={inputCls} value={sectorName} onChange={(e) => setSectorName(e.target.value)}>
              <option value="">Any sector</option>
              {sectors.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">Geography</label>
            <input className={inputCls} value={geo} onChange={(e) => setGeo(e.target.value)} placeholder="Tunisia, Africa…" />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">Ticket (M)</label>
            <input type="number" className={inputCls} value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="5" />
          </div>
        </div>
        <Button onClick={find} disabled={loading || !looking} className="bg-[#1769FF] hover:bg-[#1769FF]/90">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />} AI Find Matches
        </Button>
      </div>

      <AnimatePresence>
        {results && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-5 pt-5 border-t">
            <div className="text-sm font-semibold mb-3">{results.items.length} potential matches</div>
            {results.kind === 'investors' ? <InvestorMatches results={results.items} /> : <ProjectMatches results={results.items} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}