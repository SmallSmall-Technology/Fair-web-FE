import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { createPaystackOrder } from '../api/orderAPI';
import { clearCart } from '../features/cart/cartSlice';

export function useCreateMandate() {
  const dispatch = useDispatch();

  const {
    mutate: createMandate,
    isPending: isValidating,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (mandateData) => createPaystackOrder(mandateData),
    onSuccess: (res) => {
      dispatch(clearCart());

      const redirectUrl = res.data?.redirect_url;
      if (redirectUrl) {
        window.open(redirectUrl, '_blank');
      }
    },
  });

  return {
    createMandate,
    isValidating,
    isSuccess,
    isError,
    error,
    data,
  };
}
