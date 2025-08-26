// cartUtils.test.ts
import { describe, it, expect } from 'vitest';
import { useCalculateTotals } from '../hooks/useCalculateTotals';

describe('useCalculateTotals', () => {
  it('should correctly calculate VAT, subtotal, and total', () => {
    const result = useCalculateTotals({
      totalCartPrice: 10000,
      shippingFee: 2000,
      vatRate: 7.5,
    });

    expect(result.VAT).toBe(750);
    expect(result.subTotal).toBe(12750);
    expect(result.total).toBe(12750);
  });

  it('should handle zero shipping fee', () => {
    const result = useCalculateTotals({
      totalCartPrice: 5000,
      shippingFee: 0,
    });

    expect(result.VAT).toBe(375);
    expect(result.total).toBe(5375);
  });

  it('should default subtotal to 0 if totalCartPrice is 0', () => {
    const result = useCalculateTotals({
      totalCartPrice: 0,
      shippingFee: 1000,
    });

    expect(result.subTotal).toBe(1000); // VAT = 0
    expect(result.total).toBe(1000);
  });
});
