// Newsletter issue: https://craftofui.substack.com/p/scrolling-a-page-out-of-the-playbook

// import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4' /* EDIT: Commenting out to remove config box */
// We still need gsap and ScrollTrigger
import gsap from 'https://cdn.skypack.dev/gsap@3.12.0';
import Draggable from 'https://cdn.skypack.dev/gsap@3.12.0/Draggable.js'; // Add this line
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger';


let scalerTl;
let layersTl;

const hasScrollSupport = CSS.supports(
	'(animation-timeline: view()) and (animation-range: 0 100%)'
);

const config = {
	theme: 'system',
	enhanced: true,
	stick: true,
	layers: true,
	center: true,
	stagger: 'range',
};

if (!hasScrollSupport) {
	gsap.registerPlugin(ScrollTrigger);
	console.info('GSAP ScrollTrigger registered');
}

const update = () => {
	document.documentElement.dataset.theme = config.theme;
	document.documentElement.dataset.enhanced = config.enhanced;
	document.documentElement.dataset.stick = config.stick;
	document.documentElement.dataset.center = config.center;
	document.documentElement.dataset.layers = config.layers;
	document.documentElement.dataset.stagger = config.stagger;

	if (config.enhanced && !hasScrollSupport) {
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
		// then the layers
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
	} else {
		gsap.set(['.scaler img', '.layer'], {
			attr: {
				style: undefined,
			},
		});
		scalerTl?.kill();
		layersTl?.kill();
		scalerTl = undefined;
		layersTl = undefined;
	}
};

update(); // Just call update once to initialize

// BEGIN NEW JS ADDITIONS
const marqueeItems = document.querySelectorAll('.marquee-item');
const btnPrev = document.querySelector('.arrow-prev');
const btnNext = document.querySelector('.arrow-next');
const conf = { duration: 1, ease: 'power.inOut' };

window.addEventListener('load', function () {
	const loop = horizontalLoop(marqueeItems, {
		repeat: -1,
		paddingRight: 30,
		speed: 0.2,
		draggable: true,
	});

	marqueeItems.forEach(function (item) {
		item.addEventListener('mouseenter', () => loop.pause());
		item.addEventListener('mouseleave', () => loop.play());
	});

	btnPrev.addEventListener('click', () => loop.previous(conf));
	btnNext.addEventListener('click', () => loop.next(conf));
});

