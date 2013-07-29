/**
 * Homepage
 */

// switch code & video examples on the homepages
var $allVideoLi = $('#video-intro li');
var $allCodeLi = $('#code-intro li');

var activateEntry = function (type, $entries) {
    return function (event) {
        $('#' + type +'-intro .active-entry').removeClass('active-entry');
        $(event.currentTarget).addClass('active-entry');
        $entries.each(function (idx, elm) {
            $($('.stage.' + type).get(idx))[(elm === event.currentTarget ? 'removeClass' : 'addClass')]('hidden');
        });
    };
};

$allVideoLi.on('click', activateEntry('video', $allVideoLi));
$allCodeLi.on('click', activateEntry('code', $allCodeLi));

/**
 * Sidebar
 */

// activate entry
var activateEntry = function ($elm) {
    $('.sidenav .active').removeClass('active');
    $elm.addClass('active');
};

// sidebar menue change on hash change & dom load
var activeSidebar = function (event) {
    var $elm = $('.sidenav ' + window.location.hash.replace('#', '.nav-'));
    if ($elm.length === 1) {
        activateEntry($elm);
    }
};

var activeByViewport = function () {
  var inview = '.nav-undefined';
  $('.nav-helper').each(function (idx, elm) {
    if (inViewport(elm) && inview === '.nav-undefined') {
        inview = '.nav-' + $(elm).attr('data-name');
    }
  });

  if (inview !== '.nav-undefined') {
    var $elm = $('.sidenav ' + inview);
    if (!$elm.hasClass('active')) {
        activateEntry($elm);
    }
  }
};

$(window).on('hashchange', activeSidebar);
var checker = function () {
    return setInterval(activeByViewport, 250);
};

var interval = checker();
activeSidebar();

// iScroll sidenav
var matches = window.matchMedia ? window.matchMedia('(min-width: 500px)').matches : true;
if (document.getElementById('content') && matches) {
    var scroller = new IScroll('#content', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        click: true
     });

    var sideScroller = new IScroll('#sidenav', {
        mouseWheel: true,
        click: true
     });

    var scrolltoHash = window.location.hash.replace('#', '');

    var $scrollToElm = $('a[data-name="' + scrolltoHash + '"]');
    if ($scrollToElm.length) {
        scroller.scrollToElement($scrollToElm[0], 0);
    }

    $(window).on('hashchange', function () {
        var scrolltoHash = window.location.hash.replace('#', '');
        var $scrollToElm = $('a[data-name="' + scrolltoHash + '"]');
        clearInterval(interval);
        if ($scrollToElm.length) {
            scroller.scrollToElement($scrollToElm[0], 400);
            setTimeout(function () {
                interval = checker();
            }, 500);
        }
    });
}


// monkey bang pow! contact text on index (hate it but, whatever)
var textOnIndex = function () {
    var matchesTextShort = window.matchMedia ? window.matchMedia('(max-width: 480px)').matches : true;
    var matchesTextLong = window.matchMedia ? window.matchMedia('(min-width: 480px)').matches : true;
    if (matchesTextShort) {
        $('.longtext').text('#dalekjs@IRC');
    }

    if (matchesTextLong) {
        $('.longtext').text('#dalekjs on freenode');
    }
};


$(window).on('orientationchange', textOnIndex);
$(window).on('resize', textOnIndex);
textOnIndex();


// monkey bang pow! the second... remove/add footer position on the on the merch site (hate it but, whatever)
if (window.location.pathname.search('merch') !== -1) {

    var footerOnorientation = function () {
        var matchesPortrait = window.matchMedia ? window.matchMedia('(orientation:portrait)').matches : true;
        var matchesLandscape = window.matchMedia ? window.matchMedia('(orientation:landscape)').matches : true;

        if (matchesLandscape) {
            $('#footer').css('position', 'static');
        }

        if (matchesPortrait) {
            $('#footer').css('position', 'absolute');
        }
    };

    $(window).on('orientationchange', footerOnorientation);
    $(window).on('resize', footerOnorientation);
    footerOnorientation();
}
