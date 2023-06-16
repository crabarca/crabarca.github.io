---
title: "The Terraform Ways"
date: 2023-06-16T18:53:54+02:00
draft: true
---

A lot of new projects tend to start with a naive team looking to improve the way infrastructure is handled. So after discovering Terraform they start doing something like this:

TODO: Insert image here!

After 2 days of merge-conflicts because of the local state file tracked in Git…. The team realises that it could be wise to use a remote backend to store the state of the infrastructure

TODO: Insert image here!

Great! Now everyone on the team works with a single copy of the infrastructure definition. Next day comes the PM and forces the team to use AWS RDS because that’s the way to use databases in the cloud, right?

Sure enough, the team updates the configuration to include the AWS provider and define a “aws_db_instance” resource

TODO: Insert image here!

Cool! Now the team is multicloud!. Next week, they realise that to start :rocket: shipping fast :rocket: they need to test the code in a staging environment that should be a clone of the production environment. Sure! Said the team lead: “let’s use workspaces!” (tf workspace new production && tf workspace new staging)

TODO: Insert image here!

Cool! Now the team is multi-environment and multi-cloud. Sadly after 2 weeks, the budget :money_with_wings: went through the sky, project was shut down and the team was forced to do:

```bash
terraform workspace select staging
terraform destroy -auto-approve

terraform workspace select production
terraform destroy -auto-approve
```

Good bye multi-cloud and multi-environment you were good, but expensive :cry:

Disclaimer: This is a experimental series of short blog posts aimed to be in the 2-3 minutes reading range covering cloud, software or miscellaneous topics.
