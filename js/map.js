import {closePage, openPage} from './open-close.js';
import {offers} from './data.js';

const adressForm = document.querySelector('#address');

closePage();

const map = L.map('map-canvas').on('load', () => {
  openPage();
}).setView({
  lat: 35.6895,
  lng: 139.692,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor:[26,52],
});
const mainMarker = L.marker({
  lat: 35.6895,
  lng: 139.692,
},{
  draggable: true,
  icon: mainPinIcon,
},);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) =>{
  const endMove = evt.target.getLatLng();
  adressForm.value = `${endMove.lat.toFixed(5)},${endMove.lng.toFixed(5)}`;
});

const pinIcon = L.marker({
  iconUrl: './img/pin.svg',
  iconSize:[40,40],
  iconAnchor:[20,40],
});

const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

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

  offer.features.forEach((featur) => {
    const featurListItem = featuresAll.querySelector(`.popup__feature--${featur}`);

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
    photoImage.width = '45';
    photoImage.height = '40';
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


const markers = () => offers.map((offer) => {createMarker(offer);
});

markers();

export {createMarker, markers, markerGroup};

