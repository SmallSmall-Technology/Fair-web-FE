import httpClient from './http-clients';

// const fetchAllProducts = async () => {
//   const response = await httpClient.get();
//   return response.data;
// };

// Fetch all new products
export const fetchAllNewProducts = async () => {
  const response = await httpClient.get(
    'products/get-products?type=new&page=1&limit=50'
  );
  return response.data;
};

// Fetch all trending products
export const fetchSingleProduct = async (productId) => {
  const response = await httpClient.get(
    `/products/get-single-product/${productId}`
  );
  return response.data.data;
};

// Fetch products by category and subcategory
export const fetchProductsByCategoryAndSubcategory = async (
  category,
  subcategory
) => {
  const response = await httpClient.get(
    `products/subcategory?category=${category}&subcategory=${subcategory}`
  );
  return response.data;
};

// Fetch all products by category
export const getAllCategories = async () => {
  const response = await httpClient.get('products/categories');
  return response.data;
};

// Fetch products by category
export const getCategorySubcategories = async (category) => {
  const response = await httpClient.get(
    `products/single-categories/${category}`
  );
  return response.data;
};

// Toggle products for favourites
export const toggleProductToFavourite = async (productID) => {
  const response = await httpClient.post('products/toggle-favorite', {
    productID,
  });
  return response.data;
};

// Fetch favourite products
export const fetchFavouriteProducts = async () => {
  const response = await httpClient.get('/products/get-favourite-products');
  return response.data.data;
};

// Fetch products by search query
export const addReviewforProduct = async (data) => {
  const response = await httpClient.post('products/add-product-review', data);
  return response.data;
};

// Fetch reviews for a specific product
export const fetchReviewsForProduct = async (productId) => {
  const response = await httpClient.get(
    `products/get-product-reviews/${productId}`
  );
  return response.data;
};

export const fetchCartItems = async ({
  isAuthenticated,
  userId,
  cartSessionID,
}) => {
  try {
    const params = isAuthenticated ? { userId } : { cartSessionID };
    const response = await httpClient.get('/cart/view-cart', { params });
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch cart');
    }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    throw error.message || 'Failed to fetch cart';
  }
};
