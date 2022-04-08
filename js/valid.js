import { sendData } from './api.js';
import {getMainMarker, clearPopup} from './map.js';
import {getSlider} from './slider.js';
import {clearPhoto} from './photo.js';

const MIN_SIZE = 30;
const MAX_SIZE = 100;
const MIN_PRICE_BUNGALOW = 0;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOTEL = 3000;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_PALACE = 10000;

const roomsGuest = {
  '1':['1'],
  '2':['1','2'],
  '3':['1','2','3'],
  '100':['0']
};

const minPrice = {
  'bungalow': MIN_PRICE_BUNGALOW,
  'flat': MIN_PRICE_FLAT,
  'hotel': MIN_PRICE_HOTEL,
  'house': MIN_PRICE_HOUSE,
  'palace': MIN_PRICE_PALACE
};

const orderForm = document.querySelector('.ad-form');

const pristine = new Pristine (orderForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element__error-text'
}, false);

const validateTitle = (value) => value.length >= MIN_SIZE && value.length <= MAX_SIZE;

pristine.addValidator(
  orderForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const numberRooms = orderForm.querySelector('#room_number');
const numberGuest = orderForm.querySelector('#capacity');

const validateRooms = () => roomsGuest[numberRooms.value].includes(numberGuest.value);

pristine.addValidator(numberRooms,validateRooms, 'количество комнат не соответветствует количеству гостей');
pristine.addValidator(numberGuest,validateRooms, 'количество комнат не соответветствует количеству гостей');

const nightPrice = orderForm.querySelector('#price');
const typeSelect = orderForm.querySelector('#type');

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

const timeIn = orderForm.querySelector('#timein');
const timeOut = orderForm.querySelector('#timeout');

timeIn.addEventListener('change', ()=> {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const openSuccessElement = document.querySelector('#success').content.querySelector('.success');
const openErrorElement = document.querySelector('#error').content.querySelector('.error');
const checkboxAll = orderForm.querySelectorAll('[name="feature"]');
const resetButton = orderForm.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  orderForm.querySelector('#title').value = '';
  numberRooms.value = '1';
  numberGuest.value = '3';
  typeSelect.value = 'flat';
  nightPrice.value = '';
  timeIn.value = '12:00';
  timeOut.value = '12:00';
  orderForm.querySelector('#address').value = '35.66678, 139.75914';
  orderForm.querySelector('#description').value = '';
  checkboxAll.forEach((checkbox) => {checkbox.checked = false;});
  getSlider();
  getMainMarker();
  clearPopup();
  clearPhoto();
});

const clearPage = () => {
  orderForm.querySelector('#title').value = '';
  numberRooms.value = '1';
  numberGuest.value = '3';
  typeSelect.value = 'flat';
  nightPrice.value = '';
  timeIn.value = '12:00';
  timeOut.value = '12:00';
  orderForm.querySelector('#address').value = '35.66678, 139.75914';
  orderForm.querySelector('#description').value = '';
  checkboxAll.forEach((checkbox) => {checkbox.checked = false;});
  getSlider();
  getMainMarker();
  clearPopup();
  clearPhoto();
};

const getOpenSuccess = () => {
  const  openSuccess = openSuccessElement.cloneNode(true);
  document.body.append(openSuccess);
  document.addEventListener('keydown', (evt) => {
    evt.preventDefault(evt);
    if (evt.key === 'Escape') {
      evt.preventDefault(evt);
      openSuccess.remove();
    }
  });
  document.addEventListener('click', () => openSuccess.remove());
  clearPage();
};

const getOpenError = () => {
  const openError = openErrorElement.cloneNode(true);
  document.body.append(openError);
  document.addEventListener('keydown', (evt) => {
    evt.preventDefault(evt);
    if (evt.key === 'Escape') {
      evt.preventDefault(evt);
      openError.remove();
    }
  });
  openError.querySelector('.error__button').addEventListener('click', () => openError.remove());
  document.addEventListener('click', () => openError.remove());
};

const userFormSubmit = (onSuccess) => {
  orderForm.addEventListener ('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => onSuccess(),
        () => getOpenError(),
        new FormData (evt.target),
      );
    }
  });
};


export {userFormSubmit,getOpenSuccess};
