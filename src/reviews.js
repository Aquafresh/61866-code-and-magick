
'use strict';

(function() {

  var reviewsContainer = document.querySelector('.reviews-list');
  var reviewTemplate = document.querySelector('#review-template');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var templateContentExist = 'content' in reviewTemplate;
  var _RATINGS = [
    'one',
    'two',
    'three',
    'four',
    'five'
  ];

  // Получение массива объектов через xhr
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

  // Проверка наличия шаблона
  function checkTemplateExist() {
    if (templateContentExist) {
      return reviewTemplate.content.querySelector('.review');
    } else {
      return reviewTemplate.querySelector('.review');
    }
  }

  // Шаблон отзыва
  var getReviewBlock = function(data, container) {

    var templateExist = checkTemplateExist();
    var element = templateExist.cloneNode(true);
    container.appendChild(element);
    var reviewRating = element.querySelector('.review-rating');
    var reviewCurrentImg = element.querySelector('.review-author');
    var authorImgNode = new Image(124, 124);

    reviewRating.classList.add('review-rating-' + _RATINGS[data.rating - 1]);
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

  // Развешивает события клик на все bar'ы сортировки
  var setFilterEvent = function() {
    var filtersBtn = reviewsFilter.querySelectorAll('.reviews-filter-item');
    for(var i = 0; i < filtersBtn.length; i++) {
      filtersBtn[i].onclick = function() {
        setFilterActive(this.htmlFor);
      };
    }
  };

  // Функция для сортировки
  var setFilterActive = function(filter) {
    switch(filter) {
      case 'reviews-all':
        // Сортировка по умолчанию
        getReviews(function(loadedReviews) {
          var getReviewsObj = loadedReviews;
          renderReviews(getReviewsObj);
        });
        console.log('1');
        break;
      case 'reviews-recent':
        // Сортирвока по дате с гардой в две недели
        getReviews(function(loadedReviews) {
          var currentDate = new Date();
          var maxDateRange = currentDate - (3600 * 24 * 14 * 1000);
          var getReviewsObj = loadedReviews;
          var getReviewsSort;

          getReviewsObj[1].date = '2016-03-01';
          getReviewsObj[2].date = '2016-03-01';
          getReviewsObj[3].date = '2016-03-01';
          getReviewsObj[4].date = '2016-03-01';
          getReviewsObj[5].date = '2016-03-01';

          getReviewsSort = getReviewsObj.filter(function(a) {
            var reviewDate = Date.parse(a.date);
            return reviewDate > maxDateRange;
          });
          getReviewsSort.sort(function(a, b) {
            return Date.parse(b.date) - Date.parse(a.date);
          });
          renderReviews(getReviewsSort);
        });
        console.log('2');
        break;
      case 'reviews-good':
        //Сортировка по убыванию рейтига с 5
        getReviews(function(loadedReviews) {
          var getReviewsObj = loadedReviews;
          var getReviewsSort;
          var positiveArr = getReviewsObj.filter(function(sortArrItme, i) {
            return getReviewsObj[i].rating >= 3;
          });

          getReviewsSort = positiveArr.sort(function(a, b) {
            return b.rating - a.rating;
          });

          renderReviews(getReviewsSort);
        });
        console.log('3');
        break;
      case 'reviews-bad':
        // Сортировка по возрастанию рейтинга с 1
        getReviews(function(loadedReviews) {
          var getReviewsObj = loadedReviews;
          var getReviewsSort;
          var positiveArr = getReviewsObj.filter(function(sortArrItme, i) {
            return getReviewsObj[i].rating < 3;
          });

          getReviewsSort = positiveArr.sort(function(a, b) {
            return a.rating - b.rating;
          });

          renderReviews(getReviewsSort);
        });
        console.log('4');
        break;
      case 'reviews-popular':
        // Сортировка по полезности
        getReviews(function(loadedReviews) {
          var getReviewsObj = loadedReviews;
          var getReviewsSort;
          getReviewsSort = getReviewsObj.sort(function(a, b) {
            return a.review_usefulness - b.review_usefulness;
          });
          renderReviews(getReviewsSort);
        });
        console.log('5');
        break;
    }
  };

  // Запуск функции сортировки
  setFilterEvent();

  // Дефолтное состояние фильтров при загрузке
  getReviews(function(loadedReviews) {
    var getReviewsObj = loadedReviews;
    renderReviews(getReviewsObj);
  });

  // Функция для отрисовки через forEach отзывов
  var renderReviews = function(reviews) {
    reviewsContainer.innerHTML = '';
    reviews.forEach(function(data) {
      getReviewBlock(data, reviewsContainer);
    });
  };

})();
