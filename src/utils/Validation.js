import { object, string } from 'yup';

export const addressSchema = object({
  state: string().required('State is required'),
  address: string()
    .min(5, 'Must be at least 5 characters')
    .required('Address is required'),
});

export const paymentOptionSchema = object({
  picked: string().required('Please select a payment option'),
});
