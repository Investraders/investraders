import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, MapPin, Layers } from 'lucide-react';
import { formatNumber } from '@/lib/investment';

const FALLBACK_COLORS = ['#0891b2', '#2563eb', '#7c3aed', '#db2777', '#ca8a04', '#16a34a', '#dc2626', '#0f766e', '#9333ea', '#65a30d', '#475569', '#a16207'];

export default function InvestmentDashboard({ governorates = [], sectors = [], projects = [] }) {
  const govData = useMemo(() => {
    const counts = {};
    projects.forEach((p) => {
      counts[p.governorate_id] = (counts[p.governorate_id] || 0) + 1;
    });
    return governorates
      .map((g) => ({ name: g.name, value: counts[g.id] || 0 }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [governorates, projects]);

  const sectorData = useMemo(() => {
    const counts = {};
    projects.forEach((p) => {
      counts[p.sector_id] = (counts[p.sector_id] || 0) + 1;
    });
    return sectors
      .map((s, i) => ({ name: s.name, value: counts[s.id] || 0, color: s.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length] }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [sectors, projects]);

  const govHeight = Math.max(240, govData.length * 30);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Investment Dashboard</h2>
        <span className="text-sm font-normal text-muted-foreground">· {formatNumber(projects.length)} projects in view</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Projects by governorate */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Active projects by governorate</h3>
          </div>
          <div className="p-4">
            {govData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">No projects match the current filters.</p>
            ) : (
              <ResponsiveContainer width="100%" height={govHeight}>
                <BarChart data={govData} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={96} tick={{ fontSize: 11 }} interval={0} />
                  <Tooltip
                    cursor={{ fill: 'rgba(8,145,178,0.06)' }}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                    formatter={(v) => [`${v} projects`, '']}
                  />
                  <Bar dataKey="value" fill="#0891b2" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Projects by sector */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Project distribution by sector</h3>
          </div>
          <div className="p-4">
            {sectorData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">No projects match the current filters.</p>
            ) : (
              <ResponsiveContainer width="100%" height={govHeight}>
                <PieChart>
                  <Pie
                    data={sectorData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {sectorData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                    formatter={(v) => [`${v} projects`, '']}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}