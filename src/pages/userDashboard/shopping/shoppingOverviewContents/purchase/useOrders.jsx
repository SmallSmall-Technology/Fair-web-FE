// hooks/useOrders.js
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '../../../../../api/orderAPI';
// import { getAllOrders } from '../api/orderAPI';

export const useOrders = () => {
  const { data, isFetching, ...rest } = useQuery({
    queryKey: ['allOrders'],
    queryFn: getAllOrders,
    staleTime: 5 * 60 * 1000, // 5 mins
  });

  const allOrders = data?.orders || [];

  const onGoingOrders = allOrders.filter((order) =>
    [
      'direct_debit_in_progress',
      'pending_full_payment',
      'ongoing',
      'active',
    ].includes(order.orderStatus)
  );

  const completedOrders = allOrders.filter(
    (order) =>
      ['successful', 'completed'].includes(order.orderStatus) ||
      order.fullPaymentStatus === 'success'
  );

  const cancelledOrders = allOrders.filter(
    (order) =>
      ['failed', 'cancelled', 'pending'].includes(order.orderStatus) ||
      order.fullPaymentStatus === 'failed'
  );

  return {
    allOrders,
    onGoingOrders,
    completedOrders,
    cancelledOrders,
    isFetching,
    ...rest, // pass through other react-query values like error, refetch
  };
};
