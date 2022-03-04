import {getRandomPositiveInteger, getRandomPositiveFloat} from './util.js';

const SIMILAR_OFFER = 10;

const TYPE = [
  'palace',
  'flat',
  'hous',
  'bungalow',
  'hotel'
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const coord= {
  lat: getRandomPositiveFloat(35.65000, 35.70000),
  lng: getRandomPositiveFloat(139.70000, 139.80000)
};

const  getRandomArrayElement = (elements) =>
  elements [getRandomPositiveInteger(0,elements.length - 1)];

function generateAutor(number) {
  if (number < 10) {
    return {avatar: `img/avatars/user0${number}.png`};
  }
  return {avatar: `img/avatars/user${number}.png`};
}

function getNewArray (arrays) {
  const newArray = [];
  for (let i=0; i <= getRandomPositiveInteger(0,arrays.length-1); i++) {
    newArray[i] = arrays[i];
  }
  return newArray;
}

function createOffer(number) {
  return {
    autor: generateAutor(number),
    title: 'Объявление',
    adress: `${coord.lat},${coord.lng}`,
    price: getRandomPositiveInteger(10000, 2000000),
    type: getRandomArrayElement(TYPE),
    rooms: getRandomPositiveInteger(1, 5),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKIN),
    features: getNewArray (FEATURES),
    description: 'Аппартаменты',
    photos: getNewArray(PHOTOS),
  };
}

const offers = [];
for (let i=1; i<=SIMILAR_OFFER; i++) {
  offers.push (createOffer(i));
}

export {offers};
