'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const onGetSubscriptionPlan = async () => {
  try {
    const user = await currentUser();

    if (!user) return;

    const plan = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (plan) {
      return plan.subscription?.plan;
    }
  } catch {
    return { status: 400 };
  }
};

export const onGetAllAccountDomains = async () => {
  const user = await currentUser();
  if (!user) return;

  try {
    const domains = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return { ...domains };
  } catch {
    return { status: 400 };
  }
};
