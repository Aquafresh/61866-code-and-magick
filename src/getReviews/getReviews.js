'use strict';

/**
 * Sort filters containter
 * @type {Element}
 */
var reviewsFilter = document.querySelector('.reviews-filter');

/**
 * @param  {Function} callback
 */
var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function(e) {
    var xhrRequestObj = e.target;
    var response = xhrRequestObj.response;
    var reviewsArr = JSON.parse(response);
    callback(reviewsArr);

    if(xhr.readyState === 4) {

      document.querySelector('.reviews').classList.remove('reviews-list-loading');
      reviewsFilter.classList.remove('invisible');
    }
  };

  xhr.onerror = function() {
    document.querySelector('.reviews').classList.add('reviews-load-failure');
  };

  xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
  xhr.send();

  if(xhr.readyState < 4) {
    document.querySelector('.reviews').classList.add('reviews-list-loading');
    reviewsFilter.classList.add('invisible');
  }
};

module.exports = getReviews;
