import { useForm } from 'react-hook-form';
import { useState } from 'react';
import React from 'react';
import { YellowButton } from '../../../../../utils/Button';

export default function ProfileSummary() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  const [isVerified, setIsVerified] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState(
    '1b Akinyemi Ave, Elf busstop, Lekki, Lagos'
  );

  const onSubmit = (data) => {
    console.log('Form data:', data);
    alert('Profile saved successfully');
  };

  return (
    <div className="px-2 lg:px-6 ">
      <h2 className="text-[23px] font-semibold mb-6">Profile</h2>

      <hr />
      <div className="grid gap-3 lg:flex justify-between items-start my-4">
        {/* Tier 1 */}
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
          <div className="text-center text-sm ">
            <button
              className="bg-[#FFDE11] text-black font-semibold px-6 py-2 rounded"
              onClick={() => (window.location.href = '/account-verification')}
            >
              Upgrade to Tier 2
            </button>
            <p className="mt-1 text-xs ">
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 lg:w-[90%]">
        <div className="grid lg:grid-cols-[40%_1fr] gap-4 my-4 items-center">
          <p className="font-semibold text-sm">First name & Last name</p>
          <div className="flex justify-between w-full space-x-1 lg:space-x-3">
            <label htmlFor="firstName" className="lg:w-1/2">
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                {...register('firstName')}
                className="border p-2 rounded w-full font-medium"
              />
            </label>

            <label htmlFor="lastName" className="lg:w-1/2">
              <input
                type="text"
                placeholder="Last name"
                {...register('lastName')}
                className="border p-2 rounded w-full font-medium"
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
                id="email"
                type="email"
                placeholder="Email"
                {...register('email')}
                className="border p-2 rounded w-full font-medium"
                disabled
              />
            </label>
          </div>

          <div className="grid lg:grid-cols-[40%_55%] gap-4 my-4 items-center">
            <p className="font-semibold text-sm">Phone</p>
            <label htmlFor="phone" className="lg:w-1/2">
              <input
                id="phone"
                type="text"
                placeholder="Phone number"
                {...register('phone')}
                className="border p-2 rounded w-full text-gray-400 font-medium"
              />
            </label>
          </div>
        </div>

        <hr />
        <div className="grid lg:grid-cols-[40%_30%] gap-4 my-4 items-center">
          <p className="font-semibold text-sm">Delivery address</p>

          {!editingAddress ? (
            <div className="flex justify-between items-start space-x-14">
              <p>{address}</p>
              <button
                type="button"
                className="text-black text-sm underline"
                onClick={() => setEditingAddress(true)}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                className="border p-2 rounded w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                type="button"
                className="text-sm bg-gray-200 rounded px-3"
                onClick={() => setEditingAddress(false)}
              >
                Done
              </button>
            </div>
          )}
        </div>
        <hr />
        <div className="lg:w-[176px] ml-auto">
          <YellowButton>Save</YellowButton>
        </div>
      </form>
    </div>
  );
}
