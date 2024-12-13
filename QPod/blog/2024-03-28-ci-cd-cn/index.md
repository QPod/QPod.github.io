---
slug: 2024-qpod-stack-ci-cd-practices-and-philosophy-cn
title: "🀄️ QPod Stack的CI/CD的思路、实践、理念"
authors: [haobibo]
tags: [QPod, docs]
---

本文简单介绍了我们进行CI/CD的思路、实践、理念。

## 我们的 CI/CD 理念

过去几年中，我们的团队尝试了包括但不限于 Travis、GitLab 运行器等 CI/CD 工具。直到最近，我们选择了 GitHub Actions 作为当前的选择。

随着这些工具的发展（或团队选择的变化），代码的 CI/CD 流水线，无论是以 YAML 文件的形式还是手动配置的流水线，都需要重构以适应新工具。

我们的理念是尽可能保持 CI/CD 的简单性，并与 CI/CD 工具解耦。

因此，很自然的选择是 **将更多的功能实现放在源代码中的脚本/模块里，而不是依赖于工具提供的功能**（例如：GitHub Actions）。

基于这一理念，我们建立了我们的 CI/CD 实践以及相应的工具包。

以下是我们 CI/CD 的工具包示例，包括以下部分：

- [tool.sh](https://github.com/QPod/lab-foundation/blob/main/tool.sh)：一个包含几个用于构建代码或项目的函数的 shell 脚本。

- [github workflow YAML](https://github.com/QPod/lab-foundation/blob/main/.github/workflows/build-docker.yml)：一个特定于 CI/CD 平台的配置，使用上述的 `tool.sh`，并使用简单的 Linux shell 命令完成大部分构建任务。如你所见，每个作业都以 `source ./tool.sh` 开始，以使用我们工具包中定义的函数。

## 其他选择

随着构建工件在开发/测试（暂存）/发布（生产）阶段的变化，我们发现从两个角度管理工件（artificats）很重要：

1. 每个工件都应该正确地进行版本控制和标记，特别是在测试（暂存）或生产环境需要回滚时。

2. 用于发布（生产环境）的artifact仓库（例如 Docker registry）应与开发/测试（暂存）仓库分开，以便更好地管理生产环境的工件，并使用适当的资源。在许多情况下，生产环境需要一个高可用的工件仓库，并且最好与计算资源位于同一 VPC/区域，或者具有不同的推送/拉取权限。

因此，我们选择将开发/测试阶段的工件和发布/生产工件放入不同的仓库，至少是不同的registry命名空间。在上面的 `tool.sh` 文件中，你可以看到我们使用一个变量 `DOCKER_IMG_NAMESPACE` 来决定工件应该被推送到哪个命名空间。此外，这个变量由 **Git 分支名称前缀** 决定：

```bash
if [ "${CI_PROJECT_BRANCH}" = "main" ] ; then
    # 如果在主分支上，Docker 镜像命名空间将与 CI_PROJECT_NAME 的命名空间相同
    export CI_PROJECT_NAMESPACE="$(dirname ${CI_PROJECT_NAME})" ;
else
    # 不是主分支，Docker 命名空间设置为 {CI_PROJECT_NAME 的命名空间} + "0" + {CI_PROJECT_SPACE 中 / 之前的第一段}
    export CI_PROJECT_NAMESPACE="$(dirname ${CI_PROJECT_NAME})0${CI_PROJECT_SPACE}" ;
fi
```

通过这种方式：

- 当代码被推送或合并到 `main` 分支时，工件仓库命名空间将是我们示例中的 `qpod`。

- 当代码被推送到分支名称为 `dev/*` 的模式，并且创建了一个 PR 将这个分支 `dev/*` 合并到 `main`，工件将被推送到命名空间 `qpod0dev`（后缀 `0dev` 可以自定义）。

- 当代码被推送到没有 PR 合并到 `main` 的分支时，代码将不会被构建（流水线不会被触发执行）。
