import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';

const banks = [
  'GT Bank',
  'Standard Chartered Bank',
  'Zenith Bank',
  'Wema Bank',
  'United Bank for Africa',
  'Access Bank',
  'Union Bank',
  'First Bank',
];

export const DirectDebitBankSetupForm = () => {
  const [search, setSearch] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedBank = watch('selectedBank');
  const accountNumber = watch('accountNumber');

  const onSubmit = () => {
    // console.log('Form Data:', data);
    // 🔐 Trigger authorization API here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 pt-10 px-6 "
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Direct debit setup</h2>
        <p className="text-sm font-medium mb-4">
          <span className="mr-2 font-medium text-[11px] text-white bg-black p-1">
            1
          </span>
          Start by selecting your bank from the list below
        </p>

        <div className="bg-white rounded-lg border p-6 shadow-sm">
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
            {banks
              .filter((bank) =>
                bank.toLowerCase().includes(search.toLowerCase())
              )
              .map((bank) => (
                <li
                  key={bank}
                  className={` text-sm font-medium flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 ${
                    selectedBank === bank ? 'bg-gray-100 border-black' : ''
                  }`}
                  onClick={() => setValue('selectedBank', bank)}
                >
                  <span>{bank}</span>
                  <input
                    type="radio"
                    {...register('selectedBank', { required: true })}
                    checked={selectedBank === bank}
                    value={bank}
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

      <aside
      // className={`rounded-lg border p-6 shadow-sm transition-opacity ${
      //   !selectedBank ? 'opacity-50 pointer-events-none' : 'bg-white'
      // }`}
      >
        <div className="mb-6">
          <p>Helloooooooooooooooooooooooooooo</p>
        </div>
        <div
          className={`rounded-lg  mb-2 transition-opacity ${
            !selectedBank ? 'opacity-30 pointer-events-none' : ''
          }`}
        >
          <p className="text-sm font-medium mb-3">
            <span className="mr-2 font-medium text-[11px] text-white bg-black p-1">
              2
            </span>
            Please enter your account number for your selected bank.
          </p>
        </div>

        <div
          className={`rounded-lg border p-6 shadow-sm transition-opacity ${
            !selectedBank ? 'opacity-30 pointer-events-none' : 'bg-white'
          }`}
        >
          <h3 className="text-[23px] font-bold mb-3">Account setup</h3>
          <label htmlFor="accountNumber" className="text-sm mb-2 block">
            Enter Account number
          </label>
          <input
            id="accountNumber"
            placeholder="Account Number"
            {...register('accountNumber', {
              required: true,
              minLength: 10,
              maxLength: 10,
              pattern: /^[0-9]+$/,
            })}
            className={`${!selectedBank ? 'border border-[#DEDEDE] w-full' : 'border-black'} 'w-full px-3 py-2 border  rounded-md mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500'}`}
            disabled={!selectedBank}
          />
          {errors.accountNumber && (
            <p className="text-sm text-red-500 mb-2">
              Please enter a valid 10-digit account number
            </p>
          )}

          <button
            type="submit"
            disabled={!selectedBank || !accountNumber}
            className={`w-full py-2 rounded-[5px] text-black font-medium mt-4 ${
              !selectedBank || !accountNumber
                ? 'bg-[#DEDEDE] cursor-not-allowed text-white'
                : 'bg-[#FFDE11] hover:bg-yellow-500'
            }`}
          >
            Authorise
          </button>
        </div>
      </aside>
    </form>
  );
};
