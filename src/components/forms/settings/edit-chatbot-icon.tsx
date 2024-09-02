import { BotIcon } from '@/components/icons/bot-icon';
import { Section } from '@/components/section-label';
import { UploadButton } from '@/components/upload-button';
import Image from 'next/image';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface EditChatbotIconProps {
  errors: FieldErrors;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
  register: UseFormRegister<FieldValues>;
}

export const EditChatbotIcon = ({
  errors,
  chatBot,
  register,
}: EditChatbotIconProps) => {
  return (
    <div className="py-5 flex flex-col gap-5 items-start">
      <Section
        label="Ícone do chatbot"
        message="Altere o ícone do seu chatbot."
      />
      <UploadButton label="Trocar ícone" register={register} errors={errors} />
      {chatBot?.icon ? (
        <div className="rounded-full overflow-hidden">
          <Image
            src={chatBot.icon}
            alt="bot"
            width={80}
            height={80}
            className=""
          />
        </div>
      ) : (
        <div className="rounded-full cursor-pointer shadown-md size-20 flex items-center justify-center bg-grandis">
          <BotIcon />
        </div>
      )}
    </div>
  );
};
