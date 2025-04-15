import { CartFooter } from './CartFooter';
import Header from '../../ui/components/header/Header';
import CartItemsContentSection from './cartItemsContent/CartItemsContentSection';

export const CartItems = () => {
  return (
    <>
      <Header />
      <CartItemsContentSection />
      <div className="mx-6 lg:mx-[60px] pb-10 mt-40">
        <CartFooter />
      </div>
    </>
  );
};
