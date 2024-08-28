'use client';

import { useSideBar } from '@/contexts/use-sidebar';
import { cn } from '@/lib/utils';
import MaxMenu from './maximized-menu';
import { MinMenu } from './minimized-menu';

interface SideBarProp {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
}

export const SideBar = ({ domains }: SideBarProp) => {
  const { expand, page, onExpand, onSignOut } = useSideBar();

  return (
    <div
      className={cn(
        'bg-cream h-full w-[60px] fill-mode-forwards fixed md:relative',
        expand === true ? 'animate-open-sidebar' : 'animate-close-sidebar',
      )}
    >
      {expand ? (
        <MaxMenu
          domains={domains}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          domains={domains}
          current={page!}
          onShrink={onExpand}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
};
