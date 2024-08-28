'use client';

import { cn } from '@/lib/utils';
import { Section } from '../section-label';
import { useThemeMode } from '@/hooks/use-settings';
import { SystemMode } from '../theme-placeholder/system-mode';
import { LightMode } from '../theme-placeholder/light-mode';
import { DarkMode } from '../theme-placeholder/dark-mode';

export const DarkModeToggle = () => {
  const { theme, setTheme } = useThemeMode();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Tema da interface"
          message="Escolha o tema da sua interface."
        />
      </div>
      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
        <div
          className={cn(
            'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
            theme === 'system' && 'border-orange',
          )}
          role="button"
          onClick={() => setTheme('system')}
        >
          <SystemMode />
        </div>
        <div
          className={cn(
            'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
            theme === 'light' && 'border-orange',
          )}
          role="button"
          onClick={() => setTheme('light')}
        >
          <LightMode />
        </div>
        <div
          className={cn(
            'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
            theme === 'dark' && 'border-orange',
          )}
          role="button"
          onClick={() => setTheme('dark')}
        >
          <DarkMode />
        </div>
      </div>
    </div>
  );
};
