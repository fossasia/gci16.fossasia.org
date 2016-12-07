'use strict';

var url = 'https://api.github.com/repos/fossasia/gci16.fossasia.org/issues?state=open';
// var url = 'https://api.github.com/repos/bogaziciswe/b.w.a.t/issues?state=open';

var issues = [];

// Get all the open issues
fetch(url).then(function (response) {
    // Examine the response
    if (response.type === 'opaque') {
        console.log('Received a response, but it\'s opaque so can\'t examine it');
        return;
    } else if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
    } else {
        response.json().then(function (responseJson) {
            document.querySelector('.issues-wrapper').innerHTML = '';
            responseJson.forEach(function (issue, key) {
                issue.labels.forEach(function (object, key) {
                    // Check if the label is called 'feature'
                    if (object.name.toLowerCase() === 'feature') {
                        issues.push(issue);

                        var div = document.createElement('div');

                        div.id = 'issue';
                        div.className += 'issue';
                        // a.href = issue.html_url;

                        div.title = 'Click to view more';

                        // Check if empty
                        if (issue.body === '') {
                            div.innerHTML = '<i>There was no text</i>';
                        } else {
                            div.innerHTML += issue.title;
                        }

                        document.querySelector('.issues-wrapper').appendChild(div);
                    }
                });
            });
        });
    }
}).then(function () {
    // For some strange reason you have to wait ¯\_(ツ)_/¯
    setTimeout(function () {
        if (issues.length < 1) {
            document.querySelector('.issues-wrapper').innerHTML = '<h3>There are no open issues that are labled \'feature\'.</h3>';
        }
    }, 2000);
}).catch(function (err) {
    console.error('An error occurred', err);
});