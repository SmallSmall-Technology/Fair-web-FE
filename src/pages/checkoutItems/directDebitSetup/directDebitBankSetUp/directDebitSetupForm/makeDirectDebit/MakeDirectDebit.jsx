import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '../../../../../../utils/Button';
import { formatCurrency } from '../../../../../../utils/FormatCurrency';
import {
  createPaystackMandate,
  createPaystackOrder,
  getOrderDetails,
} from '../../../../../../api/orderAPI';
import { consolidateCartPayments } from '../../../../../../utils/ConsolidateCartPayment';
import { Link } from 'react-router-dom';
import { GlobalMandateTermsModal } from './directDebitMandateModals/GlobalMandateTermsModal';
import { DebitDirectMandateTermsModal } from './directDebitMandateModals/DebitDirectMandateTermsModal';
import { toast } from 'react-toastify';
import { setDirectDebitInitiation } from '../../../../../../features/order/fullPaymentSlice';

export const MakeDirectDebit = () => {
  const mandateData = useSelector((state) => state.mandate.data);
  const cart = useSelector((state) => state.cart.cart);
  const consolidatedPayments = consolidateCartPayments(cart);
  const [isGlobalModalOpen, setGlobalModalOpen] = useState(false);
  const [isDirectDebitModalOpen, setDirectDebitModalOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  const directDebitPaymentFrequency =
    consolidatedPayments?.otherPayments.length;

  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );
  const paystackOrderReference = useSelector(
    (state) => state.fullPayment.paystackOrderReference
  );

  const directDebitInitiation = useSelector(
    (state) => state.fullPayment.directDebitInitiation
  );

  console.log('orderId', orderId);

  const handleDisplayGlobalMandateModals = () => {
    setGlobalModalOpen((prev) => !prev);
  };
  const handleDisplayDirectDebitModal = () => {
    setDirectDebitModalOpen((prev) => !prev);
  };

  const { data: orderDetails } = useQuery({
    queryKey: ['paystackOrder', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: !!orderId,
  });

  console.log('orderDetails', orderDetails);

  const { mutate: createMandate, isPending: isValidating } = useMutation({
    mutationFn: () =>
      createPaystackMandate({ reference: paystackOrderReference }),
    onSuccess: (res) => {
      setOrderId(res?.data?.master_order_id);
      const redirectUrl = res.data?.redirect_url;
      if (redirectUrl) {
        window.open(redirectUrl, '_blank');
      }
      // if (redirectUrl) {
      //   window.location.href = redirectUrl;
      // }
      if (res.success === true) {
        dispatch(setDirectDebitInitiation(true));
      }
    },
    onError: (error) => {
      console.error('Mandate creation failed:', error);
      toast.error('Failed to create mandate. Please try again.');
    },
  });

  const handleCreateMandate = () => {
    if (!downPaymentSuccess) return;
    createMandate();
  };

  const items = {
    OrderID: mandateData?.master_order_id || null,
    products: [
      {
        name: 'Hisense Smart TV 55 inches',
        description: 'A 55-inch 4K UHD Smart TV with HDR and voice control',
      },
      {
        name: 'LG Refrigerator 300L',
        description:
          'Energy-efficient double-door refrigerator with smart inverter',
      },
      {
        name: 'Sony Home Theater System',
        description:
          '5.1 channel surround sound system with Bluetooth connectivity',
      },
    ],
    deliveryType: {
      type: 'STANDARD',
      price: '₦3,500',
    },
  };

  return (
    <>
      <section className="w-full">
        {!directDebitInitiation && (
          <p className="text-sm font-outfit mb-4 font-semibold">
            <span className="mr-1 font-normal">Step 2.</span>Make your direct
            debit
          </p>
        )}
        {directDebitInitiation ? (
          <article className="hidden md:block">
            <div className="rounded-xl border py-8 shadow-sm flex flex-col justify-start items-start bg-white border-[#DEDEDE]">
              <p className="text-sm font-semibold font-outfit text-start px-4 lg:px-6">
                SUMMARY OF YOUR PLACED ORDER!
              </p>

              <hr className=" border-t border-[#E5E5E5] my-4 px-6 w-[calc(100%-3rem)] flex mx-auto" />

              <div className="flex justify-between items-start px-4 lg:px-6">
                <div>
                  <p className="text-[13px] font-medium font-inter">ITEMS</p>
                  {items?.products?.map((product, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-[15px]">{product.name}</p>
                      <p className="text-xs font-inter text-gray-600">
                        {product.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  {items?.OrderID ? (
                    <span className="text-xs font-inter underline">
                      Order id - {items.OrderID}
                    </span>
                  ) : (
                    <span className="text-sm font-inter">
                      Order id - 11XHDY8 N/A
                    </span>
                  )}
                </div>
              </div>

              <hr className="w-full border-t border-[#E5E5E5] my-2" />

              <div className="flex justify-between items-center w-full mt-4 mb-2 px-4 lg:px-6">
                <p>DELIVERY ({items?.deliveryType.type})</p>
                <p>{items?.deliveryType.price}</p>
              </div>

              <hr className="w-full border-t border-[#E5E5E5] my-2" />

              <div className="flex justify-between items-center w-full mt-4 mb-2 px-4 lg:px-6">
                <p>DOWNPAYMENT</p>
                <p className="font-semibold font-outfit">
                  {formatCurrency(mandateData?.first_installment_payment)}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 mt-6 ml-6">
              <Link
                to="/user-dashboard/shopping-overview/purchases"
                className="flex items-center space-x-1  text-[#96959F]"
              >
                <p className="font-medium text-sm underline">
                  See order details
                </p>
              </Link>{' '}
              <span>or</span>
              <Link
                to="/"
                className="flex items-center space-x-1   text-[#96959F]"
              >
                <p className="font-medium text-sm underline">
                  Continue shopping{' '}
                </p>
                <span>
                  <img
                    src="/images/shopping-basket 1.svg"
                    alt="shopping basket"
                  />
                </span>
              </Link>
            </div>
          </article>
        ) : (
          <div
            className={`rounded-xl border p-4 lg:p-6 py-8 shadow-sm flex flex-col justify-center items-center
        ${downPaymentSuccess ? 'bg-white border-[#DEDEDE]' : 'bg-[#FFFFFF]  text-[#D9D9D9] cursor-not-allowed'}
      `}
          >
            <p className="text-lg font-semibold font-outfit">DIRECT DEBIT</p>
            <div className="border border-[#DEDEDE] w-full mx-10 mt-3 mb-4"></div>
            <p className="font-inter text-sm font-normal mb-3">
              Total Installment Amount
            </p>
            <p className="font-outfit font-semibold text-3xl mb-4">
              {formatCurrency(mandateData?.first_installment_payment)}
            </p>
            <p className="font-inter text-sm font-normal mb-3">
              Number of Installment
            </p>
            <p className="font-outfit font-semibold text-3xl mb-4">
              {directDebitPaymentFrequency}
            </p>

            <div className="w-full md:w-2/3">
              <CustomButton
                text={isValidating ? 'Setting up...' : 'Set up Direct Debit'}
                onClick={handleCreateMandate}
                disabled={isValidating || !downPaymentSuccess}
                bgColor={
                  downPaymentSuccess ? 'var(--yellow-primary)' : '#F6F6F6'
                }
                className={!downPaymentSuccess && 'text-[#E8EBEA] '}
              />
            </div>

            <p className="font-light text-[11px] text-center mt-6 mb-2 mx-8 w-[317px] text-balance">
              By clicking Setup direct debit, you agree to our{' '}
              <br className="hidden mb:block" />
              <span
                className="font-bold underline cursor-pointer"
                onClick={() => {
                  handleDisplayDirectDebitModal(true);
                }}
              >
                Direct debit terms of use,
              </span>{' '}
              <span
                className="font-bold underline cursor-pointer"
                onClick={() => {
                  handleDisplayGlobalMandateModals(true);
                }}
              >
                Global standing mandate terms of use
              </span>
              and{' '}
              <Link
                target="_blank"
                to="https://paystack.com/privacy/merchant"
                className="font-bold underline"
              >
                Paystack’s end-user policy
              </Link>
            </p>
            <p className="underline font-inter text-xs font-normal">
              What is direct debit?
            </p>
          </div>
        )}
      </section>
      <GlobalMandateTermsModal
        isOpen={isGlobalModalOpen}
        onRequestClose={() => handleDisplayGlobalMandateModals(false)}
      />
      <DebitDirectMandateTermsModal
        isOpen={isDirectDebitModalOpen}
        onRequestClose={() => handleDisplayDirectDebitModal(false)}
      />
    </>
  );
};
