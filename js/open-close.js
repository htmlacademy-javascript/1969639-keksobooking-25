const userFormCard = document.querySelector('.ad-form');
const userFormCardElement = userFormCard.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormElement = filterForm.querySelectorAll('select');
const filterFormElementCheck = filterForm.querySelector('.map__features');


userFormCard.classList.add('ad-form--disabled');
filterForm.classList.add('map__filters--disabled');
userFormCardElement.setAttribute('disabled', true);
filterFormElement.setAttribute('disabled', true);
filterFormElementCheck.setAttribute('disabled', true);

function openPage () {
  userFormCard.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');
  userFormCardElement.removeAttribute('disabled');
  filterFormElement.removeAttribute('disabled');
  filterFormElementCheck.removeAttribute('disabled');
}

openPage();

export {openPage};
