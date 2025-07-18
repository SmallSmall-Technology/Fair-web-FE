import httpClient from './http-clients';

// const fetchAllProducts = async () => {
//   const response = await httpClient.get();
//   return response.data;
// };

export const fetchAllNewProducts = async () => {
  const response = await httpClient.get(
    'products/get-products?type=new&page=1&limit=50'
  );
  return response.data;
};

export const fetchSingleProduct = async (productId) => {
  const response = await httpClient.get(
    `/products/get-single-product/${productId}`
  );
  return response.data.data;
};

export const fetchProductsByCategoryAndSubcategory = async (
  category,
  subcategory
) => {
  const response = await httpClient.get(
    `products/subcategory?category=${category}&subcategory=${subcategory}`
  );
  return response.data;
};

export const getAllCategories = async () => {
  const response = await httpClient.get('products/categories');
  return response.data;
};
