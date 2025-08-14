import { Trash } from 'lucide-react';
import { deleteUserDeliveryAddress } from '../../../../../api/user-api';
// import { useQueryClient } from '@tanstack/react-query';
import { UpdateDeliveryAddressModal } from './UpdateDeliveryAddressModal';
// import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

// export const SingleDeliveryAddressBox = ({
//   address,
//   onSelectedAddress,
//   defaultSelectedAddress,
// }) => {
//   const queryClient = useQueryClient();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleDelete = async (id) => {
//     try {
//       await deleteUserDeliveryAddress(id);
//       queryClient.invalidateQueries(['useraddresses']);
//     } catch (error) {}
//   };

//   return (
//     <div className="border border-[#DEDEDE] rounded-[5px] font-medium font-inter text-sm p-4 flex justify-between md:w-[345px] h-[95px]">
//       <div>
//         <p className="text-balance max-w-[206px]">{address?.streetAddress}</p>
//         <p>{address?.state}</p>
//       </div>
//       <div className="flex flex-col justify-between items-end">
//         <input
//           type="radio"
//           name="delivery-address"
//           className="accent-black"
//           onChange={() => onSelectedAddress(address)}
//         />

//         <div className="flex space-x-3">
//           <button
//             className="underline font-normal"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Edit
//           </button>

//           {isModalOpen && (
//             <UpdateDeliveryAddressModal
//               onClose={() => setIsModalOpen(false)}
//               address={address}
//             />
//           )}

//           <Trash onClick={() => handleDelete(address.id)} />
//         </div>
//       </div>
//     </div>
//   );
// };
export const SingleDeliveryAddressBox = ({
  address,
  onSelectedAddress,
  selectedAddressId,
}) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteUserDeliveryAddress(id);
      queryClient.invalidateQueries(['useraddresses']);
    } catch (error) {}
  };

  return (
    <div className="border border-[#DEDEDE] rounded-[5px] font-medium font-inter text-sm p-4 flex justify-between md:w-[345px] h-[95px]">
      <div>
        <p className="text-balance max-w-[206px]">{address?.streetAddress}</p>
        <p>{address?.state}</p>
      </div>
      <div className="flex flex-col justify-between items-end">
        <input
          type="radio"
          name="delivery-address"
          className="accent-black"
          checked={selectedAddressId === address.id}
          onChange={() => onSelectedAddress(address)}
        />

        <div className="flex space-x-3">
          <button
            className="underline font-normal"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </button>

          {isModalOpen && (
            <UpdateDeliveryAddressModal
              onClose={() => setIsModalOpen(false)}
              address={address}
            />
          )}

          <Trash onClick={() => handleDelete(address.id)} />
        </div>
      </div>
    </div>
  );
};
