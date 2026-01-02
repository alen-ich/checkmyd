import React from 'react';
import { ArrowLeft, Search, Filter, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  showSettings?: boolean;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showSearch = false,
  showFilter = false,
  showSettings = false,
  onSearchClick,
  onFilterClick,
  onSettingsClick,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#2a2a2a] px-5 py-4 flex items-center gap-4 z-50">
      {showBack && (
        <button
          onClick={handleBackClick}
          className="text-white hover:text-[#8b5cf6] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      )}
      <h1 className="text-white text-xl font-semibold m-0 flex-1">{title}</h1>
      <div className="flex items-center gap-3">
        {showSearch && (
          <button
            onClick={onSearchClick}
            className="text-white hover:text-[#8b5cf6] transition-colors"
            aria-label="Search"
          >
            <Search className="h-6 w-6" />
          </button>
        )}
        {showFilter && (
          <button
            onClick={onFilterClick}
            className="text-white hover:text-[#8b5cf6] transition-colors"
            aria-label="Filter"
          >
            <Filter className="h-6 w-6" />
          </button>
        )}
        {showSettings && (
          <button
            onClick={onSettingsClick}
            className="text-white hover:text-[#8b5cf6] transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-6 w-6" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

