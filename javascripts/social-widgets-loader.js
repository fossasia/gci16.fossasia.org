
if (IntersectionObserver) {   // Start ignoring JSHintBear
  // Stop ignoring
  var scrollWaiter = document.querySelector('#loklak');
  var socialDiv = document.querySelector('#social-media');
  var io = new IntersectionObserver( // Start ignoring JSHintBear
    function(entries) {
      if (entries[0].target === scrollWaiter || entries[0].target === socialDiv) {
        loadSocialMediaWidgets();
        io.disconnect();
      }
    },
    {
      threshold: 1.0
    }
  );
  io.observe(scrollWaiter);
  io.observe(socialDiv); // Stop ignoring
} else {
  var scrollThreshold = document.querySelector('#loklak').scrollTop;
  var fun = function(e) { // Start ignoring JSHintBear
    var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPos >= scrollThreshold) {
      loadSocialMediaWidgets();
    }
  }; // Stop ignoring
  window.addEventListener('scroll', fun, { passive: true });
}

function loadSocialMediaWidgets() {
  var widgetWidth = 370;
  if (window.innerWidth <= 370) {
    widgetWidth = 300;
  }

  // Facebook
  var fbDiv = document.querySelector('.facebook-widget');
  var fbFrame = document.createElement('iframe');
  fbFrame.setAttribute('src', '//www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffossasia&amp;tabs=timeline&amp;width='+widgetWidth+'&amp;height=459&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId');
  fbFrame.setAttribute('width', widgetWidth);
  fbFrame.setAttribute('style', 'border:none;overflow:hidden');
  fbFrame.setAttribute('scrolling', 'no');
  fbFrame.setAttribute('frameborder', 0);
  fbFrame.setAttribute('allowtransparency', 'true');
  fbDiv.appendChild(fbFrame);

  // Google+
  if (widgetWidth === 300) {
    document.querySelector('.g-page').setAttribute('data-width', 300);
  }
  var script = document.createElement('script');
  script.setAttribute('src', '//apis.google.com/js/platform.js');
  script.setAttribute('async', true);
  document.head.appendChild(script);

  // Twitter
  if (widgetWidth === 300) {
    document.querySelector('.twitter-timeline').setAttribute('data-width', 300);
  }
  script = document.createElement('script');
  script.setAttribute('src', '//platform.twitter.com/widgets.js');
  script.setAttribute('async', true);
  document.head.appendChild(script);
  ! function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? "http" : "https";
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
  }(document, "script", "twitter-wjs"); // Start ignoring JSHintBear
  // Stop ignoring

  // Github
  if (widgetWidth === 300) {
    document.querySelector('.github-widget').setAttribute('style', 'width:300px !important;');
  }
  script = document.createElement('script');
  script.setAttribute('src', '//unpkg.com/github-card@1.2.1/dist/widget.js');
  script.setAttribute('async', true);
  document.head.appendChild(script);

  // Youtube
  var ytFrame = document.createElement('iframe');
  var ytDiv = document.querySelector('.embed-responsive-4by3');
  ytFrame.setAttribute('src', '//www.youtube.com/embed/videoseries?list=PLzZVLecTsGpK039bJFaMsFbYXA6QVPaO5');
  ytFrame.setAttribute('allowfullscreen', true);
  ytFrame.setAttribute('frameborder', 0);
  ytFrame.classList.add('embed-responsive-item');
  ytDiv.appendChild(ytFrame);

  // Flickr
  script = document.createElement('script');
  script.setAttribute('src', '//flickrembed.com/embed_v2.js.php?source=flickr&layout=responsive&input=www.flickr.com/photos/fossasia&sort=0&by=user&theme=default&scale=fit&skin=default&id=5843ed99c6db7');
  script.setAttribute('async', true);
  document.head.appendChild(script);
}
