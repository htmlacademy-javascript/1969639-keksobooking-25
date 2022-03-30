const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((cardOffer) => {
      onSuccess(cardOffer);
    });
};

export {getData};