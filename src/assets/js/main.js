// @ts-nocheck
;(function ($) {
	;('use strict')

	$(document).ready(function () {
		/* Header Sticky */
		// const $window = $(window)

		// $window.on('scroll', function () {
		// 	const scroll = $window.scrollTop()
		// 	const logoDefault = $('.navbar-brand.logodefault img')
		// 	if (scroll > 10) {
		// 		$('header #navbar-main').addClass('scrollHeader').css({
		// 			boxShadow: '0 0 6px rgba(0, 0, 0, 0.2)'
		// 		})
		// 		$('#navbar-main .nav-link, .btn-tel-header').css({
		// 			color: 'black'
		// 		})

		// 		$('.navbar-brand-logo').attr('src', `http://${document.location.host}/assets/images/logo-header-black.png`)
		// 	} else {
		// 		$('header #navbar-main').removeClass('scrollHeader').css({
		// 			boxShadow: ''
		// 		})
		// 		$('#navbar-main .nav-link, .btn-tel-header').css({
		// 			color: 'black'
		// 		})

		// 		$('.navbar-brand-logo').attr('src', `http://${document.location.host}/assets/images/logo-header-white.png`)
		// 	}
		// })

		/* Range Slider jQuery UI */
		$('#passengers-range').slider({
			range: true,
			min: 2,
			max: 32,
			values: [2, 32],
			animate: 'fast',

			slide: function (event, ui) {
				$('.passengers-range-start').val(ui.values[0])
				$('.passengers-range-end').val(ui.values[1])
			}
		})

		$('.passengers-range-start').val($('#passengers-range').slider('values', 0))
		$('.passengers-range-end').val($('#passengers-range').slider('values', 1))

		$('#year-range').slider({
			range: true,
			min: 1928,
			max: 2022,
			values: [1928, 2022],
			animate: 'fast',

			slide: function (event, ui) {
				$('.year-range-start').val(ui.values[0])
				$('.year-range-end').val(ui.values[1])
			}
		})

		$('.year-range-start').val($('#year-range').slider('values', 0))
		$('.year-range-end').val($('#year-range').slider('values', 1))

		$('#price-range').slider({
			range: true,
			min: 1200,
			max: 50000,
			values: [1200, 50000],
			animate: 'fast',

			slide: function (event, ui) {
				$('.price-range-start').val(ui.values[0])
				$('.price-range-end').val(ui.values[1])
			}
		})

		$('.price-range-start').val($('#price-range').slider('values', 0))
		$('.price-range-end').val($('#price-range').slider('values', 1))

		/* Brazzers - Carousel */
		// @ts-ignore
		$('.images-toggle').brazzersCarousel()

		/* FancyApp */

		const carouselPremiumCars = document.querySelector('#carousel-premium-cars')
		if (carouselPremiumCars) {
			new Carousel(carouselPremiumCars, {
				Dots: false,
				center: true,
				infinite: false,
				slidesPerPage: 'auto',
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				}
			})
		}

		const sportCars = document.querySelector('#carousel-sport-cars')
		if (sportCars) {
			new Carousel(sportCars, {
				Dots: false,
				center: true,
				infinite: false,
				slidesPerPage: 'auto',
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				}
			})
		}

		const carouselCabrioletCars = document.querySelector('#carousel-cabriolet-cars')
		if (carouselCabrioletCars) {
			new Carousel(carouselCabrioletCars, {
				Dots: false,
				center: true,
				infinite: false,
				slidesPerPage: 'auto',
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				}
			})
		}

		const typeTabCarouselFancy = document.querySelector('#type-tab-carousel-fancy')
		if (typeTabCarouselFancy) {
			new Carousel(typeTabCarouselFancy, {
				Dots: false,
				center: false,
				infinite: false,
				dragFree: true,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				}
			})
		}

		const brandTabCarouselFancy = document.querySelector('#brand-tab-carousel-fancy')
		if (brandTabCarouselFancy) {
			new Carousel(brandTabCarouselFancy, {
				Dots: false,
				center: false,
				infinite: false,
				dragFree: true,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				}
			})
		}

		const colorTabCarouselFancy = document.querySelector('#color-tab-carousel-fancy')
		if (colorTabCarouselFancy) {
			new Carousel(colorTabCarouselFancy, {
				Dots: false,
				center: false,
				infinite: false,
				dragFree: true,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				}
			})
		}

		const countryTabCarouselFancy = document.querySelector('#country-tab-carousel-fancy')
		if (countryTabCarouselFancy) {
			new Carousel(countryTabCarouselFancy, {
				Dots: false,
				center: false,
				infinite: false,
				dragFree: true,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				}
			})
		}

		/* Single car carousel */
		const singleCarCardCarousel = document.querySelector('#singleCarCardCarousel')
		if (singleCarCardCarousel) {
			// Initialise Carousel
			const initSingleCarCardCarousel = new Carousel(singleCarCardCarousel, {
				Dots: false
			})

			// Thumbnails
			const singleCarCardThumbCarousel = new Carousel(document.querySelector('#singleCarCardThumbCarousel'), {
				Sync: {
					target: initSingleCarCardCarousel,
					friction: 0
				},
				Dots: false,
				Navigation: false,
				center: true,
				slidesPerPage: 1,
				infinite: false
			})

			// Customize Fancybox
			Fancybox.bind('[data-fancybox="gallery"]', {
				Carousel: {
					on: {
						change: that => {
							initSingleCarCardCarousel.slideTo(initSingleCarCardCarousel.findPageForSlide(that.page), {
								friction: 0
							})
						}
					}
				}
			})

			Fancybox.bind('[data-fancybox="gallery"]', {
				Image: {
					zoom: false
				}
			})
		}

		// prettier-ignore
		Fancybox.bind('[data-fancybox]', {
			hideScrollbar: false,
			Toolbar: {
				display: [
					'close'
				]
			}
		})

		/* RelaxJS */
		// new Rellax('.rellax')

		// new Rellax('.rellax2', {
		// 	center: true
		// })

		var image = document.getElementsByClassName('parallax-simple')
		new simpleParallax(image, {
			delay: 0.6,
			transition: 'cubic-bezier(0,0,0,1)'
			// customContainer: 'page-title-section'
		})
	})
})(jQuery)
