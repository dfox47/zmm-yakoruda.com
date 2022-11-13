


var $ = jQuery;



$(window).on('load', function () {
	$(document).on('click', '.js-show-submenu', function () {
		$(this).parent().toggleClass('active');
	});

	$('.js-show-submenu').each(function () {
		var ulExist =  $(this).parent().find('ul');

		if ( ulExist.length ) {
			$(this).removeClass('hidden');
		}
	});

	$(document).on('click', '.js-toggle-mobile-menu', function () {
		$('html').toggleClass('header_mobile_menu__active');
	});



	$('.home_slider').find('.owl-carousel').owlCarousel({
		dots:       true,
		items:      1,
		loop:       true,
		nav:        false
	});



	$('.js-home-offers-products').find('.owl-carousel').owlCarousel({
		dots:       true,
		items:      1,
		loop:       true,
		margin:     30,
		nav:        false,
		responsive : {
			0 : {
				items: 1,
			},
			600 : {
				items: 2,
			},
			900 : {
				items: 3,
			}
		}
	});
});


