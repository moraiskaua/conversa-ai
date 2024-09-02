'use client';

import { Separator } from '@/components/ui/separator';
import { useSettings } from '@/hooks/use-settings';
import { DomainUpdate } from './domain-update';
import { CodeSnippet } from './code-snippet';
import { PremiumBadge } from '@/components/icons/premium-badge';
import { EditChatbotIcon } from './edit-chatbot-icon';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';

const WelcomeMessage = dynamic(
  () => import('./greetings-message').then(props => props.GreetingsMessage),
  {
    ssr: false,
  },
);

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
  const {
    errors,
    loading,
    deleting,
    register,
    onDeleteDomain,
    onUpdateSettings,
  } = useSettings(id);

  return (
    <form className="flex flex-col gap-8 pb-10" onSubmit={onUpdateSettings}>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl">Configurações do domínio</h2>
        <Separator />
        <DomainUpdate name={name} errors={errors} register={register} />
        <CodeSnippet id={id} />
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex gap-4 items-center">
          <h2 className="font-bold text-2xl">Configurações do chat</h2>
          <div className="flex gap-1 bg-cream rounded-full px-3 py-1 text-xs items-center font-bold">
            <PremiumBadge />
            Premium
          </div>
        </div>
        <Separator />

        <div className="grid md:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-5 order-last md:order-first">
            <EditChatbotIcon
              chatBot={chatBot}
              register={register}
              errors={errors}
            />
            <WelcomeMessage
              message={chatBot?.welcomeMessage!}
              register={register}
              errors={errors}
            />
          </div>

          <div className="col-span-1 relative">
            <Image
              src="/images/bot-ui.png"
              className="sticky top-0"
              alt="bot-ui"
              width={530}
              height={769}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-end">
        <Button
          onClick={onDeleteDomain}
          variant="destructive"
          type="button"
          className="px-10 h-[50px]"
        >
          <Loader loading={deleting}>Apagar Domínio</Loader>
        </Button>
        <Button type="submit" className="w-[100px] h-[50px]">
          <Loader loading={loading}>Salvar</Loader>
        </Button>
      </div>
    </form>
  );
};
