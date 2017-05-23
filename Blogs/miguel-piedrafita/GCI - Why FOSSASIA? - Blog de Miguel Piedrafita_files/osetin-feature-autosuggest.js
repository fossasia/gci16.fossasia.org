( function( $ ) {
  "use strict";
  $( function() {

    var timeoutId = 0;
    $('.main-search-form .search-field').keyup(function () { 
        $('.main-search-form form').addClass('search-loading');
        clearTimeout(timeoutId); // doesn't matter if it's 0
        timeoutId = setTimeout(osetinGetSearchResults, 500);
        // Note: when passing a function to setTimeout, just pass the function name.
        // If you call the function, like: getFilteredResultCount(), it will execute immediately.
    });

    function osetinGetSearchResults(){

      $.ajax({
          type: 'POST',
          url: ajaxurl,
          data: {
            "action": "sun_autosuggest_process_request",
            "search_query_string" : $('.main-search-form .search-field').val()
          },
          dataType: "json",
          success: function(data){
            $('.main-search-form form').removeClass('search-loading');
            if(data.status == 200){
              $('.autosuggest-results').html(data.message);
            }else{
              $('.autosuggest-results').html('<div class="autosuggest-items-shadow"></div><h3 class="no-results-augosuggest">'+data.message+'</h3>');
            }
          }
      });
    }
  });

} )( jQuery );
