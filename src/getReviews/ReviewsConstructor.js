'use strict';

var getReviewBlock = require('./getReviewBlock');

/**
 * @param {Object} data
 * @param {Object} container
 */
function Review(data, container) {

  this.data = data;
  this.element = getReviewBlock(this.data);

  this.onReviewClick = function(event) {
    if(event.target.classList.contains('review-quiz-answer')) {
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
