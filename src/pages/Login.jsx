import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-100px] right-[-50px] w-[300px] h-[300px] rounded-full bg-white/10" />
      <div className="absolute bottom-[-80px] left-[-60px] w-[250px] h-[250px] rounded-full bg-white/10" />
      <div className="absolute top-[20%] right-[15%] w-[80px] h-[80px] rounded-full bg-white/10" />

      <div className="w-full max-w-[960px] bg-white rounded-2xl shadow-2xl overflow-hidden flex min-h-[560px] relative z-10">
        {/* Left - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Sign In</h1>
          <p className="text-primary mb-8">
            To get access to your account<br />
            <span className="text-foreground font-medium">just continue with sign in</span>
          </p>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email Address</label>
              <Input
                type="email"
                placeholder="Enter Registered Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-border"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">Remember Me</label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot Password?</Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-semibold text-base shadow-lg"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>

        {/* Right - Branding */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute top-[-40px] right-[-40px] w-[150px] h-[150px] rounded-full bg-blue-200/30" />
          <div className="absolute bottom-[20%] left-[-20px] w-[100px] h-[100px] rounded-full bg-cyan-200/30" />

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-700">Investraders</span>
          </div>
          <p className="text-blue-500 font-medium mb-12">Trade Smarter Together</p>

          <h2 className="text-5xl font-bold text-foreground mb-4">Hello!</h2>
          <p className="text-muted-foreground text-center mb-8">
            You're just one step away to<br />join Investraders
          </p>

          <Link
            to="/register"
            className="flex items-center gap-2 px-8 py-3 border-2 border-blue-400 rounded-full text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
          >
            Join <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 text-white/80 text-sm">
        <span className="hover:text-white cursor-pointer">About us</span>
        <span className="hover:text-white cursor-pointer">Contact us</span>
        <span className="hover:text-white cursor-pointer">Support</span>
      </div>
    </div>
  );
}