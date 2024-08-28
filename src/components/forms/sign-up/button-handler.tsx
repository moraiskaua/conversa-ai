'use client';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/use-auth-context';
import { useSignUpForm } from '@/hooks/use-sign-up';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

interface ButtonHandlerProps {}

export const ButtonHandler = () => {
  const { currentStep, setCurrentStep } = useAuthContext();
  const { formState, getFieldState, getValues } = useFormContext();
  const { onGenerateOTP } = useSignUpForm();

  const { isDirty: isName } = getFieldState('fullname', formState);
  const { isDirty: isEmail } = getFieldState('email', formState);
  const { isDirty: isPassword } = getFieldState('password', formState);

  if (currentStep === 3) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button type="submit" className="w-full">
          Criar conta
        </Button>
        <p>
          Já possui uma conta?{' '}
          <Link href="/auth/sign-in" className="font-bold">
            Entrar
          </Link>
        </p>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          type="submit"
          className="w-full"
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () =>
                onGenerateOTP(
                  getValues('email'),
                  getValues('password'),
                  setCurrentStep,
                ),
            })}
        >
          Continuar
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="submit"
        className="w-full"
        onClick={() => setCurrentStep(prev => prev + 1)}
      >
        Continuar
      </Button>
      <p>
        Já possui uma conta?{' '}
        <Link href="/auth/sign-in" className="font-bold">
          Entrar
        </Link>
      </p>
    </div>
  );
};
