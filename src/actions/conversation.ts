'use server';

import { prisma } from '@/lib/prisma';

export const onToggleRealTime = async (id: string, state: boolean) => {
  try {
    const chatRoom = await prisma.chatRoom.update({
      where: {
        id,
      },
      data: {
        live: state,
      },
      select: {
        id: true,
        live: true,
      },
    });

    if (chatRoom) {
      return {
        status: 200,
        message: chatRoom.live
          ? 'Chat em tempo real ativado'
          : 'Chat em tempo real desativado',
        chatRoom,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetConversationMode = async (id: string) => {
  try {
    const mode = prisma.chatRoom.findUnique({
      where: { id },
      select: {
        live: true,
      },
    });

    return mode;
  } catch (error) {
    console.log(error);
  }
};
