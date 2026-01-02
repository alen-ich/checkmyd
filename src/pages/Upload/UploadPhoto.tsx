import React, { useState, useRef } from 'react';
import { Camera, AlertCircle, CreditCard } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const UploadPhoto: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoRatingPrice = 10.00;
  const platformFee = 2.00;
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
    if (selectedFile) {
      console.log('Proceeding to payment with file:', selectedFile.name);
      // Handle payment navigation
    }
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

          {/* Important Reminder */}
          <div className="bg-[#2a2a2a] rounded-xl p-4 flex items-start gap-3 border border-[#3a3a3a]">
            <AlertCircle className="h-5 w-5 text-[#8b5cf6] shrink-0 mt-0.5" />
            <p className="text-white text-sm m-0">
              By uploading, you confirm you are 18+ and that content adheres to our guidelines.
            </p>
          </div>

          {/* Transaction Summary */}
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

          {/* Proceed to Payment Button */}
          <Button
            onClick={handleProceedToPayment}
            disabled={!selectedFile}
            size="xl"
            className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="h-5 w-5" />
            Proceed to Payment
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPhoto;

