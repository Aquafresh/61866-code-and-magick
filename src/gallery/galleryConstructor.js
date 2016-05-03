'use strict';

/**
 * @param {Element} galleryArea
 * @param {Element} popupGalleryArea
 * @constructor
 */
var Gallery = function(galleryArea, popupGalleryArea) {
  /**
   * @type {Object}
   */
  this.galleryWrap = galleryArea;
  /**
   * @type {Object}
   */
  this.popupGallery = popupGalleryArea;
  /**
   * @type {Array.<Object>}
   */
  this.mainGalleryImageList = this.galleryWrap.querySelectorAll('.photogallery-image img');
  /**
   * @type {Element}
   */
  this.popupGalleryImgContainer = this.popupGallery.querySelector('.overlay-gallery-preview');
  /**
   * @type {Element}
   */
  this.popupGalleryCount = this.popupGallery.querySelector('.preview-number-current');
  /**
   * @type {Element}
   */
  this.popupGalleryTotal = this.popupGallery.querySelector('.preview-number-total');
  /**
   * @type {Element}
   */
  this.btnClose = this.popupGallery.querySelector('.overlay-gallery-close');
  /**
   * @type {Array}
   */
  this.imageAttrArray = [];
  /**
   * @type {Object}
   * @constructor
   */
  this.popupGalleryImg = new Image();

  this.getImageSrc = this.getImageSrc.bind(this);
  this.getCurrentImageIndex = this.getCurrentImageIndex.bind(this);
  this.changeUrl = this.changeUrl.bind(this);
  this.checkHash = this.checkHash.bind(this);
  this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  this._onCloseClick = this._onCloseClick.bind(this);
  this._popupGalleryBtnNext = this._popupGalleryBtnNext.bind(this);
  this._popupGalleryBtnPrev = this._popupGalleryBtnPrev.bind(this);
  this._removeListeners = this._removeListeners.bind(this);
  this.setGalleryClickListener = this.setGalleryClickListener.bind(this);
  this.galleryClickEvent = this.galleryClickEvent.bind(this);

  this.getImageSrc();
  this.checkHash();
  this.setGalleryClickListener();
  window.addEventListener('hashchange', this.checkHash);


  this.allFunctionBinder(this.checkHash);
};

Gallery.prototype.getImageSrc = function() {
  for(var i = 0; i < this.mainGalleryImageList.length; i++) {
    var getImageAttr = this.mainGalleryImageList[i].getAttribute('src');
    this.mainGalleryImageList[i].dataset.number = true;
    this.imageAttrArray.push(getImageAttr);
  }
};

/**
 * @return {number} this.currentElemNumber
 */
Gallery.prototype.getCurrentImageIndex = function() {
  this.currentImage = this.popupGallery.querySelector('.overlay-gallery-preview img');
  this.currentImgSrc = this.currentImage.getAttribute('src');
  this.currentElemNumber = this.imageAttrArray.indexOf(this.currentImgSrc);

  return this.currentElemNumber;
};

/**
 * @param  {number} number
 */
Gallery.prototype.showImage = function(number) {
  this.popupGalleryImg.src = this.imageAttrArray[number];
  this.popupGalleryCount.innerHTML = number + 1;
  this.popupGalleryTotal.innerHTML = this.imageAttrArray.length;
};

/**
 * @param  {string} photoUrl
 */
Gallery.prototype.changeUrl = function(photoUrl) {
  if (photoUrl) {
    window.location.hash = 'photo/' + photoUrl;
  } else {
    history.pushState(null, null, window.location.pathname);
  }
};

Gallery.prototype.checkHash = function() {
  var currentHash = window.location.hash;
  var regular = /#photo\/(\S+)/;
  var hashFound = currentHash.match(regular);
  var pictureIndex;

  if (hashFound) {
    pictureIndex = this.imageAttrArray.indexOf(hashFound[1]);
    this.galleryActive(pictureIndex);
    this.changeUrl(hashFound[1]);
  }
};

/**
 * @param  {Event} event
 */
Gallery.prototype._onDocumentKeyDown = function(event) {
  if(event.keyCode === 27) {
    this.popupGallery.classList.add('invisible');
    this.popupGalleryImgContainer.lastChild.remove();
    this.changeUrl();
    this._removeListeners();
  }
};

/**
 * @param  {Event} event
 */
Gallery.prototype._onCloseClick = function(event) {
  if(event.target === this.btnClose) {
    this.popupGallery.classList.add('invisible');
    this.popupGalleryImgContainer.lastChild.remove();
    history.pushState(null, null, window.location.pathname);
    this.changeUrl();
    this._removeListeners();
  }
};

/**
 * @param  {Event} event
 */
Gallery.prototype._popupGalleryBtnNext = function(event) {
  var galleryBtnNext = this.popupGallery.querySelector('.overlay-gallery-control-right');
  var number = this.getCurrentImageIndex();

  if (event.target === galleryBtnNext) {
    number++;
    if(number + 1 > this.imageAttrArray.length) {
      number = 0;
    }
    this.changeUrl(this.imageAttrArray[number]);
    this.showImage(number);
  }
};

/**
 * @param  {Event} event
 */
Gallery.prototype._popupGalleryBtnPrev = function(event) {
  var galleryBtnPrev = this.popupGallery.querySelector('.overlay-gallery-control-left');
  var number = this.getCurrentImageIndex();

  if(event.target === galleryBtnPrev) {
    number--;
    if(number < 0) {
      number = this.imageAttrArray.length - 1;
    }
    this.changeUrl(this.imageAttrArray[number]);
    this.showImage(number);
  }
};

/**
 * @param  {number} number
 */
Gallery.prototype.galleryActive = function(number) {
  this.popupGallery.classList.remove('invisible');
  this.popupGalleryImgContainer.appendChild(this.popupGalleryImg);
  this.showImage(number);
  this._initListeners();
};

/**
 * @private
 */
Gallery.prototype._initListeners = function() {
  this.popupGallery.addEventListener('click', this._popupGalleryBtnNext);
  this.popupGallery.addEventListener('click', this._popupGalleryBtnPrev);
  this.popupGallery.addEventListener('click', this._onCloseClick);
  window.addEventListener('keydown', this._onDocumentKeyDown);
};

/**
 * @private
 */
Gallery.prototype._removeListeners = function() {
  this.popupGallery.removeEventListener('click', self._popupGalleryBtnNext);
  this.popupGallery.removeEventListener('click', self._popupGalleryBtnPrev);
  this.popupGallery.removeEventListener('click', self._onCloseClick);
  window.removeEventListener('keydown', self._onDocumentKeyDown);
};

Gallery.prototype.setGalleryClickListener = function() {
  this.galleryWrap.addEventListener('click', this.galleryClickEvent);
};

Gallery.prototype.galleryClickEvent = function() {
  event.preventDefault();
  if(event.target.dataset.number) {
    this.changeUrl(event.target.getAttribute('src'));
  }
};

Gallery.prototype.allFunctionBinder = function(someFn) {
  function bind() {
    someFn();
  }
  bind();
};

module.exports = Gallery;
