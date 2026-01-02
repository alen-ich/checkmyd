import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Star, Heart, Image as ImageIcon, Sparkles } from 'lucide-react';

type RatingStyle = 'constructive' | 'aesthetic' | 'emotional-impact' | 'brief-direct' | 'custom';

interface RatingStyleOption {
  id: RatingStyle;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const RaterProfile: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [bio, setBio] = useState<string>(
    'Experienced rater with a keen eye for detail. I provide honest, constructive feedback to help you get the best out of your photos. Specializing in direct and...'
  );
  const [ratingStyle, setRatingStyle] = useState<RatingStyle>('constructive');
  const [customRatingStyle, setCustomRatingStyle] = useState<string>('');
  const [customRatingDescription, setCustomRatingDescription] = useState<string>('');
  const [price, setPrice] = useState<number[]>([5.0]);
  const [payoutBalance] = useState<number>(125.75);

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

  const handlePriceChange = (value: number[]) => {
    setPrice(value);
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
      const clampedValue = Math.max(1, Math.min(20, inputValue));
      setPrice([clampedValue]);
    } else if (e.target.value === '') {
      // Allow empty input for better UX
      setPrice([1]);
    }
  };

  const handlePriceInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (isNaN(inputValue) || inputValue < 1) {
      setPrice([1]);
    } else if (inputValue > 20) {
      setPrice([20]);
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', {
      avatar,
      avatarFile,
      bio,
      ratingStyle,
      customRatingStyle: ratingStyle === 'custom' ? customRatingStyle : undefined,
      customRatingDescription: ratingStyle === 'custom' ? customRatingDescription : undefined,
      price: price[0],
      payoutBalance,
    });
    // Handle save logic here
    // You can upload avatarFile to your server here
  };

  const ratingStyleOptions: (RatingStyleOption | { id: 'custom'; title: string; description: string; icon: React.ReactNode })[] = [
    {
      id: 'constructive',
      title: 'Constructive',
      description: 'Focus on detailed, actionable advice for',
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      id: 'aesthetic',
      title: 'Aesthetic',
      description: 'Evaluate visual appeal, composition, and',
      icon: <Star className="h-6 w-6" />,
    },
    {
      id: 'emotional-impact',
      title: 'Emotional Impact',
      description: 'Assess the feelings and reactions evoked',
      icon: <Heart className="h-6 w-6" />,
    },
    {
      id: 'brief-direct',
      title: 'Brief & Direct',
      description: 'Quick, concise feedback with clear',
      icon: <ImageIcon className="h-6 w-6" />,
    },
    {
      id: 'custom',
      title: 'Custom',
      description: 'Create your own unique rating style',
      icon: <Sparkles className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header title="Rater Profile Setup" showBack={true} />

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

          {/* Rating Style Section */}
          <div className="flex flex-col gap-3">
            <h2 className="text-white text-lg font-semibold m-0">Rating Style</h2>
            <div className="grid grid-cols-2 gap-3">
              {ratingStyleOptions.map((option) => {
                const isSelected = ratingStyle === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setRatingStyle(option.id)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'bg-[#8b5cf6] border-[#8b5cf6] text-white'
                        : 'bg-[#2a2a2a] border-white text-white hover:bg-[#3a3a3a]'
                    }`}
                  >
                    <div
                      className={`${
                        isSelected ? 'text-white' : 'text-[#8b5cf6]'
                      }`}
                    >
                      {option.icon}
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="text-base font-semibold m-0">{option.title}</h3>
                      <p className="text-xs text-center m-0 opacity-90">
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {ratingStyle === 'custom' && (
              <div className="flex flex-col gap-3 mt-2">
                <Input
                  type="text"
                  value={customRatingStyle}
                  onChange={(e) => setCustomRatingStyle(e.target.value)}
                  placeholder="Enter your custom rating style name..."
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
                />
                <Textarea
                  value={customRatingDescription}
                  onChange={(e) => setCustomRatingDescription(e.target.value)}
                  placeholder="Describe your custom rating style..."
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6] min-h-20 resize-none"
                />
              </div>
            )}
          </div>

          {/* Price per Photo Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-lg font-semibold m-0">Price per Photo</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="text-white text-3xl font-bold flex-1">
                  ${price[0].toFixed(2)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm">$</span>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    step={0.25}
                    value={price[0]}
                    onChange={handlePriceInputChange}
                    onBlur={handlePriceInputBlur}
                    className="w-24 bg-[#2a2a2a] border-[#3a3a3a] text-white text-center focus-visible:border-[#8b5cf6] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <div className="relative w-full">
                <Slider
                  value={price}
                  onValueChange={handlePriceChange}
                  min={1}
                  max={20}
                  step={0.25}
                  className="w-full [&_[data-slot=slider-track]]:bg-white/20 [&_[data-slot=slider-range]]:bg-[#8b5cf6] [&_[data-slot=slider-thumb]]:border-[#8b5cf6] [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:ring-[#8b5cf6]/50"
                />
              </div>
              <p className="text-white/60 text-sm m-0">
                Platform minimum: $1.00. Max: $20.00.
              </p>
            </div>
          </div>

          {/* Current Payout Balance Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-lg font-semibold m-0">Current Payout Balance</h2>
            <div className="flex flex-col gap-3">
              <div className="text-white text-3xl font-bold">
                ${payoutBalance.toFixed(2)}
              </div>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white/60 hover:bg-[#2a2a2a] hover:text-white"
                disabled
              >
                Withdraw Earnings
              </Button>
            </div>
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

export default RaterProfile;

