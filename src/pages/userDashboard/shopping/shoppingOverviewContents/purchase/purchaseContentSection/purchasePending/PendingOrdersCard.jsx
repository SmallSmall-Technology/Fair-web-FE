import { useMutation } from '@tanstack/react-query';
import { createPaystackMandate } from '../../../../../../../api/orderAPI';
import { CustomButton } from '../../../../../../../utils/Button';
import { formatCurrency } from '../../../../../../../utils/FormatCurrency';
import { useOrders } from '../../useOrders';
import { setPaystackOrderReference } from '../../../../../../../features/order/fullPaymentSlice';

export const PendingOrdersCard = ({ order }) => {
  const { mutate: createMandate, isPending: isValidating } = useMutation({
    mutationFn: () => createPaystackMandate({ reference: order?.reference }),
    onSuccess: (res) => {
      const redirectUrl = res.data?.redirect_url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      if (res.success === true) {
        navigate(`/cart-items/checkout/direct-debit/success`);
      }
    },
    onError: (error) => {
      toast.error('Failed to create mandate. Please try again.');
    },
  });

  const handleCreateMandate = () => {
    if (!order.downPaymentStatus) return;
    createMandate();
  };

  return (
    <div className="border p-4 rounded-md mb-4">
      <div className="flex justify-between">
        <div>
          <p className="text-[11px]">Order number</p>
          <h3 className="text-base font-bold">
            {order?.items?.[0]?.orderID ?? 'N/A'}
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          {new Date(order?.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <p className="text-[11px]">Order amount</p>
        <h3 className="text-sm font-medium">
          {formatCurrency(order?.totalAmount)}
        </h3>
      </div>

      <div>
        <p className="text-[11px]">Item</p>
        <h3 className="text-sm font-medium">{order?.productName}</h3>
      </div>

      <div className="flex items-center space-x-2">
        <p className="font-medium text-[13px]">Downpayment paid:</p>
        <p className="">{formatCurrency(order?.downPaymentAmount)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <p className="font-medium text-[13px]">Number of installments:</p>
        <p className="">{order?.installmentCount}</p>
      </div>

      <div className="flex items-center space-x-2">
        <p className="font-medium text-[13px]">Instalment amount:</p>
        <p className="text-red-600">
          {formatCurrency(order?.totalAmount - order?.downPaymentAmount)}
        </p>
      </div>

      {/* <p className="font-medium text-[13px]">Your order is being processed</p> */}
      <p className="text-red-600 mb-2">
        Direct debit status: Not yet initiated
      </p>

      <CustomButton
        text={isValidating ? 'Setting up...' : 'Set up Direct Debit'}
        onClick={handleCreateMandate}
        width={'40%'}
        disabled={isValidating || order?.downPaymentStatus === 'pending'}
      />
    </div>
  );
};
