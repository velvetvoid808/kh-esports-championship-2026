(() => {
"use strict";

document.addEventListener("DOMContentLoaded", () => {

const navbar=document.getElementById("navbar");
const menuToggle=document.getElementById("menuToggle");
const mobileMenu=document.getElementById("mobileMenu");
const menuBackdrop=document.getElementById("menuBackdrop");
const scrollProgress=document.getElementById("scrollProgress");
const backToTop=document.getElementById("backToTop");

const desktopLinks=[...document.querySelectorAll(".nav-links a")];
const mobileLinks=[...document.querySelectorAll(".mobile-links a")];
const sections=[...document.querySelectorAll("main section[id]")];

function updateNavbar(){
if(navbar) navbar.classList.toggle("scrolled",window.scrollY>30);
}

function updateScrollProgress(){
if(!scrollProgress)return;
const max=document.documentElement.scrollHeight-window.innerHeight;
scrollProgress.style.width=(max<=0?100:Math.min(100,Math.max(0,window.scrollY/max*100)))+"%";
}

function updateBackToTop(){
if(backToTop)backToTop.classList.toggle("visible",window.scrollY>600);
}

if(backToTop){
backToTop.addEventListener("click",()=>{
window.scrollTo({top:0,behavior:"smooth"});
});
}

function setActiveSection(id){
desktopLinks.forEach(link=>{
link.classList.toggle("active",link.getAttribute("href")==="#"+id);
});
mobileLinks.forEach(link=>{
link.classList.toggle("active",link.getAttribute("href")==="#"+id);
});
}

function getCurrentSection(){
if(!sections.length)return"home";
const navHeight=navbar?navbar.offsetHeight:0;
const point=window.scrollY+navHeight+80;
let current=sections[0].id;
for(const section of sections){
const top=section.getBoundingClientRect().top+window.scrollY;
if(point>=top)current=section.id;
else break;
}
return current;
}

function updateActiveNavigation(){
setActiveSection(getCurrentSection());
}

function closeMenu(){
if(!mobileMenu||!menuBackdrop||!menuToggle)return;
mobileMenu.classList.remove("open");
menuBackdrop.classList.remove("open");
menuToggle.classList.remove("open");
menuToggle.setAttribute("aria-expanded","false");
menuToggle.setAttribute("aria-label","Open navigation menu");
document.body.classList.remove("menu-open");
}

function openMenu(){
if(!mobileMenu||!menuBackdrop||!menuToggle)return;
mobileMenu.classList.add("open");
menuBackdrop.classList.add("open");
menuToggle.classList.add("open");
menuToggle.setAttribute("aria-expanded","true");
menuToggle.setAttribute("aria-label","Close navigation menu");
document.body.classList.add("menu-open");
}

if(menuToggle){
menuToggle.addEventListener("click",()=>{
mobileMenu&&mobileMenu.classList.contains("open")?closeMenu():openMenu();
});
}

if(menuBackdrop)menuBackdrop.addEventListener("click",closeMenu);

function handleNavigationClick(event){
const link=event.currentTarget;
const href=link.getAttribute("href");

if(!href||!href.startsWith("#")||href==="#")return;

const target=document.getElementById(href.slice(1));
if(!target)return;

event.preventDefault();
closeMenu();

const navHeight=navbar?navbar.offsetHeight:0;
const top=target.getBoundingClientRect().top+window.scrollY-navHeight;

window.scrollTo({
top:Math.max(0,top),
behavior:"smooth"
});

if(window.history&&window.history.pushState){
window.history.pushState(null,"",href);
}
}

desktopLinks.forEach(link=>{
link.addEventListener("click",handleNavigationClick);
});

mobileLinks.forEach(link=>{
link.addEventListener("click",handleNavigationClick);
});

document.addEventListener("keydown",event=>{
if(event.key==="Escape")closeMenu();
});

let ticking=false;

window.addEventListener("scroll",()=>{
updateNavbar();
updateBackToTop();
updateScrollProgress();

if(!ticking){
requestAnimationFrame(()=>{
updateActiveNavigation();
ticking=false;
});
ticking=true;
}
},{passive:true});

window.addEventListener("resize",()=>{
if(window.innerWidth>1100)closeMenu();
updateActiveNavigation();
updateScrollProgress();
});

window.addEventListener("popstate",updateActiveNavigation);

/* =========================
   REVEAL ANIMATION
========================= */

const revealElements=document.querySelectorAll(".reveal");

if("IntersectionObserver"in window){

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("reveal-visible");
}else{
entry.target.classList.remove("reveal-visible");
}
});
},{
threshold:.12,
rootMargin:"0px 0px -8% 0px"
});

revealElements.forEach(element=>observer.observe(element));

}else{

revealElements.forEach(element=>{
element.classList.add("reveal-visible");
});

}

/* =========================
   BRACKET TITLE SWITCHING
========================= */

const bracketTabs=document.querySelectorAll(".bracket-tab");
const bracketPanels=document.querySelectorAll(".bracket-panel");

function switchBracketTitle(title){

bracketTabs.forEach(tab=>{
const active=tab.dataset.bracketTitle===title;
tab.classList.toggle("active",active);
tab.setAttribute("aria-selected",active?"true":"false");
});

bracketPanels.forEach(panel=>{
panel.classList.toggle(
"active",
panel.dataset.bracketPanel===title
);
});

}

bracketTabs.forEach(tab=>{
tab.addEventListener("click",()=>{
switchBracketTitle(tab.dataset.bracketTitle);
});
});

/* =========================
   BRACKET ACCORDIONS
========================= */

document.querySelectorAll(".bracket-accordion-trigger").forEach(trigger=>{

trigger.addEventListener("click",()=>{

const accordion=trigger.closest(".bracket-accordion");

if(!accordion)return;

const open=accordion.classList.toggle("open");

trigger.setAttribute(
"aria-expanded",
open?"true":"false"
);

});

});

/* =========================
   INITIAL STATE
========================= */

updateNavbar();
updateScrollProgress();
updateBackToTop();
updateActiveNavigation();

setTimeout(updateActiveNavigation,100);
setTimeout(updateActiveNavigation,500);

});

})();
