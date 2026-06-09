import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState('register'); // register | otp
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [userType, setUserType] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreed) { setError('Please agree to the Terms of Use and Privacy Policy'); return; }
    setLoading(true);
    setError('');
    try {
      await base44.auth.register({ email, password });
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await base44.auth.verifyOtp({ email, otpCode });
      base44.auth.setToken(res.access_token);
      if (userType || businessType) {
        await base44.auth.updateMe({ user_type: userType, business_type: businessType });
      }
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await base44.auth.resendOtp(email);
    } catch (err) {
      // silent
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-100px] right-[-50px] w-[300px] h-[300px] rounded-full bg-white/10" />
      <div className="absolute bottom-[-80px] left-[-60px] w-[250px] h-[250px] rounded-full bg-white/10" />

      <div className="w-full max-w-[960px] bg-white rounded-2xl shadow-2xl overflow-hidden flex min-h-[620px] relative z-10">
        {/* Left - Branding */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute top-[-40px] left-[-40px] w-[150px] h-[150px] rounded-full bg-blue-200/30" />

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-700">Investraders</span>
          </div>
          <p className="text-blue-500 font-medium mb-12">Trade Smarter Together</p>

          <h2 className="text-5xl font-bold text-foreground mb-4">Hello!</h2>
          <p className="text-muted-foreground text-center mb-8">
            To get access to your account<br />just continue with sign in
          </p>

          <Link
            to="/login"
            className="flex items-center gap-2 px-8 py-3 border-2 border-blue-400 rounded-full text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
          >
            Sign in <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {step === 'register' ? (
            <>
              <h1 className="text-3xl font-bold text-foreground mb-2">Create New Account</h1>
              <p className="text-primary mb-6">
                You're just one step away to<br />
                <span className="text-foreground font-medium">join Investraders</span>
              </p>

              {error && <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-4">{error}</div>}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
                  <Input placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Email Address</label>
                  <Input type="email" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Create Password</label>
                  <Input type="password" placeholder="Enter Password to Create" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12" />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">I am an...</label>
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full h-12 border border-input rounded-md px-3 bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select your role</option>
                    <option value="innovator">🚀 Innovator</option>
                    <option value="investor">💼 Investor</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Business type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full h-12 border border-input rounded-md px-3 bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select business type</option>
                    <option value="startup">Startup</option>
                    <option value="small_business">Small Business</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="freelancer">Freelancer / Solo</option>
                    <option value="venture_capital">Venture Capital</option>
                    <option value="angel_investor">Angel Investor</option>
                    <option value="fund_manager">Fund Manager</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} className="mt-0.5" />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    By Signing up, you agree to the <span className="text-primary">Terms of use</span> and <span className="text-primary">Privacy Policy</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-semibold text-base shadow-lg"
                >
                  {loading ? 'Creating...' : 'Submit'}
                </Button>
              </form>

              <p className="text-sm text-center mt-4 text-muted-foreground lg:hidden">
                Already have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-foreground mb-2">Verify Email</h1>
              <p className="text-muted-foreground mb-6">We've sent a verification code to {email}</p>

              {error && <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-4">{error}</div>}

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Verification Code</label>
                  <Input placeholder="Enter OTP Code" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="h-12" />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg">
                  {loading ? 'Verifying...' : 'Verify'}
                </Button>
                <button type="button" onClick={handleResendOtp} className="text-sm text-primary hover:underline w-full text-center">
                  Resend code
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 text-white/80 text-sm">
        <span className="hover:text-white cursor-pointer">About us</span>
        <span className="hover:text-white cursor-pointer">Contact us</span>
        <span className="hover:text-white cursor-pointer">Support</span>
      </div>
    </div>
  );
}