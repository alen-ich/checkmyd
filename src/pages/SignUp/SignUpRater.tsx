import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const SignUpRater: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted', { email, password, agreedToTerms, agreedToGuidelines });
  };

  const isFormValid = agreedToTerms && agreedToGuidelines && email && password;

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
        <h1 className="text-white text-xl font-semibold m-0">Rater Signup</h1>
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
                placeholder="your.email@example.com"
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

          {/* Checkboxes */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked: boolean | "indeterminate") => setAgreedToTerms(checked === true)}
                className="border-white/50 data-[state=checked]:bg-[#8b5cf6] data-[state=checked]:border-[#8b5cf6] mt-0.5"
              />
              <label
                htmlFor="terms"
                className="text-white text-sm cursor-pointer leading-relaxed"
              >
                I agree to the{' '}
                <a
                  href="#"
                  className="text-[#8b5cf6] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle terms link click
                    console.log('Rater Terms of Service clicked');
                  }}
                >
                  Rater Terms of Service
                </a>
                {' '}and{' '}
                <a
                  href="#"
                  className="text-[#8b5cf6] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle privacy policy link click
                    console.log('Privacy Policy clicked');
                  }}
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="guidelines"
                checked={agreedToGuidelines}
                onCheckedChange={(checked: boolean | "indeterminate") => setAgreedToGuidelines(checked === true)}
                className="border-white/50 data-[state=checked]:bg-[#8b5cf6] data-[state=checked]:border-[#8b5cf6] mt-0.5"
              />
              <label
                htmlFor="guidelines"
                className="text-white text-sm cursor-pointer leading-relaxed"
              >
                I understand and agree to follow the{' '}
                <a
                  href="#"
                  className="text-[#8b5cf6] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle content guidelines link click
                    console.log('Content Guidelines clicked');
                  }}
                >
                  Content Guidelines
                </a>
                {' '}for rating.
              </label>
            </div>
          </div>

          {/* Important Verification Info */}
          <div className="bg-[#2a2a2a] rounded-xl p-4 flex flex-col gap-3 border border-[#3a3a3a]">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[#8b5cf6] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-sm font-semibold m-0">
                  Important Verification Info
                </h3>
                <p className="text-white/80 text-sm leading-relaxed m-0">
                  To ensure content quality and compliance, all Raters must complete an ID verification process.
                  This includes uploading a clear photo of your government-issued ID (e.g., passport, driving license) and a live selfie.
                  Verifications are typically reviewed within 24-48 hours. You will be notified once approved.
                </p>
              </div>
            </div>
          </div>

          {/* Start Verification Button */}
          <Button
            type="submit"
            size="xl"
            className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full disabled:bg-[#3a3a3a] disabled:text-white/50 disabled:cursor-not-allowed"
            disabled={!isFormValid}
          >
            Start Verification
          </Button>
        </form>
      </main>
    </div>
  );
};

export default SignUpRater;

