jQuery(document).ready(function($) {
 						
		 $('.efbl_feed_popup').magnificPopup({
			type: 'inline',
          	preloader: false,
			mainClass: 'my-mfp-zoom-in',
			callbacks: {
				  beforeOpen: function() {
					
					 
					var $story_link			= this.st.el.data('storylink'),
						$story_link_text 	= this.st.el.data('linktext'),
						$caption			= this.st.el.data('caption'),
						$image_url			= this.st.el.data('imagelink'),
						$iframe_vid_url 	= this.st.el.data('videolink'),
						$video_url 			= this.st.el.data('video');
					
					if($image_url){
						$('#efblcf_holder .efbl_popup_image').attr('src', $image_url);
						$('#efblcf_holder .efbl_popup_image').css('display', 'block');
					}
					
					if($iframe_vid_url){
						$('#efblcf_holder .efbl_popup_if_video').attr('src', $iframe_vid_url);
						$('#efblcf_holder .efbl_popup_if_video').css({
																	   'display' : 'block',
																	   'width' : '720px',
																	   'height' : '400px'
																	});
						
					}
						
					if($video_url){
						$('#efblcf_holder .efbl_popup_video').attr('src', $video_url);
						$('#efblcf_holder .efbl_popup_video').css('display', 'block');
						setTimeout(function(){
											$('#efblcf_holder .efbl_popup_video')[0].play();
 						}, 500);
						
						 
					}
					
					if($caption){
						$('#efblcf_holder .efbl_popupp_footer').html('<p>'+$caption+' <a class="efbl_popup_readmore" href="'+$story_link+'" target="_blank">'+$story_link_text+'</a></p>');
						$('#efblcf_holder .efbl_popupp_footer').css('display', 'block');
					}
					
 					
				  },
				  beforeClose: function (){
					   	
						//Clear the container for new instance
						$('#efblcf_holder .efbl_popup_image').attr('src', '');
						$('#efblcf_holder .efbl_popup_image').css('display', 'none');
						
						$('#efblcf_holder .efbl_popup_if_video').attr('src', '');
						$('#efblcf_holder .efbl_popup_if_video').css('display', 'none');
						
						$('#efblcf_holder .efbl_popup_video').attr('src', '');
						$('#efblcf_holder .efbl_popup_video').css('display', 'none');
						
						$('#efblcf_holder .efbl_popupp_footer').html('');
						$('#efblcf_holder .efbl_popupp_footer').css('display', 'none');
					  
				  }
			}
						
			
			
 		  });
		 
		 $('.efbl_share_links').click(function(){
 				$(this).next('.efbl_links_container').toggle( "slide" );		   
		 });
		 
		 $('.efbl_info').click(function(){
 				$(this).siblings('.efbl_comments_wraper').toggleClass( "efbl_cwraper_slide" );		   
		 });
		 

});