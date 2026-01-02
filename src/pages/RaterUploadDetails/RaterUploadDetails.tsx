import React, { useState } from 'react';
import { ArrowLeft, Star, Lightbulb, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

interface Badge {
  id: string;
  type: 'badge' | 'tip';
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Mock upload data for rater view - in real app, this would come from an API
const mockUploads: Record<string, {
  id: string;
  imageUrl: string;
  submitterName: string;
  status: 'pending' | 'rated';
  timeRemaining?: number;
  ratingScore?: number;
  feedbackText?: string;
  detailedFeedback?: string;
}> = {
  '1': {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
    submitterName: 'Sarah M.',
    status: 'pending',
    timeRemaining: 3600,
  },
  '2': {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    submitterName: 'Michael K.',
    status: 'pending',
    timeRemaining: 1800,
  },
  '3': {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop',
    submitterName: 'Emma L.',
    status: 'rated',
    ratingScore: 8.5,
    feedbackText: 'Excellent composition & style!',
    detailedFeedback: 'Your composition is very strong, but consider warmer lighting next time for a softer aesthetic. Overall, great potential!',
  },
};

const RaterUploadDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState<string>('');
  const [detailedFeedback, setDetailedFeedback] = useState<string>('');

  // Get upload data - in real app, fetch from API
  const upload = id ? mockUploads[id] : null;
  const isPending = upload?.status === 'pending';
  const isRated = upload?.status === 'rated';

  const badges: Badge[] = [
    {
      id: '1',
      type: 'badge',
      title: 'Composition Expert',
      description: 'Awarded for strong visual layouts and framing.',
      icon: <ImageIcon className="h-6 w-6" />,
    },
    {
      id: '2',
      type: 'tip',
      title: 'Lighting Insight',
      description: 'Tip provided: Experiment with warmer light sources.',
      icon: <Lightbulb className="h-6 w-6" />,
    },
  ];

  const handleSubmitRating = () => {
    if (!feedback.trim()) {
      alert('Please provide feedback before submitting.');
      return;
    }
    console.log('Submitting rating:', { id, rating, feedback, detailedFeedback });
    // Handle rating submission logic
    navigate('/rater-view');
  };

  const handleDecline = () => {
    if (confirm('Are you sure you want to decline this rating request?')) {
      console.log('Declining upload:', id);
      // Handle decline logic
      navigate('/rater-view');
    }
  };

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

  if (!upload) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
        <Header title="Upload Details" showBack={true} />
        <main className="flex-1 overflow-y-auto pt-20 pb-24 flex items-center justify-center">
          <p className="text-white/60">Upload not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      {/* Custom Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#2a2a2a] px-5 py-4 flex items-center gap-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-[#8b5cf6] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white text-xl font-semibold m-0 flex-1 text-center">
          {isRated ? 'Rating Submitted' : 'Rate Upload'}
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-6 flex flex-col gap-4">
          {isRated ? (
            <>
              {/* Rating Submitted Section */}
              <Card className="bg-green-500/20 border-green-500/50">
                <CardContent className="p-8 flex flex-col items-center gap-4">
                  <div className="bg-green-500/30 rounded-full p-4">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="text-green-400 text-3xl font-bold">Rating Submitted</div>
                  <p className="text-white/90 text-sm m-0">Thank you for your feedback!</p>
                </CardContent>
              </Card>

              {/* Submitted Rating Display */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Rating:</span>
                    <span className="text-[#8b5cf6] text-2xl font-bold">{upload.ratingScore}/10</span>
                  </div>
                  <div className="w-full h-px bg-[#3a3a3a]" />
                  <div className="flex flex-col gap-2">
                    <span className="text-white/80 text-sm">Feedback:</span>
                    <p className="text-white text-base m-0">{upload.feedbackText}</p>
                  </div>
                  {upload.detailedFeedback && (
                    <>
                      <div className="w-full h-px bg-[#3a3a3a]" />
                      <div className="flex flex-col gap-2">
                        <span className="text-white/80 text-sm">Detailed Feedback:</span>
                        <p className="text-white text-sm m-0 leading-relaxed">{upload.detailedFeedback}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Back to Queue Button */}
              <Button
                onClick={() => navigate('/rater-view')}
                className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full h-12 text-base font-semibold"
              >
                Back to Queue
              </Button>
            </>
          ) : (
            <>
              {/* Image Display */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a] overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={upload.imageUrl}
                    alt={upload.alt || 'Upload to rate'}
                    className="w-full h-auto object-cover"
                  />
                </CardContent>
              </Card>

              {/* Time Remaining */}
              {upload.timeRemaining !== undefined && (
                <Card className="bg-[#8b5cf6] border-[#8b5cf6]">
                  <CardContent className="p-4 flex items-center justify-center gap-2">
                    <Clock className="h-5 w-5 text-white" />
                    <span className="text-white font-semibold">
                      Time remaining: {formatTime(upload.timeRemaining)}
                    </span>
                  </CardContent>
                </Card>
              )}

              {/* Submitter Info */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-4">
                  <p className="text-white/80 text-sm m-0">
                    Submitter: <span className="text-white font-medium">{upload.submitterName}</span>
                  </p>
                </CardContent>
              </Card>

              {/* Rating Slider */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white text-lg font-semibold m-0">Rating</h2>
                    <span className="text-[#8b5cf6] text-2xl font-bold">{rating}/10</span>
                  </div>
                  <Slider
                    value={[rating]}
                    onValueChange={(value) => setRating(value[0])}
                    min={0}
                    max={10}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-white/60 text-xs">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Feedback */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-6 flex flex-col gap-4">
                  <h2 className="text-white text-lg font-semibold m-0">Quick Feedback</h2>
                  <Textarea
                    placeholder="Enter your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-white placeholder:text-white/40 min-h-[100px]"
                  />
                </CardContent>
              </Card>

              {/* Detailed Feedback (Optional) */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-6 flex flex-col gap-4">
                  <h2 className="text-white text-lg font-semibold m-0">Detailed Feedback (Optional)</h2>
                  <Textarea
                    placeholder="Provide more detailed feedback if needed..."
                    value={detailedFeedback}
                    onChange={(e) => setDetailedFeedback(e.target.value)}
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-white placeholder:text-white/40 min-h-[120px]"
                  />
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleSubmitRating}
                  className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full h-12 text-base font-semibold"
                >
                  Submit Rating
                </Button>
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/20 w-full h-12 text-base font-semibold"
                >
                  Decline
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RaterUploadDetails;

