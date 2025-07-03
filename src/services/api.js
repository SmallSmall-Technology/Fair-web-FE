// import httpClient from '../api';

export const fetchAllProducts = async () => {
  const response = await httpClient.get('/products');
  return response.data;
};

export const fetchAllOrders = async () => {
  const response = await httpClient.get('/orders');
  return response.data;
};

export const postPhoneNumber = async (phone) => {
  const response = await httpClient.post('validate-phone', { phone });
  return response.data;
};
