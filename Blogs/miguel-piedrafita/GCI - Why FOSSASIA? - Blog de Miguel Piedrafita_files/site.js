var j = jQuery.noConflict();

Pace.options = {
  //ajax: false,
  restartOnRequestAfter: false
};

Pace.on("start", function(){
  var pu = preloader_ultimate_settings;
 
  if(pu.entrance != "none") j('body').wrapInner('<div id="page-entrance-wrapper"></div>');

  j('body').prepend(pu['spinner']);

  if(pu['text_spinner'] != "" && pu['text_spinner'] != undefined){
    var pt = 0;
    if(pu['type'] == "css"){
      pt = j('.preloader-ultimate-container > *').height()+60; //compute the text padding
    }else{
      pt = parseInt(pu['width'])+60;
    }
    j('.preloader-ultimate-container').append('<div style="padding-top:'+pt+'px" class="center-spin preloader-text">'+pu['text_spinner']+'</div>');
  }
  
  j('body').removeClass('preloader-ultimate');
});


Pace.on("done", function(){

  var pu = preloader_ultimate_settings;
  var delay = (pu.delay < 700 && pu.entrance != "none") ? 700 : pu.delay;

  var exit_duration = { 
    '-webkit-animation-duration':pu.duration,
    '-moz-animation-duration':pu.duration,
    '-ms-animation-duration':pu.duration,
    '-o-animation-duration':pu.duration,
    'animation-duration':pu.duration
  };
  var anim_class = 'animated '+pu.exit_anim;

  setTimeout(function(){
    j('.preloader-ultimate-container').css(exit_duration).addClass(anim_class).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      j(this).remove(); //remove the loading element
      if(pu.entrance == "none"){
        if(j('link[href*="html-overflow.css"]').length != 0) //remove overflow hidden
          j('link[href*="html-overflow.css"]')[0].disabled=true; 
      }
    });
  },delay);

  if(pu.entrance != "none"){

    var entrance_duration = { 
      '-webkit-animation-duration':pu.entrance_du,
      '-moz-animation-duration':pu.entrance_du,
      '-ms-animation-duration':pu.entrance_du,
      '-o-animation-duration':pu.entrance_du,
      'animation-duration':pu.entrance_du
    };

    setTimeout(function(){
      j('#page-entrance-wrapper').css(entrance_duration).addClass('animated '+pu.entrance).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        j(this).children().eq(0).unwrap();

        if(j('link[href*="html-overflow.css"]').length != 0) //remove overflow hidden
          j('link[href*="html-overflow.css"]')[0].disabled=true; 
      });
    },delay);
  }

});