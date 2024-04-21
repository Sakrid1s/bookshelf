import"./assets/dark-theme-a4e0006e.js";import"./assets/vendor-59c8246b.js";const i="/bookshelf/assets/symbol-defs-a993dfba.svg#icon-amazon",c="/bookshelf/assets/symbol-defs-a993dfba.svg#icon-ibooks",d="/bookshelf/assets/symbol-defs-a993dfba.svg#icon-trash",p="https://books-backend.p.goit.global/books/",o=document.querySelector(".shopping-list-default-div"),h=document.querySelector(".shopping-list-render");async function u(){try{const s=JSON.parse(localStorage.getItem("idBooks"))||[];if(!s||s.length===0){console.log("Масив ID порожній або відсутній.");return}const t=s.map(async e=>{const r=await fetch(`${p}/${e}`);if(!r.ok)throw new Error(`Failed to fetch data for ID: ${e}`);return r.json()}),a=await Promise.all(t);g(a)}catch(s){console.error("Error:",s.message)}}function g(s){if(s.length===0){o.style.display="block";return}const t=s.map(e=>`
      <div class="card">
        <img src="${e.book_image}" alt="book cover" class="book-cover" >
        <div class="about">
          <h2 class="book-title">${e.title}</h2>
          <p class="book-category">${e.list_name}</p>
          <p class="book-description">${e.description}</p>
          <p class="book-author">${e.author}</p>
        </div>
           <div class="buy">
        <a href="${e.buy_links[0].url}" target="_blank">
          <svg class="amazon" width="16" height="16">
            <use href="${i}"></use>
          </svg>
        </a>
        <a href="${e.buy_links[1].url}" target="_blank">
          <svg class="ibook" width="16" height="16">
            <use href="${c}"></use>
          </svg>
        </a>
      </div>
      <button data-book-id="${e._id}" class="delete-btn">
        <div class="icon-trash">
          <svg class="trash" width="16" height="16">
            <use href="${d}"></use>
          </svg>
        </div>
      </button>
      </div>
    `).join("");h.insertAdjacentHTML("beforeend",t),s.length===0?o.style.display="block":o.style.display="none",document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",()=>{const r=e.getAttribute("data-book-id");f(r);const n=e.closest(".card");n&&n.remove(),l()})})}u();function f(s){const t=JSON.parse(localStorage.getItem("idBooks"))||[];if(!t||t.length===0)return;const a=t.filter(e=>e!==s);localStorage.setItem("idBooks",JSON.stringify(a))}function b(){return document.querySelector(".shopping-list-render").children.length===0}function l(){const s=document.querySelector(".support-ukraine");b()?(o.style.display="block",s.style.display="block"):(o.style.display="none",s.style.display="block")}l();
//# sourceMappingURL=commonHelpers2.js.map
