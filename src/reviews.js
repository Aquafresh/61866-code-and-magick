/* global reviews */
'use strict';

(function() {

  reviewsFilterHide();
  var reviewsContainer = document.querySelector('.reviews-list');
  var reviewTemplate = document.querySelector('#review-template');

  function reviewsFilterHide() {
    var reviewsFilter = document.querySelector('.reviews-filter');
    reviewsFilter.classList.add('invisible');
  }

  function reviewsFilterShow() {
    var reviewsFilter = document.querySelector('.reviews-filter');
    reviewsFilter.classList.remove('invisible');
  }

  if ('content' in reviewTemplate) {
    var reviewTemplateClone = reviewTemplate.content.querySelector('.review');
  } else {
    reviewTemplateClone = reviewTemplate.querySelector('.review');
  }

  var getReviewBlock = function(data, container) {
    var element = reviewTemplateClone.cloneNode(true);
    var authorContainer = element.querySelector('.review-author');
    element.querySelector('.review-text').textContent = data.description;
    container.appendChild(element);

    switch(data.rating) {
      case 1:
        break;
      case 2:
        element.querySelector('.review-rating').classList.add('review-rating-two');
        break;
      case 3:
        element.querySelector('.review-rating').classList.add('review-rating-three');
        break;
      case 4:
        element.querySelector('.review-rating').classList.add('review-rating-four');
        break;
      case 5:
        element.querySelector('.review-rating').classList.add('review-rating-five');
        break;
      default:
        element.querySelector('.review-rating').classList.add('invisible');
      break;
    }

    authorContainer.src = data.author.picture;
    var errorTimeout;

    authorContainer.onload = function() {
      clearTimeout(errorTimeout);

      authorContainer.alt = data.author.name;
      authorContainer.setAttribute('width', '124');
      authorContainer.setAttribute('height', '124');
    };

    authorContainer.onerror = function() {
      authorContainer.classList.add('review-load-failure');
    };

    errorTimeout = setTimeout(function() {
      authorContainer.src = '';
      authorContainer.classList.add('review-load-failure');

    }, 10000);
  };

  reviews.forEach(function(data) {
    getReviewBlock(data, reviewsContainer);
  });

  reviewsFilterShow();
})();
