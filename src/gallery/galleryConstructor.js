'use strict';


/**
 * @param {Element} galleryWrap
 * @param {Element} popupGallery
 * @constructor
 */
var Gallery = function(galleryWrap, popupGallery) {
  /**
   * @type {Element}
   */
  var imageWrap = galleryWrap.querySelectorAll('.photogallery-image');
  /**
   * @type {Element}
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

  /** @private */
  this.getImageSrc = function() {
    for(var i = 0; i < mainGalleryImageList.length; i++) {
      var getImageAttr = mainGalleryImageList[i].getAttribute('src');
      imageAttrArray.push(getImageAttr);
    }
  };

  /** @private */
  this.setImageAttr = function() {
    for(var i = 0; i < imageWrap.length; i++) {

      imageWrap[i].setAttribute('data-number', i);
    }
  };

  /** @private */
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
   * @private
   * @return {number} currentElemNumber
   */
  this.getCurrentImageIndex = function() {
    var currentImage = document.querySelector('.overlay-gallery-preview img');
    var currentImgSrc = currentImage.getAttribute('src');
    var currentElemNumber = imageAttrArray.indexOf(currentImgSrc);

    return currentElemNumber;
  };

  /**
   * @private
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
   * @private
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
   * @private
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

  /** @private */
  this._initListeners = function() {
    popupGallery.addEventListener('click', self._popupGalleryNavBtn);
    popupGallery.addEventListener('click', self._onCloseClick);
    window.addEventListener('keydown', self._onDocumentKeyDown);
  };

  /** @private */
  this._removeListeners = function() {
    popupGallery.removeEventListener('click', self._popupGalleryNavBtn);
    popupGallery.removeEventListener('click', self._onCloseClick);
    window.removeEventListener('keydown', self._onDocumentKeyDown);
  };

  /**
   * @private
   * @param  {number} number
   */
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

  /**
   * @private
   * @param  {number} number
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
