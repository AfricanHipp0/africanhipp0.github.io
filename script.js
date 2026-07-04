const menuBurger = document.querySelector('#menu-burger');
const navLinks = document.querySelector('#nav-links');

menuBurger?.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('active'))
);

const roles = [
    'brent_zaltsman',
    'penetration_tester',
    'cve_author'
];
const typer = document.querySelector('#typer');
let roleIdx = 0, charIdx = 0, deleting = false;

function tick() {
    if (!typer) return;
    const word = roles[roleIdx];
    typer.textContent = word.slice(0, charIdx);

    if (!deleting && charIdx < word.length) {
        charIdx++;
        setTimeout(tick, 70);
    } else if (!deleting && charIdx === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
    } else if (deleting && charIdx > 0) {
        charIdx--;
        setTimeout(tick, 35);
    } else {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 300);
    }
}
tick();

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${(i % 4) * 80}ms`;
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a =>
                a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
            );
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
