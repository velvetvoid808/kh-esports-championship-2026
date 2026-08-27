(() => {
"use strict";

const navbar=document.getElementById("navbar");
const menuToggle=document.getElementById("menuToggle");
const mobileMenu=document.getElementById("mobileMenu");
const menuBackdrop=document.getElementById("menuBackdrop");
const desktopLinks=Array.from(document.querySelectorAll(".nav-links a"));
const mobileLinks=Array.from(document.querySelectorAll(".mobile-links a,.mobile-register"));
const sections=Array.from(document.querySelectorAll("main section[id]"));
const prefersReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const progressBar=document.getElementById("scrollProgress");

const backToTop=document.getElementById("backToTop");

function updateNavbar(){
if(!navbar)return;
navbar.classList.toggle("scrolled",window.scrollY>24);
}

function updateProgress(){
if(!progressBar)return;
const height=document.documentElement.scrollHeight-window.innerHeight;
if(height<=0){progressBar.style.width="0%";return}
const progress=(window.scrollY/height)*100;
progressBar.style.width=`${Math.min(100,Math.max(0,progress))}%`;
}

function updateBackToTop(){
if(!backToTop)return;
backToTop.classList.toggle("visible",window.scrollY>500);
}

if(backToTop){
backToTop.addEventListener("click",()=>{
window.scrollTo({
top:0,
behavior:prefersReducedMotion?"auto":"smooth"
});
});
}

function openMenu(){
if(!mobileMenu||!menuBackdrop||!menuToggle)return;

mobileMenu.classList.add("open");
menuBackdrop.classList.add("open");
menuToggle.classList.add("open");
document.body.classList.add("menu-open");

menuToggle.setAttribute("aria-expanded","true");
menuToggle.setAttribute("aria-label","Close navigation menu");
mobileMenu.setAttribute("aria-hidden","false");
menuBackdrop.setAttribute("aria-hidden","false");
}

function closeMenu(){
if(!mobileMenu||!menuBackdrop||!menuToggle)return;

mobileMenu.classList.remove("open");
menuBackdrop.classList.remove("open");
menuToggle.classList.remove("open");
document.body.classList.remove("menu-open");

menuToggle.setAttribute("aria-expanded","false");
menuToggle.setAttribute("aria-label","Open navigation menu");
mobileMenu.setAttribute("aria-hidden","true");
menuBackdrop.setAttribute("aria-hidden","true");
}

if(menuToggle){
menuToggle.addEventListener("click",()=>{
if(mobileMenu&&mobileMenu.classList.contains("open")){
closeMenu();
}else{
openMenu();
}
});
}

if(menuBackdrop){
menuBackdrop.addEventListener("click",closeMenu);
}

function getHeaderOffset(){
return navbar?navbar.offsetHeight+12:0;
}

function scrollToTarget(targetId){
const target=document.getElementById(targetId);
if(!target)return;

const targetPosition=target.getBoundingClientRect().top+window.scrollY-getHeaderOffset();

window.scrollTo({
top:Math.max(0,targetPosition),
behavior:prefersReducedMotion?"auto":"smooth"
});
}

function handleNavigationClick(event){
const link=event.currentTarget;
const href=link.getAttribute("href");

if(!href||!href.startsWith("#")||href==="#")return;

const targetId=href.substring(1);
const target=document.getElementById(targetId);

if(!target)return;

event.preventDefault();
closeMenu();
scrollToTarget(targetId);
}

desktopLinks.forEach(link=>{
link.addEventListener("click",handleNavigationClick);
});

mobileLinks.forEach(link=>{
link.addEventListener("click",handleNavigationClick);
});

function setActiveSection(sectionId){
desktopLinks.forEach(link=>{
link.classList.toggle(
"active",
link.getAttribute("href")===`#${sectionId}`
);
});

mobileLinks.forEach(link=>{
link.classList.toggle(
"active",
link.getAttribute("href")===`#${sectionId}`
);
});
}

function updateActiveSection(){
if(!sections.length)return;

const headerHeight=navbar?navbar.offsetHeight:0;
const activationPoint=window.scrollY+headerHeight+80;
let current=sections[0].id;

for(const section of sections){
const top=section.getBoundingClientRect().top+window.scrollY;

if(activationPoint>=top){
current=section.id;
}else{
break;
}
}

setActiveSection(current);
}

document.addEventListener("keydown",event=>{
if(event.key==="Escape")closeMenu();
});

window.addEventListener("resize",()=>{
if(window.innerWidth>1100)closeMenu();
updateActiveSection();
updateProgress();
});

let scrollTicking=false;

window.addEventListener("scroll",()=>{
updateNavbar();
updateBackToTop();
updateProgress();

if(!scrollTicking){
window.requestAnimationFrame(()=>{
updateActiveSection();
scrollTicking=false;
});
scrollTicking=true;
}
},{passive:true});

window.addEventListener("popstate",updateActiveSection);

const revealElements=document.querySelectorAll(".reveal");

if("IntersectionObserver" in window){

const revealObserver=new IntersectionObserver(
entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("reveal-visible");
}else{
entry.target.classList.remove("reveal-visible");
}
});
},
{
threshold:.12,
rootMargin:"0px 0px -8% 0px"
}
);

revealElements.forEach(element=>{
revealObserver.observe(element);
});

}else{

revealElements.forEach(element=>{
element.classList.add("reveal-visible");
});

}

/* =====================================================
   TOURNAMENT BRACKETS
===================================================== */

const bracketTabs=Array.from(
document.querySelectorAll(".bracket-tab")
);

const bracketPanels=Array.from(
document.querySelectorAll(".bracket-panel")
);

const bracketAccordions=Array.from(
document.querySelectorAll(".bracket-accordion")
);

bracketTabs.forEach(tab=>{

tab.addEventListener("click",()=>{

const title=tab.dataset.bracketTitle;

bracketTabs.forEach(item=>{

const active=item===tab;

item.classList.toggle("active",active);

item.setAttribute(
"aria-selected",
active?"true":"false"
);

});

bracketPanels.forEach(panel=>{

panel.classList.toggle(
"active",
panel.dataset.bracketPanel===title
);

});

bracketAccordions.forEach(accordion=>{

accordion.classList.remove("open");

const toggle=
accordion.querySelector(
".bracket-accordion-toggle"
);

if(toggle){
toggle.setAttribute(
"aria-expanded",
"false"
);
}

});

});

});

bracketAccordions.forEach(accordion=>{

const toggle=
accordion.querySelector(
".bracket-accordion-toggle"
);

if(!toggle)return;

toggle.addEventListener("click",()=>{

const open=
accordion.classList.toggle("open");

toggle.setAttribute(
"aria-expanded",
open?"true":"false"
);

});

});

updateNavbar();
updateProgress();
updateBackToTop();
updateActiveSection();

window.setTimeout(updateActiveSection,100);
window.setTimeout(updateActiveSection,500);

})();
