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
      reviewUserText.required = 'true';
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
        reviewBtnSubmit.disabled = 'true';
      } else if(reviewUserText.checkValidity()) {
        reviewFieldsText.classList.add('invisible');
        reviewBtnSubmit.disabled = true;
      }
    } else {
      if(reviewUserName.checkValidity()) {
        reviewFieldsBar.classList.add('invisible');
      } else {
        reviewBtnSubmit.disabled = true;
      }
    }
  }

  reviewUserName.addEventListener('change', function() {
    validityVerify();

    if(!reviewUserName.checkValidity()) {
      reviewSecondFieldset.appendChild(errorFieldCreate);
    }
  });

  reviewUserText.addEventListener('change', function() {
    validityVerify();

    if(!reviewUserText.checkValidity()) {
      reviewThirdFieldset.appendChild(errorFieldClone);
    }
  });

  reviewBtnSubmit.addEventListener('click', function() {
    validityVerify();
    reviewBtnSubmit.removeAttribute('disabled');
  });

})();

