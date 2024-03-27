---
sidebar_position: 11
---

# QPod Stacks - Lab Foundation

QPod [Lab Foundation](https://github.com/QPod/lab-foundation) provides the following docker image stacks:

## Base Images

<details>
  <summary> 👉 Click here to see a list of Docker Images for basic developing</summary>

| Image Name (Feature Spectrum) |             DockerHub Link             |  Based On |                                                                                                                                                Description                                                                                                           |
|:-----------------------------:|:--------------------------------------:|:---------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|              atom             | https://hub.docker.com/r/qpod/atom     | ubuntu    | (Not for final usage, add basic utilities based on `ubuntu`.)                                                                                                                                                                                                        |
|              base             | https://hub.docker.com/r/qpod/base     | qpod/atom | The image add some basic OS libs and Python3 (conda), as well as tini.                                                                                                                                                                                               |
|              node             | https://hub.docker.com/r/qpod/node     | qpod/base | Minimal NodeJS environment (including npm and yarn).                                                                                                                                                                                                                 |
|              jdk              | https://hub.docker.com/r/qpod/jdk      | qpod/base | Minimal Java environment (OpenJDK)                                                                                                                                                                                                                                   |
|               go              | https://hub.docker.com/r/qpod/go       | qpod/base | Minimal Golang environment.                                                                                                                                                                                                                                          |
|             julia             | https://hub.docker.com/r/qpod/julia    | qpod/base | Minimal Julia environment.                                                                                                                                                                                                                                           |
|        full-stack             | https://hub.docker.com/r/qpod/core     | qpod/base | ➕ Full Python environment (data + nlp + cv + chem + tensorflow + pytorch)<br/> ➕ Full R environment (datascience + RStudio + RShiny) + LaTex <br/> ➕ Base NodeJS environment <br/> ➕ Base Java environment (OpenJDK + maven) <br/> ➕ Minimal Julia environment   |

</details>

## Data Science Stacks

<details>
  <summary> 👉 Click here to see a list of Docker Images run on CPUs only</summary>

| Image Name (Feature Spectrum) |             DockerHub Link             |  Based On |                                                                                                                                                Description                                                                                                           |
|:-----------------------------:|:--------------------------------------:|:---------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|            py-data            | https://hub.docker.com/r/qpod/py-data  | qpod/base | Python environment customized for Data Science tasks.                                                                                                                                                                                                                |
|             py-nlp            | https://hub.docker.com/r/qpod/py-nlp   | qpod/base | Python environment customized for NLP tasks.                                                                                                                                                                                                                         |
|             py-cv             | https://hub.docker.com/r/qpod/py-cv    | qpod/base | Python environment customized for Computer Vision tasks.                                                                                                                                                                                                             |
|            py-chem            | https://hub.docker.com/r/qpod/py-chem  | qpod/base | Python environment customized for Computational Chemistry tasks.                                                                                                                                                                                                     |
|             py-std            | https://hub.docker.com/r/qpod/py-std   | qpod/base | Python environment including all the packages mentioned above installed.                                                                                                                                                                                             |
|             py-jdk            | https://hub.docker.com/r/qpod/py-jdk   | qpod/base | `py-std` plus OpenJDK. (no LaTex)                                                                                                                                                                                                                                    |
|             r-base            | https://hub.docker.com/r/qpod/r-base   | qpod/base | Minimal R environment -- no JDK, no R data science packages, no LaTex.                                                                                                                                                                                               |
|             r-std             | https://hub.docker.com/r/qpod/r-std    | qpod/base | Standard R environment for data science -- including popular R data science packages. (OpenJDK included since many R packages need Java, no LaTex.)                                                                                                                  |
|            r-latex            | https://hub.docker.com/r/qpod/r-latex  | qpod/base | `r-std` + LaTex -- this is the full R environment if you do not need RStudio.                                                                                                                                                                                        |
|            r-studio           | https://hub.docker.com/r/qpod/r-studio | qpod/base | Full R environment if you want to use RStudio. `r-latex` + RStudio + RShiny.                                                                                                                                                                                         |
</details>

## AI Stacks - with NVIDIA GPU support

<details>
  <summary> 👉 Click here to see a list of Docker Images run on GPUs + CPUs</summary>

| Image Name (Feature Set)  |               DockerHub Link                |     Based On      |                                                     Description                                                      |
|:-------------------------:|:-------------------------------------------:|:-----------------:|:--------------------------------------------------------------------------------------------------------------------:|
|            cuda           |   https://hub.docker.com/r/qpod/cuda_11.7   |     qpod/base     |                       Version 11.7 of NVIDIA cuda and cudnn libs, including runtime and devel.                       |
|         cuda_11.2         |   https://hub.docker.com/r/qpod/cuda_11.2   |     qpod/base     |                       Version 11.2 of NVIDIA cuda and cudnn libs, including runtime and devel.                       |
|            tf2            |      https://hub.docker.com/r/qpod/tf2      |  qpod/cuda_11.2   |                                   Tensorflow 2.x environment with GPU (cuda 11.2).                                   |
|           torch           |     https://hub.docker.com/r/qpod/torch     |    qpod/torch     |                                    Pytorch 1.x environment with GPU (cuda 11.7).                                     |
|       torch-cuda112       | https://hub.docker.com/r/qpod/torch-cuda112 | qpod/torch-cuda12 |                                    Pytorch 1.x environment with GPU (cuda 10.2).                                     |
|        core-cuda          |   https://hub.docker.com/r/qpod/core-cuda   |  qpod/cuda_11.7   |                                   Tensorflow 2.x + Pytorch environment with cuda.                                    |


</details>
