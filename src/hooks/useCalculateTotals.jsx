// cartUtils.ts
export function useCalculateTotals({
  totalCartPrice,
  shippingFee = 0,
  vatRate = 7.5,
}) {
  const VAT = (vatRate / 100) * totalCartPrice;
  const subTotal = totalCartPrice + shippingFee + VAT || 0;
  const total = totalCartPrice + shippingFee + VAT;

  return { VAT, subTotal, total };
}
