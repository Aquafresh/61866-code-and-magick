'use strict';

(function() {

  var getImageSrc = require('./galleryModules/getImageSrc');
  var showImage = require('./galleryModules/showImage');
  /**
   *
   * @type {Element}
   */
  var mainGallery = document.querySelector('.photogallery');
  /**
   *
   * @type {Element}
   */
  var mainGalleryImageContainer = document.querySelectorAll('.photogallery-image');
  /**
   *
   * @type {Array}
   */
  var imageAttrArray = getImageSrc();
  var popupGallery = document.querySelector('.overlay-gallery');
  /**
   *
   * @type {Element}
   */
  var popupGalleryImgContainer = document.querySelector('.overlay-gallery-preview');
  /**
   *
   * @type {Object}
   */
  var popupGalleryEvent = {

    _popupGalleryNavBtn: function(event) {
      var galleryBtnPrev = document.querySelector('.overlay-gallery-control-left');
      var galleryBtnNext = document.querySelector('.overlay-gallery-control-right');

      if(event.target === galleryBtnPrev) {

        var number = getCurrentImageIndex();
        number--;

        showImage.showImage(number);


      } else if (event.target === galleryBtnNext) {

        number = getCurrentImageIndex();
        number++;

        showImage.showImage(number);
      }
    },

    _onDocumentKeyDown: function(event) {
      if(event.keyCode === 27) {
        popupGallery.classList.add('invisible');
        popupGalleryImgContainer.lastChild.remove();
        popupGalleryEvent._removeListeners();
      }
    },

    _onCloseClick: function(event) {
      var btnClose = document.querySelector('.overlay-gallery-close');
      if(event.target === btnClose) {

        popupGallery.classList.add('invisible');
        popupGalleryImgContainer.lastChild.remove();
        popupGalleryEvent._removeListeners();
      }
    },

    _initListeners: function() {

      popupGallery.addEventListener('click', this._popupGalleryNavBtn);
      popupGallery.addEventListener('click', this._onCloseClick);
      window.addEventListener('keydown', this._onDocumentKeyDown);
    },

    _removeListeners: function() {

      popupGallery.removeEventListener('click', this._popupGalleryNavBtn);
      popupGallery.removeEventListener('click', this._onCloseClick);
      window.removeEventListener('keydown', this._onDocumentKeyDown);
    }
  };
  /**
   *
   * @param  {string} number
   */
  function galleryActive(number) {
    popupGallery.classList.remove('invisible');
    showImage.showImage(number);
    popupGalleryEvent._initListeners();
  }

  function setImageAttr() {
    for(var i = 0; i < mainGalleryImageContainer.length; i++) {

      mainGalleryImageContainer[i].setAttribute('data-number', i);
    }
  }

  function getImageNumber() {
    var elemClickNumber;

    mainGallery.addEventListener('click', function(event) {
      event.preventDefault();
      var currentTarget = event.target;
      if(this !== currentTarget) {
        elemClickNumber = currentTarget.parentNode.getAttribute('data-number');
        galleryActive(elemClickNumber);
      }
    });
  }

  function getCurrentImageIndex() {
    var currentImage = document.querySelector('.overlay-gallery-preview img');

    for(var i = 0; i < imageAttrArray.length; i++) {
      if(imageAttrArray[i] === currentImage.getAttribute('src')) {
        return i;
      }
    }

    return i;
  }

  setImageAttr();
  getImageNumber();

})();

