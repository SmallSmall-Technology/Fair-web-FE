import httpClient from './http-clients';

// export const createMonoCustomer = async (data) => {
//   const response = await httpClient.post('orders/create-mono-customer', data);
//   return response.data;
// };

// export const getBanksList = async () => {
//   const response = await httpClient.get('orders/get-bank-list');
//   return response.data.data;
// };

// export const validateAccountNumber = async (data) => {
//   const response = await httpClient.post(
//     'orders/validate-account-number',
//     data
//   );
//   return response.data.data;
// };

export const createPaystackMandate = async (data) => {
  const response = await httpClient.post(
    'orders/create-paystack-order-mandate',
    data
  );
  return response.data;
};
