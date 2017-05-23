( function( $ ) {
  "use strict";



  // ------------------------------------

  // HELPER FUNCTIONS TO TEST FOR SPECIFIC DISPLAY SIZE (RESPONSIVE HELPERS)

  // ------------------------------------

  function is_display_type(display_type){
    return ( ($('.display-type').css('content') == display_type) || ($('.display-type').css('content') == '"'+display_type+'"'));
  }
  function not_display_type(display_type){
    return ( ($('.display-type').css('content') != display_type) && ($('.display-type').css('content') != '"'+display_type+'"'));
  }


  function init_scrollbar_for_sidebar(){
    if(($('body').width() <= 991) && $('.perfect-sidebar-container').length && !$('.perfect-sidebar-container').hasClass('ps-container')){
      $('.perfect-sidebar-container').perfectScrollbar({
        includePadding: true,
        suppressScrollX: true,
        wheelPropagation: false,
      });
    }
  }




  // DOCUMENT READY
  $( function() {

    $.fn.sun_infinite_scroll.init_infinite_scroll();

    init_scrollbar_for_sidebar();

    $(window).resize(function(){
      init_scrollbar_for_sidebar();
    })

    $('.mobile-menu-sidebar-toggler, .sidebar-close-btn').on('click', function(){
      if($('body').hasClass('show-mobile-sidebar')){
        $('body').removeClass('show-mobile-sidebar');
        $('.all-fader').fadeOut(300);
      }else{
        $('body').addClass('show-mobile-sidebar');
        $('.all-fader').fadeIn(300);
      }
      return false;
    });

    $('.all-fader').on('click', function(){
      $('body').removeClass('show-mobile-sidebar');
      $('.all-fader').fadeOut(300);
    });

    $('#start-timer-btn').on('click', function(){
      var countdown_minutes = '+' + Math.round($('#timer-minutes').val()) + 'm';
      var countdown_format = 'MS';
      if($('#timer-minutes').val() > 60) countdown_format = 'HMS';
      $(".timer-counter").countdown({
        until : countdown_minutes,
        compact : true,
        format : countdown_format,
        onExpiry : function(){
          try{
            $('#timer-alarm-media')[0].play();
          }
          catch(e){}
        }
      });
      $(this).hide();
      $('.timer-w').addClass('is-counting');
      return false;
    });

    // index gallery navigation
    $('.gallery-image-next').on('click', function(){
      var $item_media = $(this).closest('.archive-item-media');
      var $item_thumbnail = $item_media.find('.archive-item-media-thumbnail');
      var $next_source = $item_media.find('.gallery-image-source.active').next('.gallery-image-source');
      if(!$next_source.length) $next_source = $item_media.find('.gallery-image-source').first();
      $item_media.find('.gallery-image-source').removeClass('active');
      $next_source.addClass('active');
      $item_thumbnail.css('background-image', 'url(' + $next_source.data('gallery-image-url') + ')');
    });
    // index gallery navigation
    $('.gallery-image-previous').on('click', function(){
      var $item_media = $(this).closest('.archive-item-media');
      var $item_thumbnail = $item_media.find('.archive-item-media-thumbnail');
      var $prev_source = $item_media.find('.gallery-image-source.active').prev('.gallery-image-source');
      if(!$prev_source.length) $prev_source = $item_media.find('.gallery-image-source').last();
      $item_media.find('.gallery-image-source').removeClass('active');
      $prev_source.addClass('active');
      $item_thumbnail.css('background-image', 'url(' + $prev_source.data('gallery-image-url') + ')');
    });

    $('#pause-resume-timer-btn').click(function() { 
      var $btn = $(this);
      var pause = $btn.text() === $btn.data('label-pause'); 
      $btn.text(pause ? $btn.data('label-resume') : $btn.data('label-pause')); 
      $('.timer-counter').countdown(pause ? 'pause' : 'resume');
    }); 
    $('#stop-timer-btn').click(function() {
      var $btn = $(this);
      if($('.timer-w').hasClass('is-counting')){
        $('.timer-counter').countdown('pause');
        $('.timer-w').removeClass('is-counting').addClass('counter-stopped');
        $btn.html($btn.data('label-start'));
      }else{
        var countdown_minutes = '+' + Math.round($('#timer-minutes').val()) + 'm';
        $('.timer-counter').countdown('resume');
        $('.timer-counter').countdown('option', {until : countdown_minutes});
        $('.timer-w').addClass('is-counting');
        $btn.html($btn.data('label-stop'));
      }
    }); 

    $('.print-recipe-btn').on('click', function(){
      window.print();
      return false;
    });

    $('.trigger-share-post-lightbox').on('click', function(){
      if($('.full-screen-share-box').length){
        $('.full-screen-share-box').remove();
      }else{
        $('body').append('<div class="full-screen-share-box"><div class="post-share-box">' + $('.post-share-box').html() + '</div></div>');
      }
      return false;
    });

    $('body').on('click', '.full-screen-share-box .psb-close', function(){
      $('.full-screen-share-box').remove();
      return false;
    });


    if($('.os-parallax').length && not_display_type('phone') && not_display_type('tablet')){
      var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

      var $osParallax = $('.os-parallax');
      var bodyHeight = $('body').height();
      var windowHeight = $(window).height();
      var newBodyHeight = 0;
      var parallaxImageProportions = $osParallax.data('height') / $osParallax.data('width');
      var bodyProportions = bodyHeight / $('body').width();
      var imageCoveredHeight = Math.round($('body').width() * parallaxImageProportions);

      var parallaxProportionsToBody = ((bodyHeight - windowHeight) / (imageCoveredHeight - windowHeight)).toFixed(2);

      if(isSafari){
        // if its safari browser - use css transform becuase it works better
        $(window).scroll(function() {
          newBodyHeight = $('body').height();
          if(newBodyHeight != bodyHeight){
            imageCoveredHeight = Math.round($('body').width() * parallaxImageProportions);
            parallaxProportionsToBody = ((newBodyHeight - windowHeight) / (imageCoveredHeight - windowHeight)).toFixed(2);
          }
          var scroll_value = -(Math.round($(document).scrollTop() / parallaxProportionsToBody));
          $osParallax.css({
            'transform': 'translateY('+scroll_value+'px)'
          });
        });
      }else{
        $(window).scroll(function() {
          newBodyHeight = $('body').height();
          if(newBodyHeight != bodyHeight){
            imageCoveredHeight = Math.round($('body').width() * parallaxImageProportions);
            parallaxProportionsToBody = ((newBodyHeight - windowHeight) / (imageCoveredHeight - windowHeight)).toFixed(2);
          }
          var scroll_value = -(Math.round($(document).scrollTop() / parallaxProportionsToBody));
          $osParallax.css({
            'top': scroll_value
          });
        });
      }
    }


    // timed scroll event
    var uniqueCntr = 0;
    $.fn.scrolled = function (waitTime, fn) {
        if (typeof waitTime === "function") {
            fn = waitTime;
            waitTime = 50;
        }
        var tag = "scrollTimer" + uniqueCntr++;
        this.scroll(function () {
            var self = $(this);
            var timer = self.data(tag);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                self.removeData(tag);
                fn.call(self[0]);
            }, waitTime);
            self.data(tag, timer);
        });
    }

    $(window).scrolled(function(){
        if($('.top-menu').length && $('.fixed-header-w').length){
          var offset = $('.top-menu').offset();
          var trigger_point = offset.top + $('.top-menu').outerHeight();
          if($(document).scrollTop() >= trigger_point){
            $('body').addClass('fix-top-menu');
          }else{
            $('body').removeClass('fix-top-menu');
          }
        }
    });

    if(not_display_type('phone') && $('.single-panel-details-i').length && $('.single-panel-details').hasClass('move-on-scroll')){

      // how to use this code
      $(window).scrolled(function() {

        if ($('.single-panel-details-i').data('current-offset')) {
          var currentOffset = $('.single-panel-details-i').data('current-offset');
        }else{
          var currentOffset = 0;
        }

        var sidebarWrapperBottom = $('.single-panel-details').position().top + $('.single-panel-details').outerHeight();
        var sidebarBottom = $('.single-panel-details').position().top + $('.single-panel-details-i').outerHeight() + 100;
        var sidebarTop = $('.single-panel-details').position().top + currentOffset;
        var panelDifference = $('.single-panel-details').height() - $('.single-panel-details-i').outerHeight();

        var screenBottom = $(document).scrollTop() + $(window).outerHeight();
        var screenTop = $(document).scrollTop();
        var emptyGap = 0;
        var sidebar_offset = 0;
        if($(window).height() > $('.single-panel-details-i').height()){
          emptyGap = $(window).height() - $('.single-panel-details-i').height() - 100;
        }

        if((screenBottom > (sidebarBottom + currentOffset))){
          if(screenBottom > sidebarWrapperBottom){
            if(emptyGap > 0){
              emptyGap = emptyGap - (screenBottom - sidebarWrapperBottom);
              if(emptyGap < 0) emptyGap = 0;
            }
            sidebar_offset = panelDifference - emptyGap;
            if(sidebar_offset < 0) sidebar_offset = 0;
          }else{
            sidebar_offset = screenBottom - sidebarBottom - emptyGap;
          }


          $('.single-panel-details-i').css({
            '-webkit-transform' : 'translateY(' + sidebar_offset + 'px)',
            '-moz-transform'    : 'translateY(' + sidebar_offset + 'px)',
            '-ms-transform'     : 'translateY(' + sidebar_offset + 'px)',
            '-o-transform'      : 'translateY(' + sidebar_offset + 'px)',
            'transform'         : 'translateY(' + sidebar_offset + 'px)'
          });
          $('.single-panel-details-i').data('current-offset', sidebar_offset);
        }else if(screenTop < sidebarTop){

          sidebar_offset = screenTop - $('.single-panel-details').position().top;
          if(sidebar_offset < 0) sidebar_offset = 0;
          $('.single-panel-details-i').css({
            '-webkit-transform' : 'translateY(' + sidebar_offset + 'px)',
            '-moz-transform'    : 'translateY(' + sidebar_offset + 'px)',
            '-ms-transform'     : 'translateY(' + sidebar_offset + 'px)',
            '-o-transform'      : 'translateY(' + sidebar_offset + 'px)',
            'transform'         : 'translateY(' + sidebar_offset + 'px)'
          });
          $('.single-panel-details-i').data('current-offset', sidebar_offset);
        }


        // if($(window).height() > $('.single-panel-details-i').height()){
        //   var sidebar_offset = $(document).scrollTop() - $('.single-panel-details').position().top;
        // }else{
        //   var sidebar_offset = ($(document).scrollTop() + $(window).height()) - ($('.single-panel-details').position().top + $('.single-panel-details-i').height() + 50);
        // }
        // if(sidebar_offset < 0) sidebar_offset = 0;
        // if(sidebar_offset > ($('.single-panel-details').height() - $('.single-panel-details-i').height())) sidebar_offset = $('.single-panel-details').height() - $('.single-panel-details-i').height();
        // $('.single-panel-details-i').css({
        //   '-webkit-transform' : 'translateY(' + sidebar_offset + 'px)',
        //   '-moz-transform'    : 'translateY(' + sidebar_offset + 'px)',
        //   '-ms-transform'     : 'translateY(' + sidebar_offset + 'px)',
        //   '-o-transform'      : 'translateY(' + sidebar_offset + 'px)',
        //   'transform'         : 'translateY(' + sidebar_offset + 'px)'
        // });
      });
      
    }

    // INGREDIENTS CHECKMARK LOGIC
    $('.ingredients-table tr .ingredient-action').on('click', function(){
      var $tr = $(this).closest('tr');
      if($tr.hasClass('ingredient-off')){
        $tr.removeClass('ingredient-off');
        $tr.find('i.os-icon').addClass('os-icon-circle-o').removeClass('os-icon-check');
      }else{
        $tr.addClass('ingredient-off');
        $tr.find('i.os-icon').addClass('os-icon-check').removeClass('os-icon-circle-o');
      }
    });

    $('body').on('click', '.single-step-number-i', function(){
      var $step = $(this).closest('.single-step');
      if($step.hasClass('step-off')){
        $step.removeClass('step-off');
        $(this).find('.os-icon').removeClass('os-icon-check').addClass('os-icon-circle-o');
      }else{
        $step.addClass('step-off');
        $(this).find('.os-icon').removeClass('os-icon-circle-o').addClass('os-icon-check');
      }
      return false;
    });



    /// ------------------
    /// COOKING MODE
    /// ------------------

    $('body').on('click', '.cooking-mode-toggler', function(){
      if($('.cooking-mode-w').length){
        $('.single-content').html($('.cooking-mode-i').html());
        $('.cooking-mode-w').fadeOut('slow', function(){ $('.cooking-mode-w').remove(); });
      }else{
        var recipe_content = $('.single-content').html();
        $('body').append('<div class="cooking-mode-w"><div class="cooking-mode-i">' + recipe_content + '</div></div>');
        $('.cooking-mode-w').fadeIn('slow', function(){ $('.single-content').html(''); });
      }
      return false;
    });


    /// ------------------
    /// BOOKMARKS CLOSE BUTTON
    /// ------------------
    
    $('.single-recipe-bookmark-box .close-btn').on('click', function(){
      $('.single-recipe-bookmark-box .userpro-bm').slideToggle();
      return false;
    });

    /// ------------------
    /// NUTRITIONS CLOSE BUTTON
    /// ------------------
    
    $('.single-nutritions .close-btn').on('click', function(){
      $('.single-nutritions .single-nutritions-list').slideToggle();
      return false;
    });



    /// ------------------
    /// INGREDIENTS CLOSE BUTTON
    /// ------------------

    $('.single-ingredients .close-btn').on('click', function(){
      $('.single-ingredients table').fadeToggle();
      return false;
    });

    $('.read-comments-link').on('click', function(){
      $('.comment-list').toggle();
      return false;
    });

    $('.search-trigger, .mobile-menu-search-toggler').on('click', function(){
      $('body').addClass('active-search-form');
      $('.main-search-form-overlay').fadeIn(300);
      $('.main-search-form .search-field').focus();
      return false;
    });

    $('.main-search-form-overlay').on('click', function(){
      $('body').removeClass('active-search-form');
      $('.main-search-form-overlay').fadeOut(300);
    });



    /// ------------------
    /// mobile menu activator
    /// ------------------
    $('.mobile-menu-toggler').on('click', function(){
      $('.mobile-header-menu-w').slideToggle(400);
    });


    $(document).keyup(function(e) {
      if (e.keyCode == 27) { 
        $('body').removeClass('active-search-form');
        $('.main-search-form-overlay').fadeOut(300);
      }
    });


    if($('.masonry-grid .archive-posts').length){
      var gridLayoutMode = $('.masonry-grid').data('layout-mode');
      var $os_masonry_grid = $('.masonry-grid .archive-posts').isotope({
        // percentPosition: true,
        itemSelector: '.archive-item',
        layoutMode: gridLayoutMode,
        sortAscending: false,
        transitionDuration: '0.5s',
        getSortData: {
          views: '[data-total-views] parseInt',
          likes: '[data-total-likes] parseInt',
        },
        masonry: {
          // gutter: 20,
          // isFitWidth: true,
        }
      });
      $('.index-sort-options').on( 'click', 'button', function() {
        if($(this).hasClass('active')){
          $('.index-sort-options button').removeClass('inactive');
          $(this).removeClass('active');
          $os_masonry_grid.isotope({ sortBy : 'original-order', sortAscending: true });
          $('.masonry-grid .archive-posts').removeClass('sorting-now');
        }else{
          $('.index-sort-options button').removeClass('active').addClass('inactive');
          $(this).removeClass('inactive').addClass('active');
          var sortValue = $(this).data('sort-value');
          $os_masonry_grid.isotope({ sortBy: sortValue, sortAscending: false });
          $('.masonry-grid .archive-posts').addClass('sorting-now');
        }
        return false;
      });


      $('.index-filter-categories').on( 'click', 'button', function() {
        var format_filter = '';
        if($('.index-filter-format.active').length){
          format_filter = '.format-' + $('.index-filter-format.active').data('filter-value');
        }
        if($(this).hasClass('active')){
          $(this).removeClass('active');
          $('.index-filter-categories button').removeClass('inactive');
          var filter_string = '*';
          if(format_filter != ''){
            filter_string = format_filter;
          }
          $os_masonry_grid.isotope({ filter : filter_string });
          if(filter_string == '*'){
            $('.masonry-grid .archive-posts').removeClass('filtering-now');
            $('.index-clear-filter-w').addClass('inactive');
          }
        }else{
          $('.index-filter-categories button').removeClass('active').addClass('inactive');
          $(this).removeClass('inactive').addClass('active');
          var filterValue = $(this).data('filter-value');
          $os_masonry_grid.isotope({ filter : '.' + filterValue + format_filter });
          $('.masonry-grid .archive-posts').addClass('filtering-now');
          $('.index-clear-filter-w').removeClass('inactive');
        }
        return false;
      });


      $('.index-filter-formats').on( 'click', '.index-filter-format', function() {
        var category_filter = '';
        if($('.index-filter-categories button.active').length){
          category_filter = '.' + $('.index-filter-categories button.active').data('filter-value');
        }
        if($(this).hasClass('active')){
          $('.index-filter-formats .index-filter-format').removeClass('inactive');
          $(this).removeClass('active');
          var filter_string = '*';
          if(category_filter != ''){
            filter_string = category_filter;
          }
          $os_masonry_grid.isotope({ filter : filter_string });
          if(filter_string == '*'){
            $('.masonry-grid .archive-posts').removeClass('filtering-now');
            $('.index-clear-filter-w').addClass('inactive');
          }
        }else{
          $('.index-filter-formats .index-filter-format').removeClass('active').addClass('inactive');
          $(this).removeClass('inactive').addClass('active');
          var filterValue = $(this).data('filter-value');
          $os_masonry_grid.isotope({ filter : '.' + 'format-' + filterValue + category_filter });
          $('.masonry-grid .archive-posts').addClass('filtering-now');
          $('.index-clear-filter-w').removeClass('inactive');
        }
        return false;
      });



      $('.index-clear-filter-btn').on( 'click', function() {
        $os_masonry_grid.isotope({ filter : '*' });
        $('.index-filter-categories button').removeClass('inactive').removeClass('active');
        $('.index-filter-formats .index-filter-format').removeClass('inactive').removeClass('active');
        $('.masonry-grid .archive-posts').removeClass('filtering-now');
        $('.index-clear-filter-w').addClass('inactive');
        return false;
      });
    }
    

    // CONNECTED POSTS GALLERY
    var $connected_posts = $('.connected-posts-i');
    if ($connected_posts.length) {
      $connected_posts.owlCarousel({
        autoWidth:true,
        loop: false,
        nav: $connected_posts.find('.connected-post-w').length > 4 ? true : false,
        dots: false,
        navText : ['<i class="os-icon os-icon-angle-left"></i>', '<i class="os-icon os-icon-angle-right"></i>']
      });
    }

    // REGULAR POST GALLERY
    var $post_gallery = $(".single-post-gallery-images-i");
    if ($post_gallery.length) {
      $post_gallery.owlCarousel({
        items: 6,
        loop: false,
        nav: $post_gallery.find('.gallery-image-source').length > 6 ? true : false,
        dots: false,
        navText : ['<i class="os-icon os-icon-angle-left"></i>', '<i class="os-icon os-icon-angle-right"></i>']
      });
    }
    $('.single-post-gallery-images .gallery-image-source').on('click', function(){
      var image_id = $(this).data('image-id');
      $('.single-main-media-image-w.active').removeClass('active');
      $('#'+image_id).addClass('active');
      return false;
    });


    // FEATURED POSTS
    var $featured_owl = $('.featured-posts-owl-slider');
    if ($featured_owl.length) {
      $featured_owl.owlCarousel({
        loop:true,
        autoWidth:true,
      });

      // Go to the next item
      $('.featured-posts-fade-left').on('click', function() {
          $featured_owl.trigger('prev.owl.carousel');
      });
      // Go to the previous item
      $('.featured-posts-fade-right').on('click', function() {
          $featured_owl.trigger('next.owl.carousel');
      });
    }




    // RELATED POSTS
    var $related_owl = $('ul.single-related-posts');
    if ($related_owl.length) {
      $related_owl.owlCarousel({
        loop: false,
        items: 1
      });
      // Go to the next item
      $('.single-related-posts-fade-left').on('click', function() {
          $related_owl.trigger('prev.owl.carousel');
      });
      // Go to the previous item
      $('.single-related-posts-fade-right').on('click', function() {
          $related_owl.trigger('next.owl.carousel');
      });
    }


    // FOOTER POPULAR POSTS
    var $footer_popular_owl = $('.pre-footer.stacked-widgets .tptn_posts_widget ul');
    if ($footer_popular_owl.length) {
      $footer_popular_owl.owlCarousel({
        loop:false,
        autoWidth:true,
      });
    }



    // Tooltip

    $('.tooltip-trigger').on({
      mouseenter: function(){
        var tooltip_header = $(this).data('tooltip-header');
        $(this).append('<div class="tooltip-box"><div class="tooltip-box-header">'+ tooltip_header +'</div></div>');
      },
      mouseleave: function(){
        $(this).find('.tooltip-box').remove();
      }
    });


    // --------------------------------------------

    // ACTIVATE TOP MENU

    // --------------------------------------------

    // MAIN TOP MENU HOVER DELAY LOGIC
    var menu_timer;
    $('.menu-activated-on-hover > ul > li.menu-item-has-children').mouseenter(function(){
      var $elem = $(this);
      clearTimeout(menu_timer);
      $elem.closest('ul').addClass('has-active').find('> li').removeClass('active');
      $elem.addClass('active');
    });
    $('.menu-activated-on-hover > ul > li.menu-item-has-children').mouseleave(function(){
      var $elem = $(this);
      menu_timer = setTimeout(function(){
        $elem.removeClass('active').closest('ul').removeClass('has-active');

      }, 200);
    });

    // SUB MENU HOVER DELAY LOGIC
    var sub_menu_timer;
    $('.menu-activated-on-hover > ul > li.menu-item-has-children > ul > li.menu-item-has-children').mouseenter(function(){
      var $elem = $(this);
      clearTimeout(sub_menu_timer);
      $elem.closest('ul').addClass('has-active').find('> li').removeClass('active');
      $elem.addClass('active');
      if($elem.length){
        var sub_menu_right_offset = $elem.offset().left + ($elem.outerWidth() * 2);
        if(sub_menu_right_offset >= $('body').width()){
          $elem.addClass('active-left');
        }
      }
    });
    $('.menu-activated-on-hover > ul > li.menu-item-has-children > ul > li.menu-item-has-children').mouseleave(function(){
      var $elem = $(this);
      sub_menu_timer = setTimeout(function(){
        $elem.removeClass('active').removeClass('active-left').closest('ul').removeClass('has-active');

      }, 200);
    });


    $('.menu-activated-on-click li.menu-item-has-children > a').on('click', function(event){
      var $elem = $(this).closest('li');
      $elem.toggleClass('active');
      return false;
    });

    // $('.top-menu .sub-menu li.menu-item-has-children, .fixed-top-menu-w .sub-menu li.menu-item-has-children').on('mouseenter', function(event){
    //   var $elem = $(this).closest('li');
    //   $elem.addClass('active');
    //   return false;
    // });
    // $('.top-menu .sub-menu li.menu-item-has-children, .fixed-top-menu-w .sub-menu li.menu-item-has-children').on('mouseleave', function(event){
    //   var $elem = $(this).closest('li');
    //   $elem.removeClass('active');
    //   return false;
    // });


    // SHARE POST LINK
    $('.post-control-share, .single-panel .psb-close').on('click', function(){
      $('.post-share-box').slideToggle(500);
      return false;
    });

    // select all text on click when trying to share a url
    $('.psb-url-input').on('click', function(){
      $(this).select();
    });


  } );


} )( jQuery );
