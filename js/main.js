import './util.js';
import './data.js';
import './open-close.js';
import './slider.js';
import {getMarkers} from './map.js';
import {userFormSubmit, getOpenSuccess} from './valid.js';
import {getData} from './api.js';


const SIMILAR_CARD_COUNT = 10;

getData((cardOffer) => {
  getMarkers(cardOffer.slice(0,SIMILAR_CARD_COUNT));
});

userFormSubmit(getOpenSuccess);
