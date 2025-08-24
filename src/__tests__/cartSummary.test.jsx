import { describe, it, expect } from 'vitest';
import { renderWithStore } from '../testUtils';
import { screen } from '@testing-library/react';
import { CartSummary } from '../pages/cartItems/cartItemsContent/CartSummary';

describe('CartSummary Integration Test', () => {
  it('renders totals correctly from Redux state', () => {
    const preloadedState = {
      cart: {
        cart: [{ id: 1, price: 5000, quantity: 2, paymentPlan: 'full' }],
      },
    };

    renderWithStore(<CartSummary />, { preloadedState });
  });
});
