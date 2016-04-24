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
 */
var popupGalleryImg = new Image();
/**
 * @type {Object}
 */
var popupGalleryEvent = {

  _popupGalleryNavBtn: function(event) {
    var galleryBtnPrev = document.querySelector('.overlay-gallery-control-left');
    var galleryBtnNext = document.querySelector('.overlay-gallery-control-right');

    if(event.target === galleryBtnPrev) {
      var number = getCurrentImageIndex();
      number--;
      showImage(number);
    } else if (event.target === galleryBtnNext) {
      number = getCurrentImageIndex();
      number++;
      showImage(number);
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

function getImageSrc() {
  for(var i = 0; i < mainGalleryImage.length; i++) {
    var getImageAttr = mainGalleryImage[i].getAttribute('src');
    imageAttrArray.push(getImageAttr);
  }
}
/**
 * @param  {string} number
 */
function galleryActive(number) {
  popupGallery.classList.remove('invisible');
  popupGalleryImgContainer.appendChild(popupGalleryImg);
  showImage(number);
  popupGalleryEvent._initListeners();
}
/**
 * @param  {string} number
 */
function showImage(number) {
  var arrayBorder = 1;

  if(+number + arrayBorder > imageAttrArray.length) {
    number = 0;
  } else if(number < 0) {
    number = imageAttrArray.length - arrayBorder;
  }

  popupGalleryImg.src = imageAttrArray[number];
  popupGalleryCount.innerHTML = +number + 1;
  popupGalleryTotal.innerHTML = +imageAttrArray.length;
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
/**
 * @return {number}
 */
function getCurrentImageIndex() {
  var currentImage = document.querySelector('.overlay-gallery-preview img');
  var currentImgSrc = currentImage.getAttribute('src');
  var currentElemNumber = imageAttrArray.indexOf(currentImgSrc);

  return currentElemNumber;
}

getImageSrc();
setImageAttr();
getImageNumber();
