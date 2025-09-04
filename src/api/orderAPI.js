import httpClient from './http-clients';

export const createPaystackMandate = async (data) => {
  const response = await httpClient.post(
    'orders/create-paystack-order-mandate',
    data
  );
  return response.data;
};
