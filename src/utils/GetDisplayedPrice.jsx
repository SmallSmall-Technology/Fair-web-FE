import { formatCurrency } from './FormatCurrency';

export const getDisplayedPrice = ({
  paymentPlan,
  paymentOptionsBreakdown,
  fairAppPrice,
  quantity = 1,
}) => {
  switch (paymentPlan) {
    case 'full':
      return formatCurrency(
        (paymentOptionsBreakdown?.[3]?.amount ?? fairAppPrice) * quantity
      );
    case 'monthly':
      return formatCurrency(
        (paymentOptionsBreakdown?.[0]?.totalPrice ?? 0) * quantity
      );
    case 'weekly':
      return formatCurrency(
        (paymentOptionsBreakdown?.[1]?.totalPrice ?? 0) * quantity
      );
    case 'daily':
      return formatCurrency(
        (paymentOptionsBreakdown?.[2]?.totalPrice ?? 0) * quantity
      );
    default:
      return formatCurrency(fairAppPrice * quantity);
  }
};
