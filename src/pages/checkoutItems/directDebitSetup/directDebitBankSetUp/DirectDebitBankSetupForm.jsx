import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  createMonoMandate,
  getMonoBanks,
  validateAccountNumber,
} from '../../../../api/orderAPI';
import {
  setAuthorized,
  setBankDetails,
  setMandateData,
} from '../../../../features/mono/mandateSlice';
import { useForm } from 'react-hook-form';
import { Search, Minus } from 'lucide-react';
import { selectMandateData } from '../../../../features/mono/mandateSlice';

export const DirectDebitBankSetupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mandateData = useSelector(selectMandateData);
  // const mandateData = useSelector((state) => state.mandate.mandateData);
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [availableBanks, setAvailableBanks] = useState([]);

  console.log('Mandate data', mandateData);
  // Create Mono mandate
  const { mutate: createMandate, isPending: isValidating } = useMutation({
    mutationFn: () => createMonoMandate(mandateData),
    onSuccess: (res) => {
      navigate('setup-2', {
        state: { mandateData: res.data, bankDetails: res.data },
      });
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

const SelectBankAccount = ({
  availableBanks,
  selectedBank,
  setSelectedBank,
  setAvailableBanks,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: monoBanks } = useQuery({
    queryKey: ['monoBanks'],
    queryFn: getMonoBanks,
  });

  useEffect(() => {
    if (monoBanks?.data?.banks) {
      setAvailableBanks(
        monoBanks.data.banks.filter((bank) => bank?.direct_debit)
      );
    }
  }, [monoBanks]);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 lg:mb-2">Direct debit setup</h2>
      <div className="bg-white rounded-lg border p-4 lg:p-6 shadow-sm">
        <p className="text-[23px] font-bold mb-2">Select your bank</p>

        {/* Search input */}
        <form className="relative w-full mb-8">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search />
          </span>
          <input
            type="text"
            placeholder="Search bank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>

        {/* Bank list */}
        <ul className="space-y-3 max-h-72 overflow-auto">
          {availableBanks
            ?.filter((bank) =>
              bank.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((bank) => (
              <li
                key={bank.nip_code}
                className={`text-sm font-medium flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 ${
                  selectedBank === bank.name ? 'bg-gray-100 border-black ' : ''
                }`}
                onClick={() => setSelectedBank(bank)}
              >
                <span>{bank.name}</span>
                <input
                  type="radio"
                  checked={selectedBank === bank}
                  onChange={() => setSelectedBank(bank.name)}
                  value={bank.name}
                  className="accent-black"
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

const ValidateAccountNumber = ({
  selectedBank,
  accountNumber,
  setAccountNumber,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const {
    data,
    mutate: validateAcc,
    isPending: isValidating,
  } = useMutation({
    mutationFn: () =>
      validateAccountNumber({
        nipCode: selectedBank.nip_code,
        accountNumber: accountNumber,
      }),
    //Change this to useEffect later
    onSuccess: (res) => {
      console.log('Validation response:', data);
      setMandateData({
        bankCode: res.bankCode,
        accountNumber: res.accountNumber,
      });
    },
  });

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
      </div>
    </div>
  );
};
