import gsap from 'https://cdn.skypack.dev/gsap@3.12.0';
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger';
import { useEffect } from 'react';

const useLandingPageScripts = () => {
	useEffect(() => {
		// Random color generator for decorations
		function getRandomColor() {
			return (
				'#' +
				Math.floor(Math.random() * 16777215)
					.toString(16)
					.padStart(6, '0')
			);
		}

		const decorations = document.querySelectorAll('.decoration');
		decorations.forEach((decoration) => {
			const randomColor = getRandomColor();
			decoration.style.backgroundColor = randomColor;
			decoration.style.opacity = '0.5';
		});

		const cards = document.querySelectorAll('.pinochio-card');
		cards.forEach((card) => {
			const randomColor = getRandomColor();
			card.style.backgroundColor = randomColor; // Apply color to the entire card
		});
	}, []);

	useEffect(() => {
		// GSAP Scroll Animation and Layers
		let scalerTl;
		let layersTl;

		const hasScrollSupport = CSS.supports(
			'(animation-timeline: view()) and (animation-range: 0 100%)'
		);

		if (!hasScrollSupport) {
			gsap.registerPlugin(ScrollTrigger);
			console.info('GSAP ScrollTrigger registered');
		}

		const update = () => {
			if (!hasScrollSupport) {
				scalerTl = gsap
					.timeline({
						scrollTrigger: {
							trigger: 'main section:first-of-type',
							start: 'top -10%',
							end: 'bottom 80%',
							scrub: true,
						},
					})
					.from(
						'.scaler img',
						{
							height: window.innerHeight - 32,
							ease: 'power1.inOut',
						},
						0
					)
					.from(
						'.scaler img',
						{
							width: window.innerWidth - 32,
							ease: 'power2.inOut',
						},
						0
					);

				layersTl = gsap
					.timeline({
						scrollTrigger: {
							trigger: 'main section:first-of-type',
							start: 'top -40%',
							end: 'bottom bottom',
							scrub: true,
						},
					})
					.from(
						'.layer:nth-of-type(1)',
						{
							opacity: 0,
							ease: 'sine.out',
						},
						0
					)
					.from(
						'.layer:nth-of-type(1)',
						{
							scale: 0,
							ease: 'power1.inOut',
						},
						0
					)
					.from(
						'.layer:nth-of-type(2)',
						{
							opacity: 0,
							ease: 'sine.out',
						},
						0
					)
					.from(
						'.layer:nth-of-type(2)',
						{
							scale: 0,
							ease: 'power3.inOut',
						},
						0
					)
					.from(
						'.layer:nth-of-type(3)',
						{
							opacity: 0,
							ease: 'sine.out',
						},
						0
					)
					.from(
						'.layer:nth-of-type(3)',
						{
							scale: 0,
							ease: 'power4.inOut',
						},
						0
					);
			}
		};

		update();
	}, []);

	useEffect(() => {
		// Marquee Functionality
		const marqueeItems = document.querySelectorAll('.marquee-item');
		const btnPrev = document.querySelector('.arrow-prev');
		const btnNext = document.querySelector('.arrow-next');
		const conf = { duration: 1, ease: 'power.inOut' };

		function horizontalLoop(items, config) {
			let timeline;
			items = gsap.utils.toArray(items);
			config = config || {};

			gsap.context(() => {
				let tl = gsap.timeline({
					repeat: config.repeat,
					paused: config.paused,
					defaults: { ease: 'none' },
				});

				items.forEach((item, i) => {
					let distance = item.offsetWidth;
					tl.to(item, { x: `-=${distance}` }, i * config.speed);
				});

				timeline = tl;
			});

			return timeline;
		}

		window.addEventListener('load', function () {
			const loop = horizontalLoop(marqueeItems, {
				repeat: -1,
				paddingRight: 30,
				speed: 0.2,
				draggable: true,
			});

			marqueeItems.forEach((item) => {
				item.addEventListener('mouseenter', () => loop.pause());
				item.addEventListener('mouseleave', () => loop.play());
			});

			btnPrev?.addEventListener('click', () => loop.previous(conf));
			btnNext?.addEventListener('click', () => loop.next(conf));
		});
	}, []);

	useEffect(() => {
		let cards,
			nCards,
			cover,
			openContent,
			openContentText,
			pageIsOpen = false,
			openContentImage,
			closeContent,
			windowWidth,
			windowHeight,
			currentCard;

		function init() {
			resize();
			selectElements();
			attachListeners();
		}

		function selectElements() {
			cards = document.getElementsByClassName('pinochio-card');
			nCards = cards.length;
			cover = document.getElementById('cover');
			openContent = document.getElementById('open-content');
			openContentText = document.getElementById('open-content-text');
			openContentImage = document.getElementById('open-content-image');
			closeContent = document.getElementById('close-content');
		}

		function attachListeners() {
			for (let i = 0; i < nCards; i++) {
				attachListenerToCard(i);
			}
			closeContent?.addEventListener('click', onCloseClick);
			window.addEventListener('resize', resize);
		}

		function attachListenerToCard(i) {
			cards[i].addEventListener('click', function (e) {
				const card = getCardElement(e.target);
				if (card) {
					onCardClick(card, i);
				} else {
					console.warn('No parent with class "pinochio-card" found');
				}
			});
		}

		function onCardClick(card) {
			console.log('Card clicked:', card);
			currentCard = card;
			currentCard.classList.add('clicked'); // Add the 'clicked' class to animate the image out

			// Delay the cover animation to allow the image to disappear first
			setTimeout(() => {
				animateCoverUp(currentCard);
			}, 500); // Adjust the delay to match your CSS animation duration

			animateOtherCards(currentCard, true);
			openContent.classList.add('open');
		}

		function animateCoverUp(card) {
			const cardPosition = card.getBoundingClientRect();
			const cardStyle = getComputedStyle(card);
			setCoverPosition(cardPosition);
			setCoverColor(cardStyle);
			scaleCoverToFillWindow(cardPosition);
			openContentText.innerHTML = `<h1>${card.children[2].textContent}</h1>`;
			openContentImage.src = card.children[1].src;
			setTimeout(() => {
				window.scrollTo(0, 0);
				pageIsOpen = true;
			}, 300);
		}

		function setCoverPosition(cardPosition) {
			cover.style.left = `${cardPosition.left}px`;
			cover.style.top = `${cardPosition.top}px`;
			cover.style.width = `${cardPosition.width}px`;
			cover.style.height = `${cardPosition.height}px`;
		}

		function setCoverColor(cardStyle) {
			cover.style.backgroundColor = cardStyle.backgroundColor;
		}

		function scaleCoverToFillWindow(cardPosition) {
			const scaleX = windowWidth / cardPosition.width;
			const scaleY = windowHeight / cardPosition.height;
			const offsetX =
				(windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) /
				scaleX;
			const offsetY =
				(windowHeight / 2 -
					cardPosition.height / 2 -
					cardPosition.top) /
				scaleY;
			cover.style.transform = `scaleX(${scaleX}) scaleY(${scaleY}) translate3d(${offsetX}px, ${offsetY}px, 0px)`;
		}

		function animateOtherCards(card, out) {
			let delay = 100;
			for (let i = 0; i < nCards; i++) {
				if (cards[i] === card) continue;
				if (out) animateOutCard(cards[i], delay);
				else animateInCard(cards[i], delay);
				delay += 100;
			}
		}

		function animateOutCard(card, delay) {
			setTimeout(() => {
				card.classList.add('out');
			}, delay);
		}

		function animateInCard(card, delay) {
			setTimeout(() => {
				card.classList.remove('out');
			}, delay);
		}

		function onCloseClick() {
			if (!currentCard) return; // Ensure currentCard is defined before proceeding

			openContent.classList.remove('open');
			animateCoverBack(currentCard);
			animateOtherCards(currentCard, false);
		}

		function animateCoverBack(card) {
			if (!card) {
				console.warn('animateCoverBack called with undefined card');
				return;
			}

			const cardPosition = card.getBoundingClientRect();
			setCoverPosition(cardPosition);
			cover.style.transform =
				'scaleX(1) scaleY(1) translate3d(0px, 0px, 0px)';
			setTimeout(() => {
				openContentText.innerHTML = '';
				openContentImage.src = '';
				cover.style.width = '0px';
				cover.style.height = '0px';
				pageIsOpen = false;
				if (currentCard) {
					currentCard.classList.remove('clicked');
					currentCard = null;
				}
			}, 301);
		}

		function getCardElement(el) {
			while (el && el !== document.body) {
				if (el.classList && el.classList.contains('pinochio-card')) {
					return el;
				}
				el = el.parentElement;
			}
			return null;
		}

		function resize() {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
		}

		init();
	}, []);
};

export default useLandingPageScripts;
