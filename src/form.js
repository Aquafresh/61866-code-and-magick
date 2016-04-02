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

  function reviewFormValidate() {

    var MAX_MARK_REQUIRED = 3;
    var reviewForm = document.querySelector('.review-form');
    var reviewUserName = reviewForm.elements['review-name'];
    var reviewUserMark = document.forms[1].elements['review-mark'];
    var reviewUserText = reviewForm.elements['review-text'];
    var reviewBtnSubmit = document.querySelector('.review-submit');

    reviewUserName.setAttribute('required', true);

    function markCheck() {
      var checkedItem = null;
      for(var i = 0; i < reviewUserMark.length; i++) {
        if(reviewUserMark[i].checked) {
          checkedItem = reviewUserMark[i].value;
          console.log(checkedItem);
        }
      }
      return checkedItem;
    }

    var markCheckedNumber = markCheck();
    console.log(markCheckedNumber);

    function verifyMark() {

      if(markCheckedNumber < MAX_MARK_REQUIRED) {
        reviewUserText.setAttribute('required', true);
        console.log(markCheckedNumber);
      } else {
        reviewUserText.removeAttribute('required');
        console.log(markCheckedNumber);
      }
    }

    reviewForm.addEventListener('change', function() {

      markCheckedNumber = markCheck();
      verifyMark();

      if(reviewUserText.hasAttribute('required')) {

        console.log('changeTime');

        if(reviewUserName.checkValidity() && reviewUserText.checkValidity()) {
          document.querySelector('.review-fields').remove();
        } else if(reviewUserName.checkValidity()) {
          document.querySelector('.review-fields-name').remove();
        } else if(reviewUserText.checkValidity()) {
          document.querySelector('.review-fields-text').remove();
        }
      } else {
        if(reviewUserName.checkValidity()) {
          document.querySelector('.review-fields').remove();
        }
      }
    });

    reviewBtnSubmit.addEventListener('click', function() {

      function inputEmptyCheck() {

        var nameEmptyCheck = reviewUserName.value;
        var textEmptyCheck = reviewUserText.value;

        if( nameEmptyCheck === null || nameEmptyCheck === '') {

          var errorMessage = document.createElement('div');
          errorMessage.innerHTML = '<span class="errorMessage">Это поле не может быть пустым!</span>';
          document.querySelector('.review-form-group-mark + .review-form-group').appendChild(errorMessage);
        }

        if(reviewUserText.hasAttribute('required')) {


          if( textEmptyCheck === null || textEmptyCheck === '') {

            errorMessage = document.createElement('div');
            errorMessage.innerHTML = '<span class="errorMessage">Это поле не может быть пустым!</span>';
            document.querySelector('.review-form-group-mark + .review-form-group + .review-form-group').appendChild(errorMessage);
          }

        }

        return false;
      }

      inputEmptyCheck();

      if(reviewUserName.checkValidity() && reviewUserText.checkValidity()) {
        console.log('FormFail');
      }
    });

  }

  reviewFormValidate();
})();

