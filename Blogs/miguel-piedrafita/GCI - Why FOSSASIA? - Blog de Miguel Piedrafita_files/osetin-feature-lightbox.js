( function( $ ) {
  "use strict";
  $( function() {

    // APPLY LIGHTBOX CLASS TO ALL IMAGES INSIDE POST CONTENT
    var content_images = $('.single-content-self img[class^="wp-image-"], .single-content-self img[class*=" wp-image-"]');
    if(content_images.length){
      content_images.each(function(){
        if($(this).closest('a').length && !($(this).closest('a').hasClass('osetin-lightbox-trigger-native'))){
          $(this).closest('a').addClass('osetin-lightbox-trigger-native');
        }
      });
    }

    // CLICKING ON "PREVIOUS" BUTTON IN LIGHTBOX TO TRIGGER PREVIOUS PHOTO IN GALLERY
    $('body').on('click', '.os-lb-navigation-prev', function(){
      var current_index = $('.os-lb-thumbnails-w .active').index();
      if(current_index > 0){
        var new_index = current_index - 1;
        $('.os-lb-thumbnail-trigger:eq('+ new_index +')').click();
      }
      return false;
    });


    // CLICKING ON "NEXT" BUTTON IN LIGHTBOX OR ON THE ACTIVE IMAGE TO TRIGGER NEXT PHOTO IN GALLERY
    $('body').on('click', '.os-lb-navigation-next, .os-lb-active-image', function(){
      var current_index = $('.os-lb-thumbnails-w .active').index();
      if((current_index + 1) < $('.os-lb-thumbnail-trigger').length){
        var new_index = current_index + 1;
        $('.os-lb-thumbnail-trigger:eq('+ new_index +')').click();
      }else{
        $('.os-lightbox').fadeOut(500, function(){
          $(this).remove();
        });
      }
      return false;
    });


    // CLICKING ON THUMBNAIL LOGIC IN THE LIGHTBOX
    $('body').on('click', '.os-lb-thumbnail-trigger', function(){
      $('.os-lb-thumbnail-trigger.active').removeClass('active');
      var lightbox_active_img_src = $(this).data('image-src');
      $('.os-lb-active-image').css('background-image', 'url('+ lightbox_active_img_src +')');
      var lightbox_img_caption = $(this).data('lightbox-caption');
      if(typeof lightbox_img_caption !== 'undefined' && lightbox_img_caption != '' && lightbox_img_caption != 'undefined'){
        $('.lightbox-caption').text(lightbox_img_caption).removeClass('hidden');
      }else{
        $('.lightbox-caption').text('').addClass('hidden');
      }

      $(this).addClass('active');
      var this_position_left = $(this).position().left + $(this).width() + 5;
      if((this_position_left > ($('.os-lb-thumbnails-w').width() + $('.os-lb-thumbnails-w').scrollLeft())) || (this_position_left < $('.os-lb-thumbnails-w').scrollLeft())){
        $('.os-lb-thumbnails-w').animate({scrollLeft : $(this).position().left}, 500);
      }
      return false;
    });


    // CLOSE LIGHTBOX BUTTON
    $('body').on('click', '.os-lb-close-btn', function(){
      $('.os-lightbox').fadeOut(500, function(){
        $(this).remove();
      });
    });


    // KEYBOARD CONTROLS FOR LIGHTBOX
    $(document).keyup(function(e) {
      switch(e.which) {
          case 32: // space
            if($('.os-lightbox').length){
              if($('.os-lb-toggle-thumbnails-btn').length){
                $('.os-lb-toggle-thumbnails-btn').click();
              }
            }else{
              return;
            }
          break;
          case 37: // left
          case 38: // up
            if($('.os-lightbox').length){
              if($('.os-lb-navigation-prev').length){
                $('.os-lb-navigation-prev').click();
              }
            }else{
              return;
            }
          break;
          case 39: // right
          case 40: // down
            if($('.os-lightbox').length){
              if($('.os-lb-navigation-next').length){
                $('.os-lb-navigation-next').click();
              }
            }else{
              return;
            }
          break;

          case 27: // esc
            $('.os-lightbox').fadeOut(500, function(){
              $(this).remove();
            });
            $('body').removeClass('reading-mode');
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });



    // TOGGLE THUMBNAILS PANEL ON CLICK
    $('body').on('click', '.os-lb-toggle-thumbnails-btn', function(){
      $('.os-lightbox').toggleClass('hide-thumbnails');
    });


    // ENABLE MOUSE SCROLLING FOR LIGTHBOX NAVIGATION
    var can_i_scroll_lightbox = true;
    $('body').on('mousewheel', '.os-lb-active-image', function(event) {
      if(event.deltaX == 0) return false;
      if(can_i_scroll_lightbox){
        if(event.deltaX > 0){
          $('.os-lb-navigation-next').click();
        }else{
          $('.os-lb-navigation-prev').click();
        }
        can_i_scroll_lightbox = false;
        setTimeout(function(){
          can_i_scroll_lightbox = true;
        }, 800);
      }
    });


    // TRIGGER LIGHTBOX
    $('body').on('click', '.osetin-lightbox-trigger, .gallery .gallery-item a, .osetin-lightbox-trigger-native, .osetin-lightbox-trigger-step-images', function(){
      $('.os-lightbox').remove();
      var thumbnails_captions_arr = [];
      var thumbnails_thumb_src_arr = [];
      var thumbnails_image_src_arr = [];
      var thumbnails_html = '';
      var lightbox_active_img_src;
      var lightbox_img_caption = '';
      var lightbox_navigation_btn_prev;
      var lightbox_navigation_btn_next;
      var hide_thumbnails_btn_html;
      var hide_thumbnails_class;

      if($(this).hasClass('osetin-lightbox-trigger')){
        lightbox_active_img_src = $(this).data('lightbox-img-src');
        lightbox_img_caption = $(this).data('lightbox-caption');
        $('.osetin-lightbox-trigger').each(function(){
          thumbnails_captions_arr.push($(this).data('lightbox-caption'));
          thumbnails_thumb_src_arr.push($(this).data('lightbox-thumb-src'));
          thumbnails_image_src_arr.push($(this).data('lightbox-img-src'));
        });
      }else if($(this).hasClass('osetin-lightbox-trigger-step-images')){
        lightbox_active_img_src = $(this).data('lightbox-img-src');
        lightbox_img_caption = $(this).find('img').prop('alt');
        $('.osetin-lightbox-trigger-step-images').each(function(){
          thumbnails_captions_arr.push($(this).find('img').prop('alt'));
          thumbnails_thumb_src_arr.push($(this).data('lightbox-thumb-src'));
          thumbnails_image_src_arr.push($(this).data('lightbox-img-src'));
        });
      }else{
        lightbox_active_img_src = $(this).prop('href');
        lightbox_img_caption = $(this).find('img').prop('alt');
        $('.gallery .gallery-item a, .osetin-lightbox-trigger-native').each(function(){
          thumbnails_captions_arr.push($(this).find('img').prop('alt'));
          thumbnails_thumb_src_arr.push($(this).find('img').prop('src'));
          thumbnails_image_src_arr.push($(this).prop('href'));
        });
      }
      // thumbnails_thumb_src_arr = _.uniq(thumbnails_thumb_src_arr);
      // thumbnails_image_src_arr = _.uniq(thumbnails_image_src_arr);
      // thumbnails_captions_arr  = _.uniq(thumbnails_captions_arr);
      var active_thumbnails_class = '';
      var i;
      for (i = 0; i < thumbnails_thumb_src_arr.length; i++) {
        if(lightbox_active_img_src == thumbnails_image_src_arr[i]) active_thumbnails_class = 'active';
        else active_thumbnails_class = '';
        thumbnails_html += '<div class="os-lb-thumbnail-trigger '+ active_thumbnails_class +'" data-lightbox-caption="'+thumbnails_captions_arr[i]+'" data-image-src="'+ thumbnails_image_src_arr[i] +'"><div class="thumbnail-item-bg" style="background-image:url('+ thumbnails_thumb_src_arr[i] + '); background-position: center center; background-repeat: no-repeat;"></div><div class="thumbnail-fader"></div></div>';
      }
      if(thumbnails_html != ''){
        thumbnails_html = '<div class="os-lb-thumbnails-w activate-perfect-scrollbar"><div class="os-lb-thumbnails-i">' + thumbnails_html + '</div></div>';
      }
      var close_btn_html = '<div class="os-lb-close-btn"><i class="os-icon os-icon-thin-delete-circle"></i></div>';
      if(thumbnails_thumb_src_arr.length > 1){
        hide_thumbnails_btn_html = '<div class="os-lb-toggle-thumbnails-btn"><i class="os-icon os-icon-thin-hamburger"></i></div>';
        lightbox_navigation_btn_prev = '<div class="os-lb-navigation-link os-lb-navigation-prev"><i class="os-icon os-icon-angle-left"></i></div>';
        lightbox_navigation_btn_next = '<div class="os-lb-navigation-link os-lb-navigation-next"><i class="os-icon os-icon-angle-right"></i></div>';
        hide_thumbnails_class = '';
      }else{
        lightbox_navigation_btn_prev = '';
        lightbox_navigation_btn_next = '';
        hide_thumbnails_btn_html = '';
        hide_thumbnails_class = 'hide-thumbnails';
      }
      var lightbox_loader_html = '<div class="os-lb-loader"></div>';
      if(lightbox_img_caption){
        var lightbox_img_caption_html = '<div class="lightbox-caption">'+lightbox_img_caption+'</div>';
      }else{
        var lightbox_img_caption_html = '<div class="lightbox-caption hidden"></div>';
      }
      var lightbox_active_image_html = '<div class="os-lb-active-image" style="background-image: url('+ lightbox_active_img_src +')">'+lightbox_img_caption_html+'</div>';

      $('<div class="os-lightbox has-thumbnails '+ hide_thumbnails_class +'">' + close_btn_html + lightbox_loader_html + lightbox_active_image_html + '<div class="os-lb-controls">' + lightbox_navigation_btn_prev + hide_thumbnails_btn_html + lightbox_navigation_btn_next  + '</div>' + thumbnails_html +'</div>').hide().appendTo('body').fadeIn(500);
      
      var $thumbnails_i = $('.os-lb-thumbnails-i');

      $thumbnails_i.width(110 * $thumbnails_i.find('.os-lb-thumbnail-trigger').length);

      $thumbnails_i.waitForImages().done(function(){
        var total_thumbnails_width = 0;
        $thumbnails_i.find('.os-lb-thumbnail-trigger .thumbnail-item-bg').each(function(){
          total_thumbnails_width+= $(this).width() + 10;
        });

        $thumbnails_i.width(total_thumbnails_width);
        if(total_thumbnails_width < $('.os-lb-thumbnails-w').width()){
          $('.os-lb-thumbnails-w').addClass('centered-thumbnails');
        }else{
          $('.os-lb-thumbnails-w').removeClass('centered-thumbnails');
        }
      });


      $('.os-lb-thumbnails-w').perfectScrollbar({
        suppressScrollY: true,
        wheelPropagation: true,
        includePadding: true
      });
      return false;
    });
  });
} )( jQuery );