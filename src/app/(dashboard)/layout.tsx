import { onLoginUser } from '@/actions/auth';
import { ReactNode } from 'react';

interface OwnerLayoutProps {
  children: ReactNode;
}

const OwnerLayout = async ({ children }: OwnerLayoutProps) => {
  const authenticated = await onLoginUser();

  if (!authenticated) return null;

  return <div>{children}</div>;
};

export default OwnerLayout;
