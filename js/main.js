import './util.js';
import './data.js';
import './open-close.js';
import './slider.js';
import {getMarkers, chengeFilter} from './map.js';
import {userFormSubmit, getOpenSuccess} from './valid.js';
import {getData} from './api.js';

getData((cardOffer) => {
  getMarkers(cardOffer);
  chengeFilter(cardOffer);
});

userFormSubmit(getOpenSuccess);
