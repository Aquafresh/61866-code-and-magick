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

  reviewUserName.required = 'true';


  reviewMarkField.addEventListener('change', function() {
    var reviewUserMarkValue = reviewUserMark.value;

    if(reviewUserMarkValue < MAX_MARK_REQUIRED) {
      reviewUserText.required = 'true';

      console.log('Оценка меньше 3');
    } else {
      reviewUserText.removeAttribute('required');
      console.log('Оценка больше 3');
    }

    console.log('Я изменияю оценку');
  });

  function disableBtn() {
    reviewBtnSubmit.disabled = 'true';
  }

  function activeBtn() {
    reviewBtnSubmit.removeAttribute('disabled');
  }

  function validityVerify() {
    if(reviewUserText.hasAttribute('required')) {
      console.log('Есть req у textarea');
      if(reviewUserName.checkValidity() && reviewUserText.checkValidity()) {
        reviewFieldsBar.remove();
        activeBtn();
        console.log('Оба поля прошли валидацию');
      } else if(reviewUserName.checkValidity()) {
        reviewFieldsName.remove();
        disableBtn();
        console.log('Имя прошло валидацию, а текст нет');
        // reviewUserName.setCustomValidity('Это поле не может быть пустым.');
      } else if(reviewUserText.checkValidity()) {
        reviewFieldsText.remove();
        disableBtn();
        console.log('Текст прошел валидацию, а имя нет');
      }
    } else {
      if(reviewUserName.checkValidity()) {
        reviewFieldsBar.remove();
        // reviewUserName.setCustomValidity('Это поле не может быть пустым.');
      } else {
        disableBtn();
      }
    }
  }

  reviewUserName.addEventListener('change', function() {
    validityVerify();
  });

  reviewUserText.addEventListener('change', function() {
    validityVerify();
  });

  reviewUserText.addEventListener('onblur', function() {
    validityVerify();
  });

  reviewBtnSubmit.addEventListener('click', function() {
    validityVerify();
    activeBtn();
  });







})();

