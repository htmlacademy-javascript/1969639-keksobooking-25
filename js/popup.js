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

similarCards.forEach((offer) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price}Р/ночь`;
  cardElement.querySelector('.popup__type').textContent = getType(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresAll = cardElement.querySelector('.popup__features');
  const featuresFragment = document.createDocumentFragment();

  offer.features.forEach((featur) => {
    const featurListItem = featuresAll.querySelector(`.popup__feature--${featur}`);

    if (featurListItem) {
      featuresFragment.append(featurListItem);
    }
  });

  featuresAll.inntrHTML = '';
  featuresAll.append(featuresFragment);

  cardElement.querySelector('.popup__description').textContent = offer.description;
  const photos = cardElement.querySelector('.popup__photos');
  offer.photos.forEach((photoItem) => {photos.querySelector('.popup__photo').src = photoItem; });
  cardElement.querySelector('.popup__avatar').scr = offer.autor;

  similarListFragment.appendChild(cardElement);
  similarListElement.innerHTML = '';
  similarListElement.appendChild(similarListFragment);
});

export {similarListElement};
