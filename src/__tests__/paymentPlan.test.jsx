import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PaymentPlan } from '../pages/cartItems/cartItemsContent/PaymentPlan';
import { useSelector } from 'react-redux';

import CartItemFullPayment from '../pages/productCategories/productDetails/productPlan/FullPaymentPlan/CartItemFullPayment';
import { CartItemMonthlyPayment } from '../pages/productCategories/productDetails/productPlan/MonthlyPaymentPlan/CartItemMonthlyPayment';
import { CartItemWeeklyPayment } from '../pages/productCategories/productDetails/productPlan/WeeklyPaymentPlan/CartItemWeeklyPayment';
import { CartItemDailyPayment } from '../pages/productCategories/productDetails/productPlan/DailyPaymentPlan/CartItemDailyPayment';

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    cart: (state = { quantity: 2 }) => state,
  },
});

// Mock useSelector for specific test cases
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

const mockProduct = {
  productID: '66ffc3ddc1f515f411f4',
  name: 'SAMSUNG GALAXY A34 6GB+128GB 5G',
  price: 436975,
  quantity: 1,
  paymentPlan: 'daily',
  selectedPaymentPlan: 'daily',
  paymentOptionsBreakdown: [
    {
      type: 'daily',
      label: 'Daily',
      days: 90,
      totalPrice: 436975,
      downPayment: 1000,
      installmentAmount: 200,
      numberOfInstallments: 3,
    },
    {
      type: 'weekly',
      label: 'Weekly',
      weeks: 12,
      totalPrice: 436975,
      downPayment: 2000,
      installmentAmount: 500,
      numberOfInstallments: 12,
    },
    {
      type: 'monthly',
      label: 'Monthly',
      months: 3,
      totalPrice: 436975,
      downPayment: 3000,
      installmentAmount: 1000,
      numberOfInstallments: 3,
    },
    {
      type: 'full',
      label: 'Full Payment',
      amount: 436975,
      totalPrice: 436975,
      description: 'Pay the full amount at once',
    },
  ],
};

describe('PaymentPlan', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ cart: { quantity: 2 } })
    );
  });

  // Helper to render with Redux Provider
  const renderWithProvider = (ui) => {
    return render(<Provider store={mockStore}>{ui}</Provider>);
  };

  it('renders FullPayment component when paymentPlan is set to "full"', () => {
    const product = {
      ...mockProduct,
      paymentPlan: 'full',
      selectedPaymentPlan: 'full',
    };
    renderWithProvider(<PaymentPlan item={product} />);
    expect(
      screen.getByText(/Pay in full/i, { selector: 'p' })
    ).toBeInTheDocument();
    expect(screen.getByText(/₦436,975.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Pay in full now today/i)).toBeInTheDocument();
  });

  it('renders MonthlyPayment component when paymentPlan is set to "monthly"', () => {
    const product = {
      ...mockProduct,
      paymentPlan: 'monthly',
      selectedPaymentPlan: 'monthly',
    };
    renderWithProvider(<PaymentPlan item={product} />);
    expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
    expect(screen.getByText(/₦3,000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
  });

  it('renders WeeklyPayment component when paymentPlan is set to "weekly"', () => {
    const product = {
      ...mockProduct,
      paymentPlan: 'weekly',
      selectedPaymentPlan: 'weekly',
    };
    renderWithProvider(<PaymentPlan item={product} />);
    expect(screen.getByText(/Weekly/i)).toBeInTheDocument();
    expect(screen.getByText(/₦2,000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
  });

  it('renders DailyPayment component when paymentPlan is set to "daily"', () => {
    const product = {
      ...mockProduct,
      paymentPlan: 'daily',
      selectedPaymentPlan: 'daily',
    };
    renderWithProvider(<PaymentPlan item={product} />);
    expect(screen.getByText(/Daily/i)).toBeInTheDocument();
    expect(screen.getByText(/₦1,000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
  });

  it('falls back to selectedPaymentPlan when paymentPlan is missing', () => {
    const product = {
      ...mockProduct,
      paymentPlan: undefined,
      selectedPaymentPlan: 'monthly',
    };
    renderWithProvider(<PaymentPlan item={product} />);
    expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
    expect(screen.getByText(/₦3,000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
  });

  it('handles missing paymentPlan and selectedPaymentPlan gracefully', () => {
    const product = {
      ...mockProduct,
      paymentPlan: undefined,
      selectedPaymentPlan: undefined,
    };
    renderWithProvider(<PaymentPlan item={product} />);
    expect(screen.queryByText(/Daily/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Weekly/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Monthly/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Pay in full/i)).not.toBeInTheDocument();
  });

  it('renders with different quantity from useSelector', () => {
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ cart: { quantity: 5 } })
    );
    const product = {
      ...mockProduct,
      paymentPlan: 'daily',
      selectedPaymentPlan: 'daily',
    };
    renderWithProvider(<PaymentPlan item={product} />);
    expect(screen.getByText(/Daily/i)).toBeInTheDocument();
    expect(screen.getByText(/₦1,000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
  });

  // Optional: Add test for invalid paymentPlan
  it('handles invalid paymentPlan gracefully', () => {
    const product = {
      ...mockProduct,
      paymentPlan: 'invalid',
      selectedPaymentPlan: 'invalid',
    };
    renderWithProvider(<PaymentPlan item={product} />);
    expect(screen.queryByText(/Daily/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Weekly/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Monthly/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Pay in full/i)).not.toBeInTheDocument();
  });
});
