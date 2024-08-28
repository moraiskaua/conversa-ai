'use client';

import { useAuthContext } from '@/contexts/use-auth-context';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TypeSelectionForm } from './type-selection-form';
import dynamic from 'next/dynamic';
import { Spinner } from '@/components/spinner';

const DetailForm = dynamic(() => import('./account-details-form'), {
  ssr: false,
  loading: () => <Spinner />,
});

const OTPForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  loading: () => <Spinner />,
});

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
      return <DetailForm errors={errors} register={register} />;
    case 3:
      return <OTPForm onOTP={onOTP} setOTP={setOnOTP} />;
  }
};
