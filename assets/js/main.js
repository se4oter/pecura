(function($) {
"use strict";

/**
 * [isMobile description]
 * @type {Object}
 */
window.isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
}
window.isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
window.windowHeight = window.innerHeight;
window.windowWidth = window.innerWidth;

/**
 * Match height 
 */
$('.row-eq-height > [class*="col-"]').matchHeight();

var myEfficientFn = debounce(function() {
	$('.row-eq-height > [class*="col-"]').matchHeight();
}, 250);

window.addEventListener('resize', myEfficientFn);

/**
 * [debounce description]
 * @param  {[type]} func      [description]
 * @param  {[type]} wait      [description]
 * @param  {[type]} immediate [description]
 * @return {[type]}           [description]
 */
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/**
 * Masonry
 */
$('.grid__inner').masonry({
	itemSelector: '.grid-item',
	columnWidth: '.grid-sizer',
});

/**
 * grid css
 */

$.fn.reCalWidth = function() {
	var $self = $(this);
	$self.on('reCalWidth', function() {
		var _self = $(this);
		_self.css('width', '');
		var width = Math.floor(_self.width());
		_self.css('width', width + 'px');
		var height = Math.floor(_self.parent().children('.wide').width()/2);
		_self.parent().children('.wide').css('height', height + 'px');
	});
	$(window).on('resize', function() {
		$self.trigger('reCalWidth');
	});
}
function work() {
	$('.grid-css').each(function() {
		var workWrapper = $(this),
			workContainer = $('.grid__inner', workWrapper),
			filters = $('.filter', workWrapper),
			filterCurrent = $('.current a', filters),
			filterLiCurrent = $('.current', filters),
			duration = 0.3;
		workContainer.imagesLoaded( function() {

// Fix Height
			if( workWrapper.hasClass('grid-css--fixheight')) {
				workContainer.find('.grid-item__content-wrapper').matchHeight();
			}

workContainer.isotope({
				layoutMode: 'masonry',
				itemSelector: '.grid-item',
				transitionDuration: duration + 's',
				masonry: {
					columnWidth: '.grid-sizer'
				},
				// hiddenStyle: {},
				// visibleStyle: {}
			});
		});
		filters.on('click', 'a', function(e) {
			e.preventDefault();
			var $el = $(this);
			var selector = $el.attr('data-filter');
			filters.find('.current').removeClass('current');
			$el.parent().addClass('current');
			workContainer.isotope({
				filter: selector
			});
		});

filters.find('.select-filter').change(function() {
			var $el = $(this);
			var selector = $el.val();
			workContainer.isotope({
				filter: selector
			});
		});

$('.grid-item', workWrapper).reCalWidth();
	});
}
work();

$('.portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: true,
    fixedContentPos: true,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

$('.portfolio .popup-video').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    preloader: false,
    closeOnContentClick: true,
    closeBtnInside: true,
    fixedContentPos: true,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});
/**
 *  Slide Custom
 */
if( $('.slide-item').length ) {
	var $sync1 = $(".slide-image__front .swiper-container"),
		$sync2 = $(".slide-image__black .swiper-container");

var galleryTop = new Swiper($sync1, {
        spaceBetween: 10,
    });
    var galleryThumbs = new Swiper($sync2, {
		spaceBetween: 10,
		centeredSlides: true,
		slidesPerView: 'auto',
		touchRatio: 0.2,
		slideToClickedSlide: true,
	});

galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;
}

/**
 * Swiper
 */
$('.swiper__module').each(function() {
	var self = $(this),
		wrapper = $('.swiper-wrapper', self),
		optData = eval('(' + self.attr('data-options') + ')'),
		optDefault = {
			paginationClickable: true,
			pagination: self.find('.swiper-pagination-custom'),
			nextButton: self.find('.swiper-button-next-custom'),
			prevButton: self.find('.swiper-button-prev-custom'),
			spaceBetween: 30
		},
		options = $.extend(optDefault, optData);
	wrapper.children().wrap('<div class="swiper-slide"></div>');
	var swiper = new Swiper(self, options);

function thumbnails(selector) {

if (selector.length > 0) {
			var wrapperThumbs = selector.children('.swiper-wrapper'),
				optDataThumbs = eval('(' + selector.attr('data-options') + ')'),
				optDefaultThumbs = {
					spaceBetween: 10,
					centeredSlides: true,
					slidesPerView: 3,
					touchRatio: 0.3,
					slideToClickedSlide: true,
					pagination: selector.find('.swiper-pagination-custom'),
					nextButton: selector.find('.swiper-button-next-custom'),
					prevButton: selector.find('.swiper-button-prev-custom'),
				},
				optionsThumbs = $.extend(optDefaultThumbs, optDataThumbs);
			wrapperThumbs.children().wrap('<div class="swiper-slide"></div>');
			var swiperThumbs = new Swiper(selector, optionsThumbs);
			swiper.params.control = swiperThumbs;
			swiperThumbs.params.control = swiper;
		}

}
	thumbnails(self.next('.swiper-thumbnails__module'));
});

/**
 * Typing effect
 */
