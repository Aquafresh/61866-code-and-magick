'use strict';

/** @constant {Array} */
var RATINGS = [
  'one',
  'two',
  'three',
  'four',
  'five'
];

/**
 * Review html template
 * @type {element}
 */
var reviewTemplate = document.querySelector('#review-template');

/**
 * Check exist html template
 * @type {boolean}
 */
var templateContentExist = 'content' in reviewTemplate;

module.exports = {
  checkTemplateExist: function checkTemplateExist() {
    if (templateContentExist) {
      return reviewTemplate.content.querySelector('.review');
    } else {
      return reviewTemplate.querySelector('.review');
    }
  },

	/**
	 * @param  {Object} data
	 * @param  {element} container
	 */
  getReviewBlock: function getReviewBlock(data, container) {

    var templateExist = module.exports.checkTemplateExist();
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
  }
};

