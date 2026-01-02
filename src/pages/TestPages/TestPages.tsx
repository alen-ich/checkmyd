import React from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LogIn, 
  UserPlus, 
  Users, 
  Upload, 
  BarChart3, 
  User, 
  Eye, 
  Bell, 
  Settings, 
  Lock,
  FileText,
  LayoutGrid
} from 'lucide-react';

interface PageLink {
  path: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const TestPages: React.FC = () => {
  const navigate = useNavigate();

  const pages: PageLink[] = [
    {
      path: '/',
      label: 'Sign Up',
      description: 'Main sign up page',
      icon: <UserPlus className="h-5 w-5" />,
      category: 'Authentication'
    },
    {
      path: '/login',
      label: 'Login',
      description: 'User login page',
      icon: <LogIn className="h-5 w-5" />,
      category: 'Authentication'
    },
    {
      path: '/signup/submitter',
      label: 'Sign Up - Submitter',
      description: 'Submitter registration',
      icon: <UserPlus className="h-5 w-5" />,
      category: 'Authentication'
    },
    {
      path: '/signup/rater',
      label: 'Sign Up - Rater',
      description: 'Rater registration',
      icon: <UserPlus className="h-5 w-5" />,
      category: 'Authentication'
    },
    {
      path: '/forgot-password',
      label: 'Forgot Password',
      description: 'Password recovery page',
      icon: <Lock className="h-5 w-5" />,
      category: 'Authentication'
    },
    {
      path: '/raters',
      label: 'Raters',
      description: 'Browse available raters',
      icon: <LayoutGrid className="h-5 w-5" />,
      category: 'Main Pages'
    },
    {
      path: '/upload',
      label: 'Upload Photo',
      description: 'Upload a photo for rating',
      icon: <Upload className="h-5 w-5" />,
      category: 'Main Pages'
    },
    {
      path: '/stats',
      label: 'Dashboard',
      description: 'User statistics and dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
      category: 'Main Pages'
    },
    {
      path: '/rater-profile',
      label: 'Rater Profile',
      description: 'Rater profile page',
      icon: <User className="h-5 w-5" />,
      category: 'Profiles'
    },
    {
      path: '/submitter-profile',
      label: 'Submitter Profile',
      description: 'Submitter profile page',
      icon: <User className="h-5 w-5" />,
      category: 'Profiles'
    },
    {
      path: '/view-uploads',
      label: 'View Uploads',
      description: 'View all uploaded photos',
      icon: <Eye className="h-5 w-5" />,
      category: 'Main Pages'
    },
    {
      path: '/upload-details/1',
      label: 'Upload Details',
      description: 'Details for a specific upload (ID: 1)',
      icon: <FileText className="h-5 w-5" />,
      category: 'Details'
    },
    {
      path: '/rater-view',
      label: 'Rater View',
      description: 'Rater view page',
      icon: <Users className="h-5 w-5" />,
      category: 'Main Pages'
    },
    {
      path: '/rater-upload-details/1',
      label: 'Rater Upload Details',
      description: 'Rater view of upload details (ID: 1)',
      icon: <FileText className="h-5 w-5" />,
      category: 'Details'
    },
    {
      path: '/notifications',
      label: 'Notifications',
      description: 'User notifications',
      icon: <Bell className="h-5 w-5" />,
      category: 'Settings'
    },
    {
      path: '/profile-settings',
      label: 'Profile Settings',
      description: 'User profile settings',
      icon: <Settings className="h-5 w-5" />,
      category: 'Settings'
    },
  ];

  const categories = Array.from(new Set(pages.map(page => page.category)));

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Test Pages</h1>
          <p className="text-white">Navigate to any page for testing purposes</p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#8b5cf6]">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages
                .filter(page => page.category === category)
                .map((page) => (
                  <Card 
                    key={page.path} 
                    className="bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#8b5cf6]/50 transition-colors cursor-pointer"
                    onClick={() => handleNavigate(page.path)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#8b5cf6]/20 rounded-lg text-[#8b5cf6]">
                          {page.icon}
                        </div>
                        <CardTitle className="text-lg text-white">{page.label}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white mb-4">{page.description}</p>
                      <div className="flex items-center justify-between">
                        <code className="text-xs bg-[#1a1a1a] px-2 py-1 rounded text-white">
                          {page.path}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigate(page.path);
                          }}
                        >
                          Visit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPages;

