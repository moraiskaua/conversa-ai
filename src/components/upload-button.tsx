import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Edit } from 'lucide-react';
import { ErrorMessage } from '@hookform/error-message';
import { Label } from './ui/label';
import { Input } from './ui/input';

type UploadButtonProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  label: string;
};

export const UploadButton = ({
  errors,
  label,
  register,
}: UploadButtonProps) => {
  return (
    <>
      <div className="felx gap-2 items-center">
        <Label
          htmlFor="upload-button"
          className="flex gap-2 p-3 rounded-lg bg-cream text-gray-600 cursor-pointer font-semibold text-sm items-center"
        >
          <Input
            {...register('image')}
            className="hidden"
            type="file"
            id="upload-button"
          />
          <Edit />
          {label}
        </Label>
        <p className="text-sm text-gray-400 ml-4 mt-2">
          O tamanho recomendado é 300px * 300px, menor que 2 MB
        </p>
      </div>
      <ErrorMessage
        errors={errors}
        name="image"
        render={({ message }) => (
          <p className="text-red-400 mt-2">
            {message === 'Required' ? '' : message}
          </p>
        )}
      />
    </>
  );
};
