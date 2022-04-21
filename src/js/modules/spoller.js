// SPOLLERS
const spollersArr = document.querySelectorAll("[data-spollers]");
if (spollersArr.length > 0) {
	// Обычные спойлеры
	const spollersRegular = Array.from(spollersArr).filter(function (item) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация 
			if(spollersRegular.length > 0) {
			initSpollers(spollersRegular);
	}
	// Спойлеры с медиа запросом
	const spollersMedia = Array.from(spollersArr).filter(function (item) {
		return item.dataset.spollers.split(",")[0];
	});
		// Инициализация  сполйлеров с медиа
			if(spollersMedia.length > 0) {
				const breakpointsArr =[];
				spollersMedia.forEach(item => {
					const params = item.dataset.spollers;
					const breakpoint = {};
					const paramsArr = params.split(",");
					breakpoint.value = paramsArr[0];
					breakpoint.type = paramsArr[1] ? paramsArr[1].trim() : "max";
					breakpoint.item = item;
					breakpointsArr.push(breakpoint);
				});
				
				//Получение уникального брейкпоинта 
				let mediaQueries = breakpointsArr.map(function (item) {
					return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
				});
				mediaQueries = mediaQueries.filter(function (item, index, self) {
					return self.indexOf(item) === index;
			});

			// Работа с каждым брейкпоинтом
			mediaQueries.forEach(breakpoint => {
				const paramsArr = breakpoint.split(",");
				const mediaBreakpoint = paramsArr[1];
				const mediaType = paramsArr[2];
				const matchMedia = window.matchMedia(paramsArr[0]);

				// Объекты с нужными условиями
					const spollersArr = breakpointsArr.filter(function (item) {
						if (item.value === mediaBreakpoint && item.type === mediaType) {
							return true;
						}
					});

						// Событие 
						matchMedia.addEventListener("change", function () {
							initSpollers(spollersArr, matchMedia);
						});
						initSpollers(spollersArr, matchMedia);
			});
		}

			// Инициализация
			function 	initSpollers(spollersArr, matchMedia = false) {
				spollersArr.forEach( spollersBlock =>	 {
					spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
					if (matchMedia.matches || !matchMedia) {
						spollersBlock.classList.add("__init");
						initSpollerBody(spollersBlock);
						spollersBlock.addEventListener("click", setSpollerAction);
					} else {
						spollersBlock.classList.remove("__init");
						initSpollerBody(spollersBlock, false);
						spollersBlock.removeEventListener("click", setSpollerAction);
					}
			});			
		}

		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spolerTitles = spollersBlock.querySelectorAll("[data-spoller]");
			if (spolerTitles.length > 0) {
				spolerTitles.forEach(spollerTitle => {
					if (hideSpollerBody){
						spollerTitle.removeAttribute("tabindex");
						if (!spollerTitle.classList.contains("__active")) {
						spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute("tabindex", "-1");
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}

		function setSpollerAction(evt) {
			const element = evt.target;
			if ( element.hasAttribute("data-spoller") || element.closest("[data-spoller]")) {
				const spollerTitle = element.hasAttribute("data-spoller") ? element : element.closest("[data-spoller]");
				const spollersBlock = spollerTitle.closest("[data-spollers]");
				const oneSpoller = spollersBlock.hasAttribute("data-one-spoller") ? true : false;
				if (!spollersBlock.querySelectorAll("._slide").length) {
					if (oneSpoller && !spollerTitle.classList.contains("__active")) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle("__active");
					_slideToggle(spollerTitle.nextElementSibling, 500);
				}
				evt.preventDefault();
			}
		}

		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector("[data-spoller].__active");
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove("__active");
				_slideUp(spollerActiveTitle.nextElementSibling, 500);
			}
		}
}

// SledeToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains("__slide")) {
		let height = target.offsetHeight;
		target.classList.add("__slide");
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + "px";
		target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty("height");
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
			target.classList.remove("__slide");
		}, duration);

	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains("__slide")) {
		target.classList.add("__slide");
		if(target.hidden) {
			target.hidden = false
		}
		let height = target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + "px";
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		window.setTimeout(() => {
			target.style.removeProperty("height");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
			target.classList.remove("__slide");
		}, duration);

	}
}

let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}