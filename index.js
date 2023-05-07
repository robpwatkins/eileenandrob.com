let navOpen = false;
const openNav = document.querySelector('.open-nav');
const closeNav = document.querySelector('.close-nav');
const gallery = document.querySelector('.gallery');

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
  let count = 1;
  while (count < 12) {
    const img = document.createElement('img');
    img.src = `./gallery/${count}.jpg`;
    gallery.appendChild(img);
    count++;
  }
};

if (gallery) renderGallery();