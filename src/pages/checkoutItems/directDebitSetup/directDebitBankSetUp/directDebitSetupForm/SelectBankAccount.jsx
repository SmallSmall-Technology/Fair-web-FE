import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
// import { getBanksList } from '../../../../../api/orderAPI';
import { Search } from 'lucide-react';

export const SelectBankAccount = ({
  availableBanks,
  selectedBank,
  setSelectedBank,
  setAvailableBanks,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const { data: paystackBanks } = useQuery({
  //   queryKey: ['paystackBanks'],
  //   queryFn: getBanksList,
  // });
  // useEffect(() => {
  //   if (paystackBanks?.banks) {
  //     setAvailableBanks(
  //       paystackBanks.banks.filter(
  //         (bank) => bank?.available_for_direct_debit && bank?.active
  //       )
  //     );
  //   }
  // }, [paystackBanks, setAvailableBanks]);

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
          {/* {availableBanks
            ?.filter((bank) =>
              bank?.name.toLowerCase().includes(searchTerm?.toLowerCase())
            )
            .map((bank) => (
              <li
                key={bank?.code}
                className={`text-sm font-medium flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 ${
                  selectedBank === bank.name ? 'bg-gray-100 border-black ' : ''
                }`}
                onClick={() => setSelectedBank(bank)}
              >
                <span>{bank?.name}</span>
                <input
                  type="radio"
                  checked={selectedBank === bank.name || bank === selectedBank}
                  onChange={() => setSelectedBank(bank)}
                  value={bank}
                  className="accent-black"
                />
              </li>
            ))} */}
        </ul>
      </div>
    </section>
  );
};
