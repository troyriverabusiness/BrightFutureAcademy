
const questions = document.querySelectorAll(`li`);

questions.forEach(q => {
   q.addEventListener("click", () => {
      q.classList.toggle("active");
      const answer = q.querySelector(`.answer`);
      if(q.classList.contains("active")) {
         answer.style.maxHeight = answer.scrollHeight + "px";
         answer.style.marginTop = "10px";
      } else {
         answer.style.maxHeight = 0;
         answer.style.marginTop = 0;
      }
   });
});

const navbar = document.querySelector("header");

document.addEventListener('DOMContentLoaded', () => {
   const mask_bg = document.querySelector('body');

   window.addEventListener('load', ()=> {
      if (window.scrollY === 0) {
         mask_bg.style.background = '#141414';
         navbar.classList.add('mask');
      }
   });

   let lastScrollY = window.scrollY;

   window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY !== 0) {
         mask_bg.style.background = 'white';
      }

      if (currentScrollY < window.innerHeight) {
         // User is at the top
         navbar.classList.remove('scroll');
         navbar.classList.add('mask');
      } else if (currentScrollY <= lastScrollY) {
         navbar.classList.remove('hidden');
      } else {
         // User has scrolled down
         navbar.classList.add('hidden', 'scroll');
         navbar.classList.remove('mask');
      }
      lastScrollY = currentScrollY; // Update the last scroll position
   });
});



/*
document.addEventListener('DOMContentLoaded', () => {
   const navbar = document.querySelector("header");
   let lastScrollY = window.scrollY;

   window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY === 0) {
         // User is scrolling up or at the top
         navbar.classList.remove('hidden');
      } else {
         // User is scrolling down
         navbar.classList.add('hidden');
      }

      lastScrollY = currentScrollY; // Update the last scroll position
   });
});
*/
