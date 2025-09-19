import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '../../../../../api/orderAPI';
import { useEffect } from 'react';

export const useOrders = () => {
  const {
    data,
    isFetching,
    refetch: refetchOrders,
    ...rest
  } = useQuery({
    queryKey: ['allOrders'],
    queryFn: getAllOrders,
    // refetchInterval: 5000,
    refetchOnWindowFocus: 'always',
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
      ['failed', 'cancelled'].includes(order.orderStatus) ||
      order.fullPaymentStatus === 'failed'
  );

  const pendingOrders = allOrders.filter(
    (order) =>
      ['pending'].includes(order.orderStatus) ||
      order.fullPaymentStatus === 'pending'
  );

  return {
    allOrders,
    onGoingOrders,
    completedOrders,
    cancelledOrders,
    pendingOrders,
    isFetching,
    refetchOrders,
    ...rest,
  };
};
