import { Notify } from 'notiflix';

const messages = {
  emptyArray:
    'Sorry, there are no images matching your search query. Please try again.',
  endCollection: "We're sorry, but you've reached the end of search results.",
  totalHits: totalHits => `Hooray! We found ${totalHits} images.`,
};

export function showEmptyArrayMessage() {
  Notify.failure(messages.emptyArray);
}

export function showEndCollectionMessage() {
  Notify.info(messages.endCollection);
}

export function showTotalHitsMessage(totalHits) {
  Notify.success(messages.totalHits(totalHits));
}
