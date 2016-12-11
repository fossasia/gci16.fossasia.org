// Add your function at the end. First function is of highest priority.
// Start ignoring JSHintBear, LineLengthBear
var mentors;
$.get('./_data/mentors.yml', function(data) {
  var f = data;
  mentors = jsyaml.load(f);
});
window.initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    scrollwheel: false,
    center: {
      lat: 0,
      lng: 0
    },
    styles: [{
      "elementType": "geometry",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    }, {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#8ec3b9"
      }]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1a3646"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    }, {
      "featureType": "administrative.land_parcel",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#64779e"
      }]
    }, {
      "featureType": "administrative.neighborhood",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#334e87"
      }]
    }, {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#023e58"
      }]
    }, {
      "featureType": "poi",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#283d6a"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#6f9ba5"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#023e58"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#3C7680"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#304a7d"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2c6675"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#255763"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#b0d5ce"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#023e58"
      }]
    }, {
      "featureType": "road.local",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "transit",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    }, {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    }, {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#283d6a"
      }]
    }, {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{
        "color": "#3a4762"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#0e1626"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#4e6d70"
      }]
    }]
  });
  var marker;
  $.each(mentors, function(i, mentor) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(mentor.lat, mentor.lng),
      map: map
    });
    var infowindow = new google.maps.InfoWindow();
    var content = "<div><img class='img-rounded' src='images/mentors/" + mentor.image + "' width='240' height='240'><br/>" + mentor.name + " <br/></div>";
    google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
      return function() {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };
    })(marker, content, infowindow));
  });
};
// Stop ignoring
$(function() {
  $.ajax({
    url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/contributors"
  }).done(function(data) {
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
  });
});

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
$(function() {
  $.ajax({
    url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/issues?state=open"
  }).done(function(data) {
    var index = 0;
    data.forEach(function(issue) {
      if (index > 9) { // show the 10 latest issues
        return false;
      }
      if (issue.hasOwnProperty("pull_request")) {
        return;
      }
      index++;
      var html = "<div class='issue'><span>#" + issue.number + "</span>";
      html += "<a href='" + issue.html_url + "' target='_blank'>" + issue.title + "</a>";
      html += "<p>Opened by</p>";
      html += "<a href='" + issue.user.html_url + "' target='_blank' class='user'>";
      html += issue.user.login + "</a><div class='right-coms'>";
      html += "<a href='" + issue.html_url + "' class='comments' target='_blank'>";
      html += "<i class='fa fa-comment'></i>" + issue.comments;
      html += "</a></div></a></div>";
      $(".issues-wrapper").append(html);
    });
  });
});
$(document).ready(function() {
  $(document).on("scroll", onScroll);
});

function onScroll() {
  var scrollPos = $(document).scrollTop();
  $('a.menu-item').each(function() {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    console.log("currLink: ");
    console.log(currLink);
    console.log("refElement: ");
    console.log(refElement);
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