function horizontalLoop(items, config) {
	let timeline;
	items = gsap.utils.toArray(items);
	config = config || {};
	gsap.context(() => {
		let onChange = config.onChange,
			lastIndex = 0,
			tl = gsap.timeline({
				repeat: config.repeat,
				onUpdate:
					onChange &&
					function () {
						let i = tl.closestIndex();
						if (lastIndex !== i) {
							lastIndex = i;
							onChange(items[i], i);
						}
					},
				paused: config.paused,
				defaults: { ease: 'none' },
				onReverseComplete: () =>
					tl.totalTime(tl.rawTime() + tl.duration() * 100),
			}),
			length = items.length,
			startX = items[0].offsetLeft,
			times = [],
			widths = [],
			spaceBefore = [],
			xPercents = [],
			curIndex = 0,
			indexIsDirty = false,
			center = config.center,
			pixelsPerSecond = (config.speed || 1) * 100,
			snap =
				config.snap === false
					? (v) => v
					: gsap.utils.snap(config.snap || 1),
			timeOffset = 0,
			container =
				center === true
					? items[0].parentNode
					: gsap.utils.toArray(center)[0] || items[0].parentNode,
			totalWidth,
			getTotalWidth = () =>
				items[length - 1].offsetLeft +
				(xPercents[length - 1] / 100) * widths[length - 1] -
				startX +
				spaceBefore[0] +
				items[length - 1].offsetWidth *
					gsap.getProperty(items[length - 1], 'scaleX') +
				(parseFloat(config.paddingRight) || 0),
			populateWidths = () => {
				let b1 = container.getBoundingClientRect(),
					b2;
				items.forEach((el, i) => {
					widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'));
					xPercents[i] = snap(
						(parseFloat(gsap.getProperty(el, 'x', 'px')) /
							widths[i]) *
							100 +
							gsap.getProperty(el, 'xPercent')
					);
					b2 = el.getBoundingClientRect();
					spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
					b1 = b2;
				});
				gsap.set(items, {
					xPercent: (i) => xPercents[i],
				});
				totalWidth = getTotalWidth();
			},
			timeWrap,
			populateOffsets = () => {
				timeOffset = center
					? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
					: 0;
				center &&
					times.forEach((t, i) => {
						times[i] = timeWrap(
							tl.labels['label' + i] +
								(tl.duration() * widths[i]) / 2 / totalWidth -
								timeOffset
						);
					});
			},
			getClosest = (values, value, wrap) => {
				let i = values.length,
					closest = 1e10,
					index = 0,
					d;
				while (i--) {
					d = Math.abs(values[i] - value);
					if (d > wrap / 2) {
						d = wrap - d;
					}
					if (d < closest) {
						closest = d;
						index = i;
					}
				}
				return index;
			},
			populateTimeline = () => {
				let i, item, curX, distanceToStart, distanceToLoop;
				tl.clear();
				for (i = 0; i < length; i++) {
					item = items[i];
					curX = (xPercents[i] / 100) * widths[i];
					distanceToStart =
						item.offsetLeft + curX - startX + spaceBefore[0];
					distanceToLoop =
						distanceToStart +
						widths[i] * gsap.getProperty(item, 'scaleX');
					tl.to(
						item,
						{
							xPercent: snap(
								((curX - distanceToLoop) / widths[i]) * 100
							),
							duration: distanceToLoop / pixelsPerSecond,
						},
						0
					)
						.fromTo(
							item,
							{
								xPercent: snap(
									((curX - distanceToLoop + totalWidth) /
										widths[i]) *
										100
								),
							},
							{
								xPercent: xPercents[i],
								duration:
									(curX -
										distanceToLoop +
										totalWidth -
										curX) /
									pixelsPerSecond,
								immediateRender: false,
							},
							distanceToLoop / pixelsPerSecond
						)
						.add('label' + i, distanceToStart / pixelsPerSecond);
					times[i] = distanceToStart / pixelsPerSecond;
				}
				timeWrap = gsap.utils.wrap(0, tl.duration());
			},
			refresh = (deep) => {
				let progress = tl.progress();
				tl.progress(0, true);
				populateWidths();
				deep && populateTimeline();
				populateOffsets();
				deep && tl.draggable
					? tl.time(times[curIndex], true)
					: tl.progress(progress, true);
			},
			onResize = () => refresh(true),
			proxy;
		gsap.set(items, { x: 0 });
		populateWidths();
		populateTimeline();
		populateOffsets();
		window.addEventListener('resize', onResize);
		function toIndex(index, vars) {
			vars = vars || {};
			Math.abs(index - curIndex) > length / 2 &&
				(index += index > curIndex ? -length : length);
			let newIndex = gsap.utils.wrap(0, length, index),
				time = times[newIndex];
			if (time > tl.time() !== index > curIndex && index !== curIndex) {
				time += tl.duration() * (index > curIndex ? 1 : -1);
			}
			if (time < 0 || time > tl.duration()) {
				vars.modifiers = { time: timeWrap };
			}
			curIndex = newIndex;
			vars.overwrite = true;
			gsap.killTweensOf(proxy);
			return vars.duration === 0
				? tl.time(timeWrap(time))
				: tl.tweenTo(time, vars);
		}
		tl.toIndex = (index, vars) => toIndex(index, vars);
		tl.closestIndex = (setCurrent) => {
			let index = getClosest(times, tl.time(), tl.duration());
			if (setCurrent) {
				curIndex = index;
				indexIsDirty = false;
			}
			return index;
		};
		tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
		tl.next = (vars) => toIndex(tl.current() + 1, vars);
		tl.previous = (vars) => toIndex(tl.current() - 1, vars);
		tl.times = times;
		tl.progress(1, true).progress(0, true);
		if (config.reversed) {
			tl.vars.onReverseComplete();
			tl.reverse();
		}
		if (config.draggable && typeof Draggable === 'function') {
			proxy = document.createElement('div');
			let wrap = gsap.utils.wrap(0, 1),
				ratio,
				startProgress,
				draggable,
				dragSnap,
				lastSnap,
				initChangeX,
				wasPlaying,
				align = () =>
					tl.progress(
						wrap(
							startProgress +
								(draggable.startX - draggable.x) * ratio
						)
					),
				syncIndex = () => tl.closestIndex(true);
			typeof InertiaPlugin === 'undefined' &&
				console.warn(
					'InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club'
				);
			draggable = Draggable.create(proxy, {
				trigger: items[0].parentNode,
				type: 'x',
				onPressInit() {
					let x = this.x;
					gsap.killTweensOf(tl);
					wasPlaying = !tl.paused();
					tl.pause();
					startProgress = tl.progress();
					refresh();
					ratio = 1 / totalWidth;
					initChangeX = startProgress / -ratio - x;
					gsap.set(proxy, { x: startProgress / -ratio });
				},
				onDrag: align,
				onThrowUpdate: align,
				overshootTolerance: 0,
				inertia: true,
				snap(value) {
					if (Math.abs(startProgress / -ratio - this.x) < 10) {
						return lastSnap + initChangeX;
					}
					let time = -(value * ratio) * tl.duration(),
						wrappedTime = timeWrap(time),
						snapTime =
							times[
								getClosest(times, wrappedTime, tl.duration())
							],
						dif = snapTime - wrappedTime;
					Math.abs(dif) > tl.duration() / 2 &&
						(dif += dif < 0 ? tl.duration() : -tl.duration());
					lastSnap = (time + dif) / tl.duration() / -ratio;
					return lastSnap;
				},
				onRelease() {
					syncIndex();
					draggable.isThrowing && (indexIsDirty = true);
				},
				onThrowComplete: () => {
					syncIndex();
					wasPlaying && tl.play();
				},
			})[0];
			tl.draggable = draggable;
		}
		tl.closestIndex(true);
		lastIndex = curIndex;
		onChange && onChange(items[curIndex], curIndex);
		timeline = tl;
		return () => window.removeEventListener('resize', onResize);
	});
	return timeline;
}
