var getContributors = function(page) {
$.ajax({
  url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/contributors?page="+page
}).done(function(data) {
  if (data.length === 0) {
    return;
  }

  var whom = [];
  for(var i =0; i<data.length; i++){
      whom.push(data[i].login);
      }
var j = 0;
setInterval(function() {
  $('#name').fadeOut(function() {
    $(this).html(whom[j = (j + 1)]).fadeIn();
  });
}, 6000);

  getContributors(page+1);
});
};

$(getContributors(1));
