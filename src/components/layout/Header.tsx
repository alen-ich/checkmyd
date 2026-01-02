import React from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showSearch = false,
  showFilter = false,
  onSearchClick,
  onFilterClick,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="bg-[#2a2a2a] px-5 py-4 flex items-center gap-4">
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
      </div>
    </header>
  );
};

export default Header;

