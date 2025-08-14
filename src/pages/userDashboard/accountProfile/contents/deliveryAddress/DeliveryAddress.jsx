import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AddDeliveryAddressModal } from './AddDeliveryAddressModal';
import { SingleDeliveryAddressBox } from './SingleDeliveryAddressBox';
import { fetchUserDeliveryAddresses } from '../../../../../api/user-api';
import {
  setSelectedDeliveryAddress,
  updateLatestDeliveryAddress,
} from '../../../../../features/user/userSlice';
import { useDispatch } from 'react-redux';

const DeliveryAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['useraddresses'],
    queryFn: fetchUserDeliveryAddresses,
  });

  // Early return to prevent hook order errors
  if (isLoading) {
    return <div className="skeleton md:w-[345px] h-[95px]"></div>;
  }

  if (isError) {
    console.error('Error fetching addresses:', isError);
    return <p className="text-red-500">Failed to load addresses</p>;
  }

  const addresses = data?.data?.data || [];

  // Set default address if none is selected
  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      const firstAddress = addresses[0];
      setSelectedAddressId(firstAddress.id);
      setSelectedAddress(firstAddress);
      dispatch(setSelectedDeliveryAddress(firstAddress));
    }
  }, [addresses, selectedAddressId, dispatch]);

  // Update Redux when selectedAddress changes
  useEffect(() => {
    if (selectedAddress) {
      dispatch(updateLatestDeliveryAddress(selectedAddress));
      dispatch(setSelectedDeliveryAddress(selectedAddress));
    }
  }, [selectedAddress, dispatch]);

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
    setSelectedAddress(address);
  };

  return (
    <section>
      <h1 className="font-semibold text-[23px]">Delivery Address</h1>
      <hr className="mt-5 mb-7" />
      <div className="grid lg:flex lg:space-x-5">
        <p className="font-inter mb-4 lg:mb-0">Your delivery addresses</p>
        <div>
          {addresses.length === 0 ? (
            <p className="text-sm text-gray-500">No delivery addresses found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <SingleDeliveryAddressBox
                  key={address.id}
                  address={address}
                  onSelectedAddress={handleSelectAddress}
                  selectedAddressId={selectedAddressId}
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
              // selectedAddress={selectedAddress}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default DeliveryAddress;
