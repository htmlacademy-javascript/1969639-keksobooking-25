/*
import {offers} from './data.js';
import {markers,createMarker, markerGroup} from './map.js';

const formMapFilter = document.querySelector('.map__filters');
const housing = document.querySelector('#housing-type');
const housPrice = document.querySelector('#housing-price');
const housRooms = document.querySelector('#housing-rooms');
const housGuest = document.querySelector('#housing-guests');
const housFeatureField = document.querySelector('#housing-features');
const housFeaturesAll = housFeatureField.querySelectorAll('input');

/*
formMapFilter.addEventListener('change', () =>{
  markerGroup.clearLayers();
  offers.filter((offer) => {
    housFeaturesAll.forEach((housFeatures) => {
      if (offer.features.includes(housFeatures.value) && housFeatures.checked) {
        createMarker(offer);
      }
    });
  });
});
*/
/*
formMapFilter.addEventListener('change', () =>{
  markerGroup.clearLayers();
  offers.filter((offer) => {
    if (housing.value === offer.type && housRooms.value === `${offer.rooms}` && housGuest.value === `${offer.guests}` && housPrice.value === 'low' && offer.price <10000) {
      housFeaturesAll.forEach((housFeatures) => {
        if (offer.features.includes(housFeatures.value) && housFeatures.checked) {
          createMarker(offer);
        }
      });
    } else if ()
      //createMarker(offer);
    } else if (housing.value === 'any' && housRooms.value === 'any' && housGuest.value === 'any' && housPrice.value === 'any'){
      createMarker(offer);
    }
  });
});


/*

  housPrice.addEventListener('change', (evt) =>{
    if (evt.target.value === 'middle' && offer.price >=10000 && offer.price <= 50000) {
      markerGroup.clearLayers();
      createMarker(offer);} else if (evt.target.value === 'low' && offer.price < 10000) {markerGroup.clearLayers();
      createMarker(offer);} else if (evt.target.value === 'high' && offer.price >= 50000) {markerGroup.clearLayers();
      createMarker(offer);}
    else if (evt.target.value === 'any') {
      markers();}
  });
});*/

