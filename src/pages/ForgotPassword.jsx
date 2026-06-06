import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.auth.resetPasswordRequest(email);
    } catch (err) {
      // always show success
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-100px] right-[-50px] w-[300px] h-[300px] rounded-full bg-white/10" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-blue-700">Investraders</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
        <p className="text-muted-foreground mb-6">Enter your email and we'll send you a reset link.</p>

        {sent ? (
          <div className="text-center">
            <p className="text-green-600 mb-4">If an account exists with that email, a reset link has been sent.</p>
            <Link to="/login" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
            <Link to="/login" className="text-sm text-primary hover:underline block text-center">Back to Sign In</Link>
          </form>
        )}
      </div>
    </div>
  );
}