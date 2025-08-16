import httpClient from './http-clients';

export const updateUser = async (data) => {
  const response = await httpClient.patch('user/update-user-profile', data);
  return response.data;
};

export const uploadUserDeliveryAddress = async (data) => {
  const response = await httpClient.post('user/add-delivery-address', data);
  return response.data;
};

export const fetchUserDeliveryAddresses = async () => {
  const response = await httpClient.get('user/all-delivery-address');
  return response.data;
};

export const deleteUserDeliveryAddress = async (id) => {
  const response = await httpClient.delete(
    `user/delete-delivery-address/${id}`
  );
  return response.data;
};

export const updateUserDeliveryAddress = async (id, data) => {
  const response = await httpClient.post(
    `user/update-delivery-address/${id}`,
    data
  );
  return response.data;
};

export const getUser = async () => {
  const response = await httpClient.get('users/get-user');
  return response.data;
};

export const verifyAccountByID = async (data) => {
  const response = await httpClient.post('user/verify-id', data);
  return response.data;
};

export const verifyAccountByAddress = async (data) => {
  const response = await httpClient.patch('user/update-user-profile', data);
  return response.data;
};

export const verifyDebtProfile = async (data) => {
  const response = await httpClient.post('user/verify-debt', data);
  return response.data;
};

// export const getUser = async () => {
//   const token = localStorage.getItem('authToken');
//   const response = await httpClient.get('users/get-user', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };
