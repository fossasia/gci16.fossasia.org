$(function(){

	$.ajax({
		url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/contributors"
	}).done(function(data){
		data.forEach(function(contributors){
			$("#contributors-list").append("<div><img src="+contributors.avatar_url+"><a href="+contributors.html_url+"><i class='fa fa-github fa-2x gh-icon' aria-hidden='true'></i></a><p>"+contributors.login+"</p></div>");

		});
	});
	
});
