'use strict';

var Gallery = require('./galleryConstructor');

/**
 * @type {Element}
 */
var popupGallery = document.querySelector('.overlay-gallery');
/**
 * @type {Element}
 */
var popupGalleryImgContainer = document.querySelector('.overlay-gallery-preview');
/**
 * @type {Element}
 */
var popupGalleryCount = document.querySelector('.preview-number-current');
/**
 * @type {Element}
 */
var popupGalleryTotal = document.querySelector('.preview-number-total');

/**
 * @type {Element}
 */
var mainGallery = document.querySelector('.photogallery');
/**
 * @type {Element}
 */
var mainGalleryImageContainer = document.querySelectorAll('.photogallery-image');
/**
 * @type {Element}
 */
var mainGalleryImage = document.querySelectorAll('.photogallery-image img');
/**
 * @type {Object}
 * @constructor
 */
Gallery = new Gallery(mainGalleryImage, mainGalleryImageContainer, mainGallery, popupGallery, popupGalleryImgContainer, popupGalleryCount, popupGalleryTotal);






