/* global $:true */
/* eslint no-console:0 */

import bs from 'bootstrap-sass/assets/javascripts/bootstrap';

console.log('hello wp2bs-theme-stater');

$(window).on('resize', (e) => {
  console.log('resized', e);
});

$(document).ready(() => {
  $(window).trigger('resize');
});
