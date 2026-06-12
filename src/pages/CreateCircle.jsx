import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Users, ArrowLeft, Landmark } from 'lucide-react';
import CircleIcon, { CATEGORY_META } from '@/components/circles/CircleIcon';
import { Link } from 'react-router-dom';
import TagPicker from '@/components/circles/TagPicker';
import InviteFriendsModal from '@/components/circles/InviteFriendsModal';



export default function CreateCircle() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [privacy, setPrivacy] = useState('public');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inviteModal, setInviteModal] = useState({ open: false, circleId: null, circleName: '' });
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const user = await base44.auth.me();
    const circle = await base44.entities.Circle.create({
      name,
      description,
      category,
      privacy,
      tags,
      member_ids: [user.id],
    });
    setCurrentUser(user);
    setLoading(false);
    setInviteModal({ open: true, circleId: circle.id, circleName: circle.name });
  };

  return (
    <>
    <div className="max-w-xl mx-auto">
      <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-card rounded-2xl border shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Create Circle</h1>
            <p className="text-sm text-muted-foreground">Build a community around shared interests</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="mb-1.5 block">Circle Name</Label>
            <Input placeholder="e.g. Crypto Traders Hub" value={name} onChange={(e) => setName(e.target.value)} className="h-12" />
          </div>

          <div>
            <Label className="mb-1.5 block">Description</Label>
            <Textarea placeholder="What's this circle about?" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[100px]" />
          </div>

          <div>
            <Label className="mb-1.5 block">Category</Label>
            <div className="flex items-center gap-3">
              <CircleIcon category={category} size="lg" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12 flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_META).map(([value, { label, Icon }]) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {category === 'institutional' && (
            <div
              className="rounded-xl p-4 border border-amber-400/40"
              style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a8a)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Landmark className="w-4 h-4 text-amber-300" />
                <span className="text-amber-300 font-bold text-sm">Institutional Circle</span>
              </div>
              <p className="text-blue-200/80 text-xs leading-relaxed">
                Designed for chambers of commerce, stock exchanges, and financial institutions to convene members, clients, and stakeholders in a branded professional space.
              </p>
            </div>
          )}

          <div>
            <Label className="mb-1.5 block">Topics <span className="text-muted-foreground font-normal">(up to 5)</span></Label>
            <TagPicker selected={tags} onChange={setTags} />
          </div>

          <div>
            <Label className="mb-2 block">Privacy</Label>
            <RadioGroup value={privacy} onValueChange={setPrivacy} className="flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">Public</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private">Private</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" disabled={loading || !name.trim()} className="w-full h-12 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold text-base shadow-lg">
            {loading ? 'Creating...' : 'Create Circle'}
          </Button>
        </form>
      </div>
    </div>

    <InviteFriendsModal
      open={inviteModal.open}
      onClose={() => { setInviteModal({ open: false, circleId: null, circleName: '' }); navigate(`/circle/${inviteModal.circleId}`); }}
      circleId={inviteModal.circleId}
      circleName={inviteModal.circleName}
      currentUser={currentUser}
    />
    </>
  );
}