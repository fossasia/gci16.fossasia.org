# Message the user
message "Hi @#{github.pr_author} thank you for your submission at Fossasia's GCI 2016 website. Please correct any issues above, if any."
# Chech if a PR is mergeable and war if you have merge issues
can_merge = github.pr_json["mergeable"]
warn("This PR appears to have merge errors. Please check Contribuiting.md for help solving that.", sticky: false) unless can_merge
# Check for PR description
warn 'Please provide a summary in the Pull Request description, containing, at less, your live link.' if github.pr_body.length < 5
# Warn if there is [WIP] in the title
warn "PR is classed as Work in Progress" if github.pr_title.include? "[WIP]"
warn 'Please add your live link to the PR body.' if !github.pr_body.include? 'http'
