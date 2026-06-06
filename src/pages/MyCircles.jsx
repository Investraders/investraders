import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Users, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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

export default function MyCircles() {
  const { data: circles = [], isLoading } = useQuery({
    queryKey: ['all-circles'],
    queryFn: () => base44.entities.Circle.list('-created_date', 50),
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">My Circles</h1>
        </div>
        <Link to="/create-circle">
          <Button className="rounded-full bg-primary gap-2">
            <Plus className="w-4 h-4" /> New Circle
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      ) : circles.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No circles yet</h3>
          <p className="text-muted-foreground mb-4">Create your first circle and invite friends to discuss!</p>
          <Link to="/create-circle">
            <Button className="rounded-full bg-primary">Create Circle</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {circles.map((circle, i) => (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/circle/${circle.id}`}
                className="block bg-card rounded-2xl border shadow-sm p-5 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {circle.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                      {circle.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {circle.description || 'No description'}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className={CATEGORY_COLORS[circle.category] || CATEGORY_COLORS.general}>
                        {circle.category?.replace(/_/g, ' ') || 'General'}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" /> {circle.member_ids?.length || 0} members
                      </span>
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