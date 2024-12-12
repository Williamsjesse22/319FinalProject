// src/components/About.js

import React, { useEffect } from 'react';
import '../styles/about.css';

const AboutInformation = () => {
	useEffect(() => {
		// Function to generate a random color
		function getRandomColor() {
			return '#' + Math.floor(Math.random() * 16777215).toString(16);
		}

		// Select all elements with the 'decoration' class
		const decorations = document.querySelectorAll('.decoration');
		decorations.forEach((decoration) => {
			const randomColor = getRandomColor();
			decoration.style.backgroundColor = randomColor;
			decoration.style.opacity = '0.5';
		});
	}, []); // Empty dependency array means it runs once when the component mounts

	return (
		<section className="about-section">
			<div className="transition-start"></div>
			<div className="background">
				<div className="decoration decoration1"></div>
				<div className="decoration decoration12"></div>
				<div className="decoration decoration13"></div>
				<div className="decoration decoration14"></div>
				<div className="decoration decoration2"></div>
				<div className="decoration decoration22"></div>
				<div className="decoration decoration23"></div>
				<div className="decoration decoration24"></div>
				<div className="decoration decoration3"></div>
				<div className="decoration decoration32"></div>
				<div className="decoration decoration33"></div>
				<div className="decoration decoration34"></div>

				<div className="marquee-section">
					<div className="marquee-text">
						<h1>
							<strong>About</strong>
						</h1>
						<p>
							At Petdoption, we believe every animal deserves a
							loving home and every heart deserves the joy of a
							furry companion. We are dedicated to creating
							lifelong bonds by uniting pets in need with people
							who care. With compassion, commitment, and hope, we
							strive to turn second chances into new beginnings —
							because love knows no breed, and Petdoption is where
							forever homes begin.
						</p>
					</div>
					<div class="marquee-wrapper">
						<div class="marquee">
							<div class="marquee-item">
								<article class="member">
									<a class="member-link" href="#0">
										<figure class="member-img-wrapper">
											<img
												class="member-img"
												height="700"
												src="https://ontariospca.ca/wp-content/uploads/2022/11/napanee-cat-4.jpg"
												alt="Missy"
											/>
										</figure>
										<figcaption class="member-details">
											<h3 class="member-title">
												Mittens
											</h3>
											<p class="member-subtitle">
												Rescued from a life on the
												streets, struggling to find her
												next meal
											</p>
										</figcaption>
									</a>
								</article>
							</div>
							<div class="marquee-item">
								<article class="member">
									<a class="member-link" href="#0">
										<figure class="member-img-wrapper">
											<img
												class="member-img"
												height="667"
												src="https://scontent-ord5-3.xx.fbcdn.net/v/t39.30808-6/461180533_939219094901001_4135648020907776260_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=TNfhFA3CWUYQ7kNvgFRX3u1&_nc_zt=23&_nc_ht=scontent-ord5-3.xx&_nc_gid=A_SsQqjd8BlOebZLV8oGXkl&oh=00_AYBKoQau4GYnXyWGGpPWtPqF7KaMqjm5RY_UNZ15KtYuNg&oe=675FA5C9"
												alt="Oscar"
											/>
										</figure>
										<figcaption class="member-details">
											<h3 class="member-title">Oscar</h3>
											<p class="member-subtitle">
												Rescued from an abusive home,
												found him a loving family
											</p>
										</figcaption>
									</a>
								</article>
							</div>
							<div class="marquee-item">
								<article class="member">
									<a class="member-link" href="#0">
										<figure class="member-img-wrapper">
											<img
												class="member-img"
												height="700"
												src="https://media.wusa9.com/assets/WUSA/images/74a2c971-f367-420a-a372-de4fa05fc932/20241210T042329/74a2c971-f367-420a-a372-de4fa05fc932_1920x1080.jpg"
												alt="Jamie"
											/>
										</figure>
										<figcaption class="member-details">
											<h3 class="member-title">Jamie</h3>
											<p class="member-subtitle">
												Homeless puppy given shelter,
												has grown up mostly at
												Petdoption. Looking for someone
												to love
											</p>
										</figcaption>
									</a>
								</article>
							</div>
							<div class="marquee-item">
								<article class="member">
									<a class="member-link" href="#0">
										<figure class="member-img-wrapper">
											<img
												class="member-img"
												height="667"
												src="https://whyy.org/wp-content/uploads/2021/12/2021-12-27-k-paynter-ACCT-philly-december-21-9-768x512.jpg"
												alt="Becky"
											/>
										</figure>
										<figcaption class="member-details">
											<h3 class="member-title">Becky</h3>
											<p class="member-subtitle">
												Given to Petdoption as a puppy
												with medical conditions, has
												been treated and now has a
												loving home
											</p>
										</figcaption>
									</a>
								</article>
							</div>
							<div class="marquee-item">
								<article class="member">
									<a class="member-link" href="#0">
										<figure class="member-img-wrapper">
											<img
												class="member-img"
												height="700"
												src="https://cdn.firespring.com/images/48a9dc09-c55e-408e-9cb2-b80254f0d4c7.jpg"
												alt="Team Member #5"
											/>
										</figure>
										<figcaption class="member-details">
											<h3 class="member-title">
												Michael
											</h3>
											<p class="member-subtitle">
												Lazy kitten who loves to cuddle,
												cured of ailments and provided
												with a new home
											</p>
										</figcaption>
									</a>
								</article>
							</div>
							<div class="marquee-item">
								<article class="member">
									<a class="member-link" href="#0">
										<figure class="member-img-wrapper">
											<img
												class="member-img"
												height="667"
												src="https://s3.us-west-2.amazonaws.com/assets.eastidahonews.com/wp-content/uploads/2022/03/30141421/Kittens.jpg"
												alt="Team Member #6"
											/>
										</figure>
										<figcaption class="member-details">
											<h3 class="member-title">
												Itsy, Bitsy, Jerod and Rachel
											</h3>
											<p class="member-subtitle">
												4 kittens abandoned searching
												for love
											</p>
										</figcaption>
									</a>
								</article>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="transition-end-about"></div>
		</section>
	);
};

export default AboutInformation;
