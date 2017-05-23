( function( $ ) {
  "use strict";
  $( function() {

  $(".all-wrapper").on('click', '.user_vote_like', function() {
    if($("#vote_box").data("voting-in-progress") == "yes"){
      return false;
    }
    var post_id = $(this).data("post_id")
    var nonce = $(this).data("nonce")
    $("#user_vote_label").html($('#user_vote_label').data("loading-label"))
    if($("#vote_like_counter").data("vote-status") == "voted" ){
      $("#vote_like_counter").data("vote-status","");
      $("#vote_like_counter").html(parseInt($("#vote_like_counter").html())-1);
    }else{
      if($("#vote_dislike_counter").data("vote-status") == "voted" )
      {
        $("#vote_dislike_counter").data("vote-status","");
        $("#vote_dislike_counter").html(parseInt($("#vote_dislike_counter").html())-1);
      }
      $("#vote_like_counter").data("vote-status", "voted");
      $("#vote_like_counter").html(parseInt($("#vote_like_counter").html())+1);
    }
    $("#vote_box").data("voting-in-progress","yes");
    $.ajax({        
      type : "post",
      dataType : "json",
      url : ajaxurl,
      data : {
        "action": "my_vote_like", 
        "post_id" : post_id,         
        "nonce": nonce
      },
      success: function(data){           
        $('#user_vote_label').html($('#user_vote_label').data("label"))
        if(data.type == "success") 
        {
          if(typeof data.likes !== "undefined")
          {
            $("#vote_like_counter").html(data.likes)
          }
          
          if(typeof data.dislikes !== "undefined")
          {
            $("#vote_dislike_counter").html(data.dislikes)
          }
        }
        else 
        {
           alert("Your vote could not be added")
        }
        $("#vote_box").data("voting-in-progress","no");
      }
    });
    
    return false
  });
 
  $(".all-wrapper").on('click', '.user_vote_dislike', function() 
  {
    if($("#vote_box").data("voting-in-progress") == "yes"){
      return false;
    }
    var post_id = $(this).data("post_id");
    var nonce = $(this).data("nonce");
    $("#user_vote_label").html($('#user_vote_label').data("loading-label"));
    if($("#vote_dislike_counter").data("vote-status") == "voted"){
      $("#vote_dislike_counter").data("vote-status","");
      $("#vote_dislike_counter").html(parseInt($("#vote_dislike_counter").html())-1);
    }else{
      if($("#vote_like_counter").data("vote-status") == "voted" )
      {
        $("#vote_like_counter").data("vote-status","");
        $("#vote_like_counter").html(parseInt($("#vote_like_counter").html())-1);
      }
      $("#vote_dislike_counter").data("vote-status", "voted");
      $("#vote_dislike_counter").html(parseInt($("#vote_dislike_counter").html())+1);
    }
    $("#vote_box").data("voting-in-progress","yes");
    $.ajax({
      type : "post",
      dataType : "json",
      url : ajaxurl,
      data : {
        "action": "my_vote_dislike", 
        "post_id" : post_id, 
        "nonce": nonce
      },
      success: function(data){
        $('#user_vote_label').html($('#user_vote_label').data("label"))
        if(data.type == "success"){
          if(typeof data.likes !== "undefined"){
            $("#vote_like_counter").html(data.likes)
          }
          if(typeof data.dislikes !== "undefined"){
            $("#vote_dislike_counter").html(data.dislikes)
          }
        }
        else {
          alert("Your vote could not be added");
        }
        $("#vote_box").data("voting-in-progress","no");     
      }
    });    
    return false
  });
});

} )( jQuery );