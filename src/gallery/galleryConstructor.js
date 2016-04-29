'use strict';


/**
 * @param {Element} galleryWrap
 * @param {Element} popupGallery
 * @constructor
 */
var Gallery = function(galleryWrap, popupGallery, imageWrap) {

  /**
   * @type {Array.<Object>}
   */
  var mainGalleryImageList = galleryWrap.querySelectorAll('.photogallery-image img');
  /**
   * @type {Element}
   */
  var popupGalleryImgContainer = popupGallery.querySelector('.overlay-gallery-preview');
  /**
   * @type {Element}
   */
  var popupGalleryCount = popupGallery.querySelector('.preview-number-current');
  /**
   * @type {Element}
   */
  var popupGalleryTotal = popupGallery.querySelector('.preview-number-total');
  /**
   * @type {Array}
   */
  var imageAttrArray = [];
  var popupGalleryImg = new Image();

  var self = this;

  this.getImageSrc = function() {
    for(var i = 0; i < mainGalleryImageList.length; i++) {
      var getImageAttr = mainGalleryImageList[i].getAttribute('src');
      imageAttrArray.push(getImageAttr);
    }
  };

  this.setImageAttr = function() {
    for(var i = 0; i < imageWrap.length; i++) {

      imageWrap[i].setAttribute('data-number', i);
    }
  };

  this.getImageNumber = function() {

    var elemClickNumber;

    galleryWrap.addEventListener('click', function(event) {
      event.preventDefault();
      var currentTarget = event.target;
      if(this !== currentTarget) {
        elemClickNumber = currentTarget.parentNode.getAttribute('data-number');
        self.galleryActive(elemClickNumber);
      }
    });
  };

  /**
   * @return {number} currentElemNumber
   */
  this.getCurrentImageIndex = function() {
    var currentImage = document.querySelector('.overlay-gallery-preview img');
    var currentImgSrc = currentImage.getAttribute('src');
    var currentElemNumber = imageAttrArray.indexOf(currentImgSrc);

    return currentElemNumber;
  };

  /**
   * @param  {Event} event
   */
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

  /**
   * @param  {Event} event
   */
  this._onDocumentKeyDown = function(event) {
    if(event.keyCode === 27) {
      popupGallery.classList.add('invisible');
      popupGalleryImgContainer.lastChild.remove();
      self._removeListeners();
    }
  };

  /**
   * @param  {Event} event
   */
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

  /**
   * @param  {string} number
   */
  this.showImage = function(number) {
    if(+number + 1 > imageAttrArray.length) {
      number = 0;
    } else if(number < 0) {
      number = imageAttrArray.length - 1;
    }

    popupGalleryImg.src = imageAttrArray[number];
    popupGalleryCount.innerHTML = +number + 1;
    popupGalleryTotal.innerHTML = +imageAttrArray.length;
  };

  /**
   * @param  {string} number
   */
  this.galleryActive = function(number) {
    popupGallery.classList.remove('invisible');
    popupGalleryImgContainer.appendChild(popupGalleryImg);
    self.showImage(number);
    self._initListeners();
  };

  this.getImageSrc();
  this.getImageNumber();
  this.setImageAttr();
};

module.exports = Gallery;
