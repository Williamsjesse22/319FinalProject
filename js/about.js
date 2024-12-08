// Updated script for about.js
// This file is now independent of core.min.js

/* Minimal Plugins Definition */
var plugins = {
    preloader: $('.preloader'),
    counter: $('.counter'),
    progressLinear: $('.progress-linear'),
    rdGoogleMaps: $('.rd-google-map'),
    swiper: $('.swiper-slider'),
  };
  
  // Auto-generated script for about.js
  /* Features: preloader, pageTransitions */
  plugins.preloader
  $window.on('load', function () {
    page.addClass(animIn + ' animated');
    page.removeClass(animIn).addClass(animOut);
  });
  