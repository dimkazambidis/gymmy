"use strict";

/*!
 * CUSTOM SCRIPTS
 */
// If jQuery
// $(function() {
// });
// If Native JS
(function () {
  /* ======= MEDIA QUERIES ============================================================= */
  var mediaSm = window.matchMedia('(min-width: 576px)');
  var mediaMd = window.matchMedia('(min-width: 768px)');
  var mediaLg = window.matchMedia('(min-width: 1024px)');
  var mediaXl = window.matchMedia('(min-width: 1600px)');
  var mediaQuery;

  function mediaQueries() {
    if (mediaXl.matches) {
      mediaQuery = 'xl';
    } else if (mediaLg.matches) {
      mediaQuery = 'lg';
    } else if (mediaMd.matches) {
      mediaQuery = 'md';
    } else {
      mediaQuery = 'xs';
    }
  }

  mediaQueries();
  mediaSm.addEventListener('change', function () {
    mediaQueries();
  });
  mediaMd.addEventListener('change', function () {
    mediaQueries();
    navMenuReset();
  });
  mediaLg.addEventListener('change', function () {
    mediaQueries();
    navMenuReset();
  });
  mediaXl.addEventListener('change', function () {
    mediaQueries();
  });
  /* ======= MOBILE HEADER ============================================================= */

  window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset;
    var elHeader = document.querySelector('.site-header-bg');
    var elHeaderHasClass = elHeader.classList.contains('scroll');

    if (scrollTop > 0) {
      if (!elHeaderHasClass) {
        elHeader.classList.add('scroll');
      }
    } else {
      elHeader.classList.remove('scroll');
    }
  });
  /* ======= DARKER ============================================================= */

  function darkerIn() {
    document.body.classList.add('darker');
    setTimeout(function () {
      document.body.classList.add('darker_visible');
    }, 25);
  }

  function darkerOut() {
    document.body.classList.remove('darker_visible');
    setTimeout(function () {
      document.body.classList.remove('darker');
    }, 200);
  }

  function darkerReset() {
    document.body.classList.remove('darker', 'darker_visible');
  }
  /* ======= MOBILE NAV MENU ============================================================= */


  var nav = {
    elNav: document.querySelector('.aside-left'),
    elClicked: document.querySelector('.site-header-mob__menu-toggle')
  };

  function navMenuIn() {
    nav.elNav.style.display = 'block';
    darkerIn();
    setTimeout(function () {
      document.body.classList.add('nav-on');
    }, 25);
  }

  function navMenuOut() {
    document.body.classList.remove('nav-on');
    setTimeout(function () {
      nav.elNav.style.display = '';
      darkerOut();
    }, 200);
  }

  function navMenuReset() {
    document.body.classList.remove('nav-on');
    nav.elNav.style.display = '';
    darkerReset();
  }

  nav.elClicked.addEventListener('click', function (e) {
    if (!document.body.classList.contains('nav-on')) {
      navMenuIn();
    } else {
      navMenuOut();
    }
  });
})();
//# sourceMappingURL=scripts.js.map
