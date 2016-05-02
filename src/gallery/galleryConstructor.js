'use strict';


/**
 * @param {Element} galleryWrap
 * @param {Element} popupGallery
 * @param {Array.<Object>} imageWrap
 * @constructor
 */
var Gallery = function(galleryWrap, popupGallery) {

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
  /**
   * @type {Object}
   * @constructor
   */
  var popupGalleryImg = new Image();

  var self = this;

  this.getImageSrc = function() {
    for(var i = 0; i < mainGalleryImageList.length; i++) {
      var getImageAttr = mainGalleryImageList[i].getAttribute('src');
      mainGalleryImageList[i].dataset.number = true;
      imageAttrArray.push(getImageAttr);
    }
  };

  this.setGalleryClickEvent = function() {
    galleryWrap.addEventListener('click', function(event) {
      event.preventDefault();
      if(event.target.dataset.number) {
        self.changeUrl(event.target.getAttribute('src'));
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
  this._popupGalleryBtnNext = function(event) {
    var galleryBtnNext = document.querySelector('.overlay-gallery-control-right');
    var number = self.getCurrentImageIndex();

    if (event.target === galleryBtnNext) {
      number = self.getCurrentImageIndex();
      number++;
      if(number + 1 > imageAttrArray.length) {
        number = 0;
      }
      self.changeUrl(imageAttrArray[number]);
      self.showImage(number);
    }
  };

  /**
   * @param  {Event} event
   */
  this._popupGalleryBtnPrev = function(event) {
    var galleryBtnPrev = document.querySelector('.overlay-gallery-control-left');
    var number = self.getCurrentImageIndex();

    if(event.target === galleryBtnPrev) {
      number--;
      if(number < 0) {
        number = imageAttrArray.length - 1;
      }
      self.changeUrl(imageAttrArray[number]);
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
      history.pushState(null, null, window.location.pathname);
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
      self.changeUrl();
      history.pushState(null, null, window.location.pathname);
      self._removeListeners();
    }
  };

  this._initListeners = function() {
    popupGallery.addEventListener('click', self._popupGalleryBtnNext);
    popupGallery.addEventListener('click', self._popupGalleryBtnPrev);
    popupGallery.addEventListener('click', self._onCloseClick);
    window.addEventListener('keydown', self._onDocumentKeyDown);
  };

  this._removeListeners = function() {
    popupGallery.removeEventListener('click', self._popupGalleryBtnNext);
    popupGallery.removeEventListener('click', self._popupGalleryBtnPrev);
    popupGallery.removeEventListener('click', self._onCloseClick);
    window.removeEventListener('keydown', self._onDocumentKeyDown);
  };

  /**
   * @param  {number} number
   */
  this.showImage = function(number) {
    popupGalleryImg.src = imageAttrArray[number];
    popupGalleryCount.innerHTML = number + 1;
    popupGalleryTotal.innerHTML = imageAttrArray.length;
  };

  /**
   * @param  {string} photoUrl
   */
  this.changeUrl = function(photoUrl) {
    if (photoUrl) {
      window.location.hash = 'photo/' + photoUrl;
    } else {
      history.pushState(null, null, window.location.pathname);
    }
  };

  /**
   * @param  {number} number
   */
  this.galleryActive = function(number) {
    popupGallery.classList.remove('invisible');
    popupGalleryImgContainer.appendChild(popupGalleryImg);
    self.showImage(number);
    self._initListeners();
  };

  this.checkHash = function() {
    var currentHash = window.location.hash;
    var regular = /#photo\/(\S+)/;
    var hashFound = currentHash.match(regular);
    var pictureIndex;

    if (hashFound) {
      pictureIndex = imageAttrArray.indexOf(hashFound[1]);
      self.galleryActive(pictureIndex);
      self.changeUrl(hashFound[1]);
    }
  };

  this.getImageSrc();
  this.checkHash();
  this.setGalleryClickEvent();
  window.addEventListener('hashchange', self.checkHash);
};

module.exports = Gallery;
