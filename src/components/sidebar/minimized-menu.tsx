import { SIDE_BAR_MENU } from '@/constants/menu';

import React from 'react';

import { LogOut } from 'lucide-react';
import { MenuItem } from './menu-item';
import { DomainMenu } from './domain-menu';
import Image from 'next/image';

type MinMenuProps = {
  onShrink(): void;
  current: string;
  onSignOut(): void;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

export const MinMenu = ({
  onShrink,
  current,
  onSignOut,
  domains,
}: MinMenuProps) => {
  return (
    <div className="p-3 flex flex-col items-center h-full">
      <span
        className="animate-fade-in opacity-0 delay-300 fill-mode-forwards cursor-pointer"
        role="button"
        onClick={onShrink}
      >
        <Image
          src="/images/logo.png"
          alt="Logo"
          sizes="60vw"
          style={{
            width: '60px',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
      </span>
      <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem size="min" {...menu} key={key} current={current} />
          ))}
          <DomainMenu min domains={domains} />
        </div>
        <div className="flex flex-col">
          <MenuItem
            size="min"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </div>
  );
};
