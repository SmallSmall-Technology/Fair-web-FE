// // src/__tests__/PaymentPlan.test.jsx
// import { render, screen } from '@testing-library/react';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { PaymentPlan } from '../pages/cartItems/cartItemsContent/PaymentPlan';
// import { useSelector } from 'react-redux';

// const mockProduct = {
//   productID: '66ffc3ddc1f515f411f4',
//   name: 'SAMSUNG GALAXY A34 6GB+128GB 5G',
//   price: 436975,
//   quantity: 1,
//   paymentPlan: 'daily',
//   selectedPaymentPlan: 'daily',
//   paymentOptionsBreakdown: [
//     {
//       type: 'daily',
//       label: 'Daily',
//       days: 90,
//       totalPrice: 436975,
//       downPayment: 1000,
//       installmentAmount: 200,
//       numberOfInstallments: 3,
//     },
//     {
//       type: 'weekly',
//       label: 'Weekly',
//       weeks: 12,
//       totalPrice: 436975,
//       downPayment: 2000,
//       installmentAmount: 500,
//       numberOfInstallments: 12,
//     },
//     {
//       type: 'monthly',
//       label: 'Monthly',
//       months: 3,
//       totalPrice: 436975,
//       downPayment: 3000,
//       installmentAmount: 1000,
//       numberOfInstallments: 3,
//     },
//     {
//       type: 'full',
//       label: 'Full Payment',
//       amount: 436975,
//       totalPrice: 436975,
//       description: 'Pay the full amount at once',
//     },
//   ],
// };

// // Mock Redux
// vi.mock('react-redux', () => ({
//   useSelector: vi.fn(),
// }));

// // Mock child components
// vi.mock(
//   '../../productCategories/productDetails/productPlan/FullPaymentPlan/CartItemFullPayment',
//   () => ({
//     default: ({ product }) => (
//       <section className="w-full px-2">
//         <p className="lg:ml-5 text-xs font-semibold mb-2 lg:mt-[-10px]">
//           Pay in full
//         </p>
//         <article className="flex">
//           <div className="flex space-x-5 w-full">
//             <div className="flex items-center space-x-2 min-w-fit">
//               <div className="h- w-7">
//                 <img
//                   alt="Pay in full now today payment icon"
//                   className="h-full w-full"
//                   src="/images/full-circle.svg"
//                 />
//               </div>
//               <div className="flex flex-col items-start">
//                 <p className="text-xs font-medium mt-1">
//                   ₦
//                   {(
//                     product.paymentOptionsBreakdown.find(
//                       (p) => p.type === 'full'
//                     )?.amount || 0
//                   ).toFixed(2)}
//                 </p>
//                 <span className="text-[11px] text-center min-w-fit bg-bl">
//                   Pay in full now today
//                 </span>
//               </div>
//             </div>
//           </div>
//         </article>
//       </section>
//     ),
//   })
// );

// vi.mock(
//   '../../productCategories/productDetails/productPlan/MonthlyPaymentPlan/CartItemMonthlyPayment',
//   () => ({
//     CartItemMonthlyPayment: ({ product }) => (
//       <section className="w-full px-2">
//         <p className="lg:ml-5 text-xs font-semibold mb-2 lg:mt-[-10px]">
//           Monthly
//         </p>
//         <article className="flex w-[95%] mx-auto overflow-x-auto custom-scrollbar-hidden">
//           <div className="flex gap-6">
//             <div className="flex items-center space-x-2 min-w-fit">
//               <div className="h- w-7">
//                 <img
//                   alt="Pay now today payment icon"
//                   className="h-full w-full"
//                   src="/images/quater-circle.svg"
//                 />
//               </div>
//               <div className="flex flex-col items-start">
//                 <p className="text-xs font-medium mt-1">
//                   ₦
//                   {(
//                     product.paymentOptionsBreakdown.find(
//                       (p) => p.type === 'monthly'
//                     )?.downPayment || 0
//                   ).toFixed(2)}
//                 </p>
//                 <span className="text-[11px] text-center min-w-fit bg-bl">
//                   Pay now today
//                 </span>
//               </div>
//             </div>
//             {Array.from(
//               {
//                 length:
//                   product.paymentOptionsBreakdown.find(
//                     (p) => p.type === 'monthly'
//                   )?.numberOfInstallments || 0,
//               },
//               (_, i) => (
//                 <div key={i} className="flex items-center space-x-2 min-w-fit">
//                   <div className="h- w-7">
//                     <img
//                       alt={`${i + 2}nd Payment payment icon`}
//                       className="h-full w-full"
//                       src={
//                         i === 2
//                           ? '/images/full-circle.svg'
//                           : i === 1
//                             ? '/images/one-third-circle.svg'
//                             : '/images/half-circle.svg'
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col items-start">
//                     <p className="text-xs font-medium mt-1">
//                       ₦
//                       {(
//                         product.paymentOptionsBreakdown.find(
//                           (p) => p.type === 'monthly'
//                         )?.installmentAmount || 0
//                       ).toFixed(2)}
//                     </p>
//                     <span className="text-[11px] text-center min-w-fit bg-bl">
//                       {i === 2 ? 'Final Payment' : `${i + 2}nd Payment`}
//                     </span>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         </article>
//       </section>
//     ),
//   })
// );

