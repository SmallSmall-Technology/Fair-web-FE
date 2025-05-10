import { CartFooter } from './CartFooter';
import Header from '../../ui/components/header/Header';
import CartItemsContentSection from './cartItemsContent/CartItemsContentSection';

const CartItems = () => {
  return (
    <>
      <Header />
      <CartItemsContentSection />
      <div className="lg:mx-[60px] pb-10 mt-40">
        <CartFooter />
      </div>
    </>
  );
};

export default CartItems;
