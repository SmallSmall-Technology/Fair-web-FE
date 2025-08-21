// import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

// import {
//   selectCurrentDeliveryAddress,
//   setSelectedDeliveryAddress,
//   updateLatestDeliveryAddress,
// } from '../../../../../features/order/deliveryAddressSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { AddDeliveryAddressModal } from './AddDeliveryAddressModal';
// import { SingleDeliveryAddressBox } from './SingleDeliveryAddressBox';
// import { fetchUserDeliveryAddresses } from '../../../../../api/user-api';

// const DeliveryAddress = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   console.log(selectedAddress);
//   const add = useSelector(selectCurrentDeliveryAddress);
//   console.log(add);

//   const dispatch = useDispatch();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['useraddresses'],
//     queryFn: fetchUserDeliveryAddresses,
//   });

//   const addresses = data?.data?.data || [];

//   // Set default address if none is selected
//   useEffect(() => {
//     if (!selectedAddressId && addresses.length > 0) {
//       const firstAddress = addresses[0];
//       setSelectedAddressId(firstAddress.id);
//       setSelectedAddress(firstAddress);
//       dispatch(setSelectedDeliveryAddress(firstAddress));
//     }
//   }, [addresses, selectedAddressId, dispatch]);

//   // Update Redux when selectedAddress changes
//   useEffect(() => {
//     if (selectedAddress) {
//       dispatch(updateLatestDeliveryAddress(selectedAddress));
//       dispatch(setSelectedDeliveryAddress(selectedAddress));
//     }
//   }, [selectedAddress, dispatch]);

//   const handleSelectAddress = (address) => {
//     setSelectedAddressId(address.id);
//     setSelectedAddress(address);
//   };

//   return (
//     <section>
//       <h1 className="font-semibold text-[23px]">Delivery Address</h1>
//       <hr className="mt-5 mb-7" />
//       <div className="grid lg:flex lg:space-x-5">
//         <p className="font-inter mb-4 lg:mb-0">Your delivery addresses</p>
//         <div>
//           {isLoading && <div className="skeleton md:w-[345px] h-[95px]"></div>}

//           {isError && (
//             <p className="flex items-center justify-center">
//               Failed to load addresses
//             </p>
//           )}

//           {!isLoading && !isError && (
//             <>
//               {addresses.length === 0 ? (
//                 <p className="text-sm text-gray-500">
//                   No delivery addresses found
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {addresses.map((address, index) => (
//                     <SingleDeliveryAddressBox
//                       key={index}
//                       address={address}
//                       onSelectedAddress={handleSelectAddress}
//                       selectedAddressId={selectedAddressId}
//                     />
//                   ))}
//                 </div>
//               )}

//               <p
//                 className="font-medium text-sm font-inter underline mt-8 cursor-pointer"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 Add another delivery address
//               </p>

//               {isModalOpen && (
//                 <AddDeliveryAddressModal
//                   onClose={() => setIsModalOpen(false)}
//                 />
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DeliveryAddress;

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCurrentAddress,
  selectLatestDeliveryAddress,
  setSelectedDeliveryAddress,
  updateLatestDeliveryAddress,
} from '../../../../../features/order/deliveryAddressSlice';

import { AddDeliveryAddressModal } from './AddDeliveryAddressModal';
import { SingleDeliveryAddressBox } from './SingleDeliveryAddressBox';
import { fetchUserDeliveryAddresses } from '../../../../../api/user-api';

const DeliveryAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { data: user } = useSelector((state) => state.user);
  const { latest_address } = user;

  const dispatch = useDispatch();

  // Get Redux state
  const currentAddress = useSelector(selectCurrentAddress);
  const latestAddress = useSelector(selectLatestDeliveryAddress);

  // console.log('Redux current address:', currentAddress);
  // console.log('Redux latest address:', latestAddress);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['useraddresses'],
    queryFn: fetchUserDeliveryAddresses,
  });

  const addresses = data?.data?.data || [];

  // Set default address if none selected
  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      setSelectedAddressId(latest_address.id);
      setSelectedAddress(latest_address);
      dispatch(setSelectedDeliveryAddress(latest_address));
      dispatch(updateLatestDeliveryAddress(latest_address));
    }
  }, [addresses, selectedAddressId, dispatch]);

  // Keep Redux in sync when selectedAddress changes
  useEffect(() => {
    if (selectedAddress) {
      dispatch(setSelectedDeliveryAddress(selectedAddress));
      dispatch(updateLatestDeliveryAddress(selectedAddress));
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
          {isLoading && <div className="skeleton md:w-[345px] h-[95px]"></div>}

          {isError && (
            <p className="flex items-center justify-center">
              Failed to load addresses
            </p>
          )}

          {!isLoading && !isError && (
            <>
              {addresses.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No delivery addresses found
                </p>
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
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DeliveryAddress;
