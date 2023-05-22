let navOpen = false;
const navItems = document.querySelectorAll('ul li');
const openNav = document.querySelector('.open-nav');
const closeNav = document.querySelector('.close-nav');
const gallery = document.querySelector('.gallery');
const thumbnails = document.querySelector('.thumbnails');
const carouselModal = document.querySelector('.carousel .modal');

const { pathname } = window.location;

window.addEventListener('DOMContentLoaded', () => {
  const currentNav = pathname === '/'
    ? navItems[0]
    : Array.from(navItems).find(item => pathname.includes(item.innerText.toLowerCase()));

  currentNav.classList.add('active');
})

document.querySelector('.toggle-nav').addEventListener('click', () => {
  const ul = document.querySelector('ul');

  if (navOpen) {
    closeNav.style.display = 'none';
    openNav.style.display = 'block';
    ul.style.display = 'none';
    document.querySelector('body').style.overflow = 'scroll';
    navOpen = false;
  } else {
    openNav.style.display = 'none';
    closeNav.style.display = 'block';
    ul.style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
    navOpen = true;
  }
});

let activeImgContainer;

const renderGallery = async () => {
  const handleThumbnailClick = (e) => {
    document.querySelector('body').style.overflow = 'hidden';

    carouselModal.style.top = `${window.pageYOffset}px`;
    carouselModal.classList.add('active');

    const [currentImg] = e.target.classList;
    const carouselImg = document.querySelector(`.carousel .modal .${currentImg}`);
    activeImgContainer = carouselImg.parentElement;
    activeImgContainer.style.display = 'flex';
  }

  let count = 1;
  
  while (count < 29) {
    const img = document.createElement('img');
    img.className = `img-${count}`;
    img.src = `./img/gallery/${count}.webp`;

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    imgContainer.onclick = handleThumbnailClick;

    img.onload = () => imgContainer.appendChild(img);
    thumbnails.appendChild(imgContainer);

    const modalImgContainer = document.createElement('div');
    modalImgContainer.classList.add('modal-img-container');
    const modalImg = img.cloneNode();

    modalImgContainer.insertAdjacentHTML('beforeend', `
      <div class="controls">
        <div class="move move-left"><</div>
        <div class="move move-right">></div>
      </div>
    `);

    modalImg.onload = () => modalImgContainer.insertAdjacentElement('afterbegin', modalImg);
    carouselModal.appendChild(modalImgContainer);

    count++;
  }
};

if (gallery) {
  renderGallery();
  
  carouselModal.addEventListener('click', (e) => {
    if (
      carouselModal.classList.contains('active')
      && !e.target.classList.contains('controls')
      && !e.target.classList.contains('move')
    ) {
      activeImgContainer.style.display = 'none';
      carouselModal.classList.remove('active');
      document.querySelector('body').style.overflow = 'scroll';
    }
  });

  document.querySelectorAll('.move').forEach(el => el.addEventListener('click', (e) => {
    let sibling;
    
    if (e.target.classList.contains('move-left')) {
      sibling = activeImgContainer.previousElementSibling;
    } else sibling = activeImgContainer.nextElementSibling;

    activeImgContainer.style.display = 'none';
    sibling.style.display = 'flex';
    activeImgContainer = sibling;
  }));
}
