export const fetchAllProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchAllOrders = async () => {
  const response = await fetch("http://localhost:3000/orders");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
