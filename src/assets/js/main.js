// @ts-nocheck
;(function ($) {
	;('use strict')

	$(document).ready(function () {
		/* Select bar in Catalog page */
		if (document.querySelector('select')) {
			const select = document.querySelector('select')

			select.addEventListener('blur', () => selectEvent())
			select.addEventListener('click', () => selectEvent())

			const selectEvent = () => {
				if (event.type == 'click') {
					if (select.classList.contains('change')) {
						select.classList.remove('change')
					} else {
						select.classList.add('change')
					}
				}
				if (event.type == 'blur') {
					select.classList.remove('change')
				}
			}

			$('.select').each(function () {
				const _this = $(this)

				// console.log(_this)
				const selectOption = _this.find('option')
				const selectOptionLength = selectOption.length
				const selectedOption = selectOption.filter(':selected')
				const duration = 250 // длительность анимации

				_this.hide()
				_this.wrap('<div class="select"></div>')

				$('<div>', {
					class: 'new-select',
					text: _this.children('option:disabled').text()
				}).insertAfter(_this)

				const selectHead = _this.next('.new-select')
				$('<div>', {
					class: 'new-select__list'
				}).insertAfter(selectHead)

				const selectList = selectHead.next('.new-select__list')
				for (let i = 1; i < selectOptionLength; i++) {
					$('<div>', {
						class: 'new-select__item',
						html: $('<span>', {
							text: selectOption.eq(i).text()
						})
					})
						.attr('data-value', selectOption.eq(i).val())
						.appendTo(selectList)
				}

				const selectItem = selectList.find('.new-select__item')

				selectList.slideUp(0)

				let textArr = []

				selectHead.on('click', function () {
					if (!$(this).hasClass('on')) {
						$(this).addClass('on')

						selectList.fadeIn(duration)

						console.log('selectList', selectList)

						selectItem.on('click', function () {
							let chooseItem = $(this).data('value')

							if (!selectOption.filter(`option[value="${chooseItem}"]`).attr('selected')) {
								// selectOption.parent().attr('selected', 'selected')

								selectOption.filter(`option[value="${chooseItem}"]`).attr('selected', 'selected').prop('selected', true)

								textArr.push($(this).find('span').css({ background: 'yellow' }).text())

								$(this).addClass('check-box-item')

								selectHead.text(function (index, text) {
									selectHead.text('').append(textArr.join(', '))

									console.log('textArr', textArr)
								})
							} else if (selectOption.filter(`option[value="${chooseItem}"]`).attr('selected')) {
								$(this).find('span').css({ background: 'red' })

								console.log($(this).attr('data-value'))

								textArr.splice(textArr.indexOf($(this).attr('data-value')), 1)

								selectOption.filter(`option[value="${chooseItem}"]`).removeAttr('selected').prop('selected', false)

								$(this).removeClass('check-box-item')
								$(this).find('span').css({ background: 'gray' })

								if (textArr.length !== 0) {
									selectHead.text('').append(textArr.join(', '))
								} else {
									selectHead.text(selectOption.filter(':disabled').val())
									// selectOption.parent().removeAttr('selected')
								}
							}

							// selectList.slideUp(duration)
							// selectHead.removeClass('on')
						})
					} else {
						$(this).removeClass('on')
						selectList.fadeOut(duration / 1.6)
					}
				})
			})

			$('#showCarsPlaces').on('click', function (event) {
				event.preventDefault()

				if (!$(this).hasClass('on')) {
					$(this).addClass('on')
					$('#carsPlaces .input-group').fadeIn()
				} else {
					$(this).removeClass('on')
					$('#carsPlaces .input-group').fadeOut()
				}
			})

			$('#showCarsYears').on('click', function (event) {
				event.preventDefault()

				if (!$(this).hasClass('on')) {
					$(this).addClass('on')
					$('#carsYears .input-group').fadeIn()
				} else {
					$(this).removeClass('on')
					$('#carsYears .input-group').fadeOut()
				}

				$('#carsYears .input-group').toggleClass('d-block')
			})

			$('#showCarsPrice').on('click', function (event) {
				event.preventDefault()

				if (!$(this).hasClass('on')) {
					$('#carsPrice .input-group').fadeIn()
					$(this).addClass('on')
				} else {
					$(this).removeClass('on')
					$('#carsPrice .input-group').fadeOut()
				}

				$('#carsPrice .input-group').toggleClass('d-block')
			})
		}

		/* Brazzers - Carousel */
		$('.images-toggle').brazzersCarousel()

		/* FancyApp */
		const carsTypesCatalog = document.querySelector('#cars-types-catalog')
		if (carsTypesCatalog) {
			new Carousel(carsTypesCatalog, {
				Dots: false,
				center: true,
				infinite: false,
				slidesPerPage: 2,
				dragFree: true,
				friction: 0.9,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl: '<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl: '<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})
		}

		/* Index page PremiumCars carousel */
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

		/* Index page sportCars carousel */
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

		/* Index page CabrioletCars carousel */
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

		/* Index page type Tab */
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
		/* Index page brands Tab */
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

		/* Index page color Tab */
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

		/* Index page country Tab */
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

		/* Single car page carousel */
		const singleCarCardCarousel = document.querySelector('#singleCarCardCarousel')
		if (singleCarCardCarousel) {
			// Initialise Carousel
			const initSingleCarCardCarousel = new Carousel(galleryVideoCardCarousel, {
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
		}

		/* Single car page carousel */
		const galleryVideoCardCarousel = document.querySelector('#galleryVideoCardCarousel')
		if (galleryVideoCardCarousel) {
			// Initialise Carousel
			const initGalleryVideoCardCarouse = new Carousel(galleryVideoCardCarousel, {
				Dots: false
			})

			// Thumbnails
			const galleryVideoCardThumbCarousel = new Carousel(document.querySelector('#galleryVideoCardThumbCarousel'), {
				Sync: {
					target: initGalleryVideoCardCarouse,
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
							initGalleryVideoCardCarouse.slideTo(initGalleryVideoCardCarouse.findPageForSlide(that.page), {
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

		/* Single service page carousel */
		const singleServiceCardCarousel = document.querySelector('#singleServiceCardCarousel')
		if (singleServiceCardCarousel) {
			// Initialise Carousel
			const initSingleServiceCardCarousel = new Carousel(singleServiceCardCarousel, {
				Dots: false
			})

			// Thumbnails
			const singleCarCardThumbCarousel = new Carousel(document.querySelector('#singleServiceCardThumbCarousel'), {
				Sync: {
					target: initSingleServiceCardCarousel,
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
							initSingleServiceCardCarousel.slideTo(initSingleServiceCardCarousel.findPageForSlide(that.page), {
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
	})
})(jQuery)
