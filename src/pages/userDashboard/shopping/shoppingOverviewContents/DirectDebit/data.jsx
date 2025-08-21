import { GenerateRemark } from '../../../../../utils/GenerateRemark';

export const linkedAccounts = [
  {
    name: 'JANE DOE',
    accountNumber: '99838*******',
    bank: 'Access Bank',
    type: 'Debit',
    transactionHistory: [
      {
        date: 'Aug 13, 2024',
        amount: '₦200,000.00',
        status: 'Successful',
        remark: GenerateRemark('I7xAA6b'),
      },
      {
        date: 'Sep 02, 2024',
        amount: '₦50,000.00',
        status: 'Pending',
        remark: GenerateRemark('O9yZP4k'),
      },
    ],
  },
];
