// Add your function at the end. First function is of highest priority.
var getContributors = function(page) {
  $.ajax({
    url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/contributors?page="+page
  }).done(function(data) {
    if (data.length === 0) {
      return;
    }
    data.forEach(function(contributors) {
      // Ignore LineLengthBear
      var html = "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'><div class='card'>";
      html += "<div class='avatar'>";
      html += "<img src=" + contributors.avatar_url + "><div class='contribs'><p>";
      html += contributors.contributions;
      if (contributors.contributions === 1) {
        html += " contribution";
      } else {
        html += " contributions";
      }
      html += "</p><a href=" + contributors.html_url + " class='contributor-gh'><i class='fa fa-github fa-2x' aria-hidden='true'></i></a></div>";
      html += "<span>";
      html += contributors.login + "</span></div></div></div>";
      $("#contributors-list").append(html);
    });
    getContributors(page+1);
  });
};

$(getContributors(1));

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
// Start ignoring JSHintBear
$(function() {
  var issueElement;
  $.ajax({
    url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/issues?state=open"
  }).done(function(data) {
    var labels = [];
    var labelNames = [];
    var mainWrapper = $("#issues-categories-wrapper");
    for (var i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty("pull_request") || data[i].closed_at !== null) {
        data.splice(i, 1);
        i--;
        continue;
      }
    }
    for (i = 0; i < data.length; i++) {
      if (data[i].labels.length === 0) {
        issueElement = $('<div class="issue"></div>')
                .append($("<span></span>").append(data[i].number))
                .append($("<a></a>").attr("target", "_blank").attr("href", data[i].html_url).append(data[i].title))
                .append($("<p>Opened by </p>").append($("<a></a>").append(data[i].user.login).attr("href", data[i].user.html_url).attr('target', '_blank')))
                .append($('<div class="right-coms"></div>')
                  .append($("<a class='comments'></a>")
                    .attr("href", data[i].html_url)
                    .attr('target', '_blank')
                    .append($("<i class='fa fa-comment'></i>"))
                    .append(data[i].comments))
                );
        issueElement.appendTo($("#unlabeled-category"));
      }
      for (var j = 0; j < data[i].labels.length; j++) {
        if ($.inArray(data[i].labels[j].name, labelNames) === -1) {
          labelNames.push(data[i].labels[j].name);
          labels.push(data[i].labels[j]);
        }
      }
    }
    for (i = 0; i < labels.length; i++) {
      var categoryElement = $('<div class="issues-category"></div>');
      var titleButton = $('<div class="button"></div>')
          .append($('<a></a>').append(labels[i].name).attr("href", labels[i].html_url))
          .css("background", "#" + labels[i].color);
      categoryElement.append(titleButton);
      for (j = data.length - 1; j >= 0; j--) {
        for (var k = data[j].labels.length - 1; k >= 0; k--) {
          if (data[j].labels[k].name === labels[i].name) {
            // all hail .append()
            // build the issue element
            issueElement = $('<div class="issue"></div>')
                .append($("<span></span>").append(data[j].number))
                .append($("<a></a>").attr("target", "_blank").attr('href', data[j].html_url).append(data[j].title))
                .append($("<p>Opened by </p>").append($("<a></a>").append(data[j].user.login).attr("href", data[j].user.html_url).attr('target', '_blank')))
                .append($('<div class="right-coms"></div>')
                  .append($("<a class='comments'></a>")
                    .attr("href", data[j].html_url)
                    .attr('target', '_blank')
                    .append($("<i class='fa fa-comment'></i>"))
                    .append(data[j].comments))
                );
            categoryElement.append(issueElement);
          }
        }
      }
      mainWrapper.append(categoryElement);
    }
  });
});
$(document).ready(function() {
  $(document).on("scroll", onScroll);
});
// Stop ignoring
function onScroll() {
  var scrollPos = $(document).scrollTop();
  $('a.menu-item').each(function() {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (typeof(refElement.position()) === 'undefined') {
      refElement = $("#projects");
    }
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('a.menu-item').removeClass("active");
      currLink.addClass("active");
    } else {
      currLink.removeClass("active");
    }
  });
}

$(".menu-item").click(function(){
    $("#collapse").removeClass("in");
});

var modalShown = false;

$(".card").click(function() {
    console.log("it was clicked");
    if (!modalShown) {
        $(this).next(".modal").css("display", "block");
        modalShown = true;
    }
});

$(".close").click(function() {
    $(this).parent().css("display", "none");
    modalShown = false;
    // window.opener.location.reload(false);
});

// Import social media widgets
if (document.readyState === "complete") {
  loadSocialMediaWidgets();
} else {
  window.addEventListener('load', loadSocialMediaWidgets);
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
  }(document, "script", "twitter-wjs");
  
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
