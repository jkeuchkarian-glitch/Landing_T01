const toggleButton = document.getElementById('menuToggle');
const toggleButtonImg = document.getElementById('menuToggleImg');
const toggleNavLinks = document.getElementById('menuNavLinks');
const toggleCtaLinks = document.getElementById('menuCtaLinks');
const toggleNav = document.getElementById('navToggle');

const mediaQuery = window.matchMedia('(max-width: 1024px)');

// Flag to track if menu is open
let menuOpen = false;

function isMobile() {
  return window.innerWidth <= 1024;
}

function openMenu() {
	toggleButtonImg.classList.add('toggleButton_active');
	toggleButtonImg.classList.remove('toggleButton_closed');
	
	toggleNavLinks.classList.add('col_links_closed');
	toggleNavLinks.classList.remove('col_links_active');
	
	toggleCtaLinks.classList.add('cta_closed');
	toggleCtaLinks.classList.remove('cta_active');
	
	toggleNav.classList.add('nav_active');
	toggleNav.classList.remove('nav_closed');
	
	menuOpen = true;
	document.body.style.overflow = 'visible';

}

function closeMenu() {
	toggleButtonImg.classList.add('toggleButton_closed');
	toggleButtonImg.classList.remove('toggleButton_active');
	
	toggleNavLinks.classList.add('col_links_active');
	toggleNavLinks.classList.remove('col_links_closed');
	
	toggleCtaLinks.classList.add('cta_active');
	toggleCtaLinks.classList.remove('cta_closed');
	
	toggleNav.classList.add('nav_closed');
	toggleNav.classList.remove('nav_active');
	
	menuOpen = false;
	document.body.style.overflow = 'hidden';
	
}

function toggleMenu() {
  if (!isMobile()) return;

  if (menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

window.onload = function () {
  if (isMobile()) {
    openMenu();
  }
  /* console.log('Menu open on load:', menuOpen); */
};
   

// On window resize
window.addEventListener('resize', () => {
  if (!isMobile() && menuOpen) {
    closeMenu(); // Close menu if screen becomes large
	document.body.style.overflow = 'hidden';
  }
  else if (isMobile() && !menuOpen) {
	openMenu(); // Close menu if screen becomes large
	toggleNav.classList.add('nav_active');
	toggleNav.classList.remove('nav_closed');
	document.body.style.overflow = 'visible';
  }
  else if (!isMobile() && !menuOpen) {
	document.body.style.overflow = 'visible';
  }

});

toggleButton.addEventListener('click', toggleMenu);

console.log('Menu open on load:', menuOpen);