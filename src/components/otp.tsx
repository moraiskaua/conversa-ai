import { Dispatch, SetStateAction } from 'react';
import { InputOTP, InputOTPSlot } from './ui/input-otp';

interface OTPInputProps {
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
}

export const OTPInput = ({ otp, setOtp }: OTPInputProps) => {
  return (
    <InputOTP maxLength={6} value={otp} onChange={otp => setOtp(otp)}>
      <div className="flex gap-3">
        <div>
          <InputOTPSlot index={0} />
        </div>
        <div>
          <InputOTPSlot index={1} />
        </div>
        <div>
          <InputOTPSlot index={2} />
        </div>
        <div>
          <InputOTPSlot index={3} />
        </div>
        <div>
          <InputOTPSlot index={4} />
        </div>
        <div>
          <InputOTPSlot index={5} />
        </div>
      </div>
    </InputOTP>
  );
};
