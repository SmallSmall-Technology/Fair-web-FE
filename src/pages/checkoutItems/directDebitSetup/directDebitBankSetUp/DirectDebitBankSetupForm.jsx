import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Minus, Search } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMonoBanks, validateAccountNumber } from '../../../../api/orderAPI';
import {
  setAuthorized,
  setBankDetails,
  setMandateData,
} from '../../../../features/mono/mandateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const DirectDebitBankSetupForm = () => {
  const [search, setSearch] = useState('');
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const selectedBankName = watch('selectedBank');
  const accountNumber = watch('accountNumber');

  const navigate = useNavigate();

  const { data: monoBanks } = useQuery({
    queryKey: ['monoBanks'],
    queryFn: getMonoBanks,
  });

  const availableBanks = monoBanks?.data?.banks.filter(
    (bank) => bank?.direct_debit === true
  );
  const bankDetails = useSelector((state) => state.mandate.bankDetails);
  const mandateData = useSelector((state) => state.mandate.mandateData);

  const { mutate: validateAcc, isPending: isValidating } = useMutation({
    mutationFn: ({ nipCode, accountNumber }) =>
      validateAccountNumber(nipCode, accountNumber),
    onSuccess: (res) => {
      const isAuthorized = res.data?.status === 'successful';
      setVerified(isAuthorized);

      if (!isAuthorized) {
        toast.error('Account number not authorized');
        return; // 🚫 stop here
      }

      // If authorized → update state + navigate
      dispatch(setBankDetails(res?.data));
      dispatch(
        setMandateData({
          bankCode: res.data?.bankCode,
          accountNumber: res.data?.accountNumber,
        })
      );
      dispatch(setAuthorized(true));

      navigate('setup-2', {
        state: { mandateData: res.data, bankDetails: res.data },
      });
    },
  });

  const onSubmit = () => {
    const bankObj = availableBanks.find((b) => b.name === selectedBankName);
    if (!bankObj) return;

    const bankPayload = {
      nipCode: bankObj?.nip_code,
      accountNumber,
    };

    // only trigger validation — don't navigate here
    validateAcc(bankPayload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 pt-10 px-4 lg:px-6"
    >
      <div>
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 lg:mb-4 lg:opacity-0 overflow-x-aut">
          <div className="flex items-center gap-1">
            <span className="font-medium text-[11px] text-white bg-black px-1 lg:px-2 py-[3px] rounded-[1px]">
              1
            </span>
            <p className="flex items-center text-xs whitespace-nowrap">
              Bank Account <Minus />
            </p>
          </div>
          <div className="flex items-center gap-1 opacity-25">
            <span className="font-medium text-[11px] text-white bg-black px-1 lg:px-2 py-[3px] rounded-[1px]">
              2
            </span>
            <p className="flex items-center text-xs whitespace-nowrap">
              Authorize consent <Minus />
            </p>
          </div>
          <div className="flex items-center gap-1 opacity-25">
            <span className="font-medium text-[11px] text-white bg-black px-1 lg:px-2 py-[3px] rounded-[1px]">
              3
            </span>
            <p className="text-xs whitespace-nowrap">Setup Complete</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 lg:mb-2">Direct debit setup</h2>
        <div className="flex items-center mb-2">
          <span className="mr-2 font-medium text-[11px] text-white bg-black p-2 py-[4px]">
            1
          </span>
          <p className="text-sm font-medium">
            Start by selecting your bank from the list below
          </p>
        </div>

        {/* Bank Select */}
        <div className="bg-white rounded-lg border p-4 lg:p-6 shadow-sm">
          <p className="text-[23px] font-bold mb-2">Select your bank</p>
          <div className="relative w-full mb-8">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search />
            </span>
            <input
              type="text"
              placeholder="Search bank..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <ul className="space-y-3 max-h-72 overflow-auto">
            {availableBanks
              ?.filter((bank) =>
                bank.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((bank) => (
                <li
                  key={bank.nip_code}
                  className={`text-sm font-medium flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 ${
                    selectedBankName === bank.name
                      ? 'bg-gray-100 border-black'
                      : ''
                  }`}
                  onClick={() => setValue('selectedBank', bank.name)}
                >
                  <span>{bank.name}</span>
                  <input
                    type="radio"
                    {...register('selectedBank', { required: true })}
                    checked={selectedBankName === bank.name}
                    value={bank.name}
                    className="accent-black"
                  />
                </li>
              ))}
          </ul>
          {errors.selectedBank && (
            <p className="text-sm text-red-500 mt-1">Please select a bank</p>
          )}
        </div>
      </div>

      {/* Right Column */}
      <aside>
        <div className="rounded-lg flex items-center mb-[10px]">
          <span className="mr-2 font-medium text-[11px] text-white bg-black p-2 py-[4px]">
            2
          </span>
          <p className="text-sm font-medium">
            Please enter your account number for your selected bank.
          </p>
        </div>

        <div
          className={`rounded-lg border p-6 shadow-sm ${
            !selectedBankName ? 'opacity-30 pointer-events-none' : 'bg-white'
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
            onInput={(e) => {
              const input = e.target;
              input.value = input.value.replace(/\D/g, '');
            }}
            className={`w-full px-3 py-2 border rounded-md mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
              !selectedBankName ? 'border-[#DEDEDE]' : 'border-black'
            }`}
            disabled={!selectedBankName}
          />
          {errors.accountNumber && (
            <p className="text-sm text-red-500 mb-2">
              Please enter a valid 10-digit account number
            </p>
          )}
          <button
            type="submit"
            disabled={!selectedBankName || !accountNumber || isValidating}
            className={`w-full py-2 rounded-[5px] text-black font-medium mt-4 ${
              !selectedBankName || !accountNumber
                ? 'bg-[#DEDEDE] cursor-not-allowed text-white'
                : 'bg-[var(--yellow-primary)] hover:bg-yellow-500'
            }`}
          >
            {isValidating ? 'Validating...' : 'Authorize'}
          </button>
          {verified && (
            <p className="text-sm text-green-500 mt-2">
              Bank details validated successfully!
            </p>
          )}
        </div>
      </aside>
    </form>
  );
};
