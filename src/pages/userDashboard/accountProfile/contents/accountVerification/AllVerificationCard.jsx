import { VerificationAccountCardData } from './data';
import { VerificationCard } from './VerificationCard';

export const AllVerificationCard = () => {
  return (
    <ul className="w-full md:w-[789px] grid gap-4">
      {VerificationAccountCardData.map((item) => (
        <VerificationCard
          key={item?.id}
          type={item?.type}
          icon={item?.icon}
          title={item?.title}
          value={item?.value}
          errorMessage={item?.errorMessage}
        />
      ))}
    </ul>
  );
};
