import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, TrendingUp, LogOut, User, MessageCircle, Bookmark, Shield } from 'lucide-react';
import SearchBar from '@/components/layout/SearchBar';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationBell from '@/components/layout/NotificationBell';

export default function Navbar({ user }) {
  const displayName = user?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();

  const { data: userProfile } = useQuery({
    queryKey: ['my-profile', user?.id],
    queryFn: () => base44.entities.User.filter({ id: user?.id }),
    enabled: !!user?.id,
    select: (data) => data?.[0],
  });
  const avatarUrl = userProfile?.avatar_url || null;

  return (
    <nav className="bg-blue-600 px-4 md:px-6 h-16 flex items-center justify-between shrink-0">
      <Link to="/" className="flex items-center gap-2 shrink-0">
        {/* Logo: stylized "i" inside light blue circle */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'radial-gradient(circle at 38% 38%, #a8dff7, #3ab5e8 60%, #1a8cc7)' }}>
          <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Tall rounded-bottom stem */}
            <path d="M8 8 Q8 22 11 24 Q14 26 14 22 L14 8 Z" fill="url(#stemGrad)" rx="3"/>
            <defs>
              <linearGradient id="stemGrad" x1="8" y1="8" x2="14" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e8f8ff"/>
                <stop offset="50%" stopColor="#7dd4f5"/>
                <stop offset="100%" stopColor="#2196c8"/>
              </linearGradient>
            </defs>
            {/* Main stem */}
            <rect x="8.5" y="8" width="5" height="15" rx="2.5" fill="url(#stemGrad2)"/>
            <defs>
              <linearGradient id="stemGrad2" x1="8.5" y1="8" x2="13.5" y2="23" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#d0f0ff"/>
                <stop offset="40%" stopColor="#6fcbf0"/>
                <stop offset="100%" stopColor="#1e7fb5"/>
              </linearGradient>
            </defs>
            {/* Large bubble (dot) */}
            <circle cx="13" cy="4" r="3.2" fill="url(#b1)"/>
            <defs>
              <radialGradient id="b1" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#e8f8ff"/>
                <stop offset="100%" stopColor="#4abde8"/>
              </radialGradient>
            </defs>
            {/* Small bubble */}
            <circle cx="17.5" cy="2" r="1.8" fill="url(#b2)" opacity="0.9"/>
            <defs>
              <radialGradient id="b2" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#e8f8ff"/>
                <stop offset="100%" stopColor="#4abde8"/>
              </radialGradient>
            </defs>
            {/* Tiny bubble */}
            <circle cx="19.5" cy="4.5" r="1.1" fill="url(#b3)" opacity="0.8"/>
            <defs>
              <radialGradient id="b3" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#e8f8ff"/>
                <stop offset="100%" stopColor="#4abde8"/>
              </radialGradient>
            </defs>
          </svg>
        </div>
        <span className="text-xl font-bold text-white hidden sm:block">Investraders</span>
      </Link>

      <div className="flex-1 max-w-md mx-4">
        <SearchBar />
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
          <LayoutGrid className="w-4 h-4 text-white" />
        </button>
        <Link
          to="/messages"
          className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-white" />
        </Link>
        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 ml-2">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-sm">
                  {initials}
                </div>
              )}
              <span className="text-sm font-medium hidden md:block text-white">{displayName}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/profile"><User className="w-4 h-4 mr-2" /> My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/saved"><Bookmark className="w-4 h-4 mr-2" /> Saved Posts</Link>
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem asChild>
                <Link to="/admin"><Shield className="w-4 h-4 mr-2" /> Admin Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => base44.auth.logout()}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}