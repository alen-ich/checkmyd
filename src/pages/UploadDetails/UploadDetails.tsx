import React, { useState } from 'react';
import { ArrowLeft, Share2, Copy, Star, Lightbulb, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Badge {
  id: string;
  type: 'badge' | 'tip';
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Mock upload data - in real app, this would come from an API
const mockUploads: Record<string, any> = {
  '1': {
    id: '1',
    status: 'rated',
    ratingScore: 8.5,
    feedbackText: 'Excellent composition & style!',
    detailedFeedback:
      'Your composition is very strong, but consider warmer lighting next time for a softer aesthetic. Overall, great potential!',
    raterName: 'Anonymous Rater XOX',
  },
  '3': {
    id: '3',
    status: 'pending',
    price: 10.0,
    platformCommission: 2.0,
    total: 8.0,
  },
  '6': {
    id: '6',
    status: 'pending',
    price: 10.0,
    platformCommission: 2.0,
    total: 8.0,
  },
};

const UploadDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [raterRating, setRaterRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(false);

  // Get upload data - in real app, fetch from API
  const upload = id ? mockUploads[id] : null;
  const isPending = upload?.status === 'pending';

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

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this upload? You will receive a full refund.')) {
      console.log('Canceling upload:', id);
      // Handle cancellation logic
      navigate('/view-uploads');
    }
  };

  const handleViewHistory = () => {
    navigate('/view-uploads');
  };

  const handleShare = () => {
    if (!upload || isPending) return;
    if (navigator.share) {
      navigator.share({
        title: 'Rating Result',
        text: `I got a ${upload.ratingScore}/10 rating! ${upload.feedbackText}`,
      }).catch(() => {
        // Fallback: copy to clipboard
        handleCopy();
      });
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    if (!upload || isPending) return;
    const text = `Rating: ${upload.ratingScore}/10\n${upload.feedbackText}\n\n${upload.detailedFeedback}\n- ${upload.raterName}`;
    navigator.clipboard.writeText(text).then(() => {
      // Could show a toast notification here
      console.log('Copied to clipboard');
    });
  };

  const handleStarClick = (rating: number) => {
    setRaterRating(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
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
          {isPending ? 'Upload Confirmation' : 'Rating Result'}
        </h1>
        {!isPending && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="text-white hover:text-[#8b5cf6] transition-colors"
              aria-label="Share"
            >
              <Share2 className="h-6 w-6" />
            </button>
            <button
              onClick={handleCopy}
              className="text-white hover:text-[#8b5cf6] transition-colors"
              aria-label="Copy"
            >
              <Copy className="h-6 w-6" />
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-6 flex flex-col gap-4">
          {isPending ? (
            <>
              {/* Pending Status Section */}
              <Card className="bg-[#8b5cf6] border-[#8b5cf6]">
                <CardContent className="p-8 flex flex-col items-center gap-4">
                  <div className="text-white text-5xl font-bold">PENDING</div>
                  <p className="text-white/90 text-sm m-0">Est. wait 1-24 hrs</p>
                </CardContent>
              </Card>

              {/* Transaction Summary */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-6 flex flex-col gap-4">
                  <h2 className="text-white text-lg font-semibold m-0">Transaction Summary</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Price:</span>
                      <span className="text-white text-sm">${upload.price?.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Platform Commission:</span>
                      <span className="text-red-400 text-sm">-${upload.platformCommission?.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-[#3a3a3a] pt-3 flex items-center justify-between">
                      <span className="text-white font-semibold text-base">Total:</span>
                      <span className="text-[#8b5cf6] font-semibold text-base">
                        ${upload.total?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Get Notified Section */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-6 flex flex-col gap-4">
                  <h2 className="text-white text-lg font-semibold m-0">Get Notified</h2>
                  <div className="flex flex-col gap-4">
                    {/* Push Notifications */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-white text-sm font-medium">Push Notifications</span>
                        <span className="text-white/60 text-xs">
                          Notify when rating is complete.
                        </span>
                      </div>
                      <Switch
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-white text-sm font-medium">Email Notifications</span>
                        <span className="text-white/60 text-xs">Receive email updates.</span>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cancel Button */}
              <Button
                onClick={handleCancel}
                className="bg-red-500 text-white hover:bg-red-600 w-full h-12 text-base font-semibold"
              >
                Cancel before rating
              </Button>

              {/* Refund Info */}
              <p className="text-white/60 text-xs m-0 text-center">
                Full refund issued if canceled before rating begins.
              </p>

              {/* View History Link */}
              <button
                onClick={handleViewHistory}
                className="text-[#8b5cf6] text-sm font-medium hover:text-[#7c3aed] transition-colors"
              >
                View history
              </button>
            </>
          ) : (
            <>
              {/* Rating Score Section */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-6 flex flex-col items-center gap-4">
                  <div className="text-[#8b5cf6] text-6xl font-bold">{upload.ratingScore}</div>
                  <p className="text-white text-lg m-0 text-center">{upload.feedbackText}</p>
                  <div className="w-full h-px bg-[#3a3a3a] mt-2" />
                </CardContent>
              </Card>

              {/* Feedback Section */}
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-6 flex flex-col gap-3">
                  <p className="text-white text-base m-0 leading-relaxed">
                    &ldquo;{upload.detailedFeedback}&rdquo;
                  </p>
                  <p className="text-white/60 text-sm m-0 text-right">
                    - {upload.raterName}
                  </p>
                </CardContent>
              </Card>

          {/* Rate the Rater Section */}
          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-6 flex flex-col gap-4">
              <h2 className="text-white text-lg font-semibold m-0">Rate the Rater</h2>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= (hoveredStar || raterRating);
                  return (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                      className="focus:outline-none transition-colors"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          isFilled
                            ? 'fill-[#8b5cf6] text-[#8b5cf6]'
                            : 'fill-none text-white/30 stroke-2'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-white/60 text-sm m-0">Your feedback helps improve ratings.</p>
            </CardContent>
          </Card>

              {/* Tips & Badges Earned Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-white text-lg font-semibold m-0">Tips & Badges Earned</h2>
                <div className="flex flex-col gap-3">
                  {badges.map((badge) => (
                    <Card
                      key={badge.id}
                      className="bg-[#8b5cf6] border-[#8b5cf6]"
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="text-white shrink-0">{badge.icon}</div>
                        <div className="flex flex-col gap-1 flex-1">
                          <h3 className="text-white text-base font-semibold m-0">
                            {badge.title}
                          </h3>
                          <p className="text-white/90 text-sm m-0">{badge.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadDetails;

