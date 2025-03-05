const navbar = document.querySelector("header");

document.addEventListener('DOMContentLoaded', () => {

   let lastScrollY = window.scrollY;

   window.addEventListener('scroll', () => {
      const currScrollY = window.scrollY;

      if (currScrollY <= lastScrollY || currScrollY < 50) {
         navbar.classList.remove('hidden');
      } else {
         // User has scrolled down
         navbar.classList.add('hidden');
      }
      lastScrollY = currScrollY; // Update the last scroll position
   });

});
