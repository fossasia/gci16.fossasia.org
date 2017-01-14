( function( $ ) {
  "use strict";
  $( function() {
    if($('.recipe-review-form-w').length){
      var post_id = $('.recipe-review-form-w').data('post-id');
      $('.recipe-review-form-w .acf-field[data-name="recipe"] input[type="hidden"]').val(post_id);
      $('.recipe-review-form-w .acf-field[data-name="rating"] select').barrating({
        theme: 'fontawesome-stars'
      });
    }
    if($('.review-rating-select').length){
      $('.review-rating-select').barrating({
        theme: 'fontawesome-stars',
        readonly: true
      });
    }
  });

} )( jQuery );
