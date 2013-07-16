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
  var inview = '.nav-' + $('.nav-helper:in-viewport:first').attr('name');
  if (inview !== '.nav-undefined') {
  	var $elm = $('.sidenav ' + inview);
  	if (!$elm.hasClass('active')) {
		activateEntry($elm);
  	}
  }
};

var $window = $(window);
$window.on('hashchange', activeSidebar);
$window.on('scroll', activeByViewport);
activeSidebar();
activeByViewport();