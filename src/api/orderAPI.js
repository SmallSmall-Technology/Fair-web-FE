import httpClient from './http-clients';

export const createMonoCustomer = async (data) => {
  const response = await httpClient.post('orders/create-mono-customer', data);
  return response.data;
};

export const getMonoBanks = async () => {
  const response = await httpClient.get('orders/get-mono-bank-list');
  return response.data;
};

export const validateAccountNumber = async (nipCode, accountNumber) => {
  const response = await httpClient.post('orders/validate-account-number', {
    nipCode,
    accountNumber,
  });
  return response.data;
};
