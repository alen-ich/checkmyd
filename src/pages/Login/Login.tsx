import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    let isValid = true;

    if (!email) {
      setEmailError('Please enter your email address');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Please enter your password');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    console.log('Login attempt:', { email });
    // Handle login logic here
    // For now, navigate to dashboard on successful login
    navigate('/stats');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignUp = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <main className="flex-1 flex items-center justify-center overflow-y-auto py-6">
        <div className="px-5 w-full max-w-[600px] flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <h1 className="text-white text-2xl font-semibold m-0">CheckMyD</h1>
          </div>

          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-xl font-semibold m-0">
                  Welcome Back
                </h2>
                <p className="text-white/70 text-sm m-0">
                  Sign in to your account to continue
                </p>
              </div>

              {generalError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 text-sm m-0">{generalError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-white/80 text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(null);
                        setGeneralError(null);
                      }}
                      className="pl-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                      required
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-400 text-xs m-0">{emailError}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-white/80 text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(null);
                        setGeneralError(null);
                      }}
                      className="pl-10 pr-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-red-400 text-xs m-0">{passwordError}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[#8b5cf6] text-sm font-medium hover:text-[#7c3aed] transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full h-12 text-base font-semibold"
                >
                  Sign In
                </Button>
              </form>

              <div className="pt-4 border-t border-[#3a3a3a]">
                <p className="text-white/70 text-sm text-center m-0">
                  Don't have an account?{' '}
                  <button
                    onClick={handleSignUp}
                    className="text-[#8b5cf6] font-medium hover:text-[#7c3aed] transition-colors"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Login;

