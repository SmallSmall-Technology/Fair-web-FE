import { CartHeader } from './CartHeader';
import { CheckoutItemsContentSection } from './checkoutContents/CheckoutItemsContentSection';

export const CheckoutItems = () => {
  return (
    <main className="flex flex-col min-h-screen justify-between">
      <CartHeader />
      <hr className="mt-2 mb-8 hidden lg:block" />
      <CheckoutItemsContentSection />
    </main>
  );
};
