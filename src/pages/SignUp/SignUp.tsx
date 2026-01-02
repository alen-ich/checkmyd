import React from 'react';
import { Button } from "@/components/ui/button"


const SignUp: React.FC = () => {
  const handleSubmitterClick = () => {
    console.log('Become a Submitter clicked');
    // Add navigation or action logic here
  };

  const handleRaterClick = () => {
    console.log('Become a Rater clicked');
    // Add navigation or action logic here
  };

  const handleTermsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('Terms of Service & Privacy Policy clicked');
    // Add navigation or action logic here
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      {/* Header */}
      <header className="pt-5 px-5 flex justify-center items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-white text-2xl sm:text-xl font-semibold m-0">CheckMyD</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center gap-5 py-10 px-5 sm:py-8 sm:px-4 max-w-[600px] w-full mx-auto box-border">
        {/* Submitter Card */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 sm:p-5 flex flex-col gap-4">
          <h2 className="text-[#8b5cf6] text-xl sm:text-lg font-semibold m-0">
            I want feedback (Submitter)
          </h2>
          <p className="text-white text-base sm:text-sm leading-relaxed m-0">
            Share your photos and get honest ratings and reviews from our community of raters.
          </p>
          <Button size="xl" className="bg-[#8b5cf6] text-white text-base hover:bg-[#7c3aed]" onClick={handleSubmitterClick}>
            Become a Submitter
          </Button>
        </div>

        {/* Rater Card */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 sm:p-5 flex flex-col gap-4">
          <h2 className="text-[#8b5cf6] text-xl sm:text-lg font-semibold m-0">
            I want to rate (Rater)
          </h2>
          <p className="text-white text-base sm:text-sm leading-relaxed m-0">
            Lend your discerning eye to photos from others and earn rewards for your valuable feedback.
          </p>
          <Button size="xl" className="bg-[#8b5cf6] text-white text-base hover:bg-[#7c3aed]" onClick={handleRaterClick}>
          Become a Rater
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-5 flex flex-col items-center gap-3">
        <p className="text-white text-sm m-0">18+ only</p>
        <a
          href="#"
          className="text-[#8b5cf6] text-sm no-underline cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#a78bfa] hover:underline"
          onClick={handleTermsClick}
        >
          Terms of Service & Privacy Policy
        </a>
      </footer>
    </div>
  );
};

export default SignUp;

