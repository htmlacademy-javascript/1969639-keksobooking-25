import {getMarkers, markerGroup} from './map.js';
import {debounce} from './util.js';

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const RERENDER_DELAY = 500;

const formMapFilter = document.querySelector('.map__filters');
const housing = document.querySelector('#housing-type');
const housPrice = document.querySelector('#housing-price');
const housRooms = document.querySelector('#housing-rooms');
const housGuest = document.querySelector('#housing-guests');
const housFeatureField = document.querySelector('#housing-features');
const housFeaturesAll = housFeatureField.querySelectorAll('input');

const blockFilter = () => {
  housing.setAttribute('disabled', true);
  housPrice.setAttribute('disabled', true);
  housRooms.setAttribute('disabled', true);
  housGuest.setAttribute('disabled', true);
  housFeaturesAll.forEach((housFeatur) => {
    housFeatur.setAttribute('disabled', true);
  });
};

const clearFilter = () => {
  housing.value = 'any';
  housPrice.value = 'any';
  housRooms.value = 'any';
  housGuest.value = 'any';
  housFeaturesAll.forEach((housFeatur) => {
    housFeatur.checked = false;
  });
};

const filterType = (element) => housing.value === 'any' || housing.value === element.offer.type;

const filterPrice = (element) => {
  switch (housPrice.value) {
    case 'middle':
      return (element.offer.price >= MIN_PRICE && element.offer.price <= MAX_PRICE);
    case 'low':
      return element.offer.price <= MIN_PRICE;
    case 'high':
      return element.offer.price >= MAX_PRICE;
    case 'any':
      return true;
  }
};

const filterRooms = (element) => housRooms.value === 'any' || +housRooms.value === element.offer.rooms;

const filterGuests = (element) => housGuest.value === 'any' || +housGuest.value === element.offer.guests;

const filterFeatures = (element) => {
  let condition = true;
  for (let i = 0; i < housFeaturesAll.length; i++) {
    if (!housFeaturesAll[i].checked) {
      continue;
    }
    if (element.offer.features && !element.offer.features.includes(housFeaturesAll[i].value) || !element.offer.features) {
      condition = false;
    }
  }
  return condition;
};

const changeFilter = (cardElments) => {
  formMapFilter.addEventListener ('change', debounce(() => {
    markerGroup.clearLayers();
    const newCardArray = cardElments
      .filter ((cardElement) => filterType(cardElement) && filterPrice(cardElement) && filterRooms(cardElement) && filterGuests(cardElement) && filterFeatures(cardElement));
    getMarkers(newCardArray);
  }, RERENDER_DELAY));
};

export {changeFilter, blockFilter, clearFilter};
