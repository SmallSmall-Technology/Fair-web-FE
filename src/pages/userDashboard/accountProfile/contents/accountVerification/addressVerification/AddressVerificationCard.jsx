import { addressVerificationData } from './data';
import { AddressVerification } from './AddressVerification';

export const AddressVerificationCard = () => {
  const data = addressVerificationData?.data;
  return (
    <li className="w-full md:w-[789px] grid gap-4">
      <AddressVerification
        key={data?.id}
        type={data?.type}
        icon={data?.icon}
        title={data?.title}
        value={data?.value}
        errorMessage={data?.errorMessage}
      />
    </li>
  );
};
