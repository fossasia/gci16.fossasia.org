// var issueTemplate = '<div class="row"><div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="card"><h3>$TITLE</h3><h5>$BODY</h5><p><a href="$URL">Read More</a></p></div></div></div>';

var issueTemplate = `
<div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
    <div class="issue-card">
        <span class="issue-title">$TITLE</span>
        <span class="issue-body">$BODY</span>
        <span class="issue-link"><a href="$URL">Read More</a></span>
    </div>
</div>
`;

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


    /* ISSUES LIST
       Requirements:
       - Only show open issues with the "feature"
       - sort the list alphabetically
       - include a "read more" link that opens the issue page
     */
    $.ajax({
        url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/issues",
        data: {
            state: "open",
            // labels: "feature"
        }
    }).done(function(response) {
        var finalHTML = "";
        response.forEach(function(issue) {
            var html = issueTemplate
                .replace('$TITLE', issue.title.substring(0, 15) + '...')
                .replace('$BODY', issue.body.length > 0 ? issue.body.substring(0, 200) + '...' : '')
                .replace('$URL', issue.url);
            finalHTML += html;
        });
        if (finalHTML.length > 0) {
            $('#issues-list').html(finalHTML);
        }
    })
});
