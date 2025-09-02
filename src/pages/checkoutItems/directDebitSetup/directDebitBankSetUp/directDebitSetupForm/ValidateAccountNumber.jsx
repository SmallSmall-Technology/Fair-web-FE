import { set, useForm } from 'react-hook-form';
// import { validateAccountNumber } from '../../../../../api/orderAPI';
import { setMandateData } from '../../../../../features/paystack/mandateSlice';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

export const ValidateAccountNumber = ({
  selectedBank,
  accountNumber,
  setAccountNumber,
}) => {
  const mandateData = useSelector((state) => state.mandate.data);

  const {
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const {
    data,
    mutate: validateAcc,
    isPending: isValidating,
    isError,
  } = useMutation({
    mutationFn: () =>
      validateAccountNumber({
        nipCode: selectedBank?.code,
        accountNumber: accountNumber,
      }),
    onSuccess: (res) => {
      dispatch(
        setMandateData({
          bankCode: selectedBank?.code,
          accountNumber: res.accountNumber,
        })
      );
    },
  });

  console.log(isError, data);
  const handleValidateAccountNumber = () => {
    if (!selectedBank || accountNumber.length !== 10) return;
    validateAcc();
  };

  useEffect(() => {
    if (accountNumber.length === 10) {
      handleValidateAccountNumber();
    }
  }, [accountNumber]);

  return (
    <div>
      <div className="rounded-lg flex items-center mb-[10px]">
        <span className="mr-2 font-medium text-[11px] text-white bg-black p-2 py-[4px]">
          2
        </span>
        <p className="text-sm font-medium">Please enter your account number.</p>
      </div>

      <div
        className={`rounded-lg border p-6 shadow-sm ${
          !selectedBank ? 'opacity-30 pointer-events-none' : 'bg-white'
        }`}
      >
        <h3 className="text-[23px] font-bold mb-3">Account setup</h3>
        <label htmlFor="accountNumber" className="text-sm mb-2 block">
          Enter Account number
        </label>
        <input
          id="accountNumber"
          type="tel"
          inputMode="numeric"
          placeholder="Account Number"
          {...register('accountNumber', {
            required: true,
            minLength: 10,
            maxLength: 10,
            pattern: /^[0-9]+$/,
          })}
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
          className={`w-full px-3 py-2 border rounded-md mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
            !selectedBank ? 'border-[#DEDEDE]' : 'border-black'
          }`}
          disabled={!selectedBank}
        />
        {errors.accountNumber && (
          <p className="text-sm text-red-500 mb-2">
            Please enter a valid 10-digit account number
          </p>
        )}

        {isValidating && (
          <p className="text-sm text-gray-500">Validating account...</p>
        )}
        {data && (
          <p className="text-sm text-green-500 mb-2">{data?.accountName}</p>
        )}
        {isError && (
          <p className="text-sm text-red-500 mb-2">
            Account verification failed
          </p>
        )}
      </div>
    </div>
  );
};
