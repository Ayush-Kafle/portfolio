// smooth scroll

document.querySelectorAll('.sidebar-nav a').forEach(anchor=>{

anchor.addEventListener('click',function(e){

e.preventDefault();

document.querySelector(this.getAttribute('href'))
.scrollIntoView({behavior:'smooth'});

});

});


// scroll spy

const sections=document.querySelectorAll('section');
const navLinks=document.querySelectorAll('.sidebar-nav a');

window.addEventListener('scroll',()=>{

let current='';

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

if(window.scrollY>=sectionTop){
current=section.getAttribute('id');
}

});

navLinks.forEach(link=>{

link.classList.remove('active');

if(link.getAttribute('href')===`#${current}`){
link.classList.add('active');
}

});

});


// sliding nav indicator

const indicator=document.querySelector('.nav-indicator');

function moveIndicator(link){

const rect=link.getBoundingClientRect();
const navRect=link.parentElement.getBoundingClientRect();

indicator.style.transform=
`translateY(${rect.top-navRect.top+rect.height/2}px)`;

}

navLinks.forEach(link=>{
link.addEventListener('click',()=>moveIndicator(link));
});


// reveal animation

const revealSections=document.querySelectorAll('.section');

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

entry.target.classList.add('reveal');

});

},{threshold:.2});

revealSections.forEach(section=>observer.observe(section));


// cursor glow

const glow=document.querySelector('.cursor-glow');

document.addEventListener('mousemove',e=>{

glow.style.left=e.clientX+"px";
glow.style.top=e.clientY+"px";

});


// terminal typing

const lines=[
"Backend Engineer",
"Building scalable systems",
"API design • System architecture",
"Open to opportunities"
];

let lineIndex=0;
let charIndex=0;

const terminal=document.getElementById("terminal-text");

function typeLine(){

if(charIndex<lines[lineIndex].length){

terminal.textContent+=lines[lineIndex].charAt(charIndex);

charIndex++;

setTimeout(typeLine,60);

}

else{

setTimeout(()=>{

terminal.textContent="";
charIndex=0;
lineIndex=(lineIndex+1)%lines.length;

typeLine();

},1800);

}

}

typeLine();


// project hover

const projects=document.querySelectorAll('.project');

projects.forEach(project=>{

project.addEventListener('mousemove',e=>{

const rect=project.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const centerX=rect.width/2;
const centerY=rect.height/2;

const moveX=(x-centerX)/15;
const moveY=(y-centerY)/15;

project.style.transform=`translate(${moveX}px,${moveY}px)`;

});

project.addEventListener('mouseleave',()=>{
project.style.transform="translate(0,0)";
});

});


// activate icons

feather.replace();