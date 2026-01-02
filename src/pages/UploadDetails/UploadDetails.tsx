import React, { useState } from 'react';
import { ArrowLeft, Share2, Copy, Star, Lightbulb, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Badge {
  id: string;
  type: 'badge' | 'tip';
  title: string;
  description: string;
  icon: React.ReactNode;
}

const UploadDetails: React.FC = () => {
  const navigate = useNavigate();
  const [raterRating, setRaterRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  // Mock data - in real app, this would come from route params or API
  const ratingScore = 8.5;
  const feedbackText = 'Excellent composition & style!';
  const detailedFeedback =
    'Your composition is very strong, but consider warmer lighting next time for a softer aesthetic. Overall, great potential!';
  const raterName = 'Anonymous Rater XOX';

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rating Result',
        text: `I got a ${ratingScore}/10 rating! ${feedbackText}`,
      }).catch(() => {
        // Fallback: copy to clipboard
        handleCopy();
      });
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    const text = `Rating: ${ratingScore}/10\n${feedbackText}\n\n${detailedFeedback}\n- ${raterName}`;
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

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      {/* Custom Header with Share and Copy */}
      <header className="fixed top-0 left-0 right-0 bg-[#2a2a2a] px-5 py-4 flex items-center gap-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-[#8b5cf6] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white text-xl font-semibold m-0 flex-1 text-center">Rating Result</h1>
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
      </header>

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-6 flex flex-col gap-4">
          {/* Rating Score Section */}
          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <div className="text-[#8b5cf6] text-6xl font-bold">{ratingScore}</div>
              <p className="text-white text-lg m-0 text-center">{feedbackText}</p>
              <div className="w-full h-px bg-[#3a3a3a] mt-2" />
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
            <CardContent className="p-6 flex flex-col gap-3">
              <p className="text-white text-base m-0 leading-relaxed">
                &ldquo;{detailedFeedback}&rdquo;
              </p>
              <p className="text-white/60 text-sm m-0 text-right">
                - {raterName}
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadDetails;

