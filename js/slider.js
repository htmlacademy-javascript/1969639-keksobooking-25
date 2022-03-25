const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const filterForm= document.querySelector('#type');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
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
        min: 0,
        max: 100000,
      },
      start: 0,
      step: 1,
    });
  } else if (evt.target.value === 'flat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100000,
      },
      start: 1000,
      step: 1,
    });
  } else if (evt.target.value === 'hotel') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100000,
      },
      start: 3000,
      step: 1,
    });
  } else if (evt.target.value ==='house') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100000,
      },
      start: 5000,
      step: 1,
    });
  } else if (evt.target.value ==='palace') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100000,
      },
      start: 10000,
      step: 1,
    });
  }
});
