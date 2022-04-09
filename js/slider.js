const MIN_RANGE= 0;
const MAX_RANGE = 100000;
const COMMA_PRICE = 0;
const SLIDER_STEP = 1;
const SLIDER_START = 1000;
const START_BUNGALOW = 0;
const START_FLAT = 1000;
const START_HOTEL = 3000;
const START_HOUSE = 5000;
const START_PALACE = 10000;

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const filterForm= document.querySelector('#type');

noUiSlider.create(sliderElement, {
  range: {
    min: MIN_RANGE,
    max: MAX_RANGE,
  },
  start: SLIDER_START,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(COMMA_PRICE);
      }
      return value.toFixed(COMMA_PRICE);
    },
    from: (value) => parseFloat(value)
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});


filterForm.addEventListener('change', (evt) => {
  if (evt.target.value ==='bungalow') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_RANGE,
        max: MAX_RANGE,
      },
      start: START_BUNGALOW,
      step: SLIDER_STEP,
    });
  } else if (evt.target.value === 'flat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_RANGE,
        max: MAX_RANGE,
      },
      start: START_FLAT,
      step: SLIDER_STEP,
    });
  } else if (evt.target.value === 'hotel') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_RANGE,
        max: MAX_RANGE,
      },
      start: START_HOTEL,
      step: SLIDER_STEP,
    });
  } else if (evt.target.value === 'house') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_RANGE,
        max: MAX_RANGE,
      },
      start: START_HOUSE,
      step: SLIDER_STEP,
    });
  } else if (evt.target.value === 'palace') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_RANGE,
        max: MAX_RANGE,
      },
      start: START_PALACE,
      step: SLIDER_STEP,
    });
  }
});

const getSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: MIN_RANGE,
      max: MAX_RANGE,
    },
    start: START_FLAT,
    step: SLIDER_STEP,
  });
};

export {getSlider};
