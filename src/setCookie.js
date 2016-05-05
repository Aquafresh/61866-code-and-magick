'use strict';

(function() {

  var reviewFormVerify = require('./form');

  var reviewForm = document.querySelector('.review-form');
  var reviewUserName = reviewForm.elements['review-name'];
  var reviewUserMark = reviewForm.elements.namedItem('review-mark');
  var cookies = require('browser-cookies');

  function cookiesSetEndTime() {

    var currentDateMilliseconds = (new Date()).getTime();
    var currentYear = (new Date()).getFullYear();
    var myBirthdayDateMilliseconds = (new Date(currentYear, 6, 22, 0, 0, 0, 0)).getTime();

    if(currentDateMilliseconds < myBirthdayDateMilliseconds) {
      myBirthdayDateMilliseconds = (new Date(currentYear - 1, 6, 22, 0, 0, 0, 0)).getTime();
    } else {
      myBirthdayDateMilliseconds = (new Date(currentYear, 6, 22, 0, 0, 0, 0)).getTime();
    }
    var daysGone = Math.ceil((currentDateMilliseconds - myBirthdayDateMilliseconds) / 3600 / 24 / 1000 );
    return daysGone;
  }

  reviewForm.onsubmit = function(e) {
    var daysGoneValue = cookiesSetEndTime();
    e.preventDefault();
    cookies.set('userName', reviewUserName.value, {expires: daysGoneValue});
    cookies.set('userMark', reviewUserMark.value, {expires: daysGoneValue});
    this.submit();
  };

  if(cookies.get('userName')) {
    reviewUserName.value = cookies.get('userName');
  }

  if(cookies.get('userMark')) {
    reviewUserMark.value = cookies.get('userMark');
  }

  reviewFormVerify();
})();

