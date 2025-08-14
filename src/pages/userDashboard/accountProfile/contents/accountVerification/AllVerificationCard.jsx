import { Button, CustomButton } from '../../../../../utils/Button';
import { VerificationAccountCardData } from './data';

export const AllVerificationCard = () => {
  return (
    <ul className=" w-full md:w-[789px] grid gap-4">
      {VerificationAccountCardData.map((item) => (
        <li key={item.id}>
          <VerificationCard
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        </li>
      ))}
    </ul>
  );
};

const VerificationCard = ({ icon, title, value }) => {
  return (
    <li className="flex items-center justify-between space-x-4 w-full border border-[#E5E5E5] rounded-[6px] p-2">
      <div className="flex space-x-2 items-center">
        <div className="bg-[#F5F5F7] p-4">
          <img src={icon} alt={title} className="w-10 h-10" />
        </div>
        <div>
          <p className="font-semibold font-inter">{title}</p>
          <p className="text-sm font-inter font-normal">{value}</p>
        </div>
      </div>
      <div className="flex justify-end items-end ">
        <CustomButton
          padding=" py-1 px-4 rounded"
          text={'Verify now'}
          width="121px"
        ></CustomButton>
      </div>
    </li>
  );
};
