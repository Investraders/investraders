import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const STORY_USERS = [
  { name: 'Moham...', color: 'from-orange-400 to-pink-500' },
  { name: 'Amir Mo...', color: 'from-blue-400 to-purple-500' },
  { name: 'Reshma..', color: 'from-green-400 to-teal-500' },
  { name: 'Alwalee...', color: 'from-yellow-400 to-red-500' },
  { name: 'Sarah...', color: 'from-pink-400 to-rose-500' },
];

export default function StoryBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground mb-3">Watch stories before they disappear</p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {/* My Profile */}
        <Link to="/profile" className="flex flex-col items-center gap-1 cursor-pointer shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-blue-400 overflow-hidden">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'user'}`}
              alt="My Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">My Profile</span>
        </Link>

        {/* Create Story */}
        <div className="flex flex-col items-center gap-1 cursor-pointer shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary flex items-center justify-center bg-primary/5">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xs text-primary font-medium">Create Story</span>
        </div>

        {STORY_USERS.map((user, i) => (
          <div key={i} className="flex flex-col items-center gap-1 cursor-pointer shrink-0">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${user.color} p-0.5`}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <div className={`w-[90%] h-[90%] rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}