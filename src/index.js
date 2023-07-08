import './styles.css';
import { getApiResponse, requestParameters } from './js/api';
import { getGallery } from './js/gallery';

const searchFormEl = document.querySelector('.search-form');
const inputEl = searchFormEl.querySelector('input');
const searchBtnEl = searchFormEl.querySelector('button');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

inputEl.addEventListener('input', onInputElInput);
inputEl.addEventListener('click', onInputElClick);
searchBtnEl.addEventListener('click', onSearchBtnElClick);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

let searchText = '';

function onInputElInput() {
  requestParameters.page = 1;
  searchText = inputEl.value;
  searchBtnEl.disabled = false;
}

function onInputElClick() {
  if (inputEl.value !== '') {
    loadMoreBtnEl.classList.add('visually-hidden');
  }
}

async function onSearchBtnElClick(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';

  try {
    const images = await getApiResponse(searchText);

    if (images.totalHits > requestParameters.per_page) {
      loadMoreBtnEl.classList.remove('visually-hidden');
    } else {
      loadMoreBtnEl.classList.add('visually-hidden');
    }
    searchBtnEl.disabled = true;

    getGallery(images.hits);
  } catch (error) {
    console.log(error);
    loadMoreBtnEl.classList.add('visually-hidden');
    searchBtnEl.disabled = false;
  }
}

async function onLoadMoreBtnClick() {
  try {
    const images = await getApiResponse(searchText);

    getGallery(images.hits);
    scrollGallerySmoothly(galleryEl);

    if (requestParameters.page === 1) {
      loadMoreBtnEl.classList.add('visually-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

function scrollGallerySmoothly(galleryEl) {
  const { height: cardHeight } =
    galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
