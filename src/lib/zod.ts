import { z } from 'zod';

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'First Name must be at least 1 characters.',
    })
    .max(32, { message: 'First name must be 32 characters or less.' }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last Name must be at least 1 characters.',
    })
    .max(32, { message: 'Last name must be 32 characters or less.' }),
  displayName: z
    .string()
    .max(32, { message: 'Display name must be 32 characters or less.' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
});

export const signInSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email(),
});

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'First Name must be at least 1 characters.',
    })
    .max(32, { message: 'First name must be 32 characters or less.' }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last Name must be at least 1 characters.',
    })
    .max(32, { message: 'Last name must be 32 characters or less.' }),
  displayName: z
    .string()
    .max(32, { message: 'Display name must be 32 characters or less.' }),
  identity: z.string(),
});
