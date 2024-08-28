'use client';

import { useAuthContext } from '@/contexts/use-auth-context';
import { cn } from '@/lib/utils';

export const HighLightBar = () => {
  const { currentStep } = useAuthContext();

  return (
    <div className="grid grid-cols-3 gap-3">
      <div
        className={cn(
          'rounded-full h-2 col-span-1',
          currentStep === 1 ? 'bg-orange' : 'bg-platinum',
        )}
      />
      <div
        className={cn(
          'rounded-full h-2 col-span-1',
          currentStep === 2 ? 'bg-orange' : 'bg-platinum',
        )}
      />
      <div
        className={cn(
          'rounded-full h-2 col-span-1',
          currentStep === 3 ? 'bg-orange' : 'bg-platinum',
        )}
      />
    </div>
  );
};
