import './util.js';
import './open-close.js';
import './slider.js';
import {getMarkers} from './map.js';
import './photo.js';
import {userFormSubmit, getOpenSuccess, getButton} from './valid.js';
import {getData} from './api.js';
import {changeFilter} from './marker-filter.js';

const getServer = () => {
  getData((cardOffer) => {
    getMarkers(cardOffer);
    changeFilter(cardOffer);
    getButton(cardOffer);
  });
};

getServer();
userFormSubmit(getOpenSuccess);

export {getServer};
