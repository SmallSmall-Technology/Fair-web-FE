import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserDeliveryAddress } from '../../../../../api/user-api';
import { UpdateDeliveryAddressModal } from './UpdateDeliveryAddressModal';

export const SingleDeliveryAddressBox = ({
  address,
  onSelectedAddress,
  selectedAddressId,
}) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteAddressMutation = useMutation({
    mutationFn: (id) => deleteUserDeliveryAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['useraddresses']);
    },
  });

  const handleDelete = (id) => {
    deleteAddressMutation.mutate(id);
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
          <button
            type="submit"
            onClick={() => handleDelete(address.id)}
            disabled={deleteAddressMutation.isPending}
          >
            {deleteAddressMutation.isPending ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
            ) : (
              <Trash />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
