import {closePage, openPage} from './open-close.js';

const adressForm = document.querySelector('#address');
const MAIN_ICON_SIZE = 52;
const MAIN_ICON_ANCHOR_SIZE = 26;
const ICON_SIZE = 40;
const ICON_ANCHOR_SIZE = 20;
const LAT_MARKER = 35.66678;
const LNG_MARKER = 139.75914;
const LAT_MAP_CENTRE= 35.6895;
const LNG_MAP_CENTRE = 139.692;
const COMMA_NUMBER = 5;
const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;
const ZOOM = 10;

closePage();

const map = L.map('map-canvas').on('load', () => {
  openPage();
}).setView({
  lat: LAT_MAP_CENTRE,
  lng: LNG_MAP_CENTRE,
}, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_ICON_SIZE,MAIN_ICON_SIZE],
  iconAnchor: [MAIN_ICON_ANCHOR_SIZE,MAIN_ICON_SIZE],
});
const mainMarker = L.marker({
  lat: LAT_MARKER,
  lng: LNG_MARKER,
},{
  draggable: true,
  icon: mainPinIcon,
},);

mainMarker.addTo(map);

adressForm.value = `${LAT_MARKER}, ${LNG_MARKER}`;

mainMarker.on('moveend', (evt) =>{
  const endMove = evt.target.getLatLng();
  adressForm.value = `${endMove.lat.toFixed(COMMA_NUMBER)}, ${endMove.lng.toFixed(COMMA_NUMBER)}`;
});

const pinIcon = L.marker({
  iconUrl: './img/pin.svg',
  iconSize:[ICON_SIZE,ICON_SIZE],
  iconAnchor:[ICON_ANCHOR_SIZE,ICON_SIZE],
});

const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getType = (type) => {
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
};

const cardPopup = (element) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').scr = `${element.author.avatar}`;

  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = `${element.offer.address}, ${element.location.lat.toFixed(5)}, ${element.location.lng.toFixed(5)}`;
  cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price}Р/ночь`;
  cardElement.querySelector('.popup__type').textContent = getType(element.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  const featuresAll = cardElement.querySelector('.popup__features');
  const featuresFragment = document.createDocumentFragment();

  if (element.offer.features) {
    element.offer.features.forEach((feature) => {
      const featurListItem = featuresAll.querySelector(`.popup__feature--${feature}`);

      if (featurListItem) {
        featuresFragment.append(featurListItem);
      }
    });
  }
  featuresAll.innerHTML = '';
  featuresAll.append(featuresFragment);

  cardElement.querySelector('.popup__description').textContent = element.offer.description;
  const photosAll = cardElement.querySelector('.popup__photos');
  photosAll.innerHTML = '';

  if (element.offer.photos) {
    element.offer.photos.forEach((photoItem) => {
      const photoImage = document.createElement('img');
      photoImage.classList.add('.popup__photo');
      photoImage.src = photoItem;
      photoImage.width = `${PHOTO_WIDTH}`;
      photoImage.height = `${PHOTO_HEIGHT}`;
      photosAll.append(photoImage);
    });
  }
  return cardElement;

};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (element) => {
  const {lat,lng} = element.location;
  const marker = L.marker ({
    lat,
    lng,
  }, {
    pinIcon},);
  marker.addTo(markerGroup).bindPopup(cardPopup(element));
};

const SIMILAR_CARD_COUNT = 10;

const getMarkers = (arr) => arr.slice(0, SIMILAR_CARD_COUNT).forEach((elem) => createMarker(elem));

const getMainMarker = () => mainMarker.setLatLng({
  lat: LAT_MARKER,
  lng: LNG_MARKER,
});

const clearPopup = () => map.closePopup();

export {getMarkers, getMainMarker, clearPopup, markerGroup};
