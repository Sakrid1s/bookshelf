import { fetchGeneral, fetchCategories, fetchCategory } from './fetch-api';
import { popup } from './popup';
import scrollToElement from 'scroll-to-element';

const booksContainer = document.querySelector('.books-container');
const catsContainer = document.querySelector('.categories-menu');

let popupIsStarted;
async function displayTop() {
  addingLoader();
  const windowWidth = window.innerWidth;
  const booksPerRowForDisplay = booksPerRowFunc(windowWidth);
  const renderedTop = await fetchGeneral(booksPerRowForDisplay);
  booksContainer.innerHTML = renderedTop;
  if (!popupIsStarted) {
    popup();
    popupIsStarted = true;
  }
  wrapLastWord();
}

async function displayCategories() {
  const renderedCats = await fetchCategories();
  catsContainer.innerHTML = renderedCats;
}

async function displayCategory(catName) {
  addingLoader();
  const renderedCat = await fetchCategory(catName);
  booksContainer.innerHTML = renderedCat;
  wrapLastWord();
}

async function wrapLastWord() {
  const title = document.querySelector('.books-title');
  const textContent = title.textContent.split(' ');
  const lastWord = textContent.pop();
  const updatedContent =
    textContent.join(' ') +
    (textContent.length > 0
      ? ` <span  class="books-title-color">${lastWord}</span>`
      : lastWord);
  title.innerHTML = updatedContent;
}

function booksPerRowFunc(windowWith) {
  let booksCount = 5;
  if (windowWith >= 1440) {
    booksCount = 5;
  }
  if (windowWith >= 768 && windowWith < 1440) {
    booksCount = 3;
  }
  if (windowWith < 768) {
    booksCount = 1;
  }
  return booksCount;
}

const windowWidthStart = window.innerWidth;
let ctrlBreikpoint = booksPerRowFunc(windowWidthStart);

async function changeTopDisplay() {
  const AllCats = document.querySelector('.categories-nav.active');
  if (AllCats) {
    const isAllCats = AllCats.dataset.catname;
    if (!isAllCats) {
      const windowWidth = window.innerWidth;
      const booksPerRow = booksPerRowFunc(windowWidth);
      if (ctrlBreikpoint !== booksPerRow) {
        ctrlBreikpoint = booksPerRow;
        addingLoader();
        await displayTop();
        wrapLastWord();
      }
    }
  }
}

if (booksContainer) {
  displayTop();
  displayCategories();
  catsContainer.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;
    if (target.tagName === 'A') {
      const catName = target.dataset.catname;
      catsContainer.querySelector('.active').classList.remove('active');
      target.classList.add('active');
      scrollToElement(booksContainer, {
        offset: -24,
        duration: 500,
      });
      if (catName) {
        displayCategory(catName);
      } else {
        displayTop();
      }
    }
  });

  booksContainer.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('books-btn')) {
      const catName = target.dataset.catname;
      catsContainer.querySelector('.active').classList.remove('active');
      catsContainer
        .querySelector('[data-catname="' + catName + '"]')
        .classList.add('active');
      scrollToElement(booksContainer, {
        offset: -24,
        duration: 700,
      }).on('end', () => {
        displayCategory(catName);
      });
    }
  });
  window.addEventListener('resize', changeTopDisplay);
}

function addingLoader() {
  booksContainer.innerHTML =
    '<li class="loader-container"><span class="loader"></span></li>';
}
