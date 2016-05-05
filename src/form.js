'use strict';

function reviewFormVerify() {
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

  function removeElem(elem, className) {
    elem.classList.remove(className);
  }

  function addElem(elem, className) {
    elem.classList.add(className);
  }

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
  addElem(reviewFieldsText, 'invisible');
  reviewMarkField.addEventListener('change', function() {

    if(Number(reviewUserMark.value) < MAX_MARK_REQUIRED) {
      reviewUserText.required = true;
      removeElem(reviewFieldsBar, 'invisible');
      removeElem(reviewFieldsText, 'invisible');
    } else {
      reviewUserText.removeAttribute('required');
      reviewFieldsText.classList.add('invisible');
    }

    validityVerify();
  });


  function checkNameValid(nameStatus) {
    if(!reviewUserText.hasAttribute('required')) {
      if(nameStatus) {
        addElem(reviewFieldsName, 'invisible');
        reviewBtnSubmit.disabled = false;
      } else {
        reviewBtnSubmit.disabled = true;
      }
    }
  }

  function checkTextValid(textStatus) {
    if(reviewUserText.hasAttribute('required')) {
      if(textStatus) {
        addElem(reviewFieldsText, 'invisible');
      } else {
        removeElem(reviewFieldsText, 'invisible');
      }
    }
  }

  function checkFormStatus(formStatus) {
    if(formStatus) {
      addElem(reviewFieldsBar, 'invisible');
    }
  }

  function validityVerify() {
    var nameValidity = reviewUserName.checkValidity();
    var textValidity = reviewUserText.checkValidity();
    var formValidity = nameValidity && textValidity;
    reviewBtnSubmit.disabled = !formValidity;

    checkNameValid(nameValidity);
    checkTextValid(textValidity);
    checkFormStatus(formValidity);
  }

  reviewUserName.addEventListener('change', function() {

    if(!reviewUserName.checkValidity()) {
      reviewSecondFieldset.appendChild(errorFieldCreate);
      removeElem(reviewFieldsBar, 'invisible');
      removeElem(reviewFieldsName, 'invisible');
    }

    validityVerify();
  });

  reviewUserText.addEventListener('change', function() {
    if(!reviewUserText.checkValidity()) {
      reviewThirdFieldset.appendChild(errorFieldClone);
      removeElem(reviewFieldsBar, 'invisible');
      removeElem(reviewFieldsText, 'invisible');
    }

    validityVerify();
  });

  reviewBtnSubmit.addEventListener('click', function() {
    validityVerify();
    reviewBtnSubmit.removeAttribute('disabled');
  });

  validityVerify();
}

module.exports = reviewFormVerify;
