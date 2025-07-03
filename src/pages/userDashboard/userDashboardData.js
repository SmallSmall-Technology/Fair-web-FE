export const progressData = {
  payments: [
    {
      label: 'Downpayment',
      date: 'Feb 12, 2025',
      amount: 320000,
      status: 'done',
      activePayment: 'Downpayment',
    },
    {
      label: 'Next payment',
      date: 'Feb 12, 2025',
      amount: 220000,
      status: 'done',
      activePayment: 'Second Payment',
    },
    {
      label: 'Next payment',
      date: 'Mar 12, 2025',
      amount: 220000,
      status: 'current',
      activePayment: 'Third Payment',
    },
    {
      label: 'Next payment',
      date: 'Apr 12, 2025',
      amount: 220000,
      status: 'pending',
      activePayment: 'Fourth Payment',
    },
  ],
  deliveries: [
    { label: 'Order received', status: 'done', text: 'Mar 12, 2025' },
    { label: 'Instalment payment', status: 'done', text: 'First payment' },
    { label: 'Shipping Status', status: 'current', text: 'Delivered' },
    { label: 'Item Status', status: 'pending', text: 'Item received' },
  ],
};

export const completedPurchaseProgressData = {
  payments: [
    {
      label: 'Downpayment',
      date: 'Feb 12, 2025',
      amount: 320000,
      status: 'done',
      activePayment: 'Downpayment',
    },
    {
      label: 'Next payment',
      date: 'Next Payment: Feb 12, 2025',
      amount: 220000,
      status: 'done',
      activePayment: 'Second Payment',
    },
    {
      label: 'Final payment',
      date: 'Final payment: Mar 12, 2025',
      amount: 220000,
      status: 'done',
      activePayment: 'Third Payment',
    },
  ],
};
