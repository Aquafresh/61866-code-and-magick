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
  this.currentElement = this.element;

  this.remove = this.remove.bind(this);
  this.onReviewClick = this.onReviewClick.bind(this);

  container.appendChild(this.element);
  this.element.addEventListener('click', this.onReviewClick);
}

Review.prototype.remove = function() {
  this.element.removeEventListener('click', this.onReviewClick);
  this.element.parentNode.removeChild(this.element);
};

/**
 * @param  {Event} event
 */
Review.prototype.onReviewClick = function(event) {
  this.answerNegative = this.currentElement.querySelector('.review-quiz-answer-no');
  this.answerPositive = this.currentElement.querySelector('.review-quiz-answer-yes');

  if(event.target.classList.contains('review-quiz-answer')) {
    this.answerNegative.classList.remove('review-quiz-answer-active');
    this.answerPositive.classList.remove('review-quiz-answer-active');
    event.target.classList.add('review-quiz-answer-active');
  }
};

module.exports = Review;
