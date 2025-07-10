import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

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
      className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mt-10 px-4"
    >
      {/* Left: Bank Selection */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Direct debit setup</h2>
        <p className="text-sm font-medium mb-4">
          <span className="mr-2 font-bold">1</span>
          Start by selecting your bank from the list below
        </p>

        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <input
            type="text"
            placeholder="🔍 Search bank..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <ul className="space-y-3 max-h-72 overflow-auto">
            {banks
              .filter((bank) =>
                bank.toLowerCase().includes(search.toLowerCase())
              )
              .map((bank) => (
                <li
                  key={bank}
                  className={`flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-gray-50 ${
                    selectedBank === bank ? 'bg-gray-100 border-blue-500' : ''
                  }`}
                  onClick={() => setValue('selectedBank', bank)}
                >
                  <span>{bank}</span>
                  <input
                    type="radio"
                    {...register('selectedBank', { required: true })}
                    checked={selectedBank === bank}
                    value={bank}
                    className="accent-blue-500"
                  />
                </li>
              ))}
          </ul>
          {errors.selectedBank && (
            <p className="text-sm text-red-500 mt-1">Please select a bank</p>
          )}
        </div>
      </div>

      <aside>
        {/* Right: Account Setup */}
        <p className="text-sm font-medium mb-2">
          <span className="mr-2 font-bold">2</span>
          Please enter your account number for your selected bank.
        </p>

        <div
          className={`rounded-lg border p-6 shadow-sm transition-opacity ${
            !selectedBank ? 'opacity-50 pointer-events-none' : 'bg-white'
          }`}
        >
          <h3 className="text-md font-semibold mb-3">Account setup</h3>
          <label htmlFor="accountNumber" className="text-sm mb-2 block">
            Enter Account number
          </label>
          <input
            id="accountNumber"
            placeholder="Account number"
            {...register('accountNumber', {
              required: true,
              minLength: 10,
              maxLength: 10,
              pattern: /^[0-9]+$/,
            })}
            className="w-full px-3 py-2 border rounded-md mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
            className={`w-full py-2 rounded-md text-white font-medium ${
              !selectedBank || !accountNumber
                ? 'bg-yellow-200 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-500'
            }`}
          >
            Authorise
          </button>
        </div>
      </aside>
    </form>
  );
};
