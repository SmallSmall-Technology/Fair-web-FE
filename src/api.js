export const fetchAllProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// fetchAllProducts()
//   .then((data) => console.log("Products fetched:", data))
//   .catch((error) => console.error("Fetch error:", error));
