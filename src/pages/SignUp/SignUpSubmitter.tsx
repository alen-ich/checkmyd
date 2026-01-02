import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const SignUpSubmitter: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [is18Plus, setIs18Plus] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted', { email, password, confirmPassword, nickname, is18Plus, agreedToTerms });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      {/* Header with back button */}
      <header className="bg-[#2a2a2a] px-5 py-4 flex items-center gap-4">
        <button
          onClick={handleBackClick}
          className="text-white hover:text-[#8b5cf6] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white text-xl font-semibold m-0">Submitter Signup</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-6 px-5 max-w-[600px] w-full mx-auto box-border">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white text-sm font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-white text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Nickname (Optional) */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nickname" className="text-white text-sm font-medium">
              Nickname (Optional)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                id="nickname"
                type="text"
                placeholder="e.g., PhotoFanatic"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="pl-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="age18"
                checked={is18Plus}
                onCheckedChange={(checked: boolean | "indeterminate") => setIs18Plus(checked === true)}
                className="border-white/50 data-[state=checked]:bg-[#8b5cf6] data-[state=checked]:border-[#8b5cf6]"
              />
              <label
                htmlFor="age18"
                className="text-white text-sm cursor-pointer"
              >
                I confirm that I am 18 years or older.
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked: boolean | "indeterminate") => setAgreedToTerms(checked === true)}
                className="border-white/50 data-[state=checked]:bg-[#8b5cf6] data-[state=checked]:border-[#8b5cf6]"
              />
              <label
                htmlFor="terms"
                className="text-white text-sm cursor-pointer"
              >
                I agree to the{' '}
                <a
                  href="#"
                  className="text-[#8b5cf6] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle terms link click
                  }}
                >
                  Terms of Service
                </a>
                .
              </label>
            </div>
          </div>

          {/* Create Account Button */}
          <Button
            type="submit"
            size="xl"
            className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full"
            disabled={!is18Plus || !agreedToTerms}
          >
            Create Account
          </Button>
        </form>
      </main>
    </div>
  );
};

export default SignUpSubmitter;

