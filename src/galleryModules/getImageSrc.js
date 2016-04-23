'use strict';

var mainGalleryImage = document.querySelectorAll('.photogallery-image img');

/**
 *
 * @type {Array}
 */
var imageAttrArray = [];

/**
 *
 * @return {Array}
 */
function getImageSrc() {

  for(var i = 0; i < mainGalleryImage.length; i++) {
    var getImageAttr = mainGalleryImage[i].getAttribute('src');
    imageAttrArray.push(getImageAttr);
  }

  return imageAttrArray;
}

module.exports = getImageSrc;
