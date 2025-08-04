import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { YellowButton } from '../../../../../utils/Button';
import { getUser, updateUser } from '../../../../../api/user-api';
import { toast } from 'react-toastify';
import { AddressModal } from './AddressModal';
import {
  setUser,
  selectLatestDeliveryAddress,
} from '../../../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileSummary() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const latestDeliveryAddress = useSelector(selectLatestDeliveryAddress);

  const { data, error, refetch } = useQuery({
    queryKey: ['users', localStorage.getItem('authToken')],
    queryFn: getUser,
    enabled: !!localStorage.getItem('authToken'),
    onSuccess: (data) => {
      if (data?.data) {
        dispatch(setUser(data.data));
      }
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 404) {
        window.location.href = '/login';
      }
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  const [isVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
      });
    }
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      refetch();
      dispatch(setUser(response.data?.user || response.data));
      toast.success('Profile updated successfully', {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
    },
    onError: (err) => {
      toast.error(`Failed to update profile: ${err.message}`, {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
    };
    mutation.mutate(payload);
  };

  // if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-2 lg:px-6">
      <h2 className="text-[23px] font-semibold mb-6">Profile</h2>
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
                id="lastName"
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
                // disabled
              />
            </label>
          </div>

          <div className="grid lg:grid-cols-[40%_55%] gap-4 my-4 items-center">
            <p className="font-semibold text-sm">Phone</p>
            <label htmlFor="phoneNumber" className="lg:w-1/2">
              <input
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
        <div className="lg:w-[176px] ml-auto">
          <YellowButton disabled={mutation.isLoading}>
            {mutation.isLoading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
            ) : (
              'Save'
            )}
          </YellowButton>
        </div>
      </form>
      {/* This cannot be rendered inside the form because its a form element that
      needs to be separate */}
      <div className="grid lg:grid-cols-[40%_30%] gap-4 my-4 items-center">
        <p className="font-semibold text-sm">Delivery address</p>
        {!showModal ? (
          <div className="flex justify-between items-start space-x-14">
            <p>{latestDeliveryAddress}</p>
            <button
              type="button"
              className="text-black text-sm underline"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>
          </div>
        ) : (
          <AddressModal
            currentAddress={data?.latest_address}
            onClose={() => setShowModal(false)}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
}
