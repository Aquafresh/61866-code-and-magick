'use strict';

var getReviews = require('./getReviews/getReviews');
var Reviews = require('./getReviews/constructorReviews');

/**
 * Reviews html containter
 * @type {Element}
 */
var reviewsContainer = document.querySelector('.reviews-list');
/**
 * Sort filters containter
 * @type {Element}
 */
var reviewsFilter = document.querySelector('.reviews-filter');
/**
 * Btn show more reviews
 * @type {Element}
 */
var btnMoreReviews = document.querySelector('.reviews-controls-item');
/**
 * Get array from xhr
 * @type {Array}
 */
var getReviewsArr = [];
/**
 * Get array from filters
 * @type {Array}
 */
var filteredReviews = [];
/**
 * Save rendered array reviews
 * @type {Array}
 */
var renderedReview = [];
/**
 * Set page reviews number
 * @type {number}
 */
var pageNumber = 0;
/** @constant {number} */
var PAGE_REVIEWS_SIZE = 3;
/**
 * @type {string}
 */
var getSaveFilter = localStorage.getItem('filterValue');


var setFilterEvent = function() {
  reviewsFilter.addEventListener('change', function(event) {
    btnMoreReviews.classList.remove('invisible');
    setFilterActive(event.target.value);
    setValueFilterStorage(event.target.value);
  });
};

/**
 * @param {string} filter
 * @return {Array.<Object>} getReviewsArrCopy
 */
function setFiltredActive(filter) {

  var getReviewsArrCopy = getReviewsArr.slice(0);
  var temporaryArr;

  switch(filter) {
    case 'reviews-recent':
      var currentDate = new Date();
      var maxDateRange = currentDate.setDate(currentDate.getDate() - 14);
      getReviewsArrCopy[1].date = '2016-03-01';
      temporaryArr = getReviewsArrCopy.filter(function(a) {
        var reviewDate = Date.parse(a.date);
        return reviewDate > maxDateRange;
      });
      temporaryArr.sort(function(a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      getReviewsArrCopy = temporaryArr;
      break;
    case 'reviews-good':
      temporaryArr = getReviewsArrCopy.filter(function(sortArrItem, i) {
        return getReviewsArrCopy[i].rating >= 3;
      });
      temporaryArr.sort(function(a, b) {
        return b.rating - a.rating;
      });
      getReviewsArrCopy = temporaryArr;
      break;
    case 'reviews-bad':
      temporaryArr = getReviewsArrCopy.filter(function(sortArrItem, i) {
        return getReviewsArrCopy[i].rating < 3;
      });
      temporaryArr.sort(function(a, b) {
        return a.rating - b.rating;
      });
      getReviewsArrCopy = temporaryArr;
      break;
    case 'reviews-popular':
      getReviewsArrCopy.sort(function(a, b) {
        return a.review_usefulness - b.review_usefulness;
      });
      break;
    default:
      getReviewsArrCopy = getReviewsArr.slice(0);
  }

  return getReviewsArrCopy;
}

/**
 * @param {string} filter
 * @param {Array.<Object>}
 */
function setFilterActive(filter) {
  pageNumber = 0;
  filteredReviews = setFiltredActive(filter);
  renderReviews(filteredReviews, pageNumber, true);
}

/**
 * @param {number} page
 * @param {boolean} replace
 * @param {Array.<Object>} reviews
 */
function renderReviews(reviews, page, replace) {
  if(replace) {
    renderedReview.forEach(function(reviewElement) {
      reviewElement.remove();
    });
    renderedReview = [];
  }

  var from = page * PAGE_REVIEWS_SIZE;
  var to = from + PAGE_REVIEWS_SIZE;
  reviews.slice(from, to).forEach(function(data) {
    renderedReview.push(new Reviews(data, reviewsContainer));
  });
}

function getMoreReviews() {
  btnMoreReviews.addEventListener('click', function() {
    pageNumber++;
    renderReviews(filteredReviews, pageNumber);

    var reviewsArcticleLength = null;
    var reviewsArrLength = null;
    reviewsArcticleLength = reviewsContainer.children.length;
    reviewsArrLength = filteredReviews.length;

    if(reviewsArcticleLength >= reviewsArrLength) {

      btnMoreReviews.classList.add('invisible');
    }
  });
}

/**
 * @param  {Array.<Object>} loadedReviews
 */
getReviews(function(loadedReviews) {
  getReviewsArr = loadedReviews;
  setFilterEvent();
  if(getSaveFilter !== null) {
    setFilterActive(getSaveFilter);

    setFilterTriggerActive(getSaveFilter);
  } else {
    setFilterActive();
  }
  getMoreReviews();
});

/**
 * @param {string} value
 */
function setValueFilterStorage(value) {
  localStorage.setItem('filterValue', value);
}

function setFilterTriggerActive() {
  var filterTriggerList = reviewsFilter.querySelectorAll('input');

  for (var i = 0; i < filterTriggerList.length; i++) {
    if(filterTriggerList[i].value === getSaveFilter) {

      filterTriggerList[i].setAttribute('checked', true);
    }
  }
}
