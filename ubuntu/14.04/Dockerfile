FROM ubuntu:trusty-20160503.1
MAINTAINER Bitnami <containers@bitnami.com>

RUN apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y curl ca-certificates sudo && \
  adduser bitnami --disabled-password --gecos "" && \
  mkdir -p /opt/bitnami && chown bitnami:bitnami /opt/bitnami && \
  sed -i -e 's/\s*Defaults\s*secure_path\s*=/# Defaults secure_path=/' /etc/sudoers && \
  echo "bitnami ALL=NOPASSWD: ALL" >> /etc/sudoers && \
  apt-get clean && \
  rm -rf /var/lib/apt /var/cache/apt/archives/* /tmp/*

ENV HARPOON_VERSION=1.0.2-0

RUN cd /tmp && \
  curl -sSLO https://downloads.bitnami.com/files/harpoon/harpoon-$HARPOON_VERSION-linux-x64.tar.gz && \
  echo "afaa9127b6666c7581bfa1b5df8f9f97fd79fd721bcb72a906ba8a43a5e09ca4  harpoon-$HARPOON_VERSION-linux-x64.tar.gz" | sha256sum -c - && \
  mkdir -p /opt/bitnami/harpoon && \
  tar xzf harpoon-$HARPOON_VERSION-linux-x64.tar.gz --strip 1 -C /opt/bitnami/harpoon && \
  rm harpoon-$HARPOON_VERSION-linux-x64.tar.gz

ENV TINI_VERSION v0.9.0

RUN cd /tmp && \
  curl -sSLO https://github.com/krallin/tini/releases/download/$TINI_VERSION/tini && \
  curl -sSLO https://github.com/krallin/tini/releases/download/$TINI_VERSION/tini.asc && \
  gpg --keyserver ha.pool.sks-keyservers.net --recv-keys 0527A9B7 && \
  gpg --verify tini.asc && \
  chmod +x tini && \
  mv tini /usr/local/bin/ && \
  rm tini.asc

ENV PATH=/opt/bitnami/harpoon/bin:$PATH

COPY rootfs /
ENTRYPOINT ["/entrypoint.sh"]
