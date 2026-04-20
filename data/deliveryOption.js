import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOption = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOptions;

  deliveryOption.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOptions = option;
    }
  });

  return deliveryOptions || deliveryOption[0];
}

function isWeekend(date) {
  const dayString = date.format('dddd');

  return dayString === 'Saturday' || dayString === 'Sunday';
}

export function calculateDeliveryDate(deliveryOptions) {
  
    let deliveryDate = dayjs();
    let remainingDays = deliveryOptions.deliveryDays;

    while (remainingDays > 0) {
      deliveryDate = deliveryDate.add(1, 'day');

      if (!isWeekend(deliveryDate)) {
        remainingDays--;
      }
    }

    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
  return dateString;
}


export function validDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOption.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });

  return found;
}
