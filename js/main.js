function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const SIMILAR_OFFER = 10;


const TYPE = [
  'palace',
  'flat',
  'hous',
  'bungalow',
  'hotel'
]

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
]

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
]


let autor = {
  avatar: 'img/avatars/user' + xx + '.png'  /*, где {{xx}} — это число от 1 до 10.
  Перед однозначными числами ставится 0.
  Например, 01, 02...10.
  Адреса изображений не повторяются. */
};

let xx = '';
let autorArray = [];
let number = 1;

  for  (let i=0; i<=9; i++){
       Math.floor(number/10) === 0? xx = '0${number}' : xx = String(number);
       autor.avatar = 'img/avatars/user' + xx + '.png';
       autorArray[i] = autor.avatar;
       number++;
       }


  let location= {
  lat: getRandomPositiveFloat(35.65000, 35.70000),
  lng: getRandomPositiveFloat(139.70000, 139.80000)
    }

const  getRandomArrayElement = (elements) => {
  return elements [PositiveInteger(0,elements.length - 1)];
};

const createOffer = () => {
 return {
  title: 'Объявление',
  adress: `${location.lat},${location.lng}`,
  price:  getRandomPositiveInteger(10000,2000000),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomPositiveInteger(1,5),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKIN),
  features: function () {return Array.from({length:PositiveInteger(0,FEATURES.length - 1) },FEATURES)},
  description: 'Аппартаменты',
  photos: function () {return Array.from({length:PositiveInteger(0,PHOTOS.length - 1) },PHOTOS)},
 };
};

const similarOffer = Array.from({length:SIMILAR_OFFER}, createOffer);

for (let i=0; i<=similarOffer.length-1; i++){
similarOffer[i] = Object.assign(autorArray[i],similarOffer[i])
};
