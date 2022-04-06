const PHOTO_WIDTH = 70;
const PHOTO_HEIGHT = 70;
const avatarChooser = document.querySelector('.ad-form__field input[type="file"]');
const avatarBox = document.querySelector('.ad-form-header__preview');
const houseChooser = document.querySelector('.ad-form__upload input[type="file"]');
const houseBox = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  avatarBox.innerHTML = '';
  const fileAvatar = avatarChooser.files[0];
  const avatarPhoto = document.createElement('img');
  avatarPhoto.src = URL.createObjectURL(fileAvatar);
  avatarPhoto.width = `${PHOTO_WIDTH}`;
  avatarPhoto.height = `${PHOTO_HEIGHT}`;
  avatarBox.append(avatarPhoto);
});

houseChooser.addEventListener('change', () => {
  houseBox.innerHTML = '';
  const filePhoto = houseChooser.files[0];
  const photoElement = document.createElement('img');
  photoElement.src = URL.createObjectURL(filePhoto);
  photoElement.width = `${PHOTO_WIDTH}`;
  photoElement.height = `${PHOTO_HEIGHT}`;
  houseBox.append(photoElement);
});
