import httpClient from './http-clients';

export const createPaystackOrder = async (data) => {
  const response = await httpClient.post('orders/create-paystack-order', data);
  return response.data;
};

export const validateFullOrDownPayment = async (reference) => {
  const response = await httpClient.post('orders/validate-paystack-payment', {
    reference,
  });
  return response.data.data;
};

// export const payInFull = async (data) => {
//   const response = await httpClient.post('orders/create-paystack-order', data);
//   return response.data;
// };

export const createPaystackMandate = async (data) => {
  const response = await httpClient.post(
    'orders/create-paystack-mandate',
    data
  );
  return response.data;
};

export const getOrderDetails = async (orderId) => {
  const response = await httpClient.get(`/orders/get-single-order/${orderId}`);
  return response.data;
};
