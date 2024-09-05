import{S as H,i as N,a as v,s as w}from"./vendor-f0250c50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const r={body:document.querySelector("body"),burger:document.querySelector(".header-btn-burgher"),headerNav:document.querySelector(".header-menu"),headerLink:document.querySelectorAll(".header-nav-item-modal"),home:document.querySelector(".header-home"),shopping:document.querySelector(".header-shopping"),homeMobal:document.querySelector(".header-home-modal"),shoppingMobal:document.querySelector(".header-shopping-modal")};function B(){r.burger.classList.toggle("active"),r.headerNav.classList.toggle("active"),r.body.classList.toggle("lock")}r.burger.addEventListener("click",B);window.addEventListener("DOMContentLoaded",()=>{r.home.classList.add("active"),r.homeMobal.classList.add("active")});window.location.href.includes("index.html")?window.addEventListener("DOMContentLoaded",()=>{r.home.classList.add("active"),r.shopping.classList.remove("active"),r.homeMobal.classList.add("active"),r.shoppingMobal.classList.remove("active")}):window.location.href.includes("shopping.html")&&window.addEventListener("DOMContentLoaded",()=>{r.home.classList.remove("active"),r.shopping.classList.add("active"),r.homeMobal.classList.remove("active"),r.shoppingMobal.classList.add("active")});const h=document.querySelector(".scroll-up");let S=0;window.addEventListener("scroll",()=>{let e=window.pageYOffset||document.documentElement.scrollTop;e<S&&e>120?h.classList.add("show"):h.classList.remove("show"),S=e<=0?0:e});h.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const $=document.querySelector(".toggle-checkbox");document.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="theme-dark"&&(g("theme-dark"),$.checked=!0)});function g(e){localStorage.setItem("theme",e),document.documentElement.setAttribute("data-theme",e)}$.addEventListener("click",()=>{localStorage.getItem("theme")==="theme-dark"?g("theme-light"):g("theme-dark")});const i=new H(".swiper",{direction:"vertical",loop:!1,initialSlide:0,speed:500,slidesPerView:6,effect:"slide",rewind:!0,breakpoints:{292:{slidesPerView:6}},spaceBetween:20,keyboard:{enabled:!0,onlyInViewport:!0},shortSwipes:!1,preventClicks:!0,disableMouseEvents:!0});i.allowTouchMove=!1;i.on("slideChange",function(){i.isEnd?i.allowTouchMove=!1:i.allowTouchMove=!0});const u=document.querySelector(".swiper-button");u.addEventListener("click",function(){i.activeIndex===2?u.classList.add("rotate"):u.classList.remove("rotate"),i.activeIndex<i.slides.length-1?i.slideNext():i.slideTo(0)});const _="/bookshelf/assets/icons-f2d3a100.svg",C=(e,t)=>!e||e.length===0?`<div class="books-container"><h2 class="books-title">Best Sellers Books</h2>
    </div>${I()}`:`<h2 class="books-title">Best Sellers Books</h2>${e.map(s=>{const n=s.list_name,a=O(s.books.slice(0,t));return`<div class="books-category-container">
        <h3 class="books-category-title">${n}</h3>
        <ul class="books-list">${a}</ul>
        <div class="books-btn-container">
          <button data-catname="${n}" type="button" class="books-btn">see more</button>
        </div>
      </div>`}).join("")}`,T=e=>`<li class="categories-list">
  <a href="#" data-catname="" class="categories-nav active">All categories</a>
  </li>${e.sort((o,s)=>o.list_name<s.list_name?-1:o.list_name>s.list_name?1:0).map(o=>`<li class="categories-list">
      <a href="#" data-catname="${o.list_name}" class="categories-nav">${o.list_name}</a>
    </li>`).join("")}`;function I(){return N.error({message:"Sorry, no books found.",position:"topRight",icon:null}),`</div>
  <div class="empty-category">
  <svg class="icon-shopp-stub">
    <use href="${_}#icon-shopp-stub"></use>
    </svg>
  <span>Nothing found</span>
  </div>`}const A=(e,t)=>{if(!e||e.length===0)return`<div class="books-container">
        <h2 class="books-title">${t}</h2>
        </div>${I()}`;{const o=O(e);return`<h2 class="books-title">${t}</h2>
    <div class="books-category-container">
      <ul class="books-list">${o}</ul>
    </div>`}};function O(e){return e.map(o=>{const{_id:s,book_image:n,title:a,author:l}=o;return`<li class="books-item">
        <div class="books-wrapper">
          <img
            class="books-img"
            src="${n}"
            alt="${a}"
          />
          <a href="#" data-id="${s}" class="books-overlay">
            QUICK VIEW
          </a>
        </div>
        <div class="books-info">
          <h4 class="books-info-title">${a}</h4>
          <p class="books-info-author">${l}</p>
        </div>
      </li>`}).join("")}const b="https://books-backend.p.goit.global";let m=JSON.parse(sessionStorage.getItem("savedfetch"))||"";const x=async e=>{if(m)return C(m,e);{const o=b+"/books/top-books/";try{const s=await v.get(o);return sessionStorage.setItem("savedfetch",JSON.stringify(s.data)),m=s.data,C(s.data,e)}catch(s){console.log(s)}}};let p=JSON.parse(sessionStorage.getItem("savedcategoriesfetch"))||"";const D=async()=>{const t=b+"/books/category-list/";if(p)return T(p);try{const o=await v.get(t);return sessionStorage.setItem("savedcategoriesfetch",JSON.stringify(o.data)),p=o.data,T(o.data)}catch(o){console.log(o)}},P=async e=>{const o=b+"/books/category/",s={category:e};try{const n=await v.get(o,{params:s});return A(n.data,e)}catch(n){console.log(n)}},c=document.querySelector(".books-container"),d=document.querySelector(".categories-menu");let E;async function f(){L();const e=window.innerWidth,t=k(e),o=await x(t);c.innerHTML=o,E||(popup(),E=!0),y()}async function U(){const e=await D();d.innerHTML=e}async function M(e){L();const t=await P(e);c.innerHTML=t,y()}async function y(){const e=document.querySelector(".books-title"),t=e.textContent.split(" "),o=t.pop(),s=t.join(" ")+(t.length>0?` <span  class="books-title-color">${o}</span>`:o);e.innerHTML=s}function k(e){let t=5;return e>=1440&&(t=5),e>=768&&e<1440&&(t=3),e<768&&(t=1),t}const R=window.innerWidth;let q=k(R);async function W(){const e=document.querySelector(".categories-nav.active");if(e&&!e.dataset.catname){const o=window.innerWidth,s=k(o);q!==s&&(q=s,L(),await f(),y())}}c&&(f(),U(),d.addEventListener("click",e=>{e.preventDefault();const t=e.target;if(t.tagName==="A"){const o=t.dataset.catname;d.querySelector(".active").classList.remove("active"),t.classList.add("active"),w(c,{offset:-24,duration:500}),o?M(o):f()}}),c.addEventListener("click",e=>{e.preventDefault();const t=e.target;if(t.classList.contains("books-btn")){const o=t.dataset.catname;d.querySelector(".active").classList.remove("active"),d.querySelector('[data-catname="'+o+'"]').classList.add("active"),w(c,{offset:-24,duration:700}).on("end",()=>{M(o)})}}),window.addEventListener("resize",W));function L(){c.innerHTML='<li class="loader-container"><span class="loader"></span></li>'}
//# sourceMappingURL=main-af1b159d.js.map
