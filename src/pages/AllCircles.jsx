import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Search, Users, ArrowRight } from 'lucide-react';
import CircleIcon from '@/components/circles/CircleIcon';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const CATEGORY_COLORS = {
  investing: 'bg-green-100 text-green-700',
  crypto: 'bg-orange-100 text-orange-700',
  stocks: 'bg-blue-100 text-blue-700',
  real_estate: 'bg-purple-100 text-purple-700',
  business: 'bg-yellow-100 text-yellow-700',
  personal_finance: 'bg-cyan-100 text-cyan-700',
  general: 'bg-gray-100 text-gray-700',
};

export default function AllCircles() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const { data: circles = [], isLoading } = useQuery({
    queryKey: ['all-circles-browse'],
    queryFn: () => base44.entities.Circle.list('-created_date', 100),
  });

  const filtered = circles
    .filter((c) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        c.name?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q) ||
        (c.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    })
    // Sort by most popular (member count desc)
    .sort((a, b) => (b.member_ids?.length || 0) - (a.member_ids?.length || 0));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Circles</h1>
        <Link to="/create-circle">
          <button className="h-9 px-4 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
            + New Circle
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search circles by name, category, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 rounded-xl"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-1">No circles found</h3>
          <p className="text-muted-foreground text-sm">Try a different keyword</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((circle, i) => (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/circle/${circle.id}`}
                className="block bg-card rounded-2xl border shadow-sm p-5 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <CircleIcon category={circle.category} size="xl" />
                    <span className="absolute -bottom-1 -right-1 flex items-center gap-0.5 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                      <Users className="w-2.5 h-2.5" />{circle.member_ids?.length || 0}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                      {circle.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {circle.description || 'No description'}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={CATEGORY_COLORS[circle.category] || CATEGORY_COLORS.general}>
                        {circle.category?.replace(/_/g, ' ') || 'General'}
                      </Badge>
                      {(circle.member_ids?.length || 0) > 0 && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" /> {circle.member_ids.length} members
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}