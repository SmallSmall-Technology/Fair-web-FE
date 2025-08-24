import { useMemo } from 'react';

export const usePaymentOptions = (product: any) => {
  return useMemo(() => {
    if (!product) return [];
    const { paymentOptionsBreakdown } = product;

    return typeof paymentOptionsBreakdown === 'string'
      ? JSON.parse(paymentOptionsBreakdown || '[]')
      : paymentOptionsBreakdown || [];
  }, [product]);
};
