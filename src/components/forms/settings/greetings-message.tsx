import { Section } from '@/components/section-label';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import FormGenerator from '../form-generator';

interface GreetingsMessageProps {
  message: string;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

export const GreetingsMessage = ({
  message,
  errors,
  register,
}: GreetingsMessageProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Section
        label="Mensagem de boas-vindas"
        message="Altere sua mensagem de boas-vindas."
      />
      <div className="lg:w-[500px]">
        <FormGenerator
          placeholder={message}
          inputType="textarea"
          lines={2}
          register={register}
          errors={errors}
          name="welcomeMessage"
          type="text"
        />
      </div>
    </div>
  );
};
