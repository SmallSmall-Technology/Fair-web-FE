/**
 * Generate payment dates based on plan type
 * @param {string} paymentPlan - 'daily' | 'weekly' | 'monthly' | 'full'
 * @param {Date | string} startDate - starting date
 * @param {number} installments - number of installments
 */
export const getPaymentDates = (paymentPlan, startDate, installments) => {
  const dates = [];
  const currentDate = new Date(startDate);

  for (let i = 1; i <= installments; i++) {
    const nextDate = new Date(currentDate);

    if (paymentPlan === 'daily') {
      nextDate.setDate(currentDate.getDate() + i); // add 1 day per installment
    } else if (paymentPlan === 'weekly') {
      nextDate.setDate(currentDate.getDate() + 7 * i); // add 7 days per installment
    } else if (paymentPlan === 'monthly') {
      nextDate.setMonth(currentDate.getMonth() + i); // add 1 month per installment
    } else {
      return []; // Full payment doesn't need multiple dates
    }

    // Format: DD MMM YYYY
    dates.push(
      nextDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    );
  }

  return dates;
};
