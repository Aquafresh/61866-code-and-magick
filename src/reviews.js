
'use strict';

(function() {

  /**
   * Reviews html containter
   * @type {element}
   */
  var reviewsContainer = document.querySelector('.reviews-list');
  /**
   * Review html template
   * @type {element}
   */
  var reviewTemplate = document.querySelector('#review-template');
  /**
   * Sort filters containter
   * @type {element}
   */
  var reviewsFilter = document.querySelector('.reviews-filter');
  /**
   * Btn show more reviews
   * @type {element}
   */
  var btnMoreReviews = document.querySelector('.reviews-controls-item');
  /**
   * Check exist html template
   * @type {boolean}
   */
  var templateContentExist = 'content' in reviewTemplate;
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
   * Set page reviews number
   * @type {Number}
   */
  var pageNumber = 0;
  /** @constant {number} */
  var PAGE_REVIEWS_SIZE = 3;
  /** @constant {Array} */
  var RATINGS = [
    'one',
    'two',
    'three',
    'four',
    'five'
  ];

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

  function checkTemplateExist() {
    if (templateContentExist) {
      return reviewTemplate.content.querySelector('.review');
    } else {
      return reviewTemplate.querySelector('.review');
    }
  }

  /**
   * @param  {Object} data
   * @param  {element} container
   */
  var getReviewBlock = function(data, container) {

    var templateExist = checkTemplateExist();
    var element = templateExist.cloneNode(true);
    container.appendChild(element);
    var reviewRating = element.querySelector('.review-rating');
    var reviewCurrentImg = element.querySelector('.review-author');
    var authorImgNode = new Image(124, 124);

    reviewRating.classList.add('review-rating-' + RATINGS[data.rating - 1]);
    authorImgNode.src = data.author.picture;
    element.replaceChild(authorImgNode, reviewCurrentImg);
    authorImgNode.classList.add('review-author');
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

  var setFilterEvent = function() {
    reviewsFilter.addEventListener('change', function(event) {
      btnMoreReviews.classList.remove('invisible');
      setFilterActive(event.target.value);
    });
  };

  /**
   * @param {string} filter
   * @return {Array.<Object>} getReviewsArrCopy
   */
  var setFiltredActive = function(filter) {

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
  };

  /**
   * @param {string} filter
   * @param {Array.<Object>}
   */
  var setFilterActive = function(filter) {
    pageNumber = 0;
    filteredReviews = setFiltredActive(filter);
    renderReviews(filteredReviews, pageNumber, true);
  };

  /**
   * @param {number} page
   * @param {boolean} replace
   * @param {Array.<Object>} reviews
   */
  var renderReviews = function(reviews, page, replace) {
    if (replace) {
      reviewsContainer.innerHTML = '';
    }

    var from = page * PAGE_REVIEWS_SIZE;
    var to = from + PAGE_REVIEWS_SIZE;

    reviews.slice(from, to).forEach(function(data) {
      getReviewBlock(data, reviewsContainer);
    });
  };

  var getMoreReviews = function() {
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
  };

  /**
   * @param  {Array.<Object>} loadedReviews
   */
  getReviews(function(loadedReviews) {
    getReviewsArr = loadedReviews;
    setFilterEvent();
    setFilterActive();
    getMoreReviews();
  });



  // getMoreReviews();

})();
