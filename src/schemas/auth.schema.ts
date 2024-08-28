import { ZodType, z } from 'zod';

export interface UserRegistration {
  type: string;
  fullname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

export const userRegistrationSchema: ZodType<UserRegistration> = z
  .object({
    type: z.string().min(1),
    fullname: z.string().min(4, {
      message: 'Seu nome deve ter pelo menos 4 caracteres',
    }),
    email: z.string().email({ message: 'Formato de email incorreto' }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Sua senha deve ter pelo menos 8 caracteres' })
      .max(64, {
        message: 'Sua senha não pode ter mais de 64 caracteres',
      })
      .refine(
        value => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'A senha deve conter apenas letras e números',
      ),
    confirmPassword: z.string(),
    otp: z
      .string()
      .min(6, { message: 'Você deve inserir um código de 6 dígitos' }),
  })
  .refine(schema => schema.password === schema.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
  .refine(schema => schema.email === schema.confirmEmail, {
    message: 'Os emails não coincidem',
    path: ['confirmEmail'],
  });

export type UserLogin = {
  email: string;
  password: string;
};

export type ChangePassword = {
  password: string;
  confirmPassword: string;
};

export const userLoginSchema: ZodType<UserLogin> = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido' }),
  password: z
    .string()
    .min(8, { message: 'Sua senha deve ter pelo menos 8 caracteres' })
    .max(64, {
      message: 'Sua senha não pode ter mais de 64 caracteres',
    }),
});

export const changePasswordSchema: ZodType<ChangePassword> = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Sua senha deve ter no mínimo 8 caracteres' })
      .max(64, {
        message: 'Sua senha não deve exceder 64 caracteres',
      })
      .refine(
        value => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'A senha deve conter apenas letras e números',
      ),
    confirmPassword: z.string(),
  })
  .refine(schema => schema.password === schema.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });
