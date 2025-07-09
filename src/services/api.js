import axios from 'axios';

export const fetchAllProducts = async () => {
  const response = await axios.get('http://localhost:8000/products');
  // console.log(response.data);
  return response.data;
};

export const pushToCart = async () => {
  const response = await axios.get('http://localhost:8000/cart');
  // console.log(response.data);
  return response.data;
};
