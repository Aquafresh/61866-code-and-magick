
'use strict';

(function() {

  /** Reviews html containter*/
  var reviewsContainer = document.querySelector('.reviews-list');
  /** Review html template*/
  var reviewTemplate = document.querySelector('#review-template');
  /** Sort filters containter*/
  var reviewsFilter = document.querySelector('.reviews-filter');
  /** Check exist html template*/
  var templateContentExist = 'content' in reviewTemplate;
  /** Get array from xhr*/
  var getReviewsArr = [];
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

  /**
   * @param  {[Array.<Object>]} loadedReviews)
   */
  getReviews(function(loadedReviews) {
    getReviewsArr = loadedReviews;
  });

  function checkTemplateExist() {
    if (templateContentExist) {
      return reviewTemplate.content.querySelector('.review');
    } else {
      return reviewTemplate.querySelector('.review');
    }
  }

  /**
   * [getReviewBlock description]
   * @param  {[Object]} data
   * @param  {[HTMLElement]} container
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
    var filtersBtn = reviewsFilter.querySelectorAll('.reviews-filter-item');
    for(var i = 0; i < filtersBtn.length; i++) {
      filtersBtn[i].onclick = function() {
        setFilterActive(this.htmlFor);
      };
    }
  };

  /**
   * @param {[Array.<Object>]} filter
   * @return {[Array.<Object>]} getReviewsArrCopy
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
   * @param {[Array.<Object>]} filter
   */
  var setFilterActive = function(filter) {

    var filteredReviews = setFiltredActive(filter);
    renderReviews(filteredReviews);
  };

  /**
   * [renderReviews description]
   * @param  {[Array.<Object>]} reviews
   */
  var renderReviews = function(reviews) {
    reviewsContainer.innerHTML = '';
    reviews.forEach(function(data) {
      getReviewBlock(data, reviewsContainer);
    });
  };


  /**
   * @param  {[Array.<Object>]} loadedReviews)
   */
  getReviews(function(loadedReviews) {
    getReviewsArr = loadedReviews;
    setFilterActive();
    setFilterEvent();
    renderReviews(getReviewsArr);
  });

})();
