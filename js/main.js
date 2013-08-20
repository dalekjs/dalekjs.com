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

var scroller;
var sideScroller;

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
    scroller = new IScroll('#content', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        click: true,
        preventDefault: false
     });

    sideScroller = new IScroll('#sidenav', {
        mouseWheel: true,
        click: true,
        preventDefault: false
     });

    //weird, but helps
    setTimeout(function () {
        scroller.refresh();
        sideScroller.refresh();
    }, 750);

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

var getRepoFromModule = function (module) {
    var repos = {
        actions: 'dalek-internal-actions',
        assertions: 'dalek-internal-assertions',
        phantomjs: 'dalek-browser-phantomjs',
        firefox: 'dalek-browser-firefox',
        internetexplorer: 'dalek-browser-ie',
        chrome: 'dalek-browser-chrome',
        json: 'dalek-reporter-json',
        html: 'dalek-reporter-html',
        junit: 'dalek-reporter-junit',
        console: 'dalek-reporter-console',
        cli: 'dalek-cli'
    };

    return repos[module];
};

var loadOlderVersion = function (version) {
    var module = window.location.pathname.replace('/docs/', '').replace('.html', '');
    var url = '';

    if (version.toLowerCase() === 'canary') {
        url = 'https://api.github.com/repos/dalekjs/dalekjs.com/contents/docs/' + module + '.html';
    } else {
        url = 'https://api.github.com/repos/dalekjs/dalekjs.com/contents/docs/' + version + '/' + module + '.html';
    }

    $.get(url)
     .success(function (data) {
        var content = $(/<div class="grid"[^>]*>((.|[\n\r])*)<\/div>/im.exec(atob(data.content.replace(/\s/g, ''))));
        $('body').append('<div id="hidden-container" style="display: none"></div>');
        $('#hidden-container').html(content[0]);
        var contents = $('#hidden-container .grid__item.one-whole .grid__item.one-whole').html();
        var sidenav = $('#hidden-container #sidenav').html();
        if (sidenav) {
            $('#sidenav').fadeOut('fast', function () {
            $('#sidenav').html(sidenav).fadeIn('fast');
                sideScroller.refresh();
            });

        }
        $('#hidden-container').remove();

        $('body .grid__item.one-whole .grid__item.one-whole').fadeOut('fast', function () {
            $('body .grid__item.one-whole .grid__item.one-whole').html(contents).fadeIn('fast', function () {
                if (scroller) {
                    scroller.refresh();
                }
            });
            $('body .grid__item.one-whole .grid__item.one-whole pre code').each(function (idx, element) {
                Prism.highlightElement(element, false, function () {});
            });
        });



    });
};

if (window.location.pathname.search('docs') !== -1) {
    var module = window.location.pathname.replace('/docs/', '').replace('.html', '');
    var repo = getRepoFromModule(module);
    var options = '<option value="canary">Canary</option>';

    $.get('https://api.github.com/repos/dalekjs/' + repo + '/tags')
     .success(function (tags) {
        $.each(tags, function (idx, tag) {
            options += '<option value="' + tag.name + '">' + tag.name + '</option>';
        });
        $('.grid').prepend('<select id="versions">' + options + '</select>');
        $('#versions')
            .css('position', 'fixed')
            .css('top', '50px')
            .css('right', '30px');
     });

    $('.grid').on('change', '#versions', function (event) {
        var version = $('#versions').val();
        loadOlderVersion(version);
        event.preventDefault();
    });
}

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
