import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const SubmitterProfile: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [bio, setBio] = useState<string>(
    'I love sharing my photography and getting feedback to improve my skills. Always looking for constructive criticism and new perspectives on my work.'
  );

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);

    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setUploadError('Image size must be less than 5MB');
      return;
    }

    // Read and preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
      setAvatarFile(file);
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setAvatarFile(null);
    setUploadError(null);
    // Reset the file input
    const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', {
      avatar,
      avatarFile,
      bio,
    });
    // Handle save logic here
    // You can upload avatarFile to your server here
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header title="Profile Setup" showBack={true} />

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-6 flex flex-col gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-32 h-32 border-4 border-[#2a2a2a]">
              {avatar ? (
                <AvatarImage src={avatar} alt="Profile avatar" className="object-cover" />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-pink-200 to-purple-200 text-[#2a2a2a] text-4xl font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white hover:bg-[#3a3a3a] hover:text-white"
                  type="button"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  {avatar ? 'Change avatar' : 'Upload new avatar'}
                </Button>
              </label>
              {avatar && (
                <Button
                  variant="ghost"
                  onClick={handleRemoveAvatar}
                  className="text-white/60 hover:text-white text-sm"
                  type="button"
                >
                  Remove
                </Button>
              )}
              {uploadError && (
                <p className="text-red-400 text-sm m-0 text-center">{uploadError}</p>
              )}
              {avatarFile && !uploadError && (
                <p className="text-white/60 text-xs m-0 text-center">
                  {avatarFile.name} ({(avatarFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
          </div>

          {/* Your Bio Section */}
          <div className="flex flex-col gap-3">
            <h2 className="text-white text-lg font-semibold m-0">Your Bio</h2>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6] min-h-32 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Save Changes Button */}
          <Button
            onClick={handleSaveChanges}
            className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full h-12 text-base font-semibold"
          >
            Save Changes
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitterProfile;

