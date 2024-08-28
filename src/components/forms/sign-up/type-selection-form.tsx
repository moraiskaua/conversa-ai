import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { UserTypeCard } from './user-type-card';

interface TypeSelectionFormProps {
  userType: 'owner' | 'student';
  register: UseFormRegister<FieldValues>;
  setUserType: Dispatch<SetStateAction<'owner' | 'student'>>;
}

export const TypeSelectionForm = ({
  userType,
  register,
  setUserType,
}: TypeSelectionFormProps) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Crie uma conta</h2>
      <p className="text-iridium md:text-sm">
        Conte-nos sobre você! O que você faz? Vamos personalizar a sua
        <br /> experiência para que melhor se adapte a você.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="owner"
        title="Sou empresa"
        text="Configurar minha conta para minha empresa."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="student"
        title="Sou estudante"
        text="Procurando aprender sobre a ferramenta."
      />
    </>
  );
};
