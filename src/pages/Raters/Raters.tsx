import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Rater {
  id: string;
  name: string;
  style: 'Strict' | 'Playful' | 'Supportive' | 'Direct';
  price: number;
  rating: number;
  ratingCount: number;
  approvalRate: number;
  avatar: string;
}

const mockRaters: Rater[] = [
  {
    id: '1',
    name: 'Luna',
    style: 'Strict',
    price: 9.99,
    rating: 4.8,
    ratingCount: 1250,
    approvalRate: 92,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
  },
  {
    id: '2',
    name: 'Maya',
    style: 'Playful',
    price: 7.50,
    rating: 4.5,
    ratingCount: 870,
    approvalRate: 88,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
  },
  {
    id: '3',
    name: 'Chloe',
    style: 'Supportive',
    price: 8.25,
    rating: 4.9,
    ratingCount: 1500,
    approvalRate: 95,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe',
  },
  {
    id: '4',
    name: 'Sophia',
    style: 'Direct',
    price: 12.00,
    rating: 4.7,
    ratingCount: 990,
    approvalRate: 90,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
  },
  {
    id: '5',
    name: 'Aria',
    style: 'Strict',
    price: 10.50,
    rating: 4.6,
    ratingCount: 780,
    approvalRate: 91,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aria',
  },
];

const styleColors: Record<string, string> = {
  Strict: 'bg-[#8b5cf6] text-white border-[#8b5cf6]',
  Playful: 'bg-[#10b981] text-white border-[#10b981]',
  Supportive: 'bg-[#3b82f6] text-white border-[#3b82f6]',
  Direct: 'bg-[#f59e0b] text-white border-[#f59e0b]',
};

const Raters: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Strict', 'Playful', 'Supportive'];

  const filteredRaters = mockRaters.filter((rater) => {
    const matchesSearch =
      rater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rater.style.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || rater.style === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSelectRater = (raterId: string) => {
    console.log('Selected rater:', raterId);
    // Handle rater selection
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header
        title="Raters"
        showSearch={true}
        showFilter={true}
        onSearchClick={() => console.log('Search clicked')}
        onFilterClick={() => console.log('Filter clicked')}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              type="text"
              placeholder="Search raters by name or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-white/50 focus-visible:border-[#8b5cf6]"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter
                    ? 'bg-[#8b5cf6] text-white'
                    : 'bg-[#2a2a2a] text-white/70 hover:text-white hover:bg-[#3a3a3a]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Rater Cards */}
          <div className="flex flex-col gap-4">
            {filteredRaters.map((rater) => (
              <div
                key={rater.id}
                className="bg-[#2a2a2a] rounded-xl p-4 flex flex-col gap-4 border border-[#3a3a3a]"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <img
                    src={rater.avatar}
                    alt={rater.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  {/* Rater Info */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white text-lg font-semibold m-0">
                        {rater.name}
                      </h3>
                      <Badge
                        className={`${styleColors[rater.style]} text-xs px-2 py-0.5`}
                      >
                        {rater.style}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white text-sm font-medium">
                        {rater.rating}
                      </span>
                      <span className="text-white/60 text-sm">
                        ({rater.ratingCount.toLocaleString()})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-white/80 text-sm m-0">
                          Approval Rate: <span className="font-medium">{rater.approvalRate}%</span>
                        </p>
                        <p className="text-[#8b5cf6] text-sm font-semibold m-0">
                          ${rater.price.toFixed(2)} / rating
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => handleSelectRater(rater.id)}
                  className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full"
                >
                  Select Rater
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Raters;

