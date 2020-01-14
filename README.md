[![CircleCI](https://circleci.com/gh/bitnami/minideb-extras/tree/master.svg?style=shield)](https://circleci.com/gh/bitnami/minideb-extras/tree/master)
[![Docker Hub Automated Build](http://container.checkforupdates.com/badges/bitnami/minideb-extras)](https://hub.docker.com/r/bitnami/minideb-extras/)

# DEPRECATION NOTICE

This image has been deprecated, and will no longer be maintained and updated. Please consider using [bitnami/minideb](https://github.com/bitnami/minideb) instead.

# `bitnami/minideb-extras`

## TL;DR

```dockerfile
FROM bitnami/minideb-extras:jessie
```

## About

The `bitnami/minideb-extras` image is a customized base image for use in Bitnami container images and is built on top of the light-weight and Debian-based `bitnami/minideb` image. Learn more about [bitnami/minideb](https://github.com/bitnami/minideb) in [Minideb: A New Container Base Image](https://engineering.bitnami.com/2016/11/02/minideb-a-new-container-base-image.html).

The `Dockerfile` installs [Nami](https://github.com/bitnami/nami) and includes a `bitnami-pkg` helper script to simplify downloading of Nami modules from the Bitnami package repositories. Additionally the `Dockerfile` installs [tini](https://github.com/krallin/tini)  and is used in the default [entrypoint](../../blob/master/rootfs/entrypoint.sh).

## Variants

The image is available in the following variants:

|                  Image                   |                    Configuration                    |
|------------------------------------------|-----------------------------------------------------|
| bitnami/minideb-extras:jessie            | Standard                                            |
| bitnami/minideb-extras:stretch           | Standard                                            |
| bitnami/minideb-extras:jessie-buildpack  | Buildpack (includes `build-essential`, `git`, etc.) |
| bitnami/minideb-extras:stretch-buildpack | Buildpack (includes `build-essential`, `git`, etc.) |

## Usage

Use like a regular base image.

The following example uses the `install_packages` helper script, provided by `minideb`, to install APT packages from the Debian repositories. The `bitnami-pkg` tool to install `nami` packages published by Bitnami.

```dockerfile
FROM bitnami/minideb-extras:jessie
ENV BITNAMI_APP_NAME=apache
RUN install_packages libssl1.0.0 libaprutil1 libapr1 libc6 libuuid1 libexpat1 \
      libpcre3 libldap-2.4-2 libsasl2-2 libgnutls-deb0-28 zlib1g libp11-kit0 \
      libtasn1-6 libnettle4 libhogweed2 libgmp10 libffi6
RUN bitnami-pkg install apache-2.4.25-0
CMD ["nami", "start", "--foreground", "apache"]
```

## Configuration Parameters

The following tables lists the configurable parameters of the image.

|         Parameter         |                       Description                       |
|---------------------------|---------------------------------------------------------|
| `BASH_DEBUG`              | [Turn on bash debugging](#turn-on-bash-debugging)       |
| `NAMI_DEBUG`              | [Turn on nami debugging](#turn-on-nami-debugging)       |
| `DISABLE_WELCOME_MESSAGE` | [Turn off the welcome text](#turn-off-the-welcome-text) |

### Turn on BASH debugging

Add `BASH_DEBUG=1` to the container environment to enable [BASH debugging](http://wiki.bash-hackers.org/scripting/debuggingtips#use_shell_debug_output) which prints the commands being executed.

### Turn on Nami debugging

To enable debugging add `NAMI_DEBUG=1` to the container environment. The `NAMI_DEBUG` variable enables helpful logging and debugging features which can be valuable for debugging issues.

### Turn off the welcome text

When a new container is launched, a welcome message is displayed as illustrated below:

```console
 *** Welcome to the apache image ***
 *** Brought to you by Bitnami ***
 *** More information: https://github.com/bitnami/bitnami-docker-apache ***
 *** Issues: https://github.com/bitnami/bitnami-docker-apache/issues ***
```

Adding `DISABLE_WELCOME_MESSAGE=1` to the container environment turns off this message.

## Contributing

We'd love for you to contribute to this container. You can request new features by creating an [issue](../../issues/new) or submitting a [pull request](../../issues/pull) with your contribution.

### Issues

If you encountered a problem running this container, you can file an [issue](../../issues/new). Be sure to include the following information in your issue:

- Host OS and version
- Output of:
  + `docker version`
  + `docker info`
- Steps to reproduce the issue
- Logging information with debug mode enabled

## License

Copyright 2015 - 2017 Bitnami

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
