import { z } from 'zod';

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export interface DomainSettings {
  domain?: string;
  image?: any;
  welcomeMessage?: string;
}

export interface HelpDeskQuestions {
  question: string;
  answer: string;
}

export interface AddProduct {
  name: string;
  image: any;
  price: string;
}

export interface FilterQuestions {
  question: string;
}

export const addDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: 'O domínio deve ter pelo menos 3 caracteres' })
    .refine(
      value =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''),
      'Esse não é um domínio válido',
    ),
  image: z
    .any()
    .refine(files => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: 'O arquivo deve ter no máximo 2MB',
    })
    .refine(files => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: 'Apenas arquivos JPG, JPEG e PNG são aceitos',
    }),
});

export const domainSettingsSchema = z
  .object({
    domain: z
      .string()
      .min(4, { message: 'O domínio deve ter pelo menos 3 caracteres' })
      .refine(
        value =>
          /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''),
        'Esse não é um domínio válido',
      )
      .optional()
      .or(z.literal('').transform(() => undefined)),
    image: z.any().optional(),
    welcomeMessage: z
      .string()
      .min(6, 'A mensagem deve ter pelo menos 6 caracteres')
      .optional()
      .or(z.literal('').transform(() => undefined)),
  })
  .refine(
    schema => {
      if (schema.image?.length) {
        if (
          ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
          schema.image?.[0].size <= MAX_UPLOAD_SIZE
        ) {
          return true;
        }
      }
      if (!schema.image?.length) {
        return true;
      }
    },
    {
      message:
        'O arquivo deve ter no máximo 2MB, e apenas PNG, JPEG e JPG são aceitos',
      path: ['image'],
    },
  );

export const helpDeskQuestionsSchema = z.object({
  question: z
    .string()
    .min(1, { message: 'A pergunta não pode ficar em branco' }),
  answer: z.string().min(1, { message: 'A resposta não pode ficar em branco' }),
});

export const filterQuestionsSchema = z.object({
  question: z
    .string()
    .min(1, { message: 'A pergunta não pode ficar em branco' }),
});

export const addProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  image: z
    .any()
    .refine(files => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: 'O arquivo deve ter no máximo 2MB',
    })
    .refine(files => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: 'Apenas arquivos JPG, JPEG e PNG são aceitos',
    }),
  price: z.string(),
});
