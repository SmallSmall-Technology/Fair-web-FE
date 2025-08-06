// Helper to get icon dynamically
export function getPaymentIcon(index, total) {
  const icons = [
    '/images/half-circle.svg',
    '/images/one-third-circle.svg',
    '/images/full-circle.svg',
  ];
  return icons[index] || '/images/full-circle.svg';
}
