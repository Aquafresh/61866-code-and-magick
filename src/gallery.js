'use strict';

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
 * @type {Array}
 */
var imageAttrArray = [];
/**
 * @type {Object}
 * @constructor
 */
var popupGalleryImg = new Image();
/**
 * @type {Object}
 * @constructor
 */
var galleryConstructor = new Gallery();


galleryConstructor.getImageSrc();
galleryConstructor.getImageNumber();
galleryConstructor.setImageAttr();

/**
 * @constructor
 */
function Gallery() {

  var self = this;

  this.getImageSrc = function() {
    for(var i = 0; i < mainGalleryImage.length; i++) {
      var getImageAttr = mainGalleryImage[i].getAttribute('src');
      imageAttrArray.push(getImageAttr);
    }
  };

  this.setImageAttr = function() {
    for(var i = 0; i < mainGalleryImageContainer.length; i++) {

      mainGalleryImageContainer[i].setAttribute('data-number', i);
    }
  };

  this.getImageNumber = function() {

    var elemClickNumber;

    mainGallery.addEventListener('click', function(event) {
      event.preventDefault();
      var currentTarget = event.target;
      if(this !== currentTarget) {
        elemClickNumber = currentTarget.parentNode.getAttribute('data-number');
        self.galleryActive(elemClickNumber);
      }
    });
  };

  this.getCurrentImageIndex = function() {
    var currentImage = document.querySelector('.overlay-gallery-preview img');
    var currentImgSrc = currentImage.getAttribute('src');
    var currentElemNumber = imageAttrArray.indexOf(currentImgSrc);

    return currentElemNumber;
  };

  this._popupGalleryNavBtn = function(event) {
    var galleryBtnPrev = document.querySelector('.overlay-gallery-control-left');
    var galleryBtnNext = document.querySelector('.overlay-gallery-control-right');

    if(event.target === galleryBtnPrev) {
      var number = self.getCurrentImageIndex();
      number--;
      self.showImage(number);
    } else if (event.target === galleryBtnNext) {
      number = self.getCurrentImageIndex();
      number++;
      self.showImage(number);
    }
  };

  this._onDocumentKeyDown = function(event) {
    if(event.keyCode === 27) {
      popupGallery.classList.add('invisible');
      popupGalleryImgContainer.lastChild.remove();
      self._removeListeners();
    }
  };

  this._onCloseClick = function(event) {
    var btnClose = document.querySelector('.overlay-gallery-close');
    if(event.target === btnClose) {

      popupGallery.classList.add('invisible');
      popupGalleryImgContainer.lastChild.remove();
      self._removeListeners();
    }
  };

  this._initListeners = function() {
    popupGallery.addEventListener('click', self._popupGalleryNavBtn);
    popupGallery.addEventListener('click', self._onCloseClick);
    window.addEventListener('keydown', self._onDocumentKeyDown);
  };

  this._removeListeners = function() {
    popupGallery.removeEventListener('click', self._popupGalleryNavBtn);
    popupGallery.removeEventListener('click', self._onCloseClick);
    window.removeEventListener('keydown', self._onDocumentKeyDown);
  };

  this.showImage = function(number) {
    var arrayBorder = 1;

    if(+number + arrayBorder > imageAttrArray.length) {
      number = 0;
    } else if(number < 0) {
      number = imageAttrArray.length - arrayBorder;
    }

    popupGalleryImg.src = imageAttrArray[number];
    popupGalleryCount.innerHTML = +number + 1;
    popupGalleryTotal.innerHTML = +imageAttrArray.length;
  };

  this.galleryActive = function(number) {

    popupGallery.classList.remove('invisible');
    popupGalleryImgContainer.appendChild(popupGalleryImg);

    galleryConstructor.showImage(number);

    galleryConstructor._initListeners();
  };
}




