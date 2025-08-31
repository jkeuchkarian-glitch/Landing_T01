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
	disableScroll();
  } else {
    openMenu();
	enableScroll();
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
	enableScroll();
  }

});

// Disable enable scroll
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


toggleButton.addEventListener('click', toggleMenu);

console.log('Menu open on load:', menuOpen);