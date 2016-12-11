# Message the user
message "Hi @#{github.pr_author} thank you for your submission at Fossasia's GCI 2016 website. Please correct any issues above, if any."
# Chech if a PR is mergeable and war if you have merge issues
can_merge = github.pr_json["mergeable"]
warn("This PR appears to have merge errors. Please check Contribuiting.md for help solving that.", sticky: false) unless can_merge
# Check for PR description
warn 'Please provide a summary in the Pull Request description, containing, at less, your live link.' if github.pr_body.length < 5
# Warn if there is [WIP] in the title
warn "PR is classed as Work in Progress" if github.pr_title.include? "[WIP]"
warn 'Please add your live link or a preview screenshot to the PR body.' if !github.pr_body.include? 'http'
# Notify the user if he's trying to add him statically
if !github.pr_body.include? "<!-- Safe Edit -->"
  if git.modified_files.include? "index.html"
    fail "You're modifying the index.html file. If you're trying to add a student/blog/mentor, you're doing it wrong. If you did this intentionally, please contact a mentor, as index.html is a core file."
  end
end
# Warn the user to squash his commits
if git.commits.size > 1
  warn("You have more than one commit! Please squash them. If you need help, check contribuiting file. Mentor note: If you're going to merge this, use the Github 'squash and merge' function (check mantainers.md).")
end
