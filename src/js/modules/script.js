// Burger menu
const burger = document.querySelector(".icon-menu");
const menu = document.querySelector(".menu__body");
const body = document.querySelector("body");

burger.addEventListener('click', function(evt){
	burger.classList.toggle('__active');
	menu.classList.toggle('__active');
	body.classList.toggle('__lock');
})


let ua = window.navigator.userAgent;
let msie = ua.indexOf("MSIE ");

// Обнаружение мобильного
let isMobile = {
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
			return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	},
	any: function() {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() || 
				isMobile.iOS() ||
				isMobile.Opera() || 
				isMobile.Windows());
	}
};

function isIE() {
	ua = navigator.userAgent;
	let is_ie = msie > -1 || msie > -1;
	return is_ie;
}

 if (isIE()){
	 document.querySelector("html").classList.add("ie");
 }
 
 if(isMobile.any()) {
	 document.querySelector("html").classList.add("__touch");
 }

 
 const searchForm = document.querySelector(".search-form");

 window.onload = function () {
	document.addEventListener("click", documentActions);

	function documentActions(evt) {
		const targetElement = evt.target;
		let itemHover = document.querySelectorAll(".menu__item.__hover");

		if(window.innerWidth > 768 && isMobile.any()) {
			if (targetElement.classList.contains("menu__arrow")) {
				targetElement.closest(".menu__item").classList.toggle("__hover");
			}
			
			if(!targetElement.closest(".menu__item") && itemHover.length > 0) {
				_removeClasses(itemHover, "__hover")
			}
		}

		if (!targetElement.classList.contains("menu__link--default") && targetElement.classList.contains("menu__link")) {
				evt.preventDefault();
		}
		
		if(targetElement.closest(".search-form__icon")) {
				searchForm.classList.toggle("__active");
				}
				else if(!targetElement.closest(".search-form") && searchForm.classList.contains("__active")) {
					searchForm.classList.remove("__active");
		}

		if (targetElement.classList.contains("products__more")) {
			getProducts(targetElement);
			evt.preventDefault();
		}
		if (targetElement.classList.contains("actions-product__btn")) {
		const productId = targetElement.closest(".item-product").dataset.productid;
		addToCart(targetElement, productId);
			evt.preventDefault();
		}
		if (targetElement.classList.contains("cart-header__icon") || targetElement.closest(".cart-header__icon")) {
			if (document.querySelector(".cart-list").children.length > 0) {
				document.querySelector(".cart-header").classList.toggle("__active");
			}
			evt.preventDefault();
		} else if (!targetElement.closest(".cart-header") && !targetElement.classList.contains("actions-product__btn")) {
			document.querySelector(".cart-header").classList.remove("__active");
		}
		if (targetElement.classList.contains("cart-list__delete")) {
			const productId = targetElement.closest(".cart-list__item").dataset.cartProductid;
			updateCart(targetElement, productId, false);
			evt.preventDefault();
		}
	}
	// Header
		const headerElement = document.querySelector(".header");
		const callback = function (entries, observe) {
			if(entries[0].isIntersecting) {
				headerElement.classList.remove("__scroll");
			} else {
				headerElement.classList.add("__scroll")
			}
		};
		const headerObserver = new IntersectionObserver(callback);
		headerObserver.observe(headerElement);



	function _removeClasses(collection, className) {
		for (let elements of collection) {
			elements.classList.remove(className);
		}
	}

	// Load more products
	async function getProducts(button) {
		if (!button.classList.contains("__hold")) {
			button.classList.add("__hold");
			const file = "json/products.json";
			let response = await fetch(file,{
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadProductions(result);
				button.classList.remove("__hold");
				button.remove();
			} else {
				alert("Ошибка");
			}
		}
	}

	function loadProductions(data) {
	const productsItems = document.querySelector(".products__items");
	data.products.forEach(item => {
		const productId = item.id;
		const productUrl = item.url;
		const productImage = item.image;
		const productTitle = item.title;
		const productText = item.text;
		const productPrice = item.price;
		const productPriceOld = item.priceOld;
		const productShareUrl = item.shareUrl;
		const productLikeUrl = item.likeUrl;
		const productLabels = item.labels;

		let productTemplateStart = `<article data-productid="${productId}" class="products__item item-product">`;
				let productTemplateEnd = `</article>`;

				let productTemplateLabels = '';
				if (productLabels) {
					let productTemplateLabelsStart = `<div class="item-product__labels">`;
					let productTemplateLabelsEnd = `</div>`;
					let productTemplateLabelsContent = '';

					productLabels.forEach(labelItem => {
						productTemplateLabelsContent += `<div class="item-product__label item-product__label--${labelItem.type}">${labelItem.value}</div>`;
					});

					productTemplateLabels += productTemplateLabelsStart;
					productTemplateLabels += productTemplateLabelsContent;
					productTemplateLabels += productTemplateLabelsEnd;
				}

				let productTemplateImage = `
			<a class="item-product__img __ibg" href="${productUrl}">
				<img src="img/products/${productImage}" alt="${productTitle}.">
			</a>
		`;

				let productTemplateBodyStart = `<div class="item-product__body">`;
				let productTemplateBodyEnd = `</div>`;

				let productTemplateContent = `
			<div class="item-product__content">
				<h3 class="item-product__title">${productTitle}</h3>
				<p class="item-product__text">${productText}</p>
			</div>
		`;

				let productTemplatePrices = '';
				let productTemplatePricesStart = `<div class="item-product__prices">`;
				let productTemplatePricesCurrent = `<span class="item-product__price">Rp ${productPrice}</span>`;
				let productTemplatePricesOld = `<span class="item-product__price item-product__price--old">Rp ${productPriceOld}</span>`;
				let productTemplatePricesEnd = `</div>`;

				productTemplatePrices = productTemplatePricesStart;
				productTemplatePrices += productTemplatePricesCurrent;
				if (productPriceOld) {
					productTemplatePrices += productTemplatePricesOld;
				}
				productTemplatePrices += productTemplatePricesEnd;

				let productTemplateActions = `
			<div class="item-product__actions actions-product">
				<div class="actions-product__body">
					<a class="actions-product__btn __btn __btn--white" href="">Add to cart</a>
					<a class="actions-product__link __icon-share" href="${productShareUrl}">Share</a>
					<a class="actions-product__link __icon-favorite" href="${productLikeUrl}">Like</a>
				</div>
			</div>
		`;

				let productTemplateBody = '';
				productTemplateBody += productTemplateBodyStart;
				productTemplateBody += productTemplateContent;
				productTemplateBody += productTemplatePrices;
				productTemplateBody += productTemplateActions;
				productTemplateBody += productTemplateBodyEnd;

				let productTemplate = '';
				productTemplate += productTemplateStart;
				productTemplate += productTemplateLabels;
				productTemplate += productTemplateImage;
				productTemplate += productTemplateBody;
				productTemplate += productTemplateEnd;

				productsItems.insertAdjacentHTML("beforeend", productTemplate);
	});
	}

	// Add to cart
	function addToCart(productBtn, productId) {
		if (!productBtn.classList.contains("__hold")) {
			productBtn.classList.add("__hold");
			productBtn.classList.add("__fly");
			const cart = document.querySelector(".cart-header__icon");
			const product = document.querySelector(`[data-productid="${productId}"]`);
			const productImage = product.querySelector(".item-product__img");

			const productImageFly = productImage.cloneNode(true);

			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;

			productImageFly.setAttribute("class", "__flyImg __ibg");
			productImageFly.style.cssText = 
			`
			top: ${productImageFlyTop}px;
			left: ${productImageFlyLeft}px;
			width: ${productImageFlyWidth}px;
			height: ${productImageFlyHeight}px;
			`;

			document.body.append(productImageFly);

			const cartFlyTop = cart.getBoundingClientRect().top;
			const cartFlyLeft = cart.getBoundingClientRect().left;
			
			productImageFly.style.cssText = 
			`
			top: ${cartFlyTop}px;
			left: ${cartFlyLeft}px;
			width: 0;
			height: 0;
			opacity:0;
			`;

			productImageFly.addEventListener("transitionend", function () {
				if (productBtn.classList.contains("__fly")) {
					productImageFly.remove();
					updateCart(productBtn, productId);
					productBtn.classList.remove("__fly");
				}
			});
		}
	}

	function updateCart(productBtn, productId, productAdd = true) {
		const cart = document.querySelector(".cart-header");
		const cartIcon = cart.querySelector(".cart-header__icon");
		const cartQuantity = cartIcon.querySelector("span");
		const cartProduct = document.querySelector(`[data-cart-productid="${productId}"]`);
		const cartList = document.querySelector(".cart-list");

		// Adding
		if(productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML("beforeend", `<span>1</span>`)
			}

			if (!cartProduct) {
				const product = document.querySelector(`[data-productid="${productId}"]`);
				const cartProductImage = product.querySelector(".item-product__img").innerHTML;
				const cartProductTitle = product.querySelector(".item-product__title").innerHTML;
				const cartProductContent = 
				`
				<a class="cart-list__img __ibg" hreff="#">${cartProductImage}</a>
				<div class="cart-list__body">
					<a class="cart-list__title" href="#">${cartProductTitle}</a>
					<div class="cart-list__quantity">Quantity: <span>1</span></div>
					<a class="cart-list__delete" href="#">Delete</a>
				</div>
				`;
				cartList.insertAdjacentHTML("beforeend", `<li class="cart-list__item" data-cart-productid="${productId}">${cartProductContent}</li>`)
			} else {
				const cartProductQuantity = cartProduct.querySelector(".cart-list__quantity span");
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			}
			// remove __hold
			productBtn.classList.remove("__hold");
		} else {
			const cartProductQuantity = cartProduct.querySelector(".cart-list__quantity span");
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
				cartProduct.remove();
			}

			const cartQuantityValue = -- cartQuantity.innerHTML;

			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove("__active");
			}
		}
	}

	// Furniture Gallery
	const furniture = document.querySelector(".furniture__body");
	if (furniture && !isMobile.any()) {
		const furnitureItems = document.querySelector(".furniture__items");
		const furnitureColumn = document.querySelectorAll(".furniture__column");

		// speed animation 
		const speed = furniture.dataset.speed;
		
		let positionX = 0;
		let coordXprocent = 0;

		function setMouseGalleryStyle() {
			let furnitureItemsWidth = 0;
			furnitureColumn.forEach(element => {
				furnitureItemsWidth += element.offsetWidth;
			});

			const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
			const distX = Math.floor(coordXprocent - positionX);

			positionX = positionX + (distX * speed);
			let position = furnitureDifferent / 200 * positionX;

			furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

			if (Math.abs(distX) > 0) {
				requestAnimationFrame(setMouseGalleryStyle);
				
			} else {
				furniture.classList.remove("__init");
			}
		}	
			furniture.addEventListener("mousemove", function (evt) {
				// Getting width
				const furnitureWidth = furniture.offsetWidth;

				// 0 in the middle
				const coordX = evt.pageX - furnitureWidth / 2;

				// Getting %
				coordXprocent = coordX / furnitureWidth * 200;

				if (!furniture.classList.contains("__init")) {
					requestAnimationFrame(setMouseGalleryStyle);
					furniture.classList.add("__init");
				}
			});
	}
}