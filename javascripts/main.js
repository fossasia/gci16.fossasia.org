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

$(function(){
    $.ajax({
        url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/issues?state=open"
    }).done(function(data){
        var index = 0;
        data.forEach(function(issue){
            if (index > 9) { // show the 10 latest issues
                return false;
            }
            if (issue.hasOwnProperty("pull_request")) {
                return;
            }
            index++;
            var html = "<div class='issue'><span>#"+issue.number+"</span>";
            html += "<a href='"+issue.html_url+"' target='_blank'>"+issue.title+"</a>";
            html += "<p>opened by </p>";
            html += "<a href='"+issue.user.html_url+"' target='_blank' class='user'>";
            html += issue.user.login+"</a><div class='right-coms'>";
            html += "<a href='"+issue.html_url+"' class='comments' target='_blank'>";
            html += "<i class='fa fa-comment'></i>"+issue.comments;
            html += "</a></div></div>";
            $(".issues-wrapper").append(html);
        });
    });
});
