import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    console.log('Password reset requested for:', email);
    // Handle password reset logic here
    setIsSubmitted(true);
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
        <Header title="Forgot Password" showBack={true} />

        <main className="flex-1 overflow-y-auto pt-20 pb-24">
          <div className="px-5 py-6 max-w-[600px] w-full mx-auto flex flex-col gap-6">
            <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
              <CardContent className="p-8 flex flex-col items-center gap-4 text-center">
                <div className="bg-green-500/20 rounded-full p-4">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h2 className="text-white text-xl font-semibold m-0">
                  Check Your Email
                </h2>
                <p className="text-white/80 text-sm m-0 leading-relaxed">
                  We've sent a password reset link to <span className="text-white font-medium">{email}</span>. 
                  Please check your inbox and follow the instructions to reset your password.
                </p>
                <p className="text-white/60 text-xs m-0">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="flex flex-col gap-3 w-full mt-4">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="bg-transparent border-[#3a3a3a] text-white hover:bg-[#3a3a3a] w-full"
                  >
                    Resend Email
                  </Button>
                  <Button
                    onClick={handleBackToLogin}
                    className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full"
                  >
                    Back to Login
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header title="Forgot Password" showBack={true} />

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-6 max-w-[600px] w-full mx-auto flex flex-col gap-6">
          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-xl font-semibold m-0">
                  Reset Your Password
                </h2>
                <p className="text-white/70 text-sm m-0">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

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
                      }}
                      className="pl-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                      required
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-400 text-xs m-0">{emailError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full h-12 text-base font-semibold"
                >
                  Send Reset Link
                </Button>
              </form>

              <div className="pt-4 border-t border-[#3a3a3a]">
                <button
                  onClick={handleBackToLogin}
                  className="text-[#8b5cf6] text-sm font-medium hover:text-[#7c3aed] transition-colors w-full text-center"
                >
                  Back to Login
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;

