import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import FormGenerator from '../form-generator';

interface DomainUpdateProps {
  name: string;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

export const DomainUpdate = ({ name, errors, register }: DomainUpdateProps) => {
  return (
    <div className="flex gap-2 pt-5 items-end w-[400px]">
      <FormGenerator
        label="Domínio"
        register={register}
        name="domain"
        errors={errors}
        type="text"
        inputType="input"
        placeholder={name}
      />
    </div>
  );
};
