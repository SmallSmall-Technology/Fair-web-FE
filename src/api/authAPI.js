import httpClient from './http-clients';

export const signUp = async (data) => {
  const response = await httpClient.post('auth/register/', data);
  return response.data;
};

export const login = async (data) => {
  const response = await httpClient.post('auth/login/', data);
  return response.data;
};
