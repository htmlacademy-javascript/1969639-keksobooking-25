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

orderForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
