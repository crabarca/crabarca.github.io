
---
title: "Gpt aided dev"
date:
draft: true
mermaid: false
show_reading_time: true
---

Today I’m working on updating a CICD 
pipeline used to build some artifacts on AWS Codebuild (the Github Actions, Gitlab Pipelines, etc of AWS). For some decided reasons, each time the developer do changes, a webhook triggers the build on 3 (soon to be more) different AWS Codebuild pipelines on different accounts. Given the AUTH setup, I started checking those builds manually via console and painstakingly 
