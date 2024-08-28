import { useToast } from '@/components/ui/use-toast';
import { UserLogin, userLoginSchema } from '@/schemas/auth.schema';
import { useSignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useSignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async data => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const authenticated = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (authenticated.status === 'complete') {
        await setActive({ session: authenticated.createdSessionId });
        toast({
          title: 'Sucesso',
          description: 'Bem-vindo!',
        });
        router.push('/dashboard');
      }
    } catch (error: any) {
      setLoading(false);
      if (error.errors[0].code === 'form_password_incorrect')
        toast({
          title: 'Error',
          description: 'email/password incorreto, tente novamente',
        });
    }
  });

  return {
    form,
    loading,
    onSubmit,
  };
};
