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

  reviewUserName.required = true;
  reviewFieldsText.classList.add('invisible');

  reviewMarkField.addEventListener('change', function() {
    var reviewUserMarkValue = reviewUserMark.value;

    if(reviewUserMarkValue < MAX_MARK_REQUIRED) {
      reviewUserText.required = 'true';
      reviewFieldsBar.classList.remove('invisible');
      reviewFieldsText.classList.remove('invisible');

      console.log('Оценка меньше 3');
    } else {
      reviewUserText.removeAttribute('required');
      console.log('Оценка больше 3');
      reviewFieldsText.classList.add('invisible');
    }

    validityVerify();

    console.log('Я изменияю оценку');
  });

  function validityVerify() {
    if(reviewUserText.hasAttribute('required')) {
      console.log('Есть req у textarea');
      if(reviewUserName.checkValidity() && reviewUserText.checkValidity()) {
        reviewFieldsBar.classList.add('invisible');
        reviewBtnSubmit.removeAttribute('disabled');
        console.log('Оба поля прошли валидацию');
      } else if(reviewUserName.checkValidity()) {
        reviewFieldsName.classList.add('invisible');
        reviewBtnSubmit.disabled = 'true';
        console.log('Имя прошло валидацию, а текст нет');
      } else if(reviewUserText.checkValidity()) {
        reviewFieldsText.classList.add('invisible');
        reviewBtnSubmit.disabled = true;
        console.log('Текст прошел валидацию, а имя нет');
      }
    } else {
      if(reviewUserName.checkValidity()) {
        reviewFieldsBar.remove();
      } else {
        reviewBtnSubmit.disabled = true;
      }
    }
  }

  reviewUserName.addEventListener('change', function() {
    validityVerify();

    if(!reviewUserName.checkValidity()) {

      reviewUserName.setCustomValidity('Это поле не может быть пустым.');
    }
  });

  reviewUserText.addEventListener('change', function() {
    validityVerify();

    if(!reviewUserText.checkValidity()) {

      reviewUserName.setCustomValidity('Это поле не может быть пустым.');
    }
  });

  reviewBtnSubmit.addEventListener('click', function() {
    validityVerify();
    reviewBtnSubmit.removeAttribute('disabled');
  });

})();

