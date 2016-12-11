var interval_id = null;
var stuff;

function interval() {
    if (interval_id !== null){
        clearInterval(interval_id);
        interval_id = window.setInterval(nextTweet, 6600); //6.6 secs
    } else{
        interval_id = window.setInterval(nextTweet, 6600); //6.6 secs
    }
}

function datafetcher() {
    loklakFetcher.getTweets({}, datahandler);
}

function datahandler(raw) {
    stuff = raw;   // Makes the data available globally.
    parser(stuff);
    interval();
}

var tweetNum = 0;

function parseFunc(){
    parser(stuff);
}

function nextTweet() {
    tweetNum += 1;
    var tweetsEl = document.getElementById('tweets');
    //go back to the first tweet if it's greater than the amount of tweets available
    if(tweetNum === tweetsEl.dataset.count) {
        tweetNum = 0;
    }
    interval();
    window.setTimeout(parseFunc, 560);
}

function lastTweet() {
    if (tweetNum > 0) {
        tweetNum -= 1;
        interval();
        window.setTimeout(parseFunc, 560);
    }
}

function parser(data) {
    var parsed = "";
    var tweet = data.statuses[tweetNum].text;
    var words = tweet.split(" ");
    var loklakLinkCount = 0;
    for (var word in words) {
        if (words[word].startsWith("@")) {
            parsed += "<a href='https://twitter.com/" + words[word].slice(1) + "' target='_blank'>" + words[word] + "</a> ";
        } else if (words[word].startsWith("#")) {
            parsed += "<a href='https://twitter.com/hashtag/" + words[word].slice(1) + "' target='_blank'>" + words[word] + "</a> ";
        } else if (words[word].startsWith("http")) {
            if (words[word].startsWith("http://loklak")) {
                parsed += "<a href='" + data.statuses[tweetNum].links[loklakLinkCount] + "' target='_blank'>" + data.statuses[tweetNum].links[loklakLinkCount] + "</a> ";
                loklakLinkCount += 1;
            } else {
                parsed += "<a href='" + words[word] + "' target='_blank' style='word-break:break-all'>" + words[word] + "</a> ";
            }
        } else {
            parsed += words[word] + " ";
        }
    }
    document.getElementById("tweet").innerHTML = parsed;

    var user = data.statuses[tweetNum].user;
    var tweetDate = new Date(data.statuses[tweetNum].created_at);
    document.getElementById("tweet-info").innerHTML = "Posted by <a href='https://twitter.com/" + user.screen_name + "'><b>" + user.name + "</b></a>, <a href='" + data.statuses[tweetNum].link + "'><i>" + tweetDate.toUTCString() + "</i></a>";
}

datafetcher();
