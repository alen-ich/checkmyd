import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const ProfileSettings: React.FC = () => {
  const [currentEmail, setCurrentEmail] = useState('user@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = () => {
    setEmailError(null);

    if (!newEmail) {
      setEmailError('Please enter a new email address');
      return;
    }

    if (!validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (newEmail === currentEmail) {
      setEmailError('New email must be different from current email');
      return;
    }

    console.log('Changing email:', { currentEmail, newEmail });
    // Handle email change logic here
    setCurrentEmail(newEmail);
    setNewEmail('');
    // Show success message
  };

  const handleChangePassword = () => {
    setPasswordError(null);

    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }

    if (!newPassword) {
      setPasswordError('Please enter a new password');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    console.log('Changing password');
    // Handle password change logic here
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    // Show success message
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header title="Account Settings" showBack={true} />

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-6 max-w-[600px] w-full mx-auto flex flex-col gap-6">
          {/* Change Email Section */}
          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-6 flex flex-col gap-4">
              <h2 className="text-white text-lg font-semibold m-0">Change Email</h2>
              
              {/* Current Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="current-email" className="text-white/80 text-sm font-medium">
                  Current Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input
                    id="current-email"
                    type="email"
                    value={currentEmail}
                    disabled
                    className="pl-10 bg-[#1a1a1a] border-[#3a3a3a] text-white/60 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* New Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="new-email" className="text-white/80 text-sm font-medium">
                  New Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input
                    id="new-email"
                    type="email"
                    placeholder="new@email.com"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      setEmailError(null);
                    }}
                    className="pl-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                  />
                </div>
                {emailError && (
                  <p className="text-red-400 text-xs m-0">{emailError}</p>
                )}
              </div>

              <Button
                onClick={handleChangeEmail}
                className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full"
              >
                Update Email
              </Button>
            </CardContent>
          </Card>

          {/* Change Password Section */}
          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-6 flex flex-col gap-4">
              <h2 className="text-white text-lg font-semibold m-0">Change Password</h2>
              
              {/* Current Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="current-password" className="text-white/80 text-sm font-medium">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setPasswordError(null);
                    }}
                    className="pl-10 pr-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="new-password" className="text-white/80 text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError(null);
                    }}
                    className="pl-10 pr-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="confirm-password" className="text-white/80 text-sm font-medium">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError(null);
                    }}
                    className="pl-10 pr-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
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

              <Button
                onClick={handleChangePassword}
                className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full"
              >
                Update Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileSettings;

