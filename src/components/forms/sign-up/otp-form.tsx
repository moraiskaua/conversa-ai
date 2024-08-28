import { OTPInput } from '@/components/otp';
import { Dispatch, SetStateAction } from 'react';

interface OTPFormProps {
  onOTP: string;
  setOTP: Dispatch<SetStateAction<string>>;
}

const OTPForm = ({ onOTP, setOTP }: OTPFormProps) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">
        Código de verificação
      </h2>
      <p>Digite o código enviado para o seu email.</p>
      <div className="w-full justify-center flex py-5">
        <OTPInput otp={onOTP} setOtp={setOTP} />
      </div>
    </>
  );
};

export default OTPForm;
