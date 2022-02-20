function getRandomInteger (min, max){
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random()*(max-min))+min;
};



function getRandomArbitraty (min, max){
  return Math.random()*(max-min)+min;
 };

console.log(getRandomArbitraty(1,10).toFixed(2));
