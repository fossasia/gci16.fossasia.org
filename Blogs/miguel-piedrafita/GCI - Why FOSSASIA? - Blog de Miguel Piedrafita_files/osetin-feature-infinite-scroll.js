( function( $ ) {
  "use strict";
  // Plugin definition.
  $.fn.sun_infinite_scroll = function( options ) {

      // Extend our default options with those provided.
      // Note that the first argument to extend is an empty
      // object – this is to keep from overriding our "defaults" object.
      var opts = $.extend( {}, $.fn.sun_infinite_scroll.defaults, options );

      // Our plugin implementation code goes here.

  };
  // Plugin defaults – added as a property on our plugin function.
  $.fn.sun_infinite_scroll.defaults = {
      foreground: "red",
      background: "yellow"
  };



  $.fn.sun_infinite_scroll.init_infinite_scroll = function() {
    // Infinite scroll init
    if($('body').hasClass('with-infinite-scroll') || $('body').hasClass('with-infinite-button')){
      $('.hide-for-isotope').hide();
    }
    if($('body').hasClass('with-infinite-scroll') && $('.isotope-next-params').length){
      $('.hide-for-isotope').after('<div class="infinite-scroll-trigger"></div>');
    }
    if(($('body').hasClass('with-infinite-button') || $('body').hasClass('with-infinite-scroll')) && $('.isotope-next-params').length){
      // Infinite button init
      $('.load-more-posts-button-w').on('click', function(){ $.fn.sun_infinite_scroll.load_next_posts(); return false; });
      // infinite scroll init
      if($('body').hasClass('with-infinite-scroll')){
        if($.fn.sun_infinite_scroll.is_in_the_view($('.pagination-infinite_scroll'))){
          $.fn.sun_infinite_scroll.load_next_posts();
        }
        $(window).scroll($.debounce( 50, function(){ 
          if($.fn.sun_infinite_scroll.is_in_the_view($('.pagination-infinite_scroll'))){
            $.fn.sun_infinite_scroll.load_next_posts();
          }
        }));
      }
    }
  };

  $.fn.sun_infinite_scroll.load_next_posts = function() {
    if(!$('body').hasClass('infinite-loading-pending')){
      if($('.isotope-next-params').length){
          // if loading animation is not already on a page - add it
          $('.load-more-posts-button-w').addClass('loading-more-posts');
          var from_post_id = $('.posts-index-wrapper').length ? $('.posts-index-wrapper').data("post-index-page-id") : '';
          
          $.ajax({
            type: "POST",
            url: ajaxurl,
            dataType: 'json',
            data: {
              action: 'load_infinite_content',
              next_params: $('.isotope-next-params').data("params"),
              from_post_id: from_post_id,
              template_type: $('.isotope-next-params').data("template-type"),
              double_width_tiles: $('.isotope-next-params').data('double-width-tiles'),
              double_height_tiles: $('.isotope-next-params').data('double-height-tiles'),
            },
            beforeSend: function(){
              $('body').addClass('infinite-loading-pending');
            },
            success: function(response){
              if(response.success){
                if(response.has_posts){
                  // posts found and returned
                  var $new_posts = $(response.new_posts);
                  var $masonry_items = $('.archive-posts');
                  if($masonry_items.length){
                    $masonry_items.append($new_posts);
                    $masonry_items.isotope( 'appended', $new_posts ).find('.archive-item').removeClass('hidden-item');
                    $('body').removeClass('infinite-loading-pending');
                    $('.load-more-posts-button-w').removeClass('loading-more-posts');
                  }
                  if(response.next_params){
                    $('.isotope-next-params').data("params", response.next_params);
                  }else{
                    $('.isotope-next-params, .load-more-posts-button-w, .infinite-scroll-trigger, .pagination-w').remove();
                    if(!$('.no-more-posts').length) $('.archive-posts-w').append('<div class="no-more-posts">' + response.no_more_posts_message + '</div>');
                  }

                }else{
                  // no more posts
                  $('.isotope-next-params, .load-more-posts-button-w, .infinite-scroll-trigger, .pagination-w').remove();
                  $('body').removeClass('infinite-loading-pending');
                  if(!$('.no-more-posts').length) $('.archive-posts-w').append('<div class="no-more-posts">' + response.no_more_posts_message + '</div>');
                  $('.load-more-posts-button-w').removeClass('loading-more-posts');
                }
              }else{
                $('.load-more-posts-button-w').removeClass('loading-more-posts');
                // error handling
              }
            }
          });
      }
    }
  };

  $.fn.sun_infinite_scroll.is_in_the_view = function(elem) {
    if($('body').hasClass('with-infinite-button')){
      // if button was clicked - no need to check if user scrolled into view or not just return true
      return true;
    }else{
      if(elem.length){
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
      }else{
        return false;
      }
    }
  };


} )( jQuery );