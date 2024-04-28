
// Header ==============================================

const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__navigation');
const mousemove = document.querySelector(`.mousemove`);
const header = document.querySelector(`.header`);
const body = document.body;
const footer = document.querySelector(`.footer-nav__map`);
const input = document.querySelector(`.form-footer__input`);

addEventListener("click", openBurger);

function openBurger(e) {

   if (e.target.closest('.header__burger')) {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      body.classList.toggle('lock')
   }
   if (!e.target.closest('.header__burger')) {
      burger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('lock')
   }
}

// Navigation ==============================================


// Шукає посилання в тезі body

const items = document.querySelector('body');

// Перебирає всі ці посилання й отримує їх посилання

const allA = items.querySelectorAll('a').forEach((link) => {

   // Якщо є то прибирає з посилань #

   let href = link.getAttribute('href');
   let target = link.getAttribute('target')
   if (href && href.length > 1) {
      href = href.split('#')[1];
   }
   link.addEventListener("click", function (e) {
      if (href && !target){
         e.preventDefault();
         if (document.documentElement.style.scrollPaddingTop != `${header.offsetHeight}px`){
            document.documentElement.style.scrollPaddingTop = `${header.offsetHeight}px`;
         }
         if (href && href.length !== 0) {
   
            // Шукає елемент з таким же id як і посилання
   
            var el = document.getElementById(href);
         }
   
         // Якщо посилання не пусте й воно є на сторінці то просткролює до нього
   
         if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            header.classList.add('bg')
         } else {
            window.scrollTo(0, 0);
            if (header.classList.contains('hidden')) {
               header.classList.remove('hidden')
            }
            if (header.classList.contains('bg')) {
               header.classList.remove('bg')
            }
         }
      }
   });
});

window.addEventListener('wheel', function (e) {
   if (!body.classList.contains('lock')) {
      if (window.scrollY >= (header.offsetHeight / 8)) {
         if (e.deltaY < 0) {
            if (header.classList.contains('hidden')) {
               header.classList.remove('hidden')
            }
         } else {
            if (!header.classList.contains('hidden')) {
               header.classList.add('hidden')
            }
         }
         if (!header.classList.contains('bg')) {
            header.classList.add('bg')
         }
      } else {
         if (header.classList.contains('hidden')) {
            header.classList.remove('hidden')
         }
         if (header.classList.contains('bg')) {
            header.classList.remove('bg')
         }
      }
   }
})

if (mousemove) {
   addEventListener('mousemove', function (e) {
      mousemove.style.top = e.clientY - (mousemove.offsetHeight / 2) + "px"
      mousemove.style.left = e.clientX - (mousemove.offsetWidth / 2) + "px"
   })
}

function scrollHeader(e, posX) {
   let twoPosX = e.changedTouches[0].clientY;
   if (!body.classList.contains('lock')) {
      if (window.scrollY >= (header.offsetHeight / 8)) {
         if (twoPosX < posX) {
            if (header.classList.contains('hidden')) {
               header.classList.remove('hidden')
            }
         } else {
            if (!header.classList.contains('hidden')) {
               header.classList.add('hidden')
            }
         }
         if (!header.classList.contains('bg')) {
            header.classList.add('bg')
         }
      } else {
         if (header.classList.contains('hidden')) {
            header.classList.remove('hidden')
         }
         if (header.classList.contains('bg')) {
            header.classList.remove('bg')
         }
      }
   }
}

let touchMoveHandler;

// Функція для видалення 'touchmove'
function removeTouchMoveHandler() {
   if (touchMoveHandler) {
      document.removeEventListener('touchmove', touchMoveHandler);
      touchMoveHandler = null;
   }
}

// Додаємо 'touchstart' один раз
document.addEventListener('touchstart', function (e) {
   let posX = e.changedTouches[0].clientY;
   if (!touchMoveHandler) {
      touchMoveHandler = (e) => scrollHeader(e, posX);
      document.addEventListener('touchmove', touchMoveHandler);
   }
   document.addEventListener('touchend', removeTouchMoveHandler);
});

footer.addEventListener('click', function () {
   footer.classList.toggle('active')
})

input.addEventListener('focus', function () {
   if (!input.classList.contains('input')) {
      input.classList.add('input')
   }
})

input.addEventListener('blur', function () {
   if (input.value) {
   } else {
      if (input.classList.contains('input')){
         input.classList.remove('input')
      }
   }
})

//document.style.scrollPaddingTop = '75px'