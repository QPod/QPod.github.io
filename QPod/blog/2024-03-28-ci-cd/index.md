---
slug: 2024-qpod-stack-ci-cd-practices-and-philosophy-en
title: "📝 QPod CI/CD Toolkits and Practices"
authors: [haobibo]
tags: [QPod, docs]
---

In this brief blog, we will introduct the CI/CD philosophy, and our practices.

## Our CI/CD Philosophy

Back to years ago, our team has tried CI/CD tools including but not limited to travis, GitLab runners, etc. Until recently, we adopted GitHub actions as our current choice.

As these tools evolves (or your choice changes), the code CI/CD pipelines, in the form of YAML files or manual configure pipelines, has to be refactored to fit new tools.

Our philosophy is to keep the CI/CD as simple as possible, and de-couple with the CI/CD tools.
As such, it's a nature choice to **put more function implementations in scripts/modules in source code, instead of relying on tools provided functionalities** (e.g.: Github Actions).

Based on this philosophy, we established our CI/CD practice along with correspond toolkits.

## The toolkits and the practices

Here is an example of our toolkits for CI/CD, which include the following parts:

- [tool.sh](https://github.com/QPod/lab-foundation/blob/main/tool.sh): a shell script which include several functions to build code or project.

- [github workflow YAML](https://github.com/QPod/lab-foundation/blob/main/.github/workflows/build-docker.yml): a CI/CD platform specific configuration which use the `tool.sh` above, and use simple linux shell commands to finish most build tasks. As you can see, each job starts with `source ./tool.sh` to use the functions defined in our toolkits.

## Other Choices

As built artifacts changes in developing / testing (stagging) / release (production) stages, we found it's important to manage the artificats in two perspective:

1. Each artifact should be properly versioned and tagged, especially when a testing (stagging) or production environment needs a rollback.

2. The release artifact repo (such as Docker registry) should be a seperated one with the developing / testing (stagging) one(s), in order to better manage the artifiacts for production environment, and use proper resources. In many cases, the production environment requires an aritifact repo that is high-available, and better to be in the same VPC/Zone/Region with the computing resources, or with different push/pull permissions.

As such, it became our choice to put artifacts of developing/testing stage and release/production artifiacts into different repo, at least differnt registry namespaces. In the `tool.sh` file above, you can see we use a variable `DOCKER_IMG_NAMESPACE` to decide which name space the artifact should be pushed into. Furthermore, this variable is decided by the **Git branch name prefix**:

```shell
if [ "${CI_PROJECT_BRANCH}" = "main" ] ; then
    # If on the main branch, docker images namespace will be same as CI_PROJECT_NAME's name space
    export CI_PROJECT_NAMESPACE="$(dirname ${CI_PROJECT_NAME})" ;
else
    # not main branch, docker namespace = {CI_PROJECT_NAME's name space} + "0" + {1st substr before / in CI_PROJECT_SPACE}
    export CI_PROJECT_NAMESPACE="$(dirname ${CI_PROJECT_NAME})0${CI_PROJECT_SPACE}" ;
fi
```

In this way:

- when code is pushed or merged to `main` branch, artifiact repo namespace will be `qpod` in our example.
- when code is pushed to a branch name in the pattern of `dev/*` and a PR is created to merge this branch `dev/*` into `main`, the artifact will be pushed to the namespace `qpod0dev` (the suffix `0dev` can be customized).
- when code is pushed to a branch without a PR into `main`, the code will not be built (pipeline will not be triggerd).
