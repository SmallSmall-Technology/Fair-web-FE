import { useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';
import {
  selectCurrentAddress,
  selectLatestDeliveryAddress,
} from '../../../../../features/order/deliveryAddressSlice';
import { fetchUserDeliveryAddresses } from '../../../../../api/user-api';
import { useQuery } from '@tanstack/react-query';

export default function ProfileSummary() {
  const isVerified = useSelector((state) => state.user?.isVerified);
  const { data: user } = useSelector((state) => state.user);

  // const selectedDeliveryAddress = useSelector(selectCurrentAddress);

  const { register } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['useraddresses'],
    queryFn: fetchUserDeliveryAddresses,
  });

  const addresses = data?.data?.data || [];

  return (
    <div className="px-2 lg:px-6 font-inter">
      <h2 className="text-[23px] font-semibold mb-6 ">Profile</h2>
      <hr />
      <div className="grid gap-3 lg:flex justify-between items-start my-4">
        <div className="border border-gray-200 rounded p-4 lg:w-[30%] text-sm">
          <div className="flex justify-between">
            <p className="font-semibold">Your membership</p>
            {!isVerified && (
              <a href="/account-verification" className="underline text-xs">
                Verify account
              </a>
            )}
          </div>
          <p className="text-lg font-bold text-gray-800">Tier 1</p>
          <hr />
          <p className="mt-2 text-xs text-gray-600">
            You have access to buy items up to ₦500k
          </p>
        </div>

        {!isVerified && (
          <div className="text-center text-sm">
            <button
              className="bg-[var(--yellow-primary)] text-black font-semibold px-6 py-2 rounded"
              onClick={() => (window.location.href = '/account-verification')}
            >
              Upgrade to Tier 2
            </button>
            <p className="mt-1 text-xs">
              Unlock Tier 2 to enjoy exclusive access to items valued at N500k
              and above.
            </p>
          </div>
        )}

        <div className="hidden lg:block border border-gray-200 rounded p-4 lg:w-[30%] text-sm">
          <p className="font-semibold">Your membership</p>
          <p className="text-lg font-bold text-gray-800">Tier 2</p>
          <hr />
          <p className="mt-2 text-xs text-gray-600">
            You have access to buy items up to ₦1m
          </p>
        </div>
      </div>
      <hr className="my-2 w-[90%]" />
      <form className="space-y-6 lg:w-[90%]">
        <div className="grid lg:grid-cols-[40%_1fr] gap-4 my-4 items-center">
          <p className="font-semibold text-sm">First name & Last name</p>
          <div className="flex justify-between w-full space-x-1 lg:space-x-3">
            <label htmlFor="firstName" className="lg:w-1/2">
              <input
                type="text"
                id="firstName"
                disabled
                placeholder="First name"
                {...register('firstName')}
                className="border p-2 rounded w-full text-gray-400 font-medium"
              />
            </label>
            <label htmlFor="lastName" className="lg:w-1/2">
              <input
                id="lastName"
                disabled
                type="text"
                placeholder="Last name"
                {...register('lastName')}
                className="border p-2 rounded w-full text-gray-400 font-medium"
              />
            </label>
          </div>
        </div>

        <hr />
        <div className="my-4">
          <div className="grid lg:grid-cols-[40%_55%] gap-4 my-4 items-center">
            <p className="font-semibold text-sm">Email</p>
            <label htmlFor="email" className="lg:w-1/2">
              <input
                disabled
                id="email"
                type="email"
                placeholder="Email"
                {...register('email')}
                className="border p-2 rounded w-full text-gray-400 font-medium"
              />
            </label>
          </div>

          <div className="grid lg:grid-cols-[40%_55%] gap-4 my-4 items-center">
            <p className="font-semibold text-sm">Phone</p>
            <label htmlFor="phoneNumber" className="lg:w-1/2">
              <input
                disabled
                id="phoneNumber"
                type="text"
                placeholder="Phone number"
                {...register('phoneNumber')}
                className="border p-2 rounded w-full text-gray-400 font-medium"
              />
            </label>
          </div>
        </div>

        <hr />
      </form>
      {/* This cannot be rendered inside the form because its a form element that
      needs to be separate */}
      <div className="grid lg:grid-cols-[40%_30%] gap-4 my-4 items-center">
        <p className="font-semibold text-sm">Delivery address</p>
        <p className="font-inter">
          {addresses[0] ? (
            <>{addresses[0]?.streetAddress + ' ' + addresses[0]?.state}</>
          ) : (
            <span className="text-gray-400">No delivery address selected</span>
          )}
        </p>
      </div>
    </div>
  );
}
