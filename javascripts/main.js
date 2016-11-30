console.log('This would be the main JS file.');

(function() {
	$.ajax({
		method: 'GET',
		url: 'https://api.github.com/repos/fossasia/gci16.fossasia.org/contributors'
	}).done(function(response) {
		const $ul = $('#contributors-section ul');

		$.each(response, function(index, contributor) {
			$ul.append("\
				<li>\
					<a target='_blank' href='https://github.com/" + contributor.login + "'>\
						<img src='" + contributor.avatar_url + "' class='profile'>\
						<div class='content'>\
							<div class='name'>" + contributor.login + "</div>\
							<div class='commit-count'>" + contributor.contributions + " commits </div>\
						</div>\
					</a>\
				</li>"
			);
		});
	});
 })();
