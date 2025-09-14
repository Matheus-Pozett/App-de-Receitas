import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.email({ error: 'email inválido' }),
  password: z.string().min(7, { error: 'Senha deve ter pelo menos 7 caracteres' }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
