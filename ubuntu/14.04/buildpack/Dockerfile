FROM gcr.io/stacksmith-images/ubuntu:14.04-r07

RUN apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y build-essential git pkg-config unzip && \
  apt-get clean && \
  rm -rf /var/lib/apt /var/cache/apt/archives/* /tmp/*
