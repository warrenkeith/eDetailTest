var breadcrumbs = (function () {
	var touches;
	var fingerCount;

	// Get the current slide
	function _storeThisSlide() {
		setTimeout(function() {
			var thisSlide = window.oScroller.currentPage.pageY;

			$('.slide').removeClass('activeSlide').eq(thisSlide).addClass('activeSlide');

			thisSlide = $('.activeSlide').closest('[data-slide]').data('slide');

			_updateBreadcumb(thisSlide);
		}, 0);
	}

	// Remove the class of on from all breadcrumb elements and add it only to the active one
	function _updateBreadcumb(slide) {
		if (slide !== undefined) {
			setTimeout(function() {
				$('.breadcrumbUl li span').removeClass('on');
				$('.breadcrumbUl li span[data-breadcrumb="'+ slide +'"]').addClass('on');
			},100);
		}
	}

	function _fingerDetection() {
		document.addEventListener('touchstart', function(event) {
			fingerCount = event.touches.length;

			if (fingerCount > 1) {
				touches = true;
			} else {
				touches = false;
			}
			
		}, false);
	}

	function _navigation() {

		// Bind a scroller to the nav container
		function _navScroller() {
			var zoomed = false;

			window.navScroller = new IScroll('.breadcrumbNavWrapper', {
				scrollbars: true,
				momentum: false,
				bounce: false,
				scrollX: true,
				hScrollbar: true,
				scrollY: true,
				vScrollbar: true,
				click: true,
				zoom: true,
				zoomMin: 0.5,
			});

			window.navScroller.zoom(0.5);

			// Set scrolling to true if the scroll is being used
			window.navScroller.on('scrollStart', function () {
				window.navScroller.scrolling = true;
			});

			// Set scrolling to false if the scroll is not being used
			window.navScroller.on('scrollEnd', function () {
				window.navScroller.scrolling = false;
			});

			// Once the scroll has been bound, add a class of initiated to the wrapper so it doesn't need to be instigated again
			$('.breadcrumbNavWrapper').addClass('initiated');
		}

		// When the breadcrumb div is clicked, open the navigation
		$('#breadcrumb').on('click touchend', function() {
			$('.breadcrumbNavBg, .breadcrumbNavWrapper').addClass('active height');

			// If the nav hasn't been accessed yet, initiate the scroller, otherwise do nothing
			if ($('.breadcrumbNavWrapper').hasClass('initiated')) {
				window.navScroller.zoom(0.5);
				return false;
			} else {
				_navScroller();
			}
		});

		// Close the navigation if the background is clicked
		$('.breadcrumbNavBg').on('click touchend', function() {
			$('.breadcrumbNavBg, .breadcrumbNavWrapper').removeClass('active');
			setTimeout(function() {
				$('.breadcrumbNavBg, .breadcrumbNavWrapper').removeClass('height');
			}, 500);
		});

		// Close the navigation if link is clicked
		$('.breadcrumbNav img').on('touchstart', function() {
			setTimeout(function() {
				$('.breadcrumbNavBg, .breadcrumbNavWrapper').removeClass('height');
			}, 500);
		});
	}

	function init() {
		// If the user is scrolling through the navigation, do nothing, otherwise, go to the page clicked
		$("a").on("touchend", function () {
			console.log(touches);
			if (window.navScroller.scrolling===true || touches === true) {
				setTimeout(function() {
					window.navScroller.scrolling=false;
				}, 250);
				
				return false;
			} else {
				window.location.href = $(this).attr("href");
				$('.breadcrumbNavBg, .breadcrumbNavWrapper').removeClass('active');
			}
		});

		window.oScroller.on('scrollEnd', function( event ) {
			_storeThisSlide();
		} );

		_storeThisSlide();
		_navigation();
		_fingerDetection();
	}

	return {
		init: init
	};

}());

$(function () {
	breadcrumbs.init();
});