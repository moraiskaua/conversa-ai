'use client';

interface SettingsFormProps {
  id: string;
  name: string;
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE';
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
}

export const SettingsForm = ({
  id,
  name,
  plan,
  chatBot,
}: SettingsFormProps) => {
  return <div>fasdfa</div>;
};
