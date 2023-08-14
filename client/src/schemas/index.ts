import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string({required_error: 'Required'})
    .email('Please enter a valid email address'),

  password: z
    .string({required_error: 'Required'})
    .min(4, 'Password should be at least 4 characters long'),
});

export const registerFormSchema = z
  .object({
    name: z
      .string({required_error: 'Required'})
      .min(2, 'Name should be at least 2 characters long'),

    email: z
      .string({required_error: 'Required'})
      .email('Please enter a valid email address'),

    password: z
      .string({required_error: 'Required'})
      .min(4, 'Password should be at least 4 characters long'),

    confirmPassword: z.string({required_error: 'Required'}),
  })
  .refine(formData => formData.password === formData.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords dont match',
  });
