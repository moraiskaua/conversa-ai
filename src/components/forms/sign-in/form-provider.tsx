'use client';

import { Loader } from '@/components/loader';
import { AuthContextProvider } from '@/contexts/use-auth-context';
import { useSignInForm } from '@/hooks/use-sign-in';
import { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

type SignInFormProviderProps = {
  children: ReactNode;
};

const SignInFormProvider = ({ children }: SignInFormProviderProps) => {
  const { form, onSubmit, loading } = useSignInForm();

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

export default SignInFormProvider;
