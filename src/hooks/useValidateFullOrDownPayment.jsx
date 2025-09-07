import { useQuery } from '@tanstack/react-query';
import { validateFullOrDownPayment } from '../api/orderAPI';

export const useValidateFullOrDownPayment = (reference) => {
  return useQuery({
    queryKey: ['validateFullOrDownPayment', reference],
    queryFn: () => validateFullOrDownPayment(reference),
    enabled: !!reference,
  });
};
