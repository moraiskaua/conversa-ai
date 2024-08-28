'use client';

import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface UserTypeCardProps {
  value: string;
  title: string;
  text: string;
  userType: 'owner' | 'student';
  register: UseFormRegister<FieldValues>;
  setUserType: Dispatch<SetStateAction<'owner' | 'student'>>;
}

export const UserTypeCard = ({
  value,
  title,
  text,
  userType,
  register,
  setUserType,
}: UserTypeCardProps) => {
  return (
    <Label htmlFor={value}>
      <Card
        className={cn(
          'w-full cursor-pointer',
          userType === value && 'border-orange',
        )}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={cn(
                'flex justify-center p-3',
                userType === value && 'border-orange',
              )}
            >
              <User
                size={30}
                className={cn(
                  userType === value ? 'text-orange' : 'text-gray-400',
                )}
              />
            </Card>
            <div>
              <CardDescription
                className={cn(
                  'font-bold',
                  userType === value && 'text-iridium',
                )}
              >
                {title}
              </CardDescription>
              <CardDescription
                className={cn(
                  'font-light',
                  userType === value && 'text-gray-400',
                )}
              >
                {text}
              </CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                'size-4 rounded-full',
                userType === value ? 'bg-peach' : 'bg-transparent',
              )}
            >
              <Input
                {...register('type', {
                  onChange: e => setUserType(e.target.value),
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};
