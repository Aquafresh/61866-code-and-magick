'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var MAX_MARK_REQUIRED = 3;
  var reviewForm = document.querySelector('.review-form');
  var reviewUserName = reviewForm.elements['review-name'];
  var reviewUserMark = reviewForm.elements.namedItem('review-mark');
  var reviewUserText = reviewForm.elements['review-text'];
  var reviewBtnSubmit = document.querySelector('.review-submit');
  var reviewFieldsBar = document.querySelector('.review-fields');
  var reviewFieldsName = document.querySelector('.review-fields-name');
  var reviewFieldsText = document.querySelector('.review-fields-text');
  var reviewMarkField = document.querySelector('.review-form-group-mark');
  var reviewSecondFieldset = document.querySelector('.review-form-group-mark + .review-form-group');
  var reviewThirdFieldset = document.querySelector('.review-form-group-mark + .review-form-group + .review-form-group');
  var errorFieldCreate = document.createElement('div');
  var errorText = 'Вам нужно заполнить все обязательные поля';
  errorFieldCreate.innerHTML = '<span>' + errorText + '</span>';
  var errorFieldClone = errorFieldCreate.cloneNode(true);

  reviewUserName.required = true;
  reviewFieldsText.classList.add('invisible');

  reviewMarkField.addEventListener('change', function() {

    var reviewUserMarkValue = reviewUserMark.value;

    if(reviewUserMarkValue < MAX_MARK_REQUIRED) {
      reviewUserText.required = true;
      reviewFieldsBar.classList.remove('invisible');
      reviewFieldsText.classList.remove('invisible');
    } else {
      reviewUserText.removeAttribute('required');
      reviewFieldsText.classList.add('invisible');
    }

    validityVerify();
  });

  function validityVerify() {
    if(reviewUserText.hasAttribute('required')) {
      if(reviewUserName.checkValidity() && reviewUserText.checkValidity()) {
        reviewFieldsBar.classList.add('invisible');
        reviewBtnSubmit.removeAttribute('disabled');
      } else if(reviewUserName.checkValidity()) {
        reviewFieldsName.classList.add('invisible');
        reviewBtnSubmit.disabled = true;
      } else if(reviewUserText.checkValidity()) {
        reviewFieldsText.classList.add('invisible');
        reviewBtnSubmit.disabled = true;
      }
    } else {
      if(reviewUserName.checkValidity()) {
        reviewFieldsBar.classList.add('invisible');
        reviewBtnSubmit.disabled = false;
      } else {
        reviewBtnSubmit.disabled = true;
      }
    }
  }

  reviewUserName.addEventListener('change', function() {
    validityVerify();

    if(!reviewUserName.checkValidity()) {
      reviewSecondFieldset.appendChild(errorFieldCreate);
      reviewFieldsBar.classList.remove('invisible');
      reviewFieldsName.classList.remove('invisible');
    }
  });

  reviewUserText.addEventListener('change', function() {
    validityVerify();

    if(!reviewUserText.checkValidity()) {
      reviewThirdFieldset.appendChild(errorFieldClone);
      reviewFieldsBar.classList.remove('invisible');
      reviewFieldsText.classList.remove('invisible');
    }
  });

  reviewBtnSubmit.addEventListener('click', function() {
    validityVerify();
    reviewBtnSubmit.removeAttribute('disabled');

  });

  var cookies = require('browser-cookies');
  var currentDate = new Date();
  var currentDateMilliseconds = currentDate.getTime();
  var currentYear = currentDate.getFullYear();
  var myBirthdayDate = new Date(currentYear - 1, 6, 22, 0, 0, 0, 0);
  var myBirthdayDateMilliseconds = myBirthdayDate.getTime();
  var daysGone = currentDateMilliseconds - myBirthdayDateMilliseconds;
  var userNameValue = cookies.get('userName');
  var userMarkValue = cookies.get('userMark');

  reviewForm.onsubmit = function(e) {
    e.preventDefault();
    cookies.set('userName', reviewUserName.value, {expires: daysGone});
    cookies.set('userMark', reviewUserMark.value, {expires: daysGone});
    this.submit();
  };

  function getCookie(name) {
    var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return matches;
  }

  if(getCookie('userName')) {
    reviewUserName.value = userNameValue;
  }

  if(getCookie('userMark')) {
    reviewUserMark.value = userMarkValue;
  }
})();

