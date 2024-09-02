'use server';

import { prisma } from '@/lib/prisma';
import { clerkClient, currentUser } from '@clerk/nextjs/server';

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const subscription = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    const domainExists = await prisma.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });

    if (!domainExists) {
      if (
        (subscription?.subscription?.plan == 'STANDARD' &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan == 'PRO' &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan == 'ULTIMATE' &&
          subscription._count.domains < 10)
      ) {
        const newDomain = await prisma.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create: {
                    welcomeMessage:
                      'Olá! Tem alguma dúvida? Envie uma mensagem para a gente aqui.',
                  },
                },
              },
            },
          },
        });

        if (newDomain) {
          return { status: 200, message: 'Domínio adicionado com sucesso' };
        }
      }
      return {
        status: 400,
        message: 'Você atingiu o número máximo de domínios, atualize seu plano',
      };
    }
    return {
      status: 400,
      message: 'Esse domínio já existe',
    };
  } catch (error) {
    console.log(error);
  }
};

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
  } catch (error) {
    return { error };
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

export const onUpdatePassword = async (password: string) => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const update = await clerkClient.users.updateUser(user.id, { password });

    if (update) {
      return { status: 200, message: 'Senha alterada com sucesso!' };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetCurrentDomainInfo = async (domain: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const userDomain = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            name: {
              contains: domain,
            },
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            products: true,
            chatBot: {
              select: {
                id: true,
                welcomeMessage: true,
                icon: true,
              },
            },
          },
        },
      },
    });
    if (userDomain) {
      return userDomain;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateDomain = async (id: string, name: string) => {
  try {
    const domainAlreadyExists = prisma.domain.findFirst({
      where: { name: { contains: name } },
    });

    if (!domainAlreadyExists) {
      const domain = await prisma.domain.update({
        where: { id },
        data: {
          name,
        },
      });

      if (domain) {
        return { status: 200, message: 'Domínio atualizado!' };
      }

      return { status: 400, message: 'Oops, algo deu errado.' };
    }

    return { status: 400, message: 'Esse domínio já está em uso.' };
  } catch (error) {
    console.log(error);
  }
};

export const onChatBotImageUpdate = async (id: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const domain = await prisma.domain.update({
      where: { id },
      data: {
        chatBot: {
          update: {
            data: {
              icon,
            },
          },
        },
      },
    });

    if (domain) {
      return { status: 200, message: 'Domínio atualizado!' };
    }

    return {
      status: 400,
      message: 'Oops, algo deu errado.',
    };
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateWelcomeMessage = async (
  message: string,
  domainId: string,
) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const update = await prisma.domain.update({
      where: {
        id: domainId,
      },
      data: {
        chatBot: {
          update: {
            welcomeMessage: message,
          },
        },
      },
    });

    if (update) {
      return { status: 200, message: 'Mensagem atualizada!' };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onDeleteUserDomain = async (id: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const isDomainOwner = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (isDomainOwner) {
      const deletedDomain = await prisma.domain.delete({
        where: {
          userId: isDomainOwner.id,
          id,
        },
        select: {
          name: true,
        },
      });

      if (deletedDomain) {
        return {
          status: 200,
          message: `${deletedDomain.name} foi deletado com sucesso!`,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
