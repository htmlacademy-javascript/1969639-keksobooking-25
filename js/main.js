import './util.js';
import './data.js';
import './open-close.js';
import './slider.js';
import './valid.js';
import './map.js';
import { getMarkers } from './map.js';

fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((cardOffer) => {getMarkers(cardOffer);
  });
