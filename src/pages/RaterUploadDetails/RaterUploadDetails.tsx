import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

interface UploadData {
  id: string;
  imageUrl: string;
  name: string;
  timeRemaining: number;
}

// Mock upload data - in real app, this would come from an API
const mockUploads: Record<string, UploadData> = {
  '1': {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop',
    name: 'Sarah M.',
    timeRemaining: 3600,
  },
  '2': {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    name: 'Michael K.',
    timeRemaining: 1800,
  },
  '3': {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop',
    name: 'Emma L.',
    timeRemaining: 2700,
  },
  '4': {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop',
    name: 'David R.',
    timeRemaining: 900,
  },
  '5': {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    name: 'Jessica T.',
    timeRemaining: 5400,
  },
};

const RaterUploadDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState<number[]>([5]);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Get upload data - in real app, fetch from API
  const upload = id ? mockUploads[id] : null;

  const formatTime = (seconds: number): string => {
    if (seconds <= 0) return 'Expired';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const handleBack = () => {
    navigate('/rater-view');
  };

  const handleSubmit = async () => {
    if (rating[0] === 0) {
      alert('Please provide a rating before submitting.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Rating submitted:', {
        uploadId: id,
        rating: rating[0],
        feedback,
      });
      setIsSubmitting(false);
      // Navigate back to rater view after successful submission
      navigate('/rater-view');
    }, 1000);
  };

  if (!upload) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
        <Header title="Upload Details" showBack={true} />
        <main className="flex-1 overflow-y-auto pt-20 pb-24">
          <div className="px-5 py-4">
            <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
              <CardContent className="p-6">
                <p className="text-white text-center m-0">Upload not found</p>
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
      <Header title="Rate Upload" showBack={true} />

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-4 flex flex-col gap-6">
          {/* Upload Info */}
          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-lg font-semibold m-0">
                  {upload.name}
                </h2>
                <div className="flex items-center gap-1.5 text-white/70">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{formatTime(upload.timeRemaining)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Display */}
          <Card className="bg-[#2a2a2a] border-[#3a3a3a] overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full aspect-[4/3] bg-[#3a3a3a]">
                <img
                  src={upload.imageUrl}
                  alt={`Photo from ${upload.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Rating Section */}
          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  Rating
                </h3>
                <p className="text-white/70 text-sm m-0 mb-4">
                  Rate this photo from 0 to 10
                </p>
                <div className="flex flex-col gap-2">
                  <div className="relative [&_[data-slot=slider-track]]:bg-[#3a3a3a] [&_[data-slot=slider-range]]:bg-[#8b5cf6] [&_[data-slot=slider-thumb]]:border-[#8b5cf6] [&_[data-slot=slider-thumb]]:bg-white">
                    <Slider
                      value={rating}
                      onValueChange={setRating}
                      min={0}
                      max={10}
                      step={0.5}
                      className="flex-1"
                    />
                  </div>
                  {/* Tick marks - aligned with slider thumb positions */}
                  <div className="relative h-4 w-full">
                    {Array.from({ length: 11 }, (_, i) => {
                      // Radix slider positions thumb center accounting for thumb size (16px)
                      // Thumb can move from 8px to (width - 8px)
                      // Position = 8px + (i/10) * (100% - 16px)
                      const thumbRadius = 8;
                      const percentage = i / 10;
                      
                      return (
                        <div 
                          key={i} 
                          className="absolute flex flex-col items-center"
                          style={{ 
                            left: `calc(${thumbRadius}px + ${percentage} * (100% - ${thumbRadius * 2}px))`,
                            transform: 'translateX(-50%)'
                          }}
                        >
                          <div className="w-px h-2 bg-white/30"></div>
                          {i % 2 === 0 && (
                            <span className="text-white/50 text-xs mt-1">{i}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  Feedback
                </h3>
                <p className="text-white/70 text-sm m-0 mb-4">
                  Provide detailed feedback (optional)
                </p>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts on composition, lighting, style, and any suggestions for improvement..."
                  className="bg-[#1a1a1a] border-[#3a3a3a] text-white placeholder:text-white/40 min-h-32 resize-none"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || rating[0] === 0}
              className="w-full bg-[#8b5cf6] text-white hover:bg-[#7c3aed] h-12 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full border-[#3a3a3a] text-gray-400 hover:bg-[#3a3a3a] hover:text-white h-12 text-base font-semibold"
            >
              Cancel
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RaterUploadDetails;

