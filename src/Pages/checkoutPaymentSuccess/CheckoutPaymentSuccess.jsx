import { Suspense } from "react";
import { CartFooter } from "../cartItems/CartFooter";
import { CheckoutPaymentFooter } from "./CheckoutPaymentFooter";
import { CheckoutPaymentSuccessHeader } from "./CheckoutPaymentSuccessHeader";
import { CheckoutPaymentSuccessContent } from "./CheckoutPaymentSuccessContent";

export const CheckoutPaymentSuccess = () => {
  return (
    <main className="h-screen flex flex-col justify-between items-center py-6 mx-4">
      <CheckoutPaymentSuccessHeader />
      <Suspense>
        <CheckoutPaymentSuccessContent />
      </Suspense>
      <div className="hidden lg:block mt-8 pb-6">
        <CheckoutPaymentFooter />
      </div>
      <div className="lg:hidden">
        <CartFooter />
      </div>
    </main>
  );
};
