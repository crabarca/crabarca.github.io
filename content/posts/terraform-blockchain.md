---
title: "Terraform Blockchain"
date: 2023-06-16T19:00:26+02:00
draft: true
mermaid: false
---

The Terraform blockchain
For sure we’ve found ourselves at a position when you decide to rename a resource in Terraform and when doing terraform apply it tries to delete and re-create such resource because it’s a different one than the one listed in the state. If you have faced this case, you can use moved blocks!

For example:

```hcl
## main.tf
resource "aws_instance" "ridiculous_name" {
  count = 2

  # (resource-type-specific configuration)
}
```

and later on you realised that your project is no longer an MVP so you rename:

```hcl
## main.tf
resource "aws_instance" "serious_name" {
  count = 2

  # (resource-type-specific configuration)
}
```

to avoid re-creating the instance you can instruct Terraform to re-map the resource so the state keeps track of it by adding a moved  block:

```hcl
## main.tf
resource "aws_instance" "serious_name" {
  count = 2

  # (resource-type-specific configuration)
}

moved {
  from = aws_instance.ridiculous_name
  to   = aws_instance.serious_name
}
```

and voila! now your IaC files do look more professional without resource recreation.
Terraform understands from now on that your previous `aws_instance.ridiculous_name[0]` will be mapped to `aws_instance.serious_name[0]`

## TODO: Add a new paragraph with a new moved block and describe how the "blockchain" is formed and what does it implicate

Pd. For those wondering, the count=2 will create 2 instances of the resource

References:

- [moved blocks](https://developer.hashicorp.com/terraform/language/v1.1.x/modules/develop/refactoring)
