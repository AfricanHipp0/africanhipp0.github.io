const menuBurger = document.querySelector('#menu-burger');
const navLinks = document.querySelector('.nav-links');


menuBurger.onclick = () => {
    navLinks.classList.toggle('active');
}