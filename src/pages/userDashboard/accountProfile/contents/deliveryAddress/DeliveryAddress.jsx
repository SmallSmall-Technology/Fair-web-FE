import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AddDeliveryAddressModal } from './AddDeliveryAddressModal';
import { SingleDeliveryAddressBox } from './SingleDeliveryAddressBox';
import { fetchUserDeliveryAddresses } from '../../../../../api/user-api';
import { updateLatestDeliveryAddress } from '../../../../../features/user/userSlice';
import { useDispatch } from 'react-redux';

const DeliveryAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['useraddresses'],
    queryFn: fetchUserDeliveryAddresses,
  });

  if (isError) {
    console.error('Error fetching addresses:', isError);
  }

  if (isLoading) {
    <div className="skeleton md:w-[345px] h-[95px]"></div>;
  }

  const addresses = data?.data?.data;

  const defaultSelectedAddress = addresses?.[0] || null;

  dispatch(
    updateLatestDeliveryAddress(selectedAddress || defaultSelectedAddress)
  );

  return (
    <section>
      <h1 className="font-semibold text-[23px] ">Delivery Address</h1>
      <hr className="mt-5 mb-7" />
      <div className="grid lg:flex lg:space-x-5">
        <p className="font-inter mb-4 lg:mb-0">Your delivery addresses</p>
        <div>
          {addresses?.length === 0 ? (
            <p className="text-sm text-gray-500">No delivery addresses found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses?.map((address) => (
                <SingleDeliveryAddressBox
                  key={address.id}
                  address={address}
                  selectedAddress={selectedAddress}
                  onSelectedAddress={setSelectedAddress}
                  defaultSelectedAddress={defaultSelectedAddress}
                />
              ))}
            </div>
          )}
          <p
            className="font-medium text-sm font-inter underline mt-8 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Add another delivery address
          </p>

          {isModalOpen && (
            <AddDeliveryAddressModal
              onClose={() => setIsModalOpen(false)}
              selectedAddress={selectedAddress}
              defaultSelectedAddress={defaultSelectedAddress}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default DeliveryAddress;
