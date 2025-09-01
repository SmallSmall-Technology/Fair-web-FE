import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  createPaystackMandate,
  getBanksList,
  validateAccountNumber,
} from '../../../../../api/orderAPI';
import {
  setAuthorized,
  setBankDetails,
  setMandateData,
} from '../../../../../features/paystack/mandateSlice';
import { useForm } from 'react-hook-form';
import { Search, Minus } from 'lucide-react';
import { selectMandateData } from '../../../../../features/paystack/mandateSlice';
import { SelectBankAccount } from './SelectBankAccount';
import { ValidateAccountNumber } from './ValidateAccountNumber';

export const DirectDebitBankSetupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mandateData = useSelector(selectMandateData);
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [availableBanks, setAvailableBanks] = useState([]);

  console.log(mandateData);

  // Create Paystack mandate
  const { mutate: createMandate, isPending: isValidating } = useMutation({
    mutationFn: () => createPaystackMandate(mandateData),
    onSuccess: (res) => {
      const redirectUrl = res.data?.redirect_url;
      if (redirectUrl) {
        window.open(redirectUrl, '_blank');
      }
    },
  });

  const handleCreateMandate = () => {
    if (!selectedBank || !accountNumber) return;
    createMandate();
  };

  return (
    <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 pt-10 px-4 lg:px-6">
      <SelectBankAccount
        availableBanks={availableBanks}
        selectedBank={selectedBank}
        setSelectedBank={setSelectedBank}
        setAvailableBanks={setAvailableBanks}
      />

      <aside>
        <ValidateAccountNumber
          selectedBank={selectedBank}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
        />

        <button
          onClick={handleCreateMandate}
          disabled={!selectedBank || !accountNumber || isValidating}
          className={`w-full py-2 rounded-[5px] text-black font-medium mt-4 ${
            !selectedBank || !accountNumber
              ? 'bg-[#DEDEDE] cursor-not-allowed text-white'
              : 'bg-[var(--yellow-primary)] hover:bg-yellow-500'
          }`}
        >
          {isValidating ? 'Authorizing...' : 'Authorize'}
        </button>
      </aside>
    </section>
  );
};
