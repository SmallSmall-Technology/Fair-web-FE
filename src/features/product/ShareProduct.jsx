export const handleShareProduct = (product) => {
  if (navigator.share) {
    navigator
      .share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      })
      .then(() => console.log('Product shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
  } else {
    alert('Web Share API not supported on this browser.');
  }
};
