var smCurrentPane = $($('#sm-pane div')[0]).attr('class');
var twitterAvatarSelector = 'img[data-scribe="element:avatar"]';
var screenName = 'fossasia';
var lastTwitterClickHandler;
enableWheel();

$(document).ready(function() {
    
    // Load Twitter
    var configProfile = {
      "profile": {"screenName": screenName},
      "domId": 'sm-tweets',
      "maxTweets": 20,
      "enableLinks": true, 
      "showUser": true,
      "showTime": true,
      "showImages": true,
      "lang": 'en'
    };
    
    twitterFetcher.fetch(configProfile);
    
    $(window).on('loadedTweets', function() {
        var $tweetsUL = $('#sm-tweets ul');
        
        $tweetsUL.children().each(function(num, child) {
            var inner = $(child).html();
            child.innerHTML = "";
            $(child).append('<div class="wrapper"></div>');
            $($(child).children('div')[0]).append(inner);
            
            var $userlink = $(child).find('a[data-scribe="element:user_link"]');
            var innerImg = $userlink.find('img');
            var innerInfo = $userlink.children('span[title]');
            $userlink.html('');
            $(child).append('<div class="avatar-wrapper"></div>');
            $(child).find('div.avatar-wrapper').append(innerImg);
            $userlink.append('<div></div>');
            $($userlink.children('div')[0]).append(innerInfo);
            
            $(child).find('a.twitter_reply_icon').html('<i class="fa fa-reply"></i>');
            $(child).find('a.twitter_retweet_icon').html('<i class="fa fa-retweet"></i>');
            $(child).find('a.twitter_fav_icon').html('<i class="fa fa-heart"></i>');
            
            if ($(child).find('span[data-scribe="element:screen_name"]').html().indexOf(screenName) == -1) {
                $(child).append('<div class="triangle-wrapper"><div class="retweeted-triangle"><i class="fa fa-retweet fa-inverse"></i></div></div>')
            }
            
            var innerInteract = $(child).find('p.interact');
            var innerTimePosted = $(child).find('p.timePosted');
            $(child).remove('p.interact');
            $(child).remove('p.timePosted');
            
            $(child).children('div.wrapper').append(innerTimePosted);
            $(child).children('div.wrapper').append(innerInteract);
            
            if (num == 0) {
                $(child).addClass('centered');
                animateAvatar('#sm-tweets ul', num, twitterAvatarSelector, 'in');
            }
            else if (num == 1) {
                $(child).addClass('right').addClass('up-next');
                animateAvatar('#sm-tweets ul', num, twitterAvatarSelector, 'out');
            }
            else {
                $(child).addClass('right');
                animateAvatar('#sm-tweets ul', num, twitterAvatarSelector, 'out');
            }
        });
        
        $tweetsUL.append('<li class="right final"><div>Click <a href="twitter.com/' + screenName + '">here</a> to see more tweets from @' + screenName + '.</div></li>');
        
        // Declare Twitter-related events
        declareTwitterUpNextEvents();
    });
    
    // Load Facebook
    // How though?
});

$('#social-media #sm-sidebar li').click(function(event) {
    var $target = $(event.target);
    $target.removeClass('sm-click');
    setTimeout(function() {
        $target.addClass('sm-click');
        
        setTimeout(function() {
            var name = $target.attr('data-sm');
            smScrollTo(name);
            
            smCurrentPane = $target.attr('data-sm');
        }, 250);
    }, 100);
});

$('#social-media .twitter .arrows button').click(function(event) {
    var target;
    var index;
    
    if ($(event.target).hasClass('right')) {
        index = $('#social-media #sm-tweets li.centered').index() + 1;
    }
    else {
        index = $('#social-media #sm-tweets li.centered').index() - 1;
    }
    
    target = $('#social-media #sm-tweets ul').children()[index];
    swipeTwitterCard($(target));
    declareTwitterUpNextEvents();
});

function enableWheel() {
    $('#social-media #sm-pane').on('wheel', function(event) {
        var eo = event.originalEvent;

        if (smCurrentPane == 'twitter') {
            var data = detectWheel(eo, 50);
            
            if (data.dominant == 'right') {
                var index = $('#social-media #sm-tweets li.centered').index() + 1;
                var target = $('#social-media #sm-tweets ul').children()[index];
                swipeTwitterCard($(target));
                $('#social-media #sm-pane').unbind('wheel');
                setTimeout(function() { enableWheel(); }, 1000);
                event.stopPropagation();
                declareTwitterUpNextEvents();
            }
            else if (data.dominant == 'left') {
                var index = $('#social-media #sm-tweets li.centered').index() - 1;
                var target = $('#social-media #sm-tweets ul').children()[index];
                swipeTwitterCard($(target));
                $('#social-media #sm-pane').unbind('wheel');
                setTimeout(function() { enableWheel(); }, 1000);
                event.stopPropagation();
                declareTwitterUpNextEvents();
            }
        }
        
        //if ($(event.target).is('div.panel')) {
            var data2 = detectWheel(eo, 100);
            
            if (data2.dominant == 'down') {
                var x = $($('#sm-pane > ul > li')[$('#sm-pane > ul > li > div.' + smCurrentPane).parent().index() + 1]).children('div').attr('class').split(' ')[0];
                smScrollTo(x);
                $('#social-media #sm-pane').unbind('wheel');
                setTimeout(function() { enableWheel(); }, 1000);
            }
            else if (data2.dominant == 'up') {
                var x = $($('#sm-pane > ul > li')[$('#sm-pane > ul > li > div.' + smCurrentPane).parent().index() - 1]).children('div').attr('class').split(' ')[0];
                smScrollTo(x);
                $('#social-media #sm-pane').unbind('wheel');
                setTimeout(function() { enableWheel(); }, 1000);
            }
        //}
    });
}

