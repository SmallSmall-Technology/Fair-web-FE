import AccountVerification from './AccountVerification';
import { AddressVerificationCard } from './addressVerification/AddressVerificationCard';
import { DebtVerificationCard } from './DebtVerification/DebtVerificationCard';
import { IdVerificationCard } from './idVerification/IdVerificationCard';

export const AllVerificationCard = () => {
  return (
    <ul className="w-full md:w-[789px] grid gap-4">
      <IdVerificationCard />
      <AddressVerificationCard />
      <DebtVerificationCard />
    </ul>
  );
};
