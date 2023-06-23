---
title: "The Terraform Ways"
date: 2023-06-15T18:53:54+02:00
draft: false
mermaid: true
show_reading_time: true
summary: Short story about the life of Terraform inside an organisation
---

A lot of new projects tend to start with a naive team looking to improve the way infrastructure is handled. So after discovering Terraform they start doing something like this:

```mermaid
graph LR;

subgraph Local
1[Developer] --> 2[main.tf] --> 3[State file]
end

subgraph Azure
4[VMs]
end

3 --> 4
```

After 2 days of merge-conflicts because of the local state file tracked in Git…. The team realises that it could be wise to use a remote backend to store the state of the infrastructure

```mermaid
graph LR;

subgraph Local
1[Developer] --> 2[main.tf]
end

subgraph Azure
3[State file] --> 4[VMs]
end

2 --> 3
```

Great! Now everyone on the team works with a single copy of the infrastructure definition. Next day comes the PM and forces the team to use AWS RDS because that’s the way to use databases in the cloud, right?

Sure enough, the team updates the configuration to include the AWS provider and define a “aws_db_instance” resource

```mermaid
graph LR;

subgraph Local
1[Developer] --> 2[main.tf]
end

subgraph Azure
3[State file] --> 4[VMs]
end

subgraph AWS
5[DB Instance]
end

2 --> 3
3 --> 5
```

Cool! Now the team is **multicloud**!. Next week, they realise that to start 🚀 shipping fast 🚀 they need to test the code in a staging environment that should be a clone of the production environment. Sure! said the team lead: “let’s use workspaces!” (`tf workspace new production && tf workspace new staging`)

```mermaid
graph LR;

subgraph Local
1[Developer] --> 2[main.tf]
end

subgraph Azure
3[staging.tfstate] --> 4[Staging VMs]
5[production.tfstate] --> 6[Production VMs]
end

subgraph AWS
10[Staging DB]
11[Production DB]
end

2 --> 3
2 --> 5 

3 --> 10
5 --> 11
```

Cool! Now the team is **multi-environment** and **multi-cloud**. Sadly after 2 weeks, the budget went through the sky 💸, project was shut down and the team was forced to do:

```bash
terraform workspace select staging
terraform destroy -auto-approve

terraform workspace select production
terraform destroy -auto-approve
```

Good bye multi-cloud and multi-environment you were good, but expensive...


Disclaimer: This is a experimental series of short blog posts aimed to be in the 2-3 minutes reading range covering cloud, software or miscellaneous topics.
