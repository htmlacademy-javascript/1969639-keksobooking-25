import {closePage, openPage} from './open-close.js';
import {offers} from './data.js';

const adressForm = document.querySelector('#address');
const mainIconSize = 52;
const mainIconAnchorSize = 26;
const iconSize = 40;
const iconAnchorSize = 20;
const latMarkerCentre = 35.6895;
const lngMarkerCentre = 139.692;
const latMapCentre = 35.6895;
const lngMapCentre = 139.692;
const commaNumber = 5;
const photoImageWidth = 45;
const photoImageHeight = 40;

closePage();

const map = L.map('map-canvas').on('load', () => {
  openPage();
}).setView({
  lat: latMapCentre,
  lng: lngMapCentre,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [mainIconSize,mainIconSize],
  iconAnchor: [mainIconAnchorSize,mainIconSize],
});
const mainMarker = L.marker({
  lat: latMarkerCentre,
  lng: lngMarkerCentre,
},{
  draggable: true,
  icon: mainPinIcon,
},);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) =>{
  const endMove = evt.target.getLatLng();
  adressForm.value = `${endMove.lat.toFixed(commaNumber)},${endMove.lng.toFixed(commaNumber)}`;
});

const pinIcon = L.marker({
  iconUrl: './img/pin.svg',
  iconSize:[iconSize,iconSize],
  iconAnchor:[iconAnchorSize,iconSize],
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

const cardPopup = (offer) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = `${offer.address.lat}, ${offer.address.lng}`;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price}Р/ночь`;
  cardElement.querySelector('.popup__type').textContent = getType(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresAll = cardElement.querySelector('.popup__features');
  const featuresFragment = document.createDocumentFragment();

  offer.features.forEach((feature) => {
    const featurListItem = featuresAll.querySelector(`.popup__feature--${feature}`);

    if (featurListItem) {
      featuresFragment.append(featurListItem);
    }
  });

  featuresAll.innerHTML = '';
  featuresAll.append(featuresFragment);

  cardElement.querySelector('.popup__description').textContent = offer.description;
  const photosAll = cardElement.querySelector('.popup__photos');
  photosAll.innerHTML = '';

  offer.photos.forEach((photoItem) => {
    const photoImage = document.createElement('img');
    photoImage.classList.add('.popup__photo');
    photoImage.src = photoItem;
    photoImage.width = `${photoImageWidth}`;
    photoImage.height = `${photoImageHeight}`;
    photosAll.append(photoImage);
  });

  cardElement.querySelector('.popup__avatar').scr = offer.author;

  return cardElement;

};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const {lat,lng} = offer.address;
  const marker = L.marker ({
    lat,
    lng,
  }, {
    pinIcon},);
  marker.addTo(markerGroup).bindPopup(cardPopup(offer));
};


const getMarkers = (arr) => arr.forEach((offer) => {createMarker(offer);
});

getMarkers(offers);

export {createMarker, getMarkers, markerGroup};

