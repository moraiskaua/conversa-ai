'use client';

import { useAuthContext } from '@/contexts/use-auth-context';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TypeSelectionForm } from './type-selection-form';

export const RegistrationStep = () => {
  const [onOTP, setOnOTP] = useState<string>('');
  const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner');
  const { currentStep } = useAuthContext();
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  setValue('otp', onOTP);

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      );
    case 2:
    case 3:
  }
};
