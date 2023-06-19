---
title: "Hugo meta-learnings"
date: 2023-06-16T18:09:08+02:00
draft: false
show_reading_time: true
---
## Things I learned while creating this blog

### CommonMark: The high compatible specification of Markdown

I always suspected about the flavors of markdown, but never took the time to dig deeper on what are the differents types of "markdown" style syntax available. To my surprise, CommonMark is already adopted in the following:

- Discourse
- GitHub
- GitLab
- Reddit
- Qt
- Stack Overflow / Stack Exchange
- Swift

### GitHub Actions `permissions`, `concurrency` and `defaults`

Usually when writing GitHub Actions I was used to define the running shell inside the step where the shell was needed:

```yaml
steps:
  - name: bash exec
    shell: bash
    run: |
      chmod +x ./script.sh
      ./script.sh
```

but it's possible to configure the shell at the root level:

```yaml
# action.yaml
defaults:
  run:
    shell: bash
```