// vi.mock(
//   '../../productCategories/productDetails/productPlan/WeeklyPaymentPlan/CartItemWeeklyPayment',
//   () => ({
//     CartItemWeeklyPayment: ({ product }) => (
//       <section className="w-full px-2">
//         <p className="lg:ml-5 text-xs font-semibold mb-2 lg:mt-[-10px]">
//           Weekly
//         </p>
//         <article className="flex w-[95%] mx-auto overflow-x-auto custom-scrollbar-hidden">
//           <div className="flex gap-6">
//             <div className="flex items-center space-x-2 min-w-fit">
//               <div className="h- w-7">
//                 <img
//                   alt="Pay now today payment icon"
//                   className="h-full w-full"
//                   src="/images/quater-circle.svg"
//                 />
//               </div>
//               <div className="flex flex-col items-start">
//                 <p className="text-xs font-medium mt-1">
//                   ₦
//                   {(
//                     product.paymentOptionsBreakdown.find(
//                       (p) => p.type === 'weekly'
//                     )?.downPayment || 0
//                   ).toFixed(2)}
//                 </p>
//                 <span className="text-[11px] text-center min-w-fit bg-bl">
//                   Pay now today
//                 </span>
//               </div>
//             </div>
//             {Array.from(
//               {
//                 length:
//                   product.paymentOptionsBreakdown.find(
//                     (p) => p.type === 'weekly'
//                   )?.numberOfInstallments || 0,
//               },
//               (_, i) => (
//                 <div key={i} className="flex items-center space-x-2 min-w-fit">
//                   <div className="h- w-7">
//                     <img
//                       alt={`${i + 2}nd Payment payment icon`}
//                       className="h-full w-full"
//                       src={
//                         i === 11
//                           ? '/images/full-circle.svg'
//                           : i === 2
//                             ? '/images/one-third-circle.svg'
//                             : '/images/half-circle.svg'
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col items-start">
//                     <p className="text-xs font-medium mt-1">
//                       ₦
//                       {(
//                         product.paymentOptionsBreakdown.find(
//                           (p) => p.type === 'weekly'
//                         )?.installmentAmount || 0
//                       ).toFixed(2)}
//                     </p>
//                     <span className="text-[11px] text-center min-w-fit bg-bl">
//                       {i === 11 ? 'Final Payment' : `${i + 2}nd Payment`}
//                     </span>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         </article>
//       </section>
//     ),
//   })
// );

// vi.mock(
//   '../../productCategories/productDetails/productPlan/DailyPaymentPlan/CartItemDailyPayment',
//   () => ({
//     CartItemDailyPayment: ({ product }) => (
//       <section className="w-full px-2">
//         <p className="lg:ml-5 text-xs font-semibold mb-2 lg:mt-[-10px]">
//           Daily
//         </p>
//         <article className="flex w-[95%] mx-auto overflow-x-auto custom-scrollbar-hidden">
//           <div className="flex gap-6">
//             <div className="flex items-center space-x-2 min-w-fit">
//               <div className="h- w-7">
//                 <img
//                   alt="Pay now today payment icon"
//                   className="h-full w-full"
//                   src="/images/quater-circle.svg"
//                 />
//               </div>
//               <div className="flex flex-col items-start">
//                 <p className="text-xs font-medium mt-1">
//                   ₦
//                   {(
//                     product.paymentOptionsBreakdown.find(
//                       (p) => p.type === 'daily'
//                     )?.downPayment || 0
//                   ).toFixed(2)}
//                 </p>
//                 <span className="text-[11px] text-center min-w-fit bg-bl">
//                   Pay now today
//                 </span>
//               </div>
//             </div>
//             {Array.from(
//               {
//                 length:
//                   product.paymentOptionsBreakdown.find(
//                     (p) => p.type === 'daily'
//                   )?.numberOfInstallments || 0,
//               },
//               (_, i) => (
//                 <div key={i} className="flex items-center space-x-2 min-w-fit">
//                   <div className="h- w-7">
//                     <img
//                       alt={`${i + 2}nd Payment payment icon`}
//                       className="h-full w-full"
//                       src={
//                         i === 2
//                           ? '/images/full-circle.svg'
//                           : i === 1
//                             ? '/images/one-third-circle.svg'
//                             : '/images/half-circle.svg'
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-col items-start">
//                     <p className="text-xs font-medium mt-1">
//                       ₦
//                       {(
//                         product.paymentOptionsBreakdown.find(
//                           (p) => p.type === 'daily'
//                         )?.installmentAmount || 0
//                       ).toFixed(2)}
//                     </p>
//                     <span className="text-[11px] text-center min-w-fit bg-bl">
//                       {i === 2 ? 'Final Payment' : `${i + 2}nd Payment`}
//                     </span>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         </article>
//       </section>
//     ),
//   })
// );

