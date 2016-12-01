$.ajax({
	url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/contributors"
}).done(function(data){
	data.forEach(function(contributors){
		$("#contributors-list").append("<div><img src="+contributors.avatar_url+"><a href="+contributors.html_url+"><i class='fa fa-github fa-2x gh-icon' aria-hidden='true'></i></a><p>"+contributors.login+"</p></div>");

	});
});


$(document).ready(function () {
  $(document).on("scroll", scrolling);

  $('nav a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $('nav a').each(function () {
      $(this).removeClass('active');
    })
    $(this).addClass('active');

    var target = this.hash;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top+2
    }, 500, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", scrolling);
    });
  });
});

function scrolling(event){
  var scrollPosition = $(document).scrollTop();
  $('nav a').each(function () {
    var currentLink = $(this);
    var refElement = $(currentLink.attr("href"));
    if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
      $('nav a').removeClass("active");
      currentLink.addClass("active");
    }
    else{
      currentLink.removeClass("active");
    }
  });
}
