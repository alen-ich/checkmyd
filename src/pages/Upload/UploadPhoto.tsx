import React, { useState, useRef } from 'react';
import { Camera, AlertCircle, CreditCard, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
];

const styleColors: Record<string, string> = {
  Strict: 'bg-[#8b5cf6] text-white border-[#8b5cf6]',
  Playful: 'bg-[#10b981] text-white border-[#10b981]',
  Supportive: 'bg-[#3b82f6] text-white border-[#3b82f6]',
  Direct: 'bg-[#f59e0b] text-white border-[#f59e0b]',
};

const UploadPhoto: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedRater, setSelectedRater] = useState<Rater | null>(null);
  const [showRaterList, setShowRaterList] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoRatingPrice = selectedRater?.price || 10.00;
  const platformFee = photoRatingPrice * 0.2;
  const totalAmount = photoRatingPrice + platformFee;

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleProceedToPayment = () => {
    if (selectedFile && selectedRater) {
      console.log('Proceeding to payment with file:', selectedFile.name);
      console.log('Selected rater:', selectedRater);
      // Handle payment navigation
    }
  };

  const handleSelectRater = (rater: Rater) => {
    setSelectedRater(rater);
    setShowRaterList(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header title="Upload Photo" showBack={true} />

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-6 max-w-[600px] w-full mx-auto flex flex-col gap-6">
          {/* Upload Area */}
          <div
            onClick={handleUploadAreaClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors
              ${isDragging 
                ? 'border-[#8b5cf6] bg-[#8b5cf6]/10' 
                : 'border-[#3a3a3a] hover:border-[#8b5cf6]/50 hover:bg-[#2a2a2a]'
              }
              ${preview ? 'border-solid border-[#8b5cf6]' : ''}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            {preview ? (
              <div className="relative w-full">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setPreview(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="absolute top-2 right-2 bg-[#1a1a1a]/80 text-white rounded-full p-2 hover:bg-[#1a1a1a] transition-colors"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <div className="bg-[#8b5cf6] rounded-full p-4">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-white font-semibold text-base m-0">
                    Drag & Drop or Tap to Upload
                  </p>
                  <p className="text-white/60 text-sm m-0">
                    High-quality image for best results
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Choose Rater Section */}
          <div className="bg-[#2a2a2a] rounded-xl p-5 flex flex-col gap-4 border border-[#3a3a3a]">
            <h2 className="text-white text-lg font-semibold m-0">Choose a Rater</h2>
            {selectedRater ? (
              <div className="flex flex-col gap-3">
                <Card className="bg-[#3a3a3a] border-[#8b5cf6]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedRater.avatar}
                        alt={selectedRater.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white text-base font-semibold m-0">
                            {selectedRater.name}
                          </h3>
                          <Badge
                            className={`${styleColors[selectedRater.style]} text-xs px-2 py-0.5`}
                          >
                            {selectedRater.style}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-white/80 text-xs">
                            {selectedRater.rating} ({selectedRater.ratingCount.toLocaleString()})
                          </span>
                          <span className="text-white/60 text-xs">•</span>
                          <span className="text-white/80 text-xs">
                            ${selectedRater.price.toFixed(2)}/rating
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Button
                  onClick={() => setShowRaterList(!showRaterList)}
                  variant="outline"
                  className="bg-transparent border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white w-full"
                >
                  Change Rater
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowRaterList(!showRaterList)}
                variant="outline"
                className="bg-[#3a3a3a] border-[#3a3a3a] text-white hover:bg-[#4a4a4a] w-full"
              >
                Select a Rater
              </Button>
            )}

            {/* Rater List */}
            {showRaterList && (
              <div className="flex flex-col gap-3 mt-2">
                {mockRaters.map((rater) => (
                  <Card
                    key={rater.id}
                    onClick={() => handleSelectRater(rater)}
                    className={`bg-[#3a3a3a] border cursor-pointer transition-colors ${
                      selectedRater?.id === rater.id
                        ? 'border-[#8b5cf6]'
                        : 'border-[#3a3a3a] hover:border-[#8b5cf6]/50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={rater.avatar}
                          alt={rater.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-white text-base font-semibold m-0">
                              {rater.name}
                            </h3>
                            <Badge
                              className={`${styleColors[rater.style]} text-xs px-2 py-0.5`}
                            >
                              {rater.style}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-white/80 text-xs">
                              {rater.rating} ({rater.ratingCount.toLocaleString()})
                            </span>
                            <span className="text-white/60 text-xs">•</span>
                            <span className="text-white/80 text-xs">
                              Approval: {rater.approvalRate}%
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[#8b5cf6] font-semibold text-sm m-0">
                            ${rater.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Important Reminder */}
          <div className="bg-[#2a2a2a] rounded-xl p-4 flex items-start gap-3 border border-[#3a3a3a]">
            <AlertCircle className="h-5 w-5 text-[#8b5cf6] shrink-0 mt-0.5" />
            <p className="text-white text-sm m-0">
              By uploading, you confirm you are 18+ and that content adheres to our guidelines.
            </p>
          </div>

          {/* Transaction Summary */}
          {selectedRater && (
            <div className="bg-[#2a2a2a] rounded-xl p-5 flex flex-col gap-4 border border-[#3a3a3a]">
              <h2 className="text-white text-lg font-semibold m-0">Transaction Summary</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Photo Rating Price</span>
                  <span className="text-white text-sm">${photoRatingPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Platform Fee (20%)</span>
                  <span className="text-white text-sm">${platformFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#3a3a3a] pt-3 flex items-center justify-between">
                  <span className="text-white font-semibold text-base">Total Amount</span>
                  <span className="text-[#8b5cf6] font-semibold text-base">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Proceed to Payment Button */}
          <Button
            onClick={handleProceedToPayment}
            disabled={!selectedFile || !selectedRater}
            size="xl"
            className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="h-5 w-5" />
            Proceed to Payment
          </Button>
          {!selectedRater && (
            <p className="text-white/60 text-xs m-0 text-center">
              Please select a rater to continue
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPhoto;

