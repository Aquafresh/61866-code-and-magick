'use strict';

var getReviewBlock = require('./getReviewBlock');

/**
 * @param {Object} data
 * @param {Element} container
 * @constructor
 */
function Review(data, container) {

  this.data = data;
  this.element = getReviewBlock(this.data);
  var currentElement = this.element;

  this.onReviewClick = function(event) {
    var answerNegative = currentElement.querySelector('.review-quiz-answer-no');
    var answerPositive = currentElement.querySelector('.review-quiz-answer-yes');

    if(event.target.classList.contains('review-quiz-answer')) {
      answerNegative.classList.remove('review-quiz-answer-active');
      answerPositive.classList.remove('review-quiz-answer-active');
      event.target.classList.add('review-quiz-answer-active');
    }
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onReviewClick);
    this.element.parentNode.removeChild(this.element);
  };

  container.appendChild(this.element);
  this.element.addEventListener('click', this.onReviewClick);
}

module.exports = Review;
