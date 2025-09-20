import { Link, useLocation, useParams } from 'react-router-dom';
import { DirectDebitSetupComplete } from './DirectDebitSetUpComplete';
import { DownPaymentSuccessForm } from './DownPaymentSuccessForm';
import { useQuery } from '@tanstack/react-query';
import { getOrderDetails } from '../../../../../../api/orderAPI';
import Stepper from '../../../../../../ui/components/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { use, useEffect } from 'react';
import { clearCart } from '../../../../../../features/cart/cartSlice';
import { resetFullPayment } from '../../../../../../features/order/fullPaymentSlice';
import { CartFooter } from '../../../../../cartItems/CartFooter';
import { setMandateData } from '../../../../../../features/paystack/mandateSlice';

const DirectDebitInitialized = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('orderid');
  const {
    data: orderDetails,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['paystackOrder', orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
  });

  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );

  const paystackOrderReference = useSelector(
    (state) => state.fullPayment.paystackOrderReference
  );

  useEffect(() => {
    if (downPaymentSuccess && paystackOrderReference) {
      dispatch(clearCart());
      dispatch(resetFullPayment());
      dispatch(setMandateData(null));
    }
  }, [downPaymentSuccess, paystackOrderReference, dispatch]);

  return (
    <div className="mx-8">
      <header className="w-full py-8 md:pt-16 text-center grid md:flex justify-center ">
        <Link to="/" className="w-[149px] mb-4 md:mb-0">
          <img
            src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
            alt="Smallsmall Logo"
            loading="eager"
            className="motion-safe:transition-transform w-full"
          />
        </Link>
      </header>
      <Stepper currentStep={3} totalSteps={3} />

      <section className="mt-8 md:flex md:max-w-6xl mx-auto md:space-x-14 space-y-8 md:space-y-0 justify-between">
        {isFetching ? (
          <div className="w-full animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="flex flex-col gap-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : isError ? (
          <p className="text-red-600 text-center">
            Error loading order details.
          </p>
        ) : (
          <>
            <DownPaymentSuccessForm orderDetails={orderDetails} />
            <DirectDebitSetupComplete orderDetails={orderDetails} />
          </>
        )}
      </section>
      <CartFooter />
    </div>
  );
};

export default DirectDebitInitialized;
