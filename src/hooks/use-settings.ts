import { onUpdatePassword } from '@/actions/settings';
import { useToast } from '@/components/ui/use-toast';
import { ChangePassword, changePasswordSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useThemeMode = () => {
  const { setTheme, theme } = useTheme();

  return {
    theme,
    setTheme,
  };
};

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const onChangePassword = handleSubmit(async data => {
    try {
      setLoading(true);
      const updated = await onUpdatePassword(data.password);

      if (updated) {
        reset();
        setLoading(true);
        toast({ title: 'Senha alterada!', description: updated.message });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return { loading, errors, register, onChangePassword };
};
