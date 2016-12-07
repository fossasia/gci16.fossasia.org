var url = 'https://api.github.com/repos/fossasia/gci16.fossasia.org/issues?state=open';

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
                        var labels = document.createElement('div');

                        div.id = 'issue';
                        div.className += 'issue';
                        labels.className += 'labels';
                        // a.href = issue.html_url;

                        div.title = 'Click to view more';

                        // Check if empty
                        if (issue.body === '') {
                            div.innerHTML = '<i>There was no text</i>';
                        } else {
                            div.innerHTML += '<b>' + issue.number + '&nbsp;</b>';
                            div.innerHTML += '<a href="' + issue.html_url + '">' + issue.title + '</a>';
                            div.innerHTML += '<i>Updated: ' + issue.updated_at + '</i>';
                        }

                        // Check if issue has a label
                        if (issue.labels.length > 0) {
                            issue.labels.forEach(function (object, key) {
                                labels.innerHTML += '<span class="label">' + object.name + '</span>';
                            });
                        }

                        div.appendChild(labels);
                        document.querySelector('.issues-wrapper').appendChild(div);
                    }
                });
            });
        });
    }

    return response;
}).then(function (response) {
    console.log(response);

    /*if (response.type === 'opaque') {
        console.log('Received a response, but it\'s opaque so can\'t examine it');
        document.querySelector('.issues-wrapper').innerHTML = '<h3>Received a response, but it\'s opaque so can\'t examine it</h3>';
        return;
    } else if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        document.querySelector('.issues-wrapper').innerHTML = '<h3>Looks like there was a problem. Status Code: ' + response.status + '</h3>';
        return;
    } else {
        // For some strange reason you have to wait ¯\_(ツ)_/¯
        setTimeout(function () {
            if (issues.length < 1) {
                document.querySelector('.issues-wrapper').innerHTML = '<h3>There are no open issues that are labled \'feature\'.</h3>';
            }
        }, 2000);
    }*/
}).catch(function (err) {
    console.error('An error occurred', err);
});