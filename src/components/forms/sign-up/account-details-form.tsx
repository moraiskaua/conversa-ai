import { USER_REGISTRATION_FORM } from '@/constants/form';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import FormGenerator from '../form-generator';

interface AccountDetailsFormProps {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const AccountDetailsForm = ({ errors, register }: AccountDetailsFormProps) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Detalhes da conta</h2>
      <p>Digite seu email e senha</p>
      {USER_REGISTRATION_FORM.map(field => (
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

export default AccountDetailsForm;
