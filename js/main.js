var $allVideoLi = $('#video-intro li');
var $allCodeLi = $('#code-intro li');

$('#video-intro li').on('click', function (event) {
	$('#video-intro .active-entry').removeClass('active-entry');
	$(event.currentTarget).addClass('active-entry');
	$allVideoLi.each(function (idx, elm) {
		if (elm === event.currentTarget) {
			$($('.stage.video').get(idx)).removeClass('hidden');
		} else {
			$($('.stage.video').get(idx)).addClass('hidden');
		}
	})
});

$('#code-intro li').on('click', function (event) {
	$('#code-intro .active-entry').removeClass('active-entry');
	$(event.currentTarget).addClass('active-entry');
	$allCodeLi.each(function (idx, elm) {
		if (elm === event.currentTarget) {
			$($('.stage.code').get(idx)).removeClass('hidden');
		} else {
			$($('.stage.code').get(idx)).addClass('hidden');
		}
	})
});
