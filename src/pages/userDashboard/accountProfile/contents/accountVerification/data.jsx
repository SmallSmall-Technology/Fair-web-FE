const idVerificationIcon = '/images/idVerificationIcon.svg';
const residentialVerificationIcon = '/images/residentialVerificationIcon.svg';
const debtVerificationIcon = '/images/debtVerification.svg';

export const VerificationAccountCardData = [
  {
    id: 1,
    type: 'id',
    icon: idVerificationIcon,
    title: 'ID Verification',
    description: 'Please upload a government-issued ID for verification',
    value: 'Kindly verify your identity by submitting a government-issued ID',
    errorMessage:
      " We're sorry, but we couldn't verify your ID at this time. Please ensure ID photo is clear and well-lit and try again. If the issue persists, contact our support team for assistance via chat, email or call. support@smallsmall.com, 08056570080",
  },
  {
    id: 2,
    type: 'address',
    icon: residentialVerificationIcon,
    title: 'Residential address verification',
    description: 'Please enter your residential address for verification',
    value: 'Please verify your home address',
    errorMessage:
      " We're sorry, but we couldn't verify your address at this time. Please ensure you've provided a verifiable means of identification and try again. If the issue persists, contact our support team for assistance via chat, email or call. support@smallsmall.com, 08056570080",
  },
  {
    id: 3,
    type: 'debt',
    icon: debtVerificationIcon,
    title: 'Debt Profile Verification',
    description: 'Please enter your BVN to verify your debt profile',
    value:
      'Please verify your debt profile to successfully complete your financial assessment',
    errorMessage:
      ' You currently have an active debt or loan in progress. Please complete your payments or clear your outstanding balance before you can access our platform. If you believe this is an error or need assistance, please contact our support team via chat, email or call. support@smallsmall.com, 08056570080',
  },
];
