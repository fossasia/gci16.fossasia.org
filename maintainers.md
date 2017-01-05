# Maintainers

You can view a [team of maintainers for repository](https://github.com/orgs/fossasia/teams/gci16-maintainers).

## Responsibilities of Maintainers

- Do not frustrate contributors: Find out what they need, help them help themselves.
- Guide new contributors. They usually do not comply to the rules and forcing them onto them can be frustrating.
- Be empathic: Better a bad PR with follow-up PRs than a closed PR and a rejected person.
- Merge pull-requests.
- Make sure people understand that you can not accept their GCI task.

## Not a responsibilty of a maintainer

- review pull-requests: Anyone can do this, it does not need a maintainer.
- reject pull-requests:
  - Just do not merge them if you do not like them.
  - If they get old, they are closed.
  - Merge them and revert them to make the requester to a contributor in the future.

## Abilities of Maintainers

- Close old pull-requests, see [CONTRIBUTING.md](CONTRIBUTING.md)
- Remove merged branches.
- Maintainers can merge their own pull-requests only if they waited for one day.

## Notes for Mantainers

- If a PR edits index.html, it will fail for security. To remove that error, add `<!-- Safe Edit -->` somewhere in the PR body. See [#349](https://github.com/fossasia/gci16.fossasia.org/issues/349) for more info.
- If you want to merge a PR but the commits aren't squashed, please use Github squash and merge function rather than merging without squashing. Check [#402](https://github.com/fossasia/gci16.fossasia.org/issues/402) for more info.
- If Travis is failing, check ***WHY*** -- if for example jekyll reports a syntax error and won't build, ***do not*** merge it. There are few (if any) circumstances where a failing Travis build should be merged.
- After the PR is merged, update or close the refered issue.

## Further Reading

[Optimistic Merging](http://hintjens.com/blog:106)
