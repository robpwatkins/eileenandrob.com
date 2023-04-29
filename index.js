let navOpen = false;
const openNav = document.querySelector('.open-nav');
const closeNav = document.querySelector('.close-nav');

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