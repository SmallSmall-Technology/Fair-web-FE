import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCalculateTotals } from '../hooks/useCalculateTotals';

describe('useCalculateTotals', () => {
  it('should correctly calculate VAT, subtotal, and total', () => {
    const { result } = renderHook(() =>
      useCalculateTotals({
        totalCartPrice: 10000,
        shippingFee: 2000,
        vatRate: 7.5,
      })
    );

    expect(result.current.VAT).toBe(750);
    expect(result.current.subTotal).toBe(12750);
    expect(result.current.total).toBe(12750);
  });

  it('should handle zero shipping fee', () => {
    const { result } = renderHook(() =>
      useCalculateTotals({ totalCartPrice: 5000, shippingFee: 0 })
    );

    expect(result.current.VAT).toBe(375);
    expect(result.current.total).toBe(5375);
  });

  it('should default subtotal to 0 if totalCartPrice is 0', () => {
    const { result } = renderHook(() =>
      useCalculateTotals({ totalCartPrice: 0, shippingFee: 1000 })
    );

    expect(result.current.subTotal).toBe(1000);
    expect(result.current.total).toBe(1000);
  });
});
