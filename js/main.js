import './open-close.js';
import './slider.js';
import {getMarkers} from './map.js';
import {userFormSubmit, getOpenSuccess} from './valid.js';
import {getData} from './api.js';
import {changeFilter} from './marker-filter.js';
import './photo.js';

getData((cardOffer) => {
  getMarkers(cardOffer);
  changeFilter(cardOffer);
});

userFormSubmit(getOpenSuccess);
