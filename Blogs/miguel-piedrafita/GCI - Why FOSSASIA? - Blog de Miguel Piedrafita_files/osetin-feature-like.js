( function( $ ) {
  "use strict";
  $( function() {
    $('.all-wrapper').on('click', '.osetin-vote-trigger', function(){
      var $button = $(this);
      var post_id = $(this).data('post-id');
      var vote_action = $(this).data('vote-action');
      var current_votes_count = $(this).data('votes-count') ? $(this).data('votes-count') : 0;
      var new_votes_count;

      if(vote_action == 'vote'){
        $button.removeClass('osetin-vote-not-voted').addClass('osetin-vote-has-voted');
        new_votes_count = current_votes_count + 1;
        $button.data('votes-count', new_votes_count);
        $button.data('vote-action', 'unvote');
        $button.find('.osetin-vote-count').text(new_votes_count);
        if(new_votes_count > 0) $button.find('.osetin-vote-count').removeClass('hidden');
        $button.find('.osetin-vote-action-label').text($button.data('has-voted-label'));
      }else{
        $button.addClass('osetin-vote-not-voted').removeClass('osetin-vote-has-voted');
        new_votes_count = current_votes_count - 1;
        $button.data('votes-count', new_votes_count);
        $button.data('vote-action', 'vote');
        $button.find('.osetin-vote-count').text(new_votes_count);
        if(new_votes_count === 0) $button.find('.osetin-vote-count').addClass('hidden');
        $button.find('.osetin-vote-action-label').text($button.data('not-voted-label'));
      }
      $.ajax({
          type: 'POST',
          url: ajaxurl,
          data: {
            "action": "sun_vote_process_request",
            "vote_post_id" : post_id,
            "vote_action" : vote_action
          },
          dataType: "json",
          success: function(data){
            if(data.status == 200){
              var count = data.message.count;
              var has_voted = data.message.has_voted;
              if(has_voted){

              }else{

              }
            }
          }
      });
      return false;
    });
  });

} )( jQuery );
