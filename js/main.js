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
setInterval(activeByViewport, 250);
activeSidebar();

// iScroll sidenav
if (document.getElementById('content')) {
	var scroller = new IScroll('#content', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true
	 });

	var sideScroller = new IScroll('#sidenav', {
		mouseWheel: true
	 });

	var $scrollToElm = $('a[data-name="' + window.location.hash.replace('#', '') + '"]');
	if ($scrollToElm.length) {
		scroller.scrollToElement($scrollToElm[0], 0);
	}

	$(window).on('hashchange', function () {
		var $scrollToElm = $('a[data-name="' + window.location.hash.replace('#', '') + '"]');
		if ($scrollToElm.length) {
			scroller.scrollToElement($scrollToElm[0], 400);
		}
	});
}