function smScrollTo(name) {
    var pos = $('#sm-pane div.' + name).position().top + Math.abs($($('#sm-pane div')[0]).position().top);
    $('#sm-pane').animate({ scrollTop: pos }, 1500, 'easeOutExpo');
    smCurrentPane = name;
}

function detectWheel(event, threshold) {
  var h = "none";
  var v = "none";
  
  if (Math.abs(event.deltaX) > threshold) {
    h = ((event.deltaX > 0) ? "right" : "left");
  }
  
  if (Math.abs(event.deltaY) > threshold) {
    v = ((event.deltaY > 0) ? "down" : "up");
  }
  
  return {
    dominant: ((Math.abs(event.deltaX) > Math.abs(event.deltaY)) ? h : v),
    dominantValue: ((Math.abs(event.deltaX) > Math.abs(event.deltaY)) ? event.deltaX : event.deltaY),
    x: {
      direction: h,
      value: event.deltaX,
      magnitude: Math.abs(event.deltaX)
    },
    y: {
      direction: v,
      value: event.deltaY,
      magnitude: Math.abs(event.deltaY)
    }
  };
}

function animateAvatar(listSelector, num, imgSelector, build) {
    if (build == "in") {
        $($($(listSelector).children()[num]).find(imgSelector)[0])
        .animate({
            width: '50px',
            height: '50px',
            opacity: 0
        }, 1)
        .animate({
            width: '150px',
            height: '150px',
            opacity: 0.5
        }, 300, "easeOutCubic")
        .animate({
            width: '75px',
            height: '75px',
            opacity: 1
        }, 750, "easeOutElastic");
    }
    else if (build == "out") {
        $($($(listSelector).children()[num]).find(imgSelector)[0])
        .animate({
            width: '50px',
            height: '50px',
            opacity: 0
        }, 250, "easeInOutBack")
        .animate({
            width: '75px',
            height: '75px'
        }, 1);
    }
}

function declareTwitterUpNextEvents() {
    lastTwitterClickHandler = 
        $('#social-media #sm-tweets li.up-next a').click(function(event) {
            event.preventDefault();
        });

    $('#social-media #sm-tweets li.up-next').click(function(event) {
        event.stopPropagation();
        
        $target = $(event.target);

        if (!$target.is('li')) {
            $target = $($target.parents('li')[0]);
        }
        
        swipeTwitterCard($target);
        
        declareTwitterUpNextEvents();
    });
}

function swipeTwitterCard($target) {
    if ($target.hasClass('right')) {
        $currentCenter = $('#social-media #sm-tweets li.centered');
        animateAvatar('#sm-tweets ul', $currentCenter.index(), twitterAvatarSelector, "out");
        $currentCenter.removeClass('centered').addClass('left').addClass('up-next');
        $target.removeClass('right').removeClass('up-next').addClass('centered');
        $($target.parent().children()[$target.index() + 1]).addClass('up-next');
        $($target.parent().children()[$target.index() - 2]).removeClass('up-next');
        setTimeout(function() { animateAvatar('#sm-tweets ul', $target.index(), twitterAvatarSelector, "in"); }, 800);
        $('#social-media #sm-tweets li.centered a').unbind('click');
    }
    else if ($target.hasClass('left')) {
        $currentCenter = $('#social-media #sm-tweets li.centered');
        animateAvatar('#sm-tweets ul', $currentCenter.index(), twitterAvatarSelector, "out");
        $currentCenter.removeClass('centered').addClass('right').addClass('up-next').unbind('click', lastTwitterClickHandler);
        $target.removeClass('left').removeClass('up-next').addClass('centered');
        $($target.parent().children()[$target.index() - 1]).addClass('up-next');
        $($target.parent().children()[$target.index() + 2]).removeClass('up-next');
        setTimeout(function() { animateAvatar('#sm-tweets ul', $target.index(), twitterAvatarSelector, "in"); }, 800);
        $('#social-media #sm-tweets li.centered a').unbind('click');
    }
}