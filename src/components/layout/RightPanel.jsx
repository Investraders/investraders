import React from 'react';
import { MessageCircle, ArrowRight, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_MESSAGES = [
  { name: 'Amir Mohamad', msg: 'How are you doing?', unread: 0 },
  { name: 'Reshma Siddiqui', msg: "That's really good. 👍", unread: 0 },
  { name: 'Mohamad Irfan', msg: 'Hi, Are you available?', unread: 2 },
  { name: 'Sarah Johnson', msg: 'Check out this stock!', unread: 0 },
];

const MOCK_SUGGESTIONS = [
  { name: 'Alwaleed bin Talal', mutual: 3 },
  { name: 'Amir Mohammed', mutual: 5 },
  { name: 'Rubeena Khureshi', mutual: 2 },
  { name: 'Sarah Johnson', mutual: 4 },
];

export default function RightPanel() {
  return (
    <aside className="hidden xl:block w-72 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-6">
      {/* Messages */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Messages</h3>
        </div>
        <div className="space-y-2">
          {MOCK_MESSAGES.map((m, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {m.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{m.name}</p>
                <p className="text-xs text-muted-foreground truncate">{m.msg}</p>
              </div>
              {m.unread > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {m.unread}
                </span>
              )}
              <MessageCircle className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1 mt-2 text-sm text-primary hover:underline font-medium">
          View all friends <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Suggested Friends */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Suggested Friends</h3>
        <div className="space-y-2">
          {MOCK_SUGGESTIONS.map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {s.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.mutual} Mutual Friends</p>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="h-7 text-xs rounded-full px-2">
                  Ignore
                </Button>
                <Button size="sm" className="h-7 text-xs rounded-full px-2 bg-primary text-primary-foreground">
                  <UserPlus className="w-3 h-3 mr-1" /> Add
                </Button>
              </div>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1 mt-2 text-sm text-primary hover:underline font-medium">
          View all suggestions <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}