import httpClient from './http-clients';

export const createPaystackMandate = async (data) => {
  const response = await httpClient.post('orders/create-paystack-order', data);
  return response.data;
};

export const validateFullOrDownPayment = async (reference) => {
  const response = await httpClient.get(
    `orders/validate-paystack-payment/${reference}`
  );
  return response.data;
};

// export const payInFull = async (data) => {
//   const response = await httpClient.post('orders/create-paystack-order', data);
//   return response.data;
// };
