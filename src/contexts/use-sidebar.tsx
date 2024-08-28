'use client';

import { useToast } from '@/components/ui/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useChatContext } from './use-chat-context';
import {
  onGetConversationMode,
  onToggleRealTime,
} from '@/actions/conversation';
import { useClerk } from '@clerk/nextjs';

export const useSideBar = () => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined);
  const [realTime, setRealTime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { signOut } = useClerk();
  const { chatRoom } = useChatContext();
  const page = pathname.split('/').pop();

  const onActiveRealTime = async (e: any) => {
    try {
      const realTime = await onToggleRealTime(
        chatRoom!,
        e.target.ariaChecked == 'true' ? false : true,
      );

      if (realTime) {
        setRealTime(realTime.chatRoom.live);
        toast({ title: 'Sucesso', description: realTime.message });
      }
    } catch (error) {}
  };

  const onGetCurrentMode = async () => {
    setLoading(true);
    const mode = await onGetConversationMode(chatRoom!);

    if (mode) {
      setRealTime(mode.live);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRoom) onGetCurrentMode();
  }, [chatRoom]);

  const onSignOut = () => signOut(() => router.push('/'));
  const onExpand = () => setExpand(prev => !prev);

  return {
    expand,
    page,
    realTime,
    chatRoom,
    loading,
    onExpand,
    onSignOut,
    onActiveRealTime,
  };
};
