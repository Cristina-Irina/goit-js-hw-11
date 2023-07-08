import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const itemsInRow = 4;
const galleryEl = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');

export function getGallery(images) {
  galleryEl.insertAdjacentHTML('beforeend', renderGallery(images));
  lightbox.refresh();
}

function renderGallery(images) {
  return images.map(renderImage).join('');
}

function renderImage(imageObject) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = imageObject;

  return `
    <a href="${largeImageURL}">
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes</b> ${likes}</p>
          <p class="info-item"><b>Views</b> ${views}</p>
          <p class="info-item"><b>Comments</b> ${comments}</p>
          <p class="info-item"><b>Downloads</b> ${downloads}</p>
        </div>
      </div>
    </a>
  `;
}
