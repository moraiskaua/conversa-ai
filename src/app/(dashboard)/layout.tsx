import { onLoginUser } from '@/actions/auth';
import { SideBar } from '@/components/sidebar';
import { ChatProvider } from '@/contexts/use-chat-context';
import { ReactNode } from 'react';

interface OwnerLayoutProps {
  children: ReactNode;
}

const OwnerLayout = async ({ children }: OwnerLayoutProps) => {
  const authenticated = await onLoginUser();

  if (!authenticated) return null;

  return (
    <ChatProvider>
      <div className="flex h-screen w-full">
        <SideBar domains={authenticated.domain} />
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
