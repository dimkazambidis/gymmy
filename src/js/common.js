/*!
 * CUSTOM SCRIPTS
 */

// If jQuery
// $(function() {
    
// });

// If Native JS
(function() {

    /* ======= MEDIA QUERIES ============================================================= */

    const mediaSm = window.matchMedia('(min-width: 576px)');
    const mediaMd = window.matchMedia('(min-width: 768px)');
    const mediaLg = window.matchMedia('(min-width: 1024px)');
    const mediaXl = window.matchMedia('(min-width: 1600px)');

    let mediaQuery;
    
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

    mediaSm.addEventListener('change', () => {
        mediaQueries();
    });
    
    mediaMd.addEventListener('change', () => {
        mediaQueries();
        navMenuReset();
    });
    
    mediaLg.addEventListener('change', () => {
        mediaQueries();
        navMenuReset();
    });

    mediaXl.addEventListener('change', () => {
        mediaQueries();
    });
    
    /* ======= MOBILE HEADER ============================================================= */
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset;
        let elHeader = document.querySelector('.site-header-bg');
        let elHeaderHasClass = elHeader.classList.contains('scroll');

        if ( scrollTop > 0  ) {
            if ( !elHeaderHasClass ) {
                elHeader.classList.add('scroll');
            }
        } else {
            elHeader.classList.remove('scroll');
        }
    });

    /* ======= DARKER ============================================================= */

    function darkerIn() {
        document.body.classList.add('darker');
        setTimeout( () => {
            document.body.classList.add('darker_visible');
        }, 25 );
    }

    function darkerOut() {
        document.body.classList.remove('darker_visible');
        setTimeout( () => {
            document.body.classList.remove('darker');
        }, 200 );
    }

    function darkerReset() {
        document.body.classList.remove('darker', 'darker_visible');
    }

    /* ======= MOBILE NAV MENU ============================================================= */

    const nav = {
        elNav: document.querySelector('.aside-left'),
        elClicked: document.querySelector('.site-header-mob__menu-toggle')
    }

    function navMenuIn() {
        nav.elNav.style.display = 'block';

        darkerIn();

        setTimeout( () => {
            document.body.classList.add('nav-on');
        }, 25);
    }

    function navMenuOut() {
        document.body.classList.remove('nav-on');

        setTimeout( () => {
            nav.elNav.style.display = '';
            darkerOut();
        }, 200);
    }

    function navMenuReset() {
        document.body.classList.remove('nav-on');
        nav.elNav.style.display = '';
        darkerReset();
    }
    
    nav.elClicked.addEventListener('click', (e) => {
        if ( !document.body.classList.contains('nav-on') ) {
            navMenuIn();
        } else {
            navMenuOut();
        }
    });
}())
