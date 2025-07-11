
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChatButton from "../FloatingChatButton";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout = ({ children, showHeader = true, showFooter = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white">
      {showHeader && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
      <FloatingChatButton
        icon={<img src="/image/logo/zalo_color.png" alt="Zalo" width={32} height={32} />}
        link="https://zalo.me/0869415919"
        bgColor="#0084ff"
        pulseColor="#b3e0ff"
        bottom="120px"
      />
      <FloatingChatButton
        icon={<img src="/image/logo/messenger_color.png" alt="Messenger" width={32} height={32} />}
        link="https://m.me/61578225652028"
        bgColor="#2196f3"
        pulseColor="#b3e0ff"
        bottom="40px"
      />
    </div>
  );
};

export default Layout;
