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
      html += "</p></div><a href=" + contributors.html_url + ">";
      html += "<i class='fa fa-github fa-2x gh-icon' aria-hidden='true'></i><span>";
      html += contributors.login + "</span></a></div></div></div>";
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
