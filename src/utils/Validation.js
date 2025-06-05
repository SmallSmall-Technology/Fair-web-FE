import { z } from 'zod';

export const addressSchema = z.object({
  state: z.string().min(1, 'State is required'),
  address: z.string().min(5, 'Must be at least 5 characters'),
});

export const paymentOptionSchema = z.object({
  picked: z.string().min(1, 'Please select a payment option'),
});
