import React, { useState } from 'react';
import { Search, Clock, CheckCircle, XCircle, Image as ImageIcon, Filter } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Upload {
  id: string;
  imageUrl: string;
  title?: string;
  status: 'pending' | 'rated' | 'rejected';
  uploadedAt: string;
  ratedAt?: string;
  raterName?: string;
  rating?: number;
  feedback?: string;
}

const mockUploads: Upload[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    title: 'Mountain Landscape',
    status: 'rated',
    uploadedAt: '2024-01-15T10:30:00',
    ratedAt: '2024-01-15T14:20:00',
    raterName: 'Luna',
    rating: 4.5,
    feedback: 'Great composition and lighting. The foreground elements add depth to the scene.',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400',
    title: 'Urban Street',
    status: 'rated',
    uploadedAt: '2024-01-14T09:15:00',
    ratedAt: '2024-01-14T11:45:00',
    raterName: 'Maya',
    rating: 4.2,
    feedback: 'Nice use of leading lines. Consider adjusting the exposure slightly.',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
    title: 'Portrait Study',
    status: 'pending',
    uploadedAt: '2024-01-16T08:00:00',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
    title: 'Sunset Beach',
    status: 'rated',
    uploadedAt: '2024-01-13T16:20:00',
    ratedAt: '2024-01-13T18:30:00',
    raterName: 'Chloe',
    rating: 4.8,
    feedback: 'Excellent color grading and mood. The golden hour lighting is captured beautifully.',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
    title: 'Night City',
    status: 'rejected',
    uploadedAt: '2024-01-12T20:10:00',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
    title: 'Nature Close-up',
    status: 'pending',
    uploadedAt: '2024-01-16T12:30:00',
  },
];

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  },
  rated: {
    label: 'Rated',
    icon: CheckCircle,
    color: 'bg-green-500/20 text-green-400 border-green-500/50',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    color: 'bg-red-500/20 text-red-400 border-red-500/50',
  },
};

const ViewUploads: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Pending', 'Rated', 'Rejected'];

  const filteredUploads = mockUploads.filter((upload) => {
    const matchesSearch =
      (upload.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      upload.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'All' ||
      upload.status === selectedFilter.toLowerCase() ||
      (selectedFilter === 'Pending' && upload.status === 'pending') ||
      (selectedFilter === 'Rated' && upload.status === 'rated') ||
      (selectedFilter === 'Rejected' && upload.status === 'rejected');
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header
        title="My Uploads"
        showBack={true}
        showSearch={true}
        onSearchClick={() => console.log('Search clicked')}
      />

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              type="text"
              placeholder="Search uploads..."
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

          {/* Uploads Grid */}
          {filteredUploads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <ImageIcon className="h-16 w-16 text-white/20" />
              <p className="text-white/60 text-center">No uploads found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUploads.map((upload) => {
                const statusInfo = statusConfig[upload.status];
                const StatusIcon = statusInfo.icon;

                return (
                  <Card
                    key={upload.id}
                    className="bg-[#2a2a2a] border-[#3a3a3a] overflow-hidden"
                  >
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="relative aspect-video bg-[#1a1a1a] overflow-hidden">
                        <img
                          src={upload.imageUrl}
                          alt={upload.title || 'Upload'}
                          className="w-full h-full object-cover"
                        />
                        {/* Status Badge */}
                        <div className="absolute top-2 right-2">
                          <Badge
                            className={`${statusInfo.color} border flex items-center gap-1.5`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col gap-3">
                        {/* Title and Date */}
                        <div className="flex flex-col gap-1">
                          <h3 className="text-white text-base font-semibold m-0">
                            {upload.title || 'Untitled'}
                          </h3>
                          <p className="text-white/60 text-xs m-0">
                            Uploaded {formatDate(upload.uploadedAt)}
                          </p>
                        </div>

                        {/* Rating Info (if rated) */}
                        {upload.status === 'rated' && upload.rating && (
                          <div className="flex flex-col gap-2 pt-2 border-t border-[#3a3a3a]">
                            <div className="flex items-center justify-between">
                              <span className="text-white/80 text-sm">Rated by {upload.raterName}</span>
                              <span className="text-[#8b5cf6] font-semibold text-sm">
                                {upload.rating}/5.0
                              </span>
                            </div>
                            {upload.feedback && (
                              <p className="text-white/70 text-sm m-0 line-clamp-2">
                                {upload.feedback}
                              </p>
                            )}
                            {upload.ratedAt && (
                              <p className="text-white/50 text-xs m-0">
                                Rated {formatDate(upload.ratedAt)}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Rejected Message */}
                        {upload.status === 'rejected' && (
                          <div className="pt-2 border-t border-[#3a3a3a]">
                            <p className="text-red-400 text-sm m-0">
                              This upload was rejected and does not meet our guidelines.
                            </p>
                          </div>
                        )}

                        {/* Pending Message */}
                        {upload.status === 'pending' && (
                          <div className="pt-2 border-t border-[#3a3a3a]">
                            <p className="text-yellow-400 text-sm m-0">
                              Waiting for rating...
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewUploads;

