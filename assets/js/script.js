// Preloader js
(function ($) {
  'use strict';

  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });

  (function () {
    var headerHeight = $('header').outerHeight(true);
    $('body').css('padding-top', headerHeight);

    $(window).scroll(function () {
      if ($(document).scrollTop() > headerHeight) {
        $('.img-logo').addClass('small-logo');
      } else {
        $('.img-logo').removeClass('small-logo');
      }
    });
  })();

  // justified gallery
  $('.justified-gallery').each(function (i, el) {
    $(el).justifiedGallery({
      rel: 'justified-gallery-' + i,
      rowHeight: 200,
      maxRowHeight: 250,
      waitThumbnailsLoad: false,
      margins: 4,
      lastRow: 'center'
    }).on('jg.complete', function () {
      $(this).find('a').colorbox({
        maxWidth: '90%',
        maxHeight: '90%',
        opacity: 0.8,
        transition: 'elastic',
        current: ''
      });
    });
  });

  (function () {
    $('#mailchimp-form').hide();
    // <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>

    $('#subscribe').on('click', function () {
      $('#mailchimp-form').show('fast', 'swing', function () {
        var src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
        if (!$('head > script[src="' + src + '"]').length) {
          $('head').append(
            $('<script />')
              .attr('src', src)
              .attr('type', 'text/javascript')
          );
        }
      });
    })
    $('#mc-subscibe-close').on('click', function () {
      $('#mailchimp-form').hide('fast', 'swing');
    })
  })();

  //  Search Form Open
  $('#searchOpen').on('click', function () {
    $('.search-wrapper').addClass('open');
  });
  $('#searchClose').on('click', function () {
    $('.search-wrapper').removeClass('open');
  });

  // featured post slider
  $('.featured-post-slider').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    dots: true,
    responsive: [{
      breakpoint: 600,
      settings: {
        vertical: false,
        verticalSwiping: false,
      }
    }]
  });

  // PWA Support https://techformist.com/add-pwa-hugo/
  (function () {
    if ('serviceWorker' in navigator) {

      /**
       * Define if <link rel='next|prev|prefetch'> should
       * be preloaded when accessing this page
       */
      const PREFETCH = true;

      /**
       * Define which link-rel's should be preloaded if enabled.
       */
      const PREFETCH_LINK_RELS = ['index', 'next', 'prev', 'prefetch'];

      /**
       * prefetchCache
       */
      function prefetchCache() {
        if (navigator.serviceWorker.controller) {

          let links = document.querySelectorAll(
            PREFETCH_LINK_RELS.map((rel) => {
              return 'link[rel=' + rel + ']';
            }).join(',')
          );

          if (links.length > 0) {
            Array.from(links)
              .map((link) => {
                let href = link.getAttribute('href');
                navigator.serviceWorker.controller.postMessage({
                  action: 'cache',
                  url: href,
                });
              });
          }
        }
      }

      /**
       * Register Service Worker
       */
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(() => {
          console.log('Service Worker Registered');
        });

      /**
       * Wait if ServiceWorker is ready
       */
      navigator.serviceWorker
        .ready
        .then(() => {
          if (PREFETCH) {
            prefetchCache();
          }
        });
    }
  })();

})(jQuery);