// reviews.js

var cards,
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

init();

function init() {
	resize();
	selectElements();
	attachListeners();
}

function selectElements() {
	cards = document.getElementsByClassName('card');
	nCards = cards.length;
	cover = document.getElementById('cover');
	openContent = document.getElementById('open-content');
	openContentText = document.getElementById('open-content-text');
	openContentImage = document.getElementById('open-content-image');
	closeContent = document.getElementById('close-content');
}

function attachListeners() {
	for (var i = 0; i < nCards; i++) {
		attachListenerToCard(i);
	}
	closeContent.addEventListener('click', onCloseClick);
	window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
	cards[i].addEventListener('click', function (e) {
		var card = getCardElement(e.target);
		onCardClick(card, i);
	});
}

function onCardClick(card, i) {
	currentCard = card;
	currentCard.className += ' clicked';
	setTimeout(function () {
		animateCoverUp(currentCard);
	}, 500);
	animateOtherCards(currentCard, true);
	openContent.className += ' open';
}

function animateCoverUp(card) {
	var cardPosition = card.getBoundingClientRect();
	var cardStyle = getComputedStyle(card);
	setCoverPosition(cardPosition);
	setCoverColor(cardStyle);
	scaleCoverToFillWindow(cardPosition);
	openContentText.innerHTML =
		'<h1>' + card.children[2].textContent + '</h1>' + paragraphText;
	openContentImage.src = card.children[1].src;
	setTimeout(function () {
		window.scroll(0, 0);
		pageIsOpen = true;
	}, 300);
}

function animateCoverBack(card) {
	var cardPosition = card.getBoundingClientRect();
	setCoverPosition(cardPosition);
	scaleCoverToFillWindow(cardPosition);
	cover.style.transform =
		'scaleX(' +
		1 +
		') scaleY(' +
		1 +
		') translate3d(' +
		0 +
		'px, ' +
		0 +
		'px, 0px)';
	setTimeout(function () {
		openContentText.innerHTML = '';
		openContentImage.src = '';
		cover.style.width = '0px';
		cover.style.height = '0px';
		pageIsOpen = false;
		currentCard.className = currentCard.className.replace(' clicked', '');
	}, 301);
}

function setCoverPosition(cardPosition) {
	cover.style.left = cardPosition.left + 'px';
	cover.style.top = cardPosition.top + 'px';
	cover.style.width = cardPosition.width + 'px';
	cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
	cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
	var scaleX = windowWidth / cardPosition.width;
	var scaleY = windowHeight / cardPosition.height;
	var offsetX =
		(windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
	var offsetY =
		(windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) /
		scaleY;
	cover.style.transform =
		'scaleX(' +
		scaleX +
		') scaleY(' +
		scaleY +
		') translate3d(' +
		offsetX +
		'px, ' +
		offsetY +
		'px, 0px)';
}

function onCloseClick() {
	openContent.className = openContent.className.replace(' open', '');
	animateCoverBack(currentCard);
	animateOtherCards(currentCard, false);
}

function animateOtherCards(card, out) {
	var delay = 100;
	for (var i = 0; i < nCards; i++) {
		if (cards[i] === card) continue;
		if (out) animateOutCard(cards[i], delay);
		else animateInCard(cards[i], delay);
		delay += 100;
	}
}

function animateOutCard(card, delay) {
	setTimeout(function () {
		card.className += ' out';
	}, delay);
}

function animateInCard(card, delay) {
	setTimeout(function () {
		card.className = card.className.replace(' out', '');
	}, delay);
}

function getCardElement(el) {
	if (el.className.indexOf('card ') > -1) return el;
	else return getCardElement(el.parentElement);
}

function resize() {
	if (pageIsOpen) {
		var cardPosition = currentCard.getBoundingClientRect();
		setCoverPosition(cardPosition);
		scaleCoverToFillWindow(cardPosition);
	}
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
}

var paragraphText =
	'<p>Somebody once told me the world is gonna roll me...</p>'; // You can put your review text here

// Function to generate a random hex color
function getRandomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Select all cards and set a random background color for each
window.addEventListener('load', function () {
	const cards = document.querySelectorAll('.card');
	cards.forEach((card) => {
		const randomColor = getRandomColor();
		card.style.backgroundColor = randomColor;
	});
});
