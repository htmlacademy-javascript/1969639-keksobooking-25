import {offers} from './data.js';

const cardMap = document.querySelector('.map');
const similarListElement = cardMap.querySelector('#map-canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarListFragment = document.createDocumentFragment();

function getType (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel' :
      return 'Отель';
  }
}

const similarCards = offers.slice();


const cardElement = similarCardTemplate.cloneNode(true);
cardElement.querySelector('.popup__title').textContent = similarCards[0].title;
cardElement.querySelector('.popup__text--address').textContent = similarCards[0].address;
cardElement.querySelector('.popup__text--price').textContent = `${similarCards[0].price}Р/ночь`;
cardElement.querySelector('.popup__type').textContent = getType(similarCards[0].type);
cardElement.querySelector('.popup__text--capacity').textContent = `${similarCards[0].rooms} комнаты для ${similarCards[0].guests} гостей`;
cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarCards[0].checkin}, выезд до ${similarCards[0].checkout}`;

const featuresAll = cardElement.querySelector('.popup__features');
const featuresFragment = document.createDocumentFragment();

similarCards[0].features.forEach((featur) => {
  const featurListItem = featuresAll.querySelector(`.popup__feature--${featur}`);

  if (featurListItem) {
    featuresFragment.append(featurListItem);
  }
});

featuresAll.innerHTML = '';
featuresAll.append(featuresFragment);

cardElement.querySelector('.popup__description').textContent = similarCards[0].description;
const photosAll = cardElement.querySelector('.popup__photos');
photosAll.innerHTML = '';

similarCards[0].photos.forEach((photoItem) => {
  const photoImage = document.createElement('img');
  photoImage.classList.add('.popup__photo');
  photoImage.src = photoItem;
  photoImage.width = '45';
  photoImage.height = '40';
  photosAll.append(photoImage);
});

cardElement.querySelector('.popup__avatar').scr = similarCards[0].autor;

similarListFragment.appendChild(cardElement);

similarListElement.innerHTML = '';
similarListElement.appendChild(similarListFragment);

export {similarListElement};
