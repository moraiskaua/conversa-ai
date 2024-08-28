'use client';

import { Loader } from '@/components/loader';
import { AuthContextProvider } from '@/contexts/use-auth-context';
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up';
import { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

interface SignUpFormProviderProps {
  children: ReactNode;
}

export const SignUpFormProvider = ({ children }: SignUpFormProviderProps) => {
  const { form, loading, onSubmit } = useSignUpForm();

  return (
    <AuthContextProvider>
      <FormProvider {...form}>
        <form onSubmit={onSubmit} className="h-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};
