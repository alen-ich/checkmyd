import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell, DollarSign, AtSign } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface Notification {
  id: string;
  type: 'rating' | 'refund';
  title: string;
  tag: string;
  tagColor: string;
  icon: React.ReactNode;
  content: string;
  amount?: string;
  amountColor?: string;
  buttonText: string;
  buttonAction: () => void;
  buttonVariant?: 'default' | 'outline';
}

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'rating',
      title: 'Your photo has been rated!',
      tag: 'New',
      tagColor: 'bg-[#8b5cf6] text-white border-[#8b5cf6]',
      icon: <Bell className="h-5 w-5 text-[#8b5cf6]" />,
      content: 'Excellent composition, very engaging! Clear focus and great lighting on the subject. A truly striking image.',
      amount: '8.5/10',
      amountColor: 'text-[#8b5cf6]',
      buttonText: 'View full result',
      buttonAction: () => navigate('/upload-details/1'),
      buttonVariant: 'default',
    },
    {
      id: '2',
      type: 'refund',
      title: 'Refund Issued',
      tag: 'Action Required',
      tagColor: 'bg-red-500/20 text-red-400 border-red-500/50',
      icon: <DollarSign className="h-5 w-5 text-red-400" />,
      content: 'Rater declined your photo. Full refund issued. Try another rater!',
      amount: '$5.00 refunded',
      amountColor: 'text-red-400',
      buttonText: 'Browse other raters',
      buttonAction: () => navigate('/raters'),
      buttonVariant: 'outline',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col m-0">
      <Header title="Notifications & Settings" showBack={true} />

      <main className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="px-5 py-6 flex flex-col gap-6">
          {/* Latest Notifications Section */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">Latest Notifications</h2>
            <div className="flex flex-col gap-4">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="bg-[#2a2a2a] border-[#3a3a3a]"
                >
                  <CardContent className="p-5 flex flex-col gap-4">
                    {/* Header with icon, title, and tag */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        {notification.icon}
                        <div className="flex-1">
                          <p className="text-white font-medium m-0 mb-1">
                            {notification.title}
                          </p>
                          <Badge
                            className={`${notification.tagColor} border text-xs px-2 py-0.5`}
                          >
                            {notification.tag}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Rating or Amount */}
                    {notification.amount && (
                      <p
                        className={`${notification.amountColor} text-3xl font-bold m-0`}
                      >
                        {notification.amount}
                      </p>
                    )}

                    {/* Content */}
                    <p className="text-white text-sm m-0 leading-relaxed">
                      {notification.content}
                    </p>

                    {/* Action Button */}
                    <Button
                      onClick={notification.buttonAction}
                      variant={notification.buttonVariant || 'default'}
                      className={
                        notification.buttonVariant === 'outline'
                          ? 'bg-[#2a2a2a] border-[#3a3a3a] text-white hover:bg-[#3a3a3a] w-full'
                          : 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full'
                      }
                    >
                      {notification.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Communication Preferences Section */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">
              Communication Preferences
            </h2>
            <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
              <CardContent className="p-5 flex flex-col gap-4">
                {/* Push Notifications */}
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">
                    Push Notifications
                  </span>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">
                    Email Notifications
                  </span>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Need Help? Section */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">Need Help?</h2>
            <Button
              onClick={() => console.log('Contact support')}
              className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] w-full h-12"
            >
              <AtSign className="h-5 w-5" />
              Contact Support
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;

