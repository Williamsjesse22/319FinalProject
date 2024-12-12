// src/components/Reviews.js

import React from 'react';
import '../styles/reviews.css';

const Reviews = () => {
  return (
    <section className="reviews-section">
      {
        <section>
            <section class="reviews-section">
					<h2 class="words">Reviews</h2>
					<div class="container">
						<div class="card-column column-0">
							<div class="card card-color-0">
								<div class="border"></div>
								<img
									src="https://media.istockphoto.com/id/1333694863/photo/a-young-blonde-woman-holds-tabby-cat.jpg?s=612x612&w=0&k=20&c=QiKEKHOSpsIolFN169cUlgPwFa93aZZkXNm-Vct-QHI=" />
								<h1>Jenny and Sara</h1>
							</div>
						</div>
						<div class="card-column column-1">
							<div class="card card-color-1">
								<div class="border"></div>
								<img
									src="https://media.istockphoto.com/id/1350689855/photo/portrait-of-an-asian-man-holding-a-young-dog.jpg?s=612x612&w=0&k=20&c=Iw0OedGHrDViIM_6MipHmPLlo83O59by-LGcsDPyzwU=" />
								<h1>Mark and Buddy</h1>
							</div>
						</div>
						<div class="card-column column-2">
							<div class="card card-color-2">
								<div class="border"></div>
								<img
									src="https://media.istockphoto.com/id/174944547/photo/asian-indian-woman-with-green-parrot-sitting-on-her-hand.jpg?s=612x612&w=0&k=20&c=iscUv-h8jYONQsGAsyY1Wh1Jijtlq5LnzCmH33ixxBQ=" />
								<h1>Amy and Snowball</h1>
							</div>
						</div>
						<div class="card-column column-0">
							<div class="card card-color-3">
								<div class="border"></div>
								<img
									src="https://media.istockphoto.com/id/1132760243/photo/guinea-pig-in-hands-of-doctor.jpg?s=612x612&w=0&k=20&c=S3Yf8RkXSllmt3H2qABAe1dMTpVkKIZDnSeHlwRUVuw=" />
								<h1>David and Whiskers</h1>
							</div>
						</div>
						<div class="card-column column-1">
							<div class="card card-color-0">
								<div class="border"></div>
								<img
									src="https://media.istockphoto.com/id/1337471623/photo/man-holding-a-pogona-or-bearded-dragon.jpg?s=612x612&w=0&k=20&c=05GNKhYMBD26UPLmrJg09sZD7pQEmkWgMbGHBeVXv6s=" />
								<h1>Chris and Luna</h1>
							</div>
						</div>
						<div class="card-column column-2">
							<div class="card card-color-1">
								<div class="border"></div>
								<img
									src="https://media.istockphoto.com/id/1057154720/photo/bodybuilder-with-a-little-rabbit.jpg?s=612x612&w=0&k=20&c=s1HDR_6kSTzNoxJJ-ltzQNLXxi0b0GPjnrF6Zbbi0ew=" />
								<h1>Billy and Rex</h1>
							</div>
						</div>
					</div>
					<div id="cover" class="cover"></div>
					<div id="open-content" class="open-content">
						<a href="#" id="close-content" class="close-content">
							<span class="x-1"></span><span class="x-2"></span>
						</a>
						<img id="open-content-image" src="" />
						<div class="text" id="open-content-text"></div>
					</div>
				</section>
				<div class="transition-end">
				</div>
        </section>
      }
    </section>
  );
};

export default Reviews;
