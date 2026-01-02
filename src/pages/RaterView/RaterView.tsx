import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QueueItem {
  id: string;
  imageUrl: string;
  alt: string;
  name: string;
  timeRemaining: number; // in seconds
}

const RaterView: React.FC = () => {
  const navigate = useNavigate();

  const queueItems: QueueItem[] = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
      alt: 'Anonymous Photo 1',
      name: 'Sarah M.',
      timeRemaining: 3600, // 1 hour
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      alt: 'Anonymous Photo 2',
      name: 'Michael K.',
      timeRemaining: 1800, // 30 minutes
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop',
      alt: 'Anonymous Photo 3',
      name: 'Emma L.',
      timeRemaining: 2700, // 45 minutes
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop',
      alt: 'Anonymous Photo 4',
      name: 'David R.',
      timeRemaining: 900, // 15 minutes
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      alt: 'Anonymous Photo 5',
      name: 'Jessica T.',
      timeRemaining: 5400, // 1.5 hours
    },
  ];

  const [timers, setTimers] = useState<Record<string, number>>(
    queueItems.reduce((acc, item) => {
      acc[item.id] = item.timeRemaining;
      return acc;
    }, {} as Record<string, number>)
  );

  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [itemToDecline, setItemToDecline] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (updated[id] > 0) {
            updated[id] = updated[id] - 1;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const handleSettingsClick = () => {
    navigate('/profile-settings');
  };

  const handleRateNow = (itemId: string) => {
    // Navigate to rater rating page
    navigate(`/rater-upload-details/${itemId}`);
  };

  const handleDeclineClick = (itemId: string) => {
    setItemToDecline(itemId);
    setDeclineDialogOpen(true);
  };

  const handleConfirmDecline = () => {
    if (itemToDecline) {
      // Handle decline logic
      console.log('Declined item:', itemToDecline);
      // Remove item from queue or update status
      setDeclineDialogOpen(false);
      setItemToDecline(null);
    }
  };

  const handleCancelDecline = () => {
    setDeclineDialogOpen(false);
    setItemToDecline(null);
  };

  const handleViewHistory = () => {
    // Navigate to earnings history
    console.log('View earnings history');
  };

  const handleWithdraw = () => {
    // Handle withdraw logic
    console.log('Withdraw funds');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header
        title="Rater Dashboard"
        showSettings={true}
        onSettingsClick={handleSettingsClick}
      />

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-4 flex flex-col gap-6">
          {/* My Queue Section */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">
              My Queue ({queueItems.length})
            </h2>
            <div className="flex flex-col gap-4">
              {queueItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-[#2a2a2a] border-[#3a3a3a]"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold m-0">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-white/70">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">
                          {formatTime(timers[item.id] || 0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleRateNow(item.id)}
                        className="flex-1 bg-[#8b5cf6] text-white hover:bg-[#7c3aed]"
                      >
                        Rate now
                      </Button>
                      <Button
                        onClick={() => handleDeclineClick(item.id)}
                        className="flex-1 bg-red-500 text-white hover:bg-red-600"
                      >
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Total Earnings Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-semibold m-0">
                Total Earnings
              </h2>
              <button
                onClick={handleViewHistory}
                className="text-[#8b5cf6] text-sm font-medium hover:text-[#7c3aed] transition-colors"
              >
                View History
              </button>
            </div>
            <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
              <CardContent className="p-4">
                <div className="mb-4">
                  <p className="text-[#8b5cf6] text-4xl font-bold m-0">
                    $152.75
                  </p>
                  <p className="text-white/60 text-sm mt-1 m-0">Lifetime</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#3a3a3a]">
                  <div>
                    <p className="text-white/70 text-sm m-0">Payout Balance</p>
                    <p className="text-white text-xl font-semibold m-0">
                      $50.00
                    </p>
                  </div>
                  <Button
                    onClick={handleWithdraw}
                    className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed]"
                  >
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />

      {/* Decline Confirmation Dialog */}
      <Dialog open={declineDialogOpen} onOpenChange={setDeclineDialogOpen}>
        <DialogContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">
              Confirm Decline
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to decline this rating request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 flex-row">
            <Button
              onClick={handleConfirmDecline}
              className="flex-1 bg-red-500 text-white hover:bg-red-600 font-medium"
            >
              Confirm Decline
            </Button>
            <Button
              onClick={handleCancelDecline}
              className="flex-1 bg-green-500 text-white hover:bg-green-600 font-medium"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RaterView;

