( function( $ ) {
  "use strict";
  $( function() {

    var timeoutId = 0;
    $('.trigger-ingredient-search').on('click', function () {
      var $btn = $(this);
      if($(".ingredients-multi-select").val() != null){
        $('.ingredients-search-box-w').addClass('search-in-progress');
        $btn.data('label-default', $btn.text()).text($btn.data('label-loading'));
        osetinGetIngredientsSearchResults();
      }else{
        $('.chosen-choices .search-field input[type="text"]').addClass('animated animation-shake');
      }
      return false;
    });

    function osetinGetIngredientsSearchResults(){

      $.ajax({
          type: 'POST',
          url: ajaxurl,
          data: {
            "action": "sun_search_process_request",
            "search_ingredient_ids" : $(".ingredients-multi-select").val()
          },
          dataType: "json",
          success: function(data){
            $('.ingredients-search-box-w').addClass('compacted');
            var $btn = $('.trigger-ingredient-search');
            $('.ingredients-search-box-w').removeClass('search-in-progress');
            $btn.text($btn.data('label-default'));
            $('.ingredients-search-results-w').html(data.message);
          }
      });
    }
  });

} )( jQuery );
