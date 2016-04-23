'use strict';
var getImageSrc = require('./getImageSrc');
/**
 *
 * @type {Element}
 */
var popupGalleryCount = document.querySelector('.preview-number-current');
/**
 *
 * @type {Element}
 */
var popupGalleryTotal = document.querySelector('.preview-number-total');
/**
 *
 * @type {Array}
 */
var imageAttrArray = getImageSrc();
/**
 *
 * @type {Object}
 */
var popupGalleryImg = new Image();
/**
 *
 * @type {Element}
 */
var popupGalleryImgContainer = document.querySelector('.overlay-gallery-preview');


module.exports = {

  /**
   *
   * @param  {string} number
   */
  showImage: function showImage(number) {

    var arrayBorder = 1;

    if(+number + arrayBorder > imageAttrArray.length) {
      number = 0;
    } else if(number < 0) {
      number = imageAttrArray.length - arrayBorder;
    }

    popupGalleryImg.src = imageAttrArray[number];
    popupGalleryImgContainer.appendChild(popupGalleryImg);
    popupGalleryCount.innerHTML = +number + arrayBorder;
    popupGalleryTotal.innerHTML = +imageAttrArray.length;
  }
};


