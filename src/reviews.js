
'use strict';

(function() {

  var getReviews = function(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(e) {
      var xhrRequestObj = e.target;
      var response = xhrRequestObj.response;
      var reviewsArr = JSON.parse(response);
      callback(reviewsArr);
    };

    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.send();
  };

  var reviewsContainer = document.querySelector('.reviews-list');
  var reviewTemplate = document.querySelector('#review-template');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var templateContentExist = 'content' in reviewTemplate;

  function reviewsFilterHide() {
    reviewsFilter.classList.add('invisible');
  }

  reviewsFilterHide();

  function reviewsFilterShow() {
    reviewsFilter.classList.remove('invisible');
  }

  function checkTemplateExist() {
    if (templateContentExist) {
      return reviewTemplate.content.querySelector('.review');
    } else {
      return reviewTemplate.querySelector('.review');
    }
  }

  var templateExist = checkTemplateExist();
  var getReviewBlock = function(data, container) {
    var element = templateExist.cloneNode(true);
    container.appendChild(element);
    var reviewRating = element.querySelector('.review-rating');
    var authorImgNode = new Image(124, 124);
    var RATINGS = [
      'one',
      'two',
      'three',
      'four',
      'five'
    ];

    reviewRating.classList.add('review-rating-' + RATINGS[data.rating - 1]);
    element.querySelector('.review-author').remove();
    authorImgNode.src = data.author.picture;
    authorImgNode.classList.add('review-author');
    element.insertBefore(authorImgNode, reviewRating);
    element.querySelector('.review-text').textContent = data.description;

    var errorTimeout;

    authorImgNode.onload = function() {
      clearTimeout(errorTimeout);
      authorImgNode.alt = data.author.name;
    };

    authorImgNode.onerror = function() {
      element.classList.add('review-load-failure');
    };

    errorTimeout = setTimeout(function() {
      authorImgNode.src = '';
      element.classList.add('review-load-failure');

    }, 10000);

  };

  var renderReviews = function(reviews) {
    reviews.forEach(function(data) {
      getReviewBlock(data, reviewsContainer);
    });
  };

  getReviews(function(loadedReviews) {
    var reviews = loadedReviews;
    renderReviews(reviews);
  });

  reviewsFilterShow();
})();
