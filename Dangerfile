# -*- mode: ruby -*-
# vi: set ft=ruby :

pr_author = github.pr_author
# Message the user
message "Hi @#{pr_author} thank you for your submission at Fossasia's GCI 2016 website. Please correct any issues above, if any."

# include link unless provided.
markdown ":link: Maintainers: @#{pr_author} did not provide a live link, one can be found at https://#{pr_author}.github.io/gci16.fossasia.org" unless github.pr_body.include? 'http'

# Check if a Pull Request is mergeable and warn if you have merge issues
can_merge = github.pr_json['mergeable']
warn('This Pull Request appears to have merge errors. Please check CONTRIBUTING.md for help solving that.', sticky: false) unless can_merge

# Check for Pull Request description
warn 'Please do not remove the Pull Request template. Please add it back (see `.github/PULL_REQUEST_TEMPLATE.md`)' if github.pr_body.size < 24
warn 'Please be sure to replace the text "Replace this with your change description" with a summary of your change.' if github.pr_body.include?('- Replace this with your change description')
warn 'Please mark all the checkboxes.' if github.pr_body.include? '- [ ]'

# Warn if there is [WIP] in the title
warn 'Pull Request is classified as Work in Progress' if github.pr_title.include? '[WIP]'

# Notify the user if they are trying to modify the index.html and fail
unless github.pr_body.include? '<!-- Safe Edit -->'
  if git.modified_files.include? 'index.html'
    fail "You're modifying the index.html file. If you're trying to add a student/blog/mentor, you're doing it wrong. If you did this intentionally, please contact a mentor, as index.html is a core file."
  end
end

# Warn the user to squash commits
warn "You have more than one commit! Please squash them. If you need help, check CONTRIBUTING.md. Mentor note: If you're going to merge this, use the Github 'Squash and merge' function (check mantainers.md)." if git.commits.size > 1

# Check if the PR uses dos (CRLF line-endings) and fail the build
git.modified_files.each do |file|
  crlf = false
  next if git.deleted_files.include? file
  next if file =~ /.jpg|.png|.gif|.ico/i
  File.open(File.expand_path(file), 'r').readlines.each do |line|
    if line =~ /^.+?\r\n$/u
      crlf = true
      break
    end
  end
  fail "File \"#{file}\" uses DOS line-endings (CRLF -- Carriage Return (`^M` in your diff) followed by a Line Feed), and not Unix line-endings (line-feeds). Please fix this file so it uses unix line-endings (line-feeds)." if crlf
end
