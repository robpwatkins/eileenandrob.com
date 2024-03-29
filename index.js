let navOpen = false;
const body = document.querySelector('body');
const nav = document.querySelector('nav');
const navItems = document.querySelectorAll('ul li');
const openNav = document.querySelector('.open-nav');
const closeNav = document.querySelector('.close-nav');
const registryItem = document.querySelector('.registry-item');
const rsvpItem = document.querySelector('.rsvp-item');
const squareArrow = document.querySelector('.square-arrow');
const gallery = document.querySelector('.gallery');
const thumbnails = document.querySelector('.thumbnails');
const carouselModal = document.querySelector('.carousel .modal');

const { pathname } = window.location;

window.addEventListener('DOMContentLoaded', () => {
  const currentNav = pathname === '/'
    ? navItems[0]
    : Array.from(navItems).find(item => pathname.includes(item.innerText.toLowerCase()));

  currentNav.classList.add('active');

  document.querySelector('.toggle-nav').addEventListener('click', () => {
    const ul = document.querySelector('ul');

    if (navOpen) {
      closeNav.style.display = 'none';
      openNav.style.display = 'block';
      ul.style.display = 'none';
      nav.style.backgroundColor = 'var(--darkgreen)';
      body.style.overflow = 'scroll';
      navOpen = false;
    } else {
      openNav.style.display = 'none';
      closeNav.style.display = 'block';
      ul.style.display = 'flex';
      nav.style.backgroundColor = 'unset';
      body.style.overflow = 'hidden';
      navOpen = true;
    }
  });

  [registryItem, rsvpItem].forEach(item => item.addEventListener('mouseenter', (e) => {
    e.target.querySelector('.square-arrow').style.opacity = 1;
  }));

  [registryItem, rsvpItem].forEach(item => item.addEventListener('mouseleave', (e) => {
    e.target.querySelector('.square-arrow').style.opacity = 0;
  }));

  let activeImgContainer;


  if (gallery) {
    thumbnails.addEventListener('click', (e) => {
      document.querySelector('body').style.overflow = 'hidden';
    
      carouselModal.style.top = `${window.pageYOffset}px`;
      carouselModal.classList.add('active');
    
      const [currentImg] = e.target.classList;
      const carouselImg = document.querySelector(`.carousel .modal .${currentImg}`);
      activeImgContainer = carouselImg.parentElement;
      activeImgContainer.style.display = 'flex';
    });
    
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
});
