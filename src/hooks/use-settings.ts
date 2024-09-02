import {
  onChatBotImageUpdate,
  onDeleteUserDomain,
  onUpdateDomain,
  onUpdatePassword,
  onUpdateWelcomeMessage,
} from '@/actions/settings';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { ChangePassword, changePasswordSchema } from '@/schemas/auth.schema';
import {
  DomainSettings,
  domainSettingsSchema,
} from '@/schemas/settings.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

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

export const useSettings = (id: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DomainSettings>({ resolver: zodResolver(domainSettingsSchema) });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onUpdateSettings = handleSubmit(async data => {
    setLoading(true);

    if (data.domain) {
      const domain = await onUpdateDomain(id, data.domain);

      if (domain) {
        toast({
          title: 'Sucesso!',
          description: domain.message,
        });
      }
    }

    if (data.image[0]) {
      const iconFileName = `${uuidv4()}-${data.image[0].name}`;
      const filePath = `icons/${iconFileName}`;

      await supabase.storage
        .from('bucket-conversa-ai')
        .upload(filePath, data.image[0]);

      const {
        data: { publicUrl },
      } = supabase.storage.from('bucket-conversa-ai').getPublicUrl(filePath);

      const image = await onChatBotImageUpdate(id, publicUrl);

      if (image) {
        toast({
          title: image.status === 200 ? 'Sucesso!' : 'Erro',
          description: image.message,
        });
        setLoading(false);
      }
    }

    if (data.welcomeMessage) {
      const message = await onUpdateWelcomeMessage(data.welcomeMessage, id);

      if (message) {
        toast({ title: 'Sucesso!', description: message.message });
      }

      reset();
      router.refresh();
      setLoading(false);
    }
  });

  const onDeleteDomain = async (id: string) => {
    setDeleting(true);
    const deleted = await onDeleteUserDomain(id);

    if (deleted) {
      toast({
        title: 'Sucesso!',
        description: deleted.message,
      });
      setDeleting(false);
      router.refresh();
    }
  };

  return {
    errors,
    deleting,
    loading,
    register,
    onDeleteDomain,
    onUpdateSettings,
  };
};