$('.typing__module').each(function(index) {
    var self = $(this),
        _wrapper = $('.typed', self)[0],
        optData = eval('(' + self.attr('data-options') + ')'),
        optDefault = {
            stringsElement: self.find('.typed-strings')[0],
            typeSpeed: 80,
            loop: false,
            onStringTyped: function() {
                // 自動上色 PECURA
                let typedEl = self.find('.typed');
                let html = typedEl.html();

                // 將純文字 PECURA 換成帶有顏色的 HTML
                html = html.replace("PECURA",
                    `<span class="pecura-pe">PE</span><span class="pecura-cu">CU</span><span class="pecura-ra">RA</span>`
                );
				html = html.replace("偵脈科技",
                    `<span class="pecura-pe">偵</span><span class="pecura-cu">脈科</span><span class="pecura-ra">技</span>`
                );

                typedEl.html(html);
            }
        },
        options = $.extend(optDefault, optData);

    var typed = new Typed(_wrapper, options);
});

/**
* Footer
*/

$('#back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html,body').animate({
        scrollTop: 0
    }, 700);
});
//*
// Header
//*

var headerHeight = $('header').outerHeight();

function getHeaderScrollThreshold() {
    // 用檔名判斷頁面：index / news
    var path = window.location.pathname.split('/').pop().toLowerCase();

    // 預設門檻（其他頁）
    var threshold = $(window).height() * 0.5;

    // index：晚一點才變（例如 60% 螢幕高度）
    if (path === '' || path === 'index.html') {
        threshold = $(window).height() * 0.3;   // ← 你要更晚就調大，例如 0.7
    }

    // news：早一點變（例如 120px）
    if (path === 'news.html' || path === 'about.html' || path === 'product.html' || path === 'contact.html') {
        threshold = $(window).height() * 0.2;
    }

    return threshold;
}

var headerScrollThreshold = getHeaderScrollThreshold();

$(window).on('resize', function () {
    headerHeight = $('header').outerHeight();
    headerScrollThreshold = getHeaderScrollThreshold();
});

$(window).on('scroll', function () {
    var scrollTop = $(window).scrollTop();

    if (scrollTop >= headerScrollThreshold) {
        $('header').addClass('is-scroll');
    } else {
        $('header').removeClass('is-scroll');
    }
});


$('.onepage-nav').dropdownMenu({
    menuClass: 'onepage-menu',
    breakpoint: 1200,
    toggleClass: 'active',
    classButtonToggle: 'navbar-toggle',
    subMenu: {
        class: 'sub-menu',
        parentClass: 'menu-item-has-children',
        toggleClass: 'active'
    }
});

$('.onepage-nav').onePageNav({
    currentClass: 'current-menu-item',
    scrollOffset: headerHeight,
});

//*
// Back to top
//*

$(window).scroll(function() {
	var wh = $(window).height(),
		scrollTop = $(window).scrollTop();

if(scrollTop >= wh ){
		$('#back-to-top').addClass('is-visible')
	}else {
		$('#back-to-top').removeClass('is-visible')
	}
});

var headerHeight = $('header').outerHeight();

$('#back-to-down').on('click', function() {
	var offsets = $(this).closest('.hero').next().offset().top - headerHeight;

$('html,body').animate({
        scrollTop: offsets
    }, 700);
})

})(jQuery);

(function($){
    $(function(){
      // Mobile dropdown toggle
      $('.onepage-menu > li.menu-item-has-children > a.menu-parent').on('click', function(e){
        if (window.innerWidth <= 991) {
          e.preventDefault(); // 手機點主選單只展開，不立即跳轉
          var $li = $(this).parent('li');
          $li.toggleClass('is-open');
          $li.siblings('.menu-item-has-children').removeClass('is-open');
        }
      });

      // 點子選單後：收起（手機）
      $('.onepage-menu .sub-menu a').on('click', function(){
        if (window.innerWidth <= 991) {
          $(this).closest('.menu-item-has-children').removeClass('is-open');
        }
      });
    });
  })(jQuery);

  /* ==============================
   Timeline Auto Scroll
   ============================== */

$(document).ready(function () {
  var $timeline = $('.timeline-alt');

  if ($timeline.length === 0) return;

  var scrollSpeed = 0.8; // 數字越大滾越快，建議 0.4 ~ 1
  var isPaused = false;
  var rafId = null;

  function autoScrollTimeline() {
    if (!isPaused) {
      var currentScroll = $timeline.scrollLeft();
      var maxScroll = $timeline[0].scrollWidth - $timeline.outerWidth();

      if (currentScroll >= maxScroll - 1) {
        // 滾到底後回到最左邊
        $timeline.scrollLeft(0);
      } else {
        $timeline.scrollLeft(currentScroll + scrollSpeed);
      }
    }

    rafId = requestAnimationFrame(autoScrollTimeline);
  }

  // 滑鼠移入暫停
  $timeline.on('mouseenter touchstart', function () {
    isPaused = true;
  });

  // 滑鼠移出繼續
  $timeline.on('mouseleave touchend', function () {
    isPaused = false;
  });

  // 啟動自動滾動
  autoScrollTimeline();
});

/* ==============================
   About Opening Animation
   ============================== */

$(document).ready(function () {
  var $opening = $('#about-opening');

  if ($opening.length === 0) return;

  setTimeout(function () {
    $opening.addClass('is-hidden');
  }, 4500);
});
