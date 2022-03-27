const orderForm = document.querySelector('.ad-form');

const pristine = new Pristine (orderForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element__error-text'
}, false);

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  orderForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const nightPrice = orderForm.querySelector('#price');

const validatePrice = (value) => parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100000;

pristine.addValidator(nightPrice,
  validatePrice,
  'Мин цена за ночь 0 руб, Макс цена за ночь 100 000 руб'
);

const numberRooms = orderForm.querySelector('#room_number');
const numberGuest = orderForm.querySelector('#capacity');

const roomsGuest = {
  '1':['1'],
  '2':['1','2'],
  '3':['1','2','3'],
  '100':['0']
};

const validateRooms = () => roomsGuest[numberRooms.value].includes(numberGuest.value);

pristine.addValidator(numberRooms,validateRooms, 'количество комнат не соответветствует количеству гостей');
pristine.addValidator(numberGuest,validateRooms, 'количество комнат не соответветствует количеству гостей');

const priceField = orderForm.querySelector('#price');
const typeSelect = orderForm.querySelector('#type');

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const validatePriceField = (value) => {
  typeSelect.addEventListener('change', () => parseInt(value, 10) >= minPrice[typeSelect.value]);
};

const getPriceFieldError = () =>`Цена не меньше ${minPrice[typeSelect.value]} руб за ночь`;

pristine.addValidator(priceField, validatePriceField, getPriceFieldError);

orderForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const timeIn = orderForm.querySelector('#timein');
const timeOut = orderForm.querySelector('#timeout');

timeIn.addEventListener('change', ()=> {
  timeOut.value = timeIn.value;
});
