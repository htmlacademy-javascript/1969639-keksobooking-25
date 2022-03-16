const orderForm = document.querySelector('.ad-form');

const pristine = new Pristine (orderForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error__message'
}, false);

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}
pristine.addValidator(
  orderForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const nightPrice = orderForm.querySelector('#price');

function validatePrice (value) {
  return parseInt(value, 10) <= 100000;
}

pristine.addValidator(nightPrice,
  validatePrice,
  'Максимальная цена за ночь 100 000 руб'
);

const numberRooms = orderForm.querySelector('#room_number');
const numberGuest = orderForm.querySelector('#capacity');

const roomsGuest = {
  '1':['1'],
  '2':['1','2'],
  '3':['1','2','3'],
  '100':['0']
};

function validateRooms () {
  return roomsGuest[numberRooms.value].includes(numberGuest.value);
}

pristine.addValidator(numberRooms,validateRooms, 'количество комнат не соответветствует количеству гостей');
pristine.addValidator(numberGuest,validateRooms, 'количество комнат не соответветствует количеству гостей');

orderForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
