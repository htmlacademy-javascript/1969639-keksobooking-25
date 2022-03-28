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

const nightPrice = orderForm.querySelector('#price');
const typeSelect = orderForm.querySelector('#type');

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

typeSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  nightPrice.placeholder = `${minPrice[typeSelect.value]}`;
});

const validatePriceField = (value) =>  parseInt(value, 10) >= minPrice[typeSelect.value] && parseInt(value, 10) <= 100000;

const getPriceError = () => `Мин цена за ночь ${minPrice[typeSelect.value]} руб, Макс цена за ночь 100 000 руб`;
pristine.addValidator(nightPrice,
  validatePriceField,
  getPriceError
);

orderForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const timeIn = orderForm.querySelector('#timein');
const timeOut = orderForm.querySelector('#timeout');

timeIn.addEventListener('change', ()=> {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});
