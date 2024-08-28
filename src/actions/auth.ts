'use server';

import { prisma } from '@/lib/prisma';

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string,
) => {
  try {
    const registered = await prisma.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: { create: {} },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (registered) {
      return { user: registered, status: 200 };
    }
  } catch {
    return { status: 400 };
  }
};
