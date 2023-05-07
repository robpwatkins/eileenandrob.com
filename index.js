let navOpen = false;
const openNav = document.querySelector('.open-nav');
const closeNav = document.querySelector('.close-nav');
const gallery = document.querySelector('.gallery');
const thumbnails = document.querySelector('.thumbnails');
const carouselModal = document.querySelector('.carousel .modal');

document.querySelector('.toggle-nav').addEventListener('click', () => {
  const ul = document.querySelector('ul');

  if (navOpen) {
    closeNav.style.display = 'none';
    openNav.style.display = 'block';
    ul.style.display = 'none';
    navOpen = false;
  } else {
    openNav.style.display = 'none';
    closeNav.style.display = 'block';
    ul.style.display = 'flex';
    navOpen = true;
  }
});

const renderGallery = async () => {
  const handleThumbnailClick = (e) => {
    carouselModal.classList.add('active');
    document.querySelector('body').style.overflow = 'hidden';
    const [imgNumber] = e.target.classList;
    const carouselImg = document.querySelector(`.carousel .modal .${imgNumber}`);
    carouselImg.style.display = 'block';
  }

  let count = 1;
  
  while (count < 67) {
    const img = document.createElement('img');
    img.className = `img-${count}`;
    img.src = `./gallery/${count}.jpg`;

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    imgContainer.onclick = handleThumbnailClick;

    img.onload = () => {
      imgContainer.appendChild(img);
    }
    
    thumbnails.appendChild(imgContainer);
    carouselModal.appendChild(img.cloneNode());

    count++;
  }
};

if (gallery) renderGallery();