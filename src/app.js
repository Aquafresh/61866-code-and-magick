
'use strict';

require(
  ['main'],
  function(main) {
    document.querySelector('body').appendChild(main.foo);
  }
);
