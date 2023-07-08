import axios from 'axios';
import {
  showEmptyArrayMessage,
  showEndCollectionMessage,
  showTotalHitsMessage,
} from './messages';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38126529-286095ed673191a38ee515f21';

const requestParameters = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

export { getApiResponse, requestParameters };

async function getApiResponse(searchTerm) {
  requestParameters.q = searchTerm;

  try {
    const response = await axios.get(BASE_URL, { params: requestParameters });
    const images = response.data;

    const pagesAmount = Math.ceil(
      images.totalHits / requestParameters.per_page
    );

    showInfo(images, pagesAmount);

    if (requestParameters.page === pagesAmount) {
      requestParameters.page = 1;
    } else {
      requestParameters.page += 1;
    }

    return images;
  } catch (error) {
    console.log(error);
  }
}

function showInfo(images, pagesAmount) {
  if (images.totalHits === 0) {
    showEmptyArrayMessage();
  } else if (requestParameters.page === 1) {
    showTotalHitsMessage(images.totalHits);
  }
  if (requestParameters.page === pagesAmount) {
    showEndCollectionMessage();
  }

  resetSearchBar();
}

function resetSearchBar() {
  const inputEl = document.querySelector('.search-form input');
  inputEl.value = '';
}
