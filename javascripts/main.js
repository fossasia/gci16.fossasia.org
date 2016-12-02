$(function(){
    $.ajax({
        url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/contributors"
    }).done(function(data){
        data.forEach(function(contributors){
            // Ignore LineLengthBear
            var html = "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'><div class='card'>";
            html += "<div class='avatar'>";
            html += "<img src="+contributors.avatar_url+"><div class='contribs'><p>";
            html += contributors.contributions;
            if (contributors.contributions === 1) {
                html += " contribution";
            }
            else {
                html += " contributions";
            }
            html += "</p></div><a href="+contributors.html_url+">";
            html += "<i class='fa fa-github fa-2x gh-icon' aria-hidden='true'></i><span>";
            html += contributors.login+"</span></a></div></div></div>";
            $("#contributors-list").append(html);
        });
    });
});
