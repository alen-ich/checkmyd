import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LayoutGrid, Upload, BarChart3, Users, User } from 'lucide-react';

interface FooterItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const footerItems: FooterItem[] = [
    { label: 'Catalog', icon: <LayoutGrid className="h-5 w-5" />, path: '/catalog' },
    { label: 'Upload', icon: <Upload className="h-5 w-5" />, path: '/upload' },
    { label: 'My Stats', icon: <BarChart3 className="h-5 w-5" />, path: '/stats' },
    { label: 'Rater View', icon: <Users className="h-5 w-5" />, path: '/raters' },
    { label: 'Profile', icon: <User className="h-5 w-5" />, path: '/profile' },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-[#2a2a2a] border-t border-[#3a3a3a] px-4 py-3">
      <nav className="flex items-center justify-around">
        {footerItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleItemClick(item.path)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive
                  ? 'text-[#8b5cf6]'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label={item.label}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;

