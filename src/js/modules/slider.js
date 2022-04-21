// SLIDER
let sliders = document.querySelectorAll(".__swiper");
if(sliders) {
for (let i = 0; i < sliders.length; i++) {
	let slider = sliders[i];
	if (!slider.classList.contains("swiper-bild")) {
		let sliderItems = slider.children;
		if (sliderItems) {
			for ( let i = 0; i < sliderItems.length; i++) {
				let element = sliderItems[i];
				element.classList.add("swiper-slide");
			}
		}
		let sliderContent = slider.innerHTML;
		let sliderWrepper = document.createElement("div");
		sliderWrepper.classList.add("swiper-wrapper");
		sliderWrepper.innerHTML = sliderContent;
		slider.innerHTML = '';
		slider.appendChild(sliderWrepper);
		slider.classList.add("swiper-bild");

		if (slider.classList.contains("__swiper--scroll")) {
			let sliderScroll = document.createElement("div");
			sliderScroll.classList.add("swiper-scrollbar");
			slider.appendChild(sliderScroll);
		}
	}
}
}


if (document.querySelector(".slider-main__body")){
	new Swiper(".slider-main__body", {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: ".controls-slider-main__dotts",
			clickable: true,
		},
		// Arrows
		navigation: {	
			prevEl: ".slider-main .slider-arrow__prev",
			nextEl: ".slider-main .slider-arrow__next",
		}
	});
}

if (document.querySelector(".slider-rooms__body")){
	new Swiper(".slider-rooms__body", {
		observer: true,
		observeParents: true,
		slidesPerView: "auto",
		spaceBetween: 24,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: ".slider-rooms__dotts",
			clickable: true,
		},
		// Arrows
		navigation: {	
			prevEl: ".slider-rooms .slider-arrow__prev",
			nextEl: ".slider-rooms .slider-arrow__next",
		}
	});
}

if (document.querySelector(".slider-tips__body")){
	new Swiper(".slider-tips__body", {
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		// Dotts
		pagination: {
			el: ".slider-tips__dotts",
			clickable: true,
		},
		// Arrows
		navigation: {	
			prevEl: ".slider-tips .slider-arrow__prev",
			nextEl: ".slider-tips .slider-arrow__next",
		},
		breakpoints: {

			320: {
				slidesPerView: 1.1,
				spaceBetween: 15
			},

			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},

			992: {
				slidesPerView: 3,
				spaceBetween: 32
			}
		}
	});
}