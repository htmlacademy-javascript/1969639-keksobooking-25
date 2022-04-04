import {getMarkers, markerGroup} from './map.js';

const formMapFilter = document.querySelector('.map__filters');
const housing = document.querySelector('#housing-type');
const housPrice = document.querySelector('#housing-price');
const housRooms = document.querySelector('#housing-rooms');
const housGuest = document.querySelector('#housing-guests');
const housFeatureField = document.querySelector('#housing-features');
const housFeaturesAll = housFeatureField.querySelectorAll('input');

const filterType = (element) => housing.value === 'any' || housing.value === element.offer.type;

const filterPrice = (element) => {
  switch (housPrice.value) {
    case 'middle':
      return (element.offer.price >= 10000 && element.offer.price <= 50000);
    case 'low':
      return element.offer.price <= 10000;
    case 'high':
      return element.offer.price >= 50000;
    case 'any':
      return true;
  }
};

const filterRooms = (element) => housRooms.value === 'any' || +housRooms.value === element.offer.rooms;

const filterGuests = (element) => housGuest.value === 'any' || +housGuest.value === element.offer.guests;

const filterFeatures = (element) => {
  let condition = true;
  for (let i =0; i < housFeaturesAll.length; i++) {
    if (!housFeaturesAll[i].checked) {
      continue;
    }
    if (element.offer.features && !element.offer.features.includes(housFeaturesAll[i].value) || !element.offer.features) {
      condition = false;
    }
  }
  return condition;
};

const RERENDER_DELAY = 500;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const chengeFilter = (cardElments) => {
  formMapFilter.addEventListener ('change', () => {
    markerGroup.clearLayers();
    const newCardErray = cardElments
      .filter ((cardElement) => filterType(cardElement) && filterPrice(cardElement) && filterRooms(cardElement) && filterGuests(cardElement) && filterFeatures(cardElement));
    debounce(getMarkers(newCardErray), RERENDER_DELAY);
  });
};

export {chengeFilter};
