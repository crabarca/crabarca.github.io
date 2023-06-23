---
title: "Manual GH Action Workflow Approval"
date: 2023-06-12T19:05:07+02:00
draft: false
summary: Two different approaches to manually approve a GitHub Action Workflow
authors: ["Cristobal Abarca"]
show_reading_time: true
---
## How to manually approve GitHub Action workflows?

Disclaimer: Before being attacked by the fully-automated CI/CD crew I would like to acknowledge your intentions, but sometimes it's needed to have human eyes verifying pipeline actions.

Recently we, with my colleague [Belal](https://www.linkedin.com/in/belal-mohamed-31114915/), were faced with the task to implement a mechanism to manually approve a GH Action pipeline job. Specifically, we needed to humanly review the plan created by Terraform before applying it and changing the resources in Azure. After some googling, we found 2 viable options:

### 1.Use the environments built-in protection rules

If you’re using the [protected environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#deployment-protection-rules) feature of GH Action then whenever you reference the environment in your workflow like:

```yaml
environment: $ENVIRONMENT
```

the protection rule is going to queue the workflow execution and pause it till it get's approved by one of the required members.

**Pros**: built-in feature, easy to approve jobs, easy to implement

**Cons**: if you have secrets defined across your environment that are needed for other steps before your actual manual approve it’s not possible to use this feature without blocking the whole workflow for approval

### 2.Use the 3rd party extension Manual Workflow Approval

Really easy to use, simply add an extra step before the step you need manual approval:

```yaml
steps:
  - uses: trstringer/manual-approval@v1
    with:
      secret: ${{ github.TOKEN }}
      approvers: user1,user2,org-team1
      minimum-approvals: 1
      issue-title: "Deploying v1.3.5 to prod from staging"
      issue-body: "Please approve or deny the deployment of version v1.3.5."
      exclude-workflow-initiator-as-approver: false
      additional-approved-words: ''
      additional-denied-words: ''

  - name: after manual approval step
    run: # some critical code execution
```

This will create an issue on your repository to which you can comment: lgtm, approve, approved, yes or  deny, denied, no  and after a few seconds the Action will pick it up where it paused.

**Pros**: really easy to use, not environment dependant

**Cons**: need to audit another 3rd party extension

One big possible concern with this solution is that the action works more or less like the following:

```python
while timeoutTimeIsNotYetReached:
  response = getApprovedOrCanceledCommentInIssue(GithubClient)
  if response == 'approved'
     exit(0)
  else if response == 'cancel'
    exit(1)
  else:
    continue
```

So, the runners will be kept allocated till an approval, cancel or timeout is detected. Always analyse your use-case carefully!

Disclaimer: This is a experimental series of short blog posts aimed to be in the 2-3 minutes reading range covering cloud, software or miscellaneous topics.
