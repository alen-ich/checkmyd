import React from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, TrendingUp, Star, Handshake, Trophy, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface RecentActivity {
  id: string;
  date: string;
  raterName: string;
  score: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const recentActivities: RecentActivity[] = [
    { id: '1', date: '2024-07-28', raterName: 'Anonymous Rater X', score: 7.5 },
    { id: '2', date: '2024-07-25', raterName: 'MysticJudge', score: 9.1 },
    { id: '3', date: '2024-07-22', raterName: 'ShadowReviewer', score: 6.8 },
    { id: '4', date: '2024-07-19', raterName: 'HonestEyes', score: 8.9 },
  ];

  const leaderboardEntries: LeaderboardEntry[] = [
    { rank: 1, name: 'EliteSubmitter', score: 1200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EliteSubmitter' },
    { rank: 2, name: 'FeedbackFiend', score: 1150, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FeedbackFiend' },
    { rank: 3, name: 'PhotoPro', score: 1080, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhotoPro' },
    { rank: 4, name: 'VisualVoyager', score: 990, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VisualVoyager' },
    { rank: 5, name: 'AnonMaster', score: 910, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnonMaster' },
  ];

  const handleViewResult = (activityId: string) => {
    console.log('View result for activity:', activityId);
    // Handle view result action
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
    // Handle settings action
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header
        title="My Dashboard"
        showSettings={true}
        onSettingsClick={handleSettingsClick}
      />

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-4 flex flex-col gap-6">
          {/* My Stats Overview */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">My Stats Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col gap-1">
                      <p className="text-white/70 text-sm m-0">Avg. Score</p>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#8b5cf6]" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[#8b5cf6] text-3xl font-bold m-0">8.2</p>
                  <p className="text-white/60 text-xs mt-1 m-0">across all photos</p>
                </CardContent>
              </Card>

              <Card 
                className="bg-[#2a2a2a] border-[#3a3a3a] cursor-pointer hover:border-[#8b5cf6]/50 transition-colors"
                onClick={() => navigate('/view-uploads')}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col gap-1">
                      <p className="text-white/70 text-sm m-0">Submissions</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-[#ec4899]" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[#8b5cf6] text-3xl font-bold m-0">45</p>
                  <p className="text-white/60 text-xs mt-1 m-0">total photos sent</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/view-uploads');
                    }}
                    className="text-[#8b5cf6] text-xs font-medium mt-2 hover:text-[#7c3aed] transition-colors"
                  >
                    View all uploads →
                  </button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* My Achievements */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">My Achievements</h2>
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-[#2a2a2a] border-[#3a3a3a] aspect-square">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2 h-full">
                  <Star className="h-8 w-8 text-[#8b5cf6] stroke-2" />
                  <p className="text-white text-sm font-medium text-center m-0">Sharp Shooter</p>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2a2a] border-[#3a3a3a] aspect-square">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2 h-full">
                  <Handshake className="h-8 w-8 text-[#ec4899] stroke-2" />
                  <p className="text-white text-sm font-medium text-center m-0">Feedback Fanatic</p>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2a2a] border-[#3a3a3a] aspect-square">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2 h-full">
                  <Trophy className="h-8 w-8 text-[#8b5cf6] stroke-2" />
                  <p className="text-white text-sm font-medium text-center m-0">Top Tier</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Recent History */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">Recent History</h2>
            <div className="flex flex-col gap-3">
              {recentActivities.map((activity) => (
                <Card key={activity.id} className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-[#3a3a3a]">
                            <User className="h-5 w-5 text-white/60" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/60 text-xs m-0 mb-1">{activity.date}</p>
                        <p className="text-white font-medium m-0 mb-1">{activity.raterName}</p>
                        <p className="text-[#8b5cf6] font-semibold m-0">{activity.score}</p>
                      </div>
                      <Button
                        onClick={() => handleViewResult(activity.id)}
                        className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] text-xs px-4 py-2"
                      >
                        View Result
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Leaderboard */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">Leaderboard</h2>
            <div className="flex flex-col gap-3">
              {leaderboardEntries.map((entry) => (
                <Card key={entry.rank} className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 text-center">
                        <span className="text-[#ec4899] font-bold text-lg">{entry.rank}</span>
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={entry.avatar} alt={entry.name} />
                        <AvatarFallback className="bg-[#3a3a3a]">
                          <User className="h-5 w-5 text-white/60" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium m-0">{entry.name}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-[#8b5cf6] font-semibold m-0">{entry.score}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

