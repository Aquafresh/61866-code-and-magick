'use strict';

var Gallery = require('./galleryConstructor');

/**
 * @type {Element}
 */
var popupGallery = document.querySelector('.overlay-gallery');
/**
 * @type {Element}
 */
var mainGallery = document.querySelector('.photogallery');
/**
 * @type {Element}
 */
var mainGalleryImageWrap = document.querySelectorAll('.photogallery-image');
/**
 * @type {Object}
 * @constructor
 */
Gallery = new Gallery(mainGallery, popupGallery, mainGalleryImageWrap);