// describe('PaymentPlan', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//     useSelector.mockImplementation((selectorFn) =>
//       selectorFn({ cart: { quantity: 2 } })
//     );
//   });

//   it('renders FullPayment component when paymentPlan is set to "full"', () => {
//     const product = {
//       ...mockProduct,
//       paymentPlan: 'full',
//       selectedPaymentPlan: 'full',
//     };
//     render(<PaymentPlan item={product} />);
//     expect(
//       screen.getByText(/Pay in full/i, { selector: 'p' })
//     ).toBeInTheDocument(); // Target <p> specifically
//     expect(screen.getByText(/₦436,975.00/i)).toBeInTheDocument();
//     expect(screen.getByText(/Pay in full now today/i)).toBeInTheDocument();
//   });

//   it('renders MonthlyPayment component when paymentPlan is set to "monthly"', () => {
//     const product = {
//       ...mockProduct,
//       paymentPlan: 'monthly',
//       selectedPaymentPlan: 'monthly',
//     };
//     render(<PaymentPlan item={product} />);
//     expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
//     expect(screen.getByText(/₦3,000.00/i)).toBeInTheDocument();
//     expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
//   });

//   it('renders WeeklyPayment component when paymentPlan is set to "weekly"', () => {
//     const product = {
//       ...mockProduct,
//       paymentPlan: 'weekly',
//       selectedPaymentPlan: 'weekly',
//     };
//     render(<PaymentPlan item={product} />);
//     expect(screen.getByText(/Weekly/i)).toBeInTheDocument();
//     expect(screen.getByText(/₦2,000.00/i)).toBeInTheDocument();
//     expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
//   });

//   it('renders DailyPayment component when paymentPlan is set to "daily"', () => {
//     const product = {
//       ...mockProduct,
//       paymentPlan: 'daily',
//       selectedPaymentPlan: 'daily',
//     };
//     render(<PaymentPlan item={product} />);
//     expect(screen.getByText(/Daily/i)).toBeInTheDocument();
//     expect(screen.getByText(/₦1,000.00/i)).toBeInTheDocument();
//     expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
//   });

//   it('falls back to selectedPaymentPlan when paymentPlan is missing', () => {
//     const product = {
//       ...mockProduct,
//       paymentPlan: undefined,
//       selectedPaymentPlan: 'monthly',
//     };
//     render(<PaymentPlan item={product} />);
//     expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
//     expect(screen.getByText(/₦3,000.00/i)).toBeInTheDocument();
//     expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
//   });

//   it('handles missing paymentPlan and selectedPaymentPlan gracefully', () => {
//     const product = {
//       ...mockProduct,
//       paymentPlan: undefined,
//       selectedPaymentPlan: undefined,
//     };
//     render(<PaymentPlan item={product} />);
//     expect(screen.queryByText(/Daily/i)).not.toBeInTheDocument();
//     expect(screen.queryByText(/Weekly/i)).not.toBeInTheDocument();
//     expect(screen.queryByText(/Monthly/i)).not.toBeInTheDocument();
//     expect(screen.queryByText(/Pay in full/i)).not.toBeInTheDocument();
//   });

//   it('renders with different quantity from useSelector', () => {
//     useSelector.mockImplementation((selectorFn) =>
//       selectorFn({ cart: { quantity: 5 } })
//     );
//     const product = {
//       ...mockProduct,
//       paymentPlan: 'daily',
//       selectedPaymentPlan: 'daily',
//     };
//     render(<PaymentPlan item={product} />);
//     expect(screen.getByText(/Daily/i)).toBeInTheDocument();
//     expect(screen.getByText(/₦1,000.00/i)).toBeInTheDocument();
//     expect(screen.getByText(/Pay now today/i)).toBeInTheDocument();
//   });
// });
// src/__tests__/paymentPlan.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PaymentPlan } from '../pages/cartItems/cartItemsContent/PaymentPlan';
import { useSelector } from 'react-redux';

// Import actual child components
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
    // Add assertions for installments if needed, e.g.:
    // expect(screen.getByText(/₦1,000.00/i)).toBeInTheDocument(); // For 2nd, 3rd, Final payments
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
    // Add assertions for installments if needed, e.g.:
    // expect(screen.getByText(/₦500.00/i)).toBeInTheDocument(); // For 2nd to Final payments
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
    // Add assertions for installments if needed, e.g.:
    // expect(screen.getByText(/₦200.00/i)).toBeInTheDocument(); // For 2nd, 3rd, Final payments
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
    expect(screen.getByText(/₦1,000.00/i)).toBeInTheDocument(); // Update to ₦5,000.00 if quantity scales amounts
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
