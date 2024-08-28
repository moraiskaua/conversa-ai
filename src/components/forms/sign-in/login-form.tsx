'use client';

import { USER_LOGIN_FORM } from '@/constants/form';
import { useFormContext } from 'react-hook-form';
import FormGenerator from '../form-generator';

interface LoginFormProps {}

export const LoginForm = ({}: LoginFormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Entrar</h2>
      <p className="text-iridium md:text-sm">
        Você vai receber um código por email
      </p>
      {USER_LOGIN_FORM.map(field => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
};
