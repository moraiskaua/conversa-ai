'use client';

import { useChangePassword } from '@/hooks/use-settings';
import { Section } from '../section-label';
import FormGenerator from '../forms/form-generator';
import { Button } from '../ui/button';
import { Loader } from '../loader';

export const ChangePassword = () => {
  const { loading, errors, register, onChangePassword } = useChangePassword();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section label="Mudar senhar" message="Troque sua senha" />
      </div>
      <form onSubmit={onChangePassword} className="lg:col-span-4">
        <div className="lg:w-[500px] flex flex-col gap-3">
          <FormGenerator
            register={register}
            errors={errors}
            name="password"
            placeholder="Nova senha"
            type="text"
            inputType="input"
          />
          <FormGenerator
            register={register}
            errors={errors}
            name="confirmPassword"
            placeholder="Confirmar senha"
            type="text"
            inputType="input"
          />
          <Button className="bg-grandis hover:bg-amber-600/50 text-gray-700 font-semibold">
            <Loader loading={loading}>Confirmar</Loader>
          </Button>
        </div>
      </form>
    </div>
  );
};
