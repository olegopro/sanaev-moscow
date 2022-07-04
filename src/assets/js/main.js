// @ts-nocheck

;(function ($) {
	;('use strict')

	//Преобразование первой буквы в заглавную
	const capitalizeFirstChar = str => str.charAt(0).toUpperCase() + str.substring(1)

	//Генератор рандомного числа
	const randomInt = (max, min) => Math.round(Math.random() * (max - min)) + min

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

			//закрываю выпадающий список (select) на клик по заголовку другого элемента в фильтре
			if (window.innerWidth > 767) {
				document.addEventListener('click', function (event) {
					if (event.target.getAttribute('key')) {
						let attribute = event.target.getAttribute('key')

						if ($('.new-select.on').attr('key') == attribute) {
							$('.new-select.on').eq(1).trigger('click')
						}

						if ($('.new-select.on').attr('key') !== attribute) {
							$(`[key=${$('.new-select.on').attr('key')}]`).triggerHandler('click')
						}
					}
				})
			}

			let numberCounter = 0

			$('.select').each(function () {
				const _this = $(this)

				const selectOption = _this.find('option')
				const selectOptionLength = selectOption.length
				const duration = 250

				_this.hide()
				_this.wrap('<div class="select"></div>')

				$('<div>', {
					class: 'new-select',
					key: ++numberCounter,
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

				//закрываю выпадающий список (select) на клик по любому элементу кроме списка
				if (window.innerWidth > 767) {
					document.addEventListener('click', function (event) {
						if (!event.target.closest('.new-select__list, .new-select')) {
							_this.siblings('.new-select.on').trigger('click')
						}
					})
				}

				selectHead.on('click', function () {
					const windowWidth = window.innerWidth

					if (!$(this).hasClass('on')) {
						$(this).addClass('on')

						windowWidth > 767 ? selectList.fadeIn(duration) : selectList.slideDown(duration)

						selectItem.on('click', function () {
							let chooseItem = $(this).data('value')
							let currentSelectOption = selectOption.filter(`option[value="${chooseItem}"]`)

							if (currentSelectOption.prop('selected') === false) {
								currentSelectOption.prop('selected', true)

								textArr.push($(this).find('span').text())

								$(this).addClass('check-box-item')

								selectHead.text(function (index, text) {
									selectHead.text('').append(textArr.join(', '))
								})
							} else {
								currentSelectOption.prop('selected', false)

								textArr.splice(textArr.indexOf($(this).attr('data-value')), 1)

								$(this).removeClass('check-box-item')

								if (textArr.length !== 0) {
									selectHead.text('').append(textArr.join(', '))
								} else {
									selectHead.text(selectOption.filter(':disabled').val())
								}
							}
						})
					} else {
						$(this).removeClass('on')
						selectItem.off()

						windowWidth > 767 ? selectList.fadeOut(duration / 1.6) : selectList.slideUp(duration)
					}
				})
			})

			//фкункция для обработки события модальных окон с инпутами в фильтре
			function closeModal(event, target) {
				if (
					event.target == $(`#${target} input`)[0] ||
					event.target == $(`#${target} input`)[1] ||
					event.target == $(`#${target} label`)[0] ||
					event.target == $(`#${target} label`)[1] ||
					event.target == $(`#${target} .input-group`)[0] ||
					event.target == $(`#show${capitalizeFirstChar(target)}`)[0]
				) {
					return false
				} else {
					$('#show' + capitalizeFirstChar(`${target}`) + '.on').triggerHandler('click')
				}
			}

			//закрываю input (места/год/цена)
			if (window.innerWidth > 767) {
				document.addEventListener('click', function (event) {
					closeModal(event, 'carsPlaces')
					closeModal(event, 'carsYears')
					closeModal(event, 'carsPrice')
				})
			}

			$('#showCarsPlaces').on('click', function (event) {
				event.preventDefault()
				const windowWidth = window.innerWidth
				const carsPlacesInputGroup = $('#carsPlaces .input-group')

				if (!$(this).hasClass('on')) {
					$(this).addClass('on')

					windowWidth > 767 ? carsPlacesInputGroup.fadeIn(250) : carsPlacesInputGroup.slideDown(250)
				} else {
					$(this).removeClass('on')
					windowWidth > 767 ? carsPlacesInputGroup.fadeOut(250) : carsPlacesInputGroup.slideUp(250)
				}

				carsPlacesInputGroup.toggleClass('d-block')
			})

			$('#showCarsYears').on('click', function (event) {
				event.preventDefault()
				const windowWidth = window.innerWidth
				const carsYearsInputGroup = $('#carsYears .input-group')

				if (!$(this).hasClass('on')) {
					$(this).addClass('on')

					windowWidth > 767 ? carsYearsInputGroup.fadeIn(250) : carsYearsInputGroup.slideDown(250)
				} else {
					$(this).removeClass('on')
					windowWidth > 767 ? carsYearsInputGroup.fadeOut(250) : carsYearsInputGroup.slideUp(250)
				}

				carsYearsInputGroup.toggleClass('d-block')
			})

			$('#showCarsPrice').on('click', function (event) {
				event.preventDefault()
				const windowWidth = window.innerWidth
				const carsPriceInputGroup = $('#carsPrice .input-group')

				if (!$(this).hasClass('on')) {
					$(this).addClass('on')

					windowWidth > 767 ? carsPriceInputGroup.fadeIn(250) : carsPriceInputGroup.slideDown(250)
				} else {
					$(this).removeClass('on')
					windowWidth > 767 ? carsPriceInputGroup.fadeOut(250) : carsPriceInputGroup.slideUp(250)
				}

				carsPriceInputGroup.toggleClass('d-block')
			})
		}

		/* Header */
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 10) {
				$('nav#navbar-main').css({
					borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
					boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.03)'
				})
			} else {
				$('nav#navbar-main').css({
					borderBottom: '1px solid rgba(0, 0, 0, 0)',
					boxShadow: ''
				})
			}
		})

		/* Mobile menu */
		if (document.getElementById('navbar_global')) {
			document.getElementById('navbar_global').addEventListener('show.bs.collapse', function (e) {
				$('body').addClass('position-relative overflow-hidden body-background-enable')
				$('.navbar-brand-logo').hide()
				$('header nav.navbar-main').css({
					background: '#636363',
					transition: 'background .2s ease'
				})
				$('.navbar-brand-logo').css({
					visibility: 'hidden'
				})
			})

			document.getElementById('navbar_global').addEventListener('hide.bs.collapse', function () {
				$('body').removeClass('position-relative overflow-hidden body-background-enable')
				$('.navbar-brand-logo').show()
				$('header nav.navbar-main').css({
					background: '',
					transition: ''
				})
				$('.navbar-brand-logo').css({
					visibility: ''
				})
			})

			/* Close mobile menu on click to body */
			document.addEventListener('click', function (event) {
				// if the clicked element isn't child of the navbar, you must close it if is open
				if (!event.target.closest('#navbar-main') && document.getElementById('navbar_global').classList.contains('show')) {
					document.getElementById('hamburger-menu-button').click()
				}
			})
		}

		/* Brazzers - Carousel */
		$('.images-toggle').brazzersCarousel()

		/* Roll-up text button in main content blocks (single-car page) */
		const rollUpTextContent = $('.roll-up-text-content')
		if (rollUpTextContent) {
			const rollUpTextButton = rollUpTextContent.find('button.roll-up-text-button').on('click', function () {
				$(this).parent().find('p').addClass('open-block')
				$(this).hide()
			})
		}

		/* Roll-up for block in index page */
		const contentBlockRollup = $('.content-block-rollup')
		if (contentBlockRollup) {
			contentBlockRollup.each(function () {
				$(this)
					.parent()
					.find('button.content-block-rollup-button')
					.on('click', function () {
						$(this).parent().find('.content-block-rollup').addClass('open-block')
						$(this).hide()
					})
			})
		}

		/* FancyApp */

		/* Catalog page CarsTypes carousel */
		const carsTypesCatalog = document.querySelector('#cars-types-catalog')
		if (carsTypesCatalog) {
			new Carousel(carsTypesCatalog, {
				Dots: false,
				center: false,
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
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
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
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
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
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
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
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
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
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
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
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})
		}

		/* Index page model Tab */
		const modelTabCarouselFancy = document.querySelector('#model-tab-carousel-fancy')
		if (modelTabCarouselFancy) {
			new Carousel(modelTabCarouselFancy, {
				Dots: false,
				center: false,
				infinite: false,
				dragFree: true,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})
		}

		/* Index page service Tab */
		const serviceCarouselFancy = document.querySelector('#service-tab-carousel-fancy')
		if (serviceCarouselFancy) {
			new Carousel(serviceCarouselFancy, {
				Dots: false,
				center: false,
				infinite: false,
				dragFree: true,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})
		}

		/* Index page service Tab */
		const extraCarouselFancy = document.querySelector('#extra-tab-carousel-fancy')
		if (extraCarouselFancy) {
			new Carousel(extraCarouselFancy, {
				Dots: false,
				center: false,
				infinite: false,
				dragFree: true,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})
		}

		/* Single car page carousel */
		const singleCarCardCarousel = document.querySelector('#singleCarCardCarousel')
		if (singleCarCardCarousel) {
			// Initialise Carousel
			const initSingleCarCardCarousel = new Carousel(singleCarCardCarousel, {
				Dots: false,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})

			// Thumbnails
			const singleCarCardThumbCarousel = new Carousel(document.querySelector('#singleCarCardThumbCarousel'), {
				Sync: {
					target: initSingleCarCardCarousel,
					friction: 0
				},
				Dots: false,
				Navigation: false,
				center: false,
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
				Dots: false,

				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				},

				on: {
					change: carousel => {
						let iFrame = carousel.pages[carousel.prevPageIndex]

						// if (iFrame?.slides[0])
						// 	if (iFrame?.slides[0]?.$el.querySelector('iframe'))
						iFrame?.slides[0].$el?.querySelector('iframe')?.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
					}
				}
			})

			// Thumbnails
			const galleryVideoCardThumbCarousel = new Carousel(document.querySelector('#galleryVideoCardThumbCarousel'), {
				Sync: {
					target: initGalleryVideoCardCarouse,
					friction: 0
				},
				Dots: false,
				Navigation: false,
				center: false,
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

		/* Single car page Popular Cars - section */
		const carouselPopularCars = document.querySelector('#carousel-popular-cars')
		if (carouselPopularCars) {
			new Carousel(carouselPopularCars, {
				Dots: false,
				center: false,
				infinite: false,
				slidesPerPage: 1,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})
		}

		/* Single service page carousel */
		const singleServiceCardCarousel = document.querySelector('#singleServiceCardCarousel')
		if (singleServiceCardCarousel) {
			// Initialise Carousel
			const initSingleServiceCardCarousel = new Carousel(singleServiceCardCarousel, {
				Dots: false,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})

			// Thumbnails
			const singleServiceCardThumbCarousel = new Carousel(document.querySelector('#singleServiceCardThumbCarousel'), {
				Sync: {
					target: initSingleServiceCardCarousel,
					friction: 0
				},
				Dots: false,
				Navigation: false,
				center: false,
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

		/* Single service page Additional services - section */
		const carouselAdditionalServices = document.querySelector('#carousel-additional-services')
		if (carouselAdditionalServices) {
			new Carousel(carouselAdditionalServices, {
				Dots: false,
				center: false,
				infinite: false,
				slidesPerPage: 1,
				l10n: {
					NEXT: 'Следующая услуга',
					PREV: 'Предыдущая  услуга',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})
		}

		/* Single service page Additional services - section */
		const carouselPopularServices = document.querySelector('#carousel-popular-services')
		if (carouselPopularServices) {
			new Carousel(carouselPopularServices, {
				Dots: false,
				center: false,
				infinite: false,
				slidesPerPage: 1,
				l10n: {
					NEXT: 'Следующая услуга',
					PREV: 'Предыдущая  услуга',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})
		}

		/* Single gallery page slider */
		const singleGalleryCarousel = document.querySelector('#singleGalleryCarousel')
		if (singleGalleryCarousel) {
			// Initialise Carousel
			const initSingleGalleryCarousel = new Carousel(singleGalleryCarousel, {
				Dots: false,
				l10n: {
					NEXT: 'Следующий автомобиль',
					PREV: 'Предыдущий  автомобиль',
					GOTO: 'Вернуться к %d'
				},
				Navigation: {
					prevTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L2 9L8 2" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
					nextTpl:
						'<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 9L2 16" stroke="#1C2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				}
			})

			// Thumbnails
			const singleGalleryThumbCarousel = new Carousel(document.querySelector('#singleGalleryThumbCarousel'), {
				Sync: {
					target: initSingleGalleryCarousel,
					friction: 0
				},
				Dots: false,
				Navigation: false,
				center: false,
				slidesPerPage: 'auto',
				infinite: false,
				dragFree: true
			})

			// Customize Fancybox
			Fancybox.bind('[data-fancybox="gallery"]', {
				Carousel: {
					on: {
						change: that => {
							initSingleGalleryCarousel.slideTo(initSingleGalleryCarousel.findPageForSlide(that.page), {
								friction: 0
							})
						}
					}
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
