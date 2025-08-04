export const handleShareProduct = (product) => {
  if (navigator.share) {
    navigator
      .share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      })
      .catch((error) => console.error('Error sharing:', error));
  } else {
    alert('Web Share API not supported on this browser.');
  }
};
