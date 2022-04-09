const userFormCard = document.querySelector('.ad-form');
const userFormCardElements = userFormCard.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormElements = filterForm.querySelectorAll('select');
const filterFormElementCheck = filterForm.querySelector('.map__features');

const closePage = () => {
  userFormCard.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');
  userFormCardElements.forEach((userFormCardElement) => {
    userFormCardElement.setAttribute('disabled', true);
  });
  filterFormElements.forEach((filterFormElement) => {
    filterFormElement.setAttribute('disabled', true);
  });
  filterFormElementCheck.setAttribute('disabled', true);
};

const openPage = () => {
  userFormCard.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');
  userFormCardElements.forEach((userFormCardElement) => {
    userFormCardElement.removeAttribute('disabled');
  });
  filterFormElements.forEach((filterFormElement) => {
    filterFormElement.removeAttribute('disabled');
  });
  filterFormElementCheck.removeAttribute('disabled');
};

export {closePage, openPage};
