import { idVerificationData } from './data';
import { IdVerification } from './IdVerification';

export const IdVerificationCard = () => {
  const data = idVerificationData?.data;
  return (
    <li className="w-full md:w-[789px] grid gap-4">
      <IdVerification
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
