// smooth scroll

const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = themeToggle.querySelector('span');

const themePalettes = {
    dark: [
        ['#020617', '#0a1024', '#19132d'],
        ['#03101f', '#111a35', '#24152f'],
        ['#020a18', '#0b1d2b', '#122b2b'],
        ['#07101f', '#17182f', '#201c38']
    ],
    light: [
        ['#faf8f1', '#f4f0f2', '#dfe5f1'],
        ['#fbf8ef', '#f0f3ee', '#dce9e5'],
        ['#fcf7ef', '#f5eeee', '#e8e3f1'],
        ['#f7f7f2', '#eef2f3', '#dfe8ed']
    ]
};

let paletteStep = -1;
let paletteIndex = -1;

function applyRandomPalette(force = false) {
    const sections = document.querySelectorAll('section');
    let nextStep = 0;

    sections.forEach((section, index) => {
        if (window.scrollY >= section.offsetTop - window.innerHeight * .35) {
            nextStep = index;
        }
    });

    if (!force && nextStep === paletteStep) return;

    const mode = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const palettes = themePalettes[mode];
    let nextIndex = Math.floor(Math.random() * palettes.length);

    if (palettes.length > 1 && nextIndex === paletteIndex) {
        nextIndex = (nextIndex + 1) % palettes.length;
    }

    const [top, middle, bottom] = palettes[nextIndex];
    const root = document.documentElement;

    root.style.setProperty('--theme-top', top);
    root.style.setProperty('--theme-mid', middle);
    root.style.setProperty('--theme-bottom', bottom);

    paletteStep = nextStep;
    paletteIndex = nextIndex;
}

applyRandomPalette(true);

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');

    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeLabel.textContent = isLight ? 'Dark mode' : 'Light mode';
    paletteIndex = -1;
    applyRandomPalette(true);
});

document.querySelectorAll('.sidebar-nav a').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        document
            .querySelector(this.getAttribute('href'))
            .scrollIntoView({
                behavior: 'smooth'
            });

    });

});


// scroll spy

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.sidebar-nav a');

window.addEventListener('scroll', () => {

    applyRandomPalette();

    let current = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (link.getAttribute('href') === `#${current}`) {

            link.classList.add('active');

            // move indicator while scrolling
            moveIndicator(link);

        }

    });

});


// sliding nav indicator

const indicator = document.querySelector('.nav-indicator');

function moveIndicator(link) {

    const rect = link.getBoundingClientRect();
    const navRect = link.parentElement.getBoundingClientRect();

    indicator.style.transform =
        `translateY(${rect.top - navRect.top + rect.height / 2}px)`;

}

navLinks.forEach(link => {

    link.addEventListener('click', () => {
        moveIndicator(link);
    });

});


// set indicator position on page load

window.addEventListener('load', () => {

    const activeLink =
        document.querySelector('.sidebar-nav a.active') || navLinks[0];

    moveIndicator(activeLink);

});


// reveal animation

const revealSections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add('reveal');

    });

}, {
    threshold: .2
});

revealSections.forEach(section => observer.observe(section));


// cursor glow

const glow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', e => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});


// terminal typing

const lines = [
    "backend systems",
    "APIs & infrastructure",
    "AI-powered software",
    "always learning"
];

let lineIndex = 0;
let charIndex = 0;

const terminal = document.getElementById("terminal-text");

function typeLine() {

    if (charIndex < lines[lineIndex].length) {

        terminal.textContent += lines[lineIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeLine, 60);

    } else {

        setTimeout(() => {

            terminal.textContent = "";
            charIndex = 0;
            lineIndex = (lineIndex + 1) % lines.length;

            typeLine();

        }, 1800);

    }

}

typeLine();


// project hover

const projects = document.querySelectorAll('.project');

projects.forEach(project => {

    project.addEventListener('mousemove', e => {

        const rect = project.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 15;
        const moveY = (y - centerY) / 15;

        project.style.transform =
            `translate(${moveX}px,${moveY}px)`;

    });

    project.addEventListener('mouseleave', () => {
        project.style.transform = "translate(0,0)";
    });

});


// activate icons

feather.replace();