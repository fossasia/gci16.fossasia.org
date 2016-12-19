var i = 0;

var getContributors = function(page) {
$.ajax({
  url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/contributors?page="+page
}).done(function(data) {
  if (data.length === 0) {
    return;
  }
  data.forEach(function(contributors) {
    // Ignore LineLengthBear
  //for(var i =0; i<data.length; i++){
    setInterval(function() {
      $('#name').fadeOut(function() {
        $(this).html(data[i = (i + 1)].login).fadeIn();
      });
    }, 3000);

      //}

  });
  getContributors(page+1);
});
};

$(getContributors(1));
