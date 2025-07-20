import httpClient from './http-clients';

export const updateUser = async (data) => {
  const response = await httpClient.patch('user/update-user-profile', data);
  return response.data;
};

export const getUser = async () => {
  const response = await httpClient.get('users/get-user');
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
