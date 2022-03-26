const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const filterForm= document.querySelector('#type');

const minRange = 0;
const maxRange = 100000;
const commaPrice = 0;
const sliderStep = 1;
const sliderStart = 1000;
const startBungalow = 0;
const startFlat = 1000;
const startHotel = 3000;
const startHouse = 5000;
const startPalace = 10000;

noUiSlider.create(sliderElement, {
  range: {
    min: minRange,
    max: maxRange,
  },
  start: sliderStart,
  step: sliderStep,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(commaPrice);
      }
      return value.toFixed(commaPrice);
    },
    from: function (value) {
      return parseFloat(value);
    }
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});


filterForm.addEventListener('change', (evt)=> {
  if (evt.target.value==='bungalow') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: minRange,
        max: maxRange,
      },
      start: startBungalow,
      step: sliderStep,
    });
  } else if (evt.target.value === 'flat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: minRange,
        max: maxRange,
      },
      start: startFlat,
      step: sliderStep,
    });
  } else if (evt.target.value === 'hotel') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: minRange,
        max: maxRange,
      },
      start: startHotel,
      step: sliderStep,
    });
  } else if (evt.target.value ==='house') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: minRange,
        max: maxRange,
      },
      start: startHouse,
      step: sliderStep,
    });
  } else if (evt.target.value ==='palace') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: minRange,
        max: maxRange,
      },
      start: startPalace,
      step: sliderStep,
    });
  }
});
