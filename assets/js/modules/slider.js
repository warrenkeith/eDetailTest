// Global Namespace
var HFE = HFE || {};

var SlidesModule = (function () {
	var cCount = $('.slide').length,
	$slidesWrap = $('#Slides'),
	$slides = $('.slide'),
	oSlideHeight = $('#Slides .slide').height(),
	scrollEl = '#wrapper',
	hSwipeTrigger = $('#horizontalSwipe'),
	indicators = false,
	onScrollEndCallback;
	$slidesWrap.css('height', cCount * oSlideHeight + 'px');

	// **************** Uncomment the following two lines, fix the mistake and set relevant options.*********************

	// I'm not gonna lie, it took me an embarrasingly long time to notice the misspelling of IScroll.

	
	oScroller = new IScroll(scrollEl, {
		snap: true,
		momentum: false
	});
	

	oScroller.on('scrollEnd', scrollEnd);

	function scrollEnd() {
		var cSlide = oScroller.currentPage.pageY;

		if (typeof onScrollEndCallback === 'function') {
			onScrollEndCallback();
		}

		window.location.hash = 'slide' + cSlide;

		$('#Slides').trigger('slideEnd', [cSlide]);

		$('#Slides').trigger('slide' + cSlide);
	}

	function getSlideHash() {
		var getHash = parseInt(window.location.hash.toLowerCase().split('#slide')[1], 10);
		if (!getHash) { return false; }
		return getHash;
	}

	function publicScroll() {
		return oScroller;
	}

	function horizontalSwipe() {
		// **************** Write a function that allows the user to swipe left or right to the desired pages.*********************

		$(hSwipeTrigger).swipe({
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				console.log("swipe " + direction );
				// if (direction == 'left') {

				// }
	        }
      	});

	}

	function init() {
		var scrollY,
		slideHash = getSlideHash();

		if (slideHash) {
			scrollY = -oSlideHeight * (slideHash);
			oScroller.currentPage.pageY = slideHash;
			oScroller.scrollTo(0, scrollY);
		}

		horizontalSwipe();
	}

	return {
		init: init,
	};
})();

$(function () {
	SlidesModule.init();
});
