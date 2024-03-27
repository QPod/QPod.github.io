---
sidebar_position: 02
---

# QPod使用指引

## AI/数据科学的瑞士军刀

AI/数据科学的瑞士军刀——QPod提供了一站式、开箱即用、可自由定制的，基于容器的、开源AI/数据科学开发、分析工具。

QPod将常见的、最新的开放数据科学环境和工具封装成为了容器镜像，你无需进行繁琐的环境配置即可快速开始AI/数据科学的工程，同时能够方便地复现与分享您的研究工作。您可以在QPod中使用Jupyter Notebook/JupyterLab中运行Python, R, OpenJDK, NodeJS, Go, Julia, Rust等语言，QPod也封装了VS Code, R-Studio等工具。使用QPod，您可以：

- 📦 避免繁琐的环境配置、安装过程，QPod已经把常用的、最新的环境和工具封装在容器镜像中，您可以开箱即用；
- 🌍 让您的工作更容易被自己/他人`复现`——QPod让科学研究和数据分析项目成为[可复现的工作流(reproducible pipelines)](https://doi.org/10.1038/d41586-018-07196-1)，这能让你更好地和同行[分享你的工作](https://doi.org/10.1038/515151a).
- 🆙 能让你的算法和关键创新更容易横向、纵向扩展，QPod让你把自己在开发环境所作的工作无缝、极其简单地部署到生产环境，如提供RESTful API、进行map/reduce操作等。

![Screenshot of QPod](https://raw.githubusercontent.com/wiki/QPod/qpod-hub/img/QPod-screenshot.webp "Screenshot of QPod")

## QPod包含了什么

QPod封装、整理、维护了一些列的容器镜像，这些镜像包含了常见的开放AI/数据科学语言环境和安装包：Ptyhon, R, OpenJDK, NodeJS, Go, Julia, Rust等，同时封装了Jupyter Notebook / JupyterLab / VS Code / RStudio等IDE让用户便捷地进行开发、交互计算。QPod适用于下面的应用场景：

- 单机使用：在笔记本/台式机/工作站上使用，作为AI/数据科学开发环境；
- 多租户使用：在服务器/集群上供多用户使用，以共享服务器计算资源（如GPU）；
- 部署于生产服务：使用这些镜像在生产环境中提供RESTful API或者作为map/reduce等操作的执行单元等。

## 安装使用 `1-2-3-GO`🎉

### 0. 在服务器/笔记本上安装Docker

- Linux (如: 最新版Ubuntu LTS): 直接安装 [docker-ce](https://hub.docker.com/search/?offering=community&type=edition&operating_system=linux) ( 社区版、免费 ) directly (也可以使用其他容器平台，例如podman)；

- macOS: 直接安装 [docker-ce-desktop](https://hub.docker.com/editions/community/docker-ce-desktop-mac)；

- Windows (>=10):

  - 选项1 (推荐): 先启用WSL2并安装最新的Ubuntu发行, 再参照在Linux上安装[docker-ce](https://hub.docker.com/search/?offering=community&type=edition&operating_system=linux)的步骤即可；
  - Option 2（不建议）: 直接安装[docker-ce desktop](https://desktop.docker.com/win/stable/amd64/Docker%20Desktop%20Installer.exe)。

#### GPU和cuda使用的特别提示

**请安装docker-ce，直接使用yum/apt官方源安装的docker有可能不能搭配cuda使用。**

在安装Docker之后还需安装下面两个组件：

- 与硬件设备适配的最新[NVIDIA driver](https://github.com/NVIDIA/nvidia-docker/wiki/Frequently-Asked-Questions#how-do-i-install-the-nvidia-driver)
- 与最新版的[nvidia-container-toolkit](https://github.com/NVIDIA/nvidia-docker#quickstart)

### 1.选择你需要的功能包和你的工作目录

- 选择你的工作目录`WORKDIR`，请使用绝对路径（如`/root`,`/User/me`,`D:/work`）；

- 从 [QPod镜像功能列表](tutorial-basics/qpod-stacks-1-foundation.md) 中，选择你需要的功能包，如果你的磁盘空间和网速满足要求则推荐CPU用户选择`full`，GPU用户选择`full-cuda`。

### 2.准备下载和启动容器服务

根据你的操作系统运行下方脚本，将其中的`IMG`与`WORKDIR`改为自己的安装配置。运行前关闭Jupyter以及其他占用8888或9999端口的程序。

#### 大陆地区网络环境特殊提示

由于下载过程需要从DockerHub下载较大的镜像文件，如果您使用的网络环境需要加速，
请尝试使用阿里云提供的镜像：我们已经将镜像同步至了阿里云的北京、杭州镜像仓库（阿里云用户也可以使用VPS网络进一步加速）。

方法为，在下面脚本执行时候的选择适合你的`REGISTRY`变量：

例如：`REGISTRY="registry.cn-beijing.aliyuncs.com/qpod/base-dev:full"`

#### Linux/macOS用户，在bash或终端中运行

```shell
WORKDIR="/root"             # <- macOS用户建议改为用户目录，如：/Users/your_user_name
IMG="qpod/base-dev:latest"  # <- 你选择的功能包(Stack)

REGISTRY="docker.io/"       # <- 如果连接境外dockerhub网络速度较快选择该行
# REGISTRY="registry.cn-beijing.aliyuncs.com/"      # <- 如果在国内互联网环境，北方地区建议选择此项
# REGISTRY="registry.cn-hangzhou.aliyuncs.com/"     # <- 如果在国内互联网环境，南方地区建议选择此项
# REGISTRY="registry-vpc.cn-beijing.aliyuncs.com/"  # <- 如果使用国内阿里云VPC网环境，北方地区建议选择此项
# REGISTRY="registry-vpc.cn-hangzhou.aliyuncs.com/" # <- 如果使用国内阿里云VPC网环境，南方地区建议选择此项

docker run -d --restart=always \
    --name=QPod \
    --hostname=QPod \
    -p 8888:8888 -p 9999:9999 \
    -v $WORKDIR:/root \
    "${REGISTRY:-"docker.io/"}${IMG}"
sleep 10s && docker logs QPod 2>&1|grep token=
```

⚠️ 使用带有`nvidia-docker`的NVIDIA GPU时请注意:

- 👉 确保Docker版本在19.03以上并在主机上能正常够运行`nvidia-smi`命令
- 👉 在`docker run`指令中增加一项: `--gpus all` (位于`--restart=always`之后，旧nvidia-container版本请使用`--runtime nvidia`)
- 👉 使用`IMG="qpod/qpod:full-cuda"`或其他支持cuda的镜像

#### Windows用户

推荐安装WSL后，在Linux使用上述相同命令。

<details>

  <summary>如果安装了Windows版docker-ce（不推荐），则：</summary>

在[Terminal](https://github.com/microsoft/terminal)或CMD中运行：

```cmd
SET IMG="qpod/developer:latest"
SET WORKDIR="D:/work"

docker run -d --restart=always ^
    --name=QPod ^
    --hostname=QPod ^
    -p 8888:8888 9999:9999 ^
    -v %WORKDIR%:/root ^
    %IMG%
timeout 10 && docker logs QPod 2>&1|findstr token=
```
</details>

### 3.等待下载和启动

以上指令会下载docker镜像，建立一个名为QPod的docker容器，并打印出一条含有48位十六进制密钥的URL地址。

### Go! 🎉

复制`?token=`之后的密钥（步骤3中最后打印出的），从你的浏览器打开[http://localhost:8888](http://localhost:8888)或[http://ip-address:8888](http://ip-address:8888)并粘贴密钥，即可开始使用。

## 附加信息

### 硬件

镜像需建立在`ubuntu:latest`且只能在x86平台测试，arm64/ppc64le平台预计进行少量修改之后可以适配。

### 安装包管理

考虑到下面的原因，强烈不建议使用`conda`来安装lib或package，建议直接使用pypi：

- conda安装源镜像在很多企业内网环境不可用（尤其是金融、医疗机构等严格隔离的内网网络），但这些机构往往有pypi源；
- conda无法复用已有的系统库且无法提供稳定、最新的Liunx系统安装包库（例如某些包在`debian:jessie`下构建，在`debian:stretch`下就无法正常使用）；
- 建立多个`conda env`环境会通过复制程序包来占用大量冗余的磁盘空间，其实可以通过使用建立多个容器实例来更好地管理和隔离不同的环境。

### 定制化

若发现有系统库、Python模块或R包的缺失，可在`work`文件夹的`install_XX.list`中进行补充。
