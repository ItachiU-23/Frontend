
const toggle = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

toggle.addEventListener('click', () => {
    menu.classList.toggle('show-menu');
})
