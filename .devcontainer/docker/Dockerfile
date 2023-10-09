FROM debian:bookworm-slim

ARG USERNAME=devuser
ARG GROUPNAME=devusers

# https://github.com/hadolint/hadolint/wiki/DL4006
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN \
  groupadd ${GROUPNAME} && \
  useradd -g ${GROUPNAME} --shell /usr/bin/fish -m ${USERNAME}

# Add dev user
RUN \
  apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y \
  sudo=1.9.13p3-1+deb12u1 \
  gosu=1.14-1+b6 \
  fish=3.6.0-3.1 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  echo "${USERNAME} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${USERNAME}

# Node.js
ARG NODE_VERSION=20.0.8
RUN \
  apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y \
  g++=4:12.2.0-3 \
  make=4.3-4.1 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  gosu ${USERNAME} fish -c " \
  asdf plugin add nodejs && \
  asdf install nodejs ${NODE_VERSION}} && \
  asdf global nodejs ${NODE_VERSION} \
  "

RUN \
  apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y \
  ca-certificates=20230311 \
  git=1:2.39.2-1.1 \
  curl=7.88.1-10+deb12u3 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* 

RUN \
  apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y \
  neovim=0.7.2-7 \
  unzip=6.0-28 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  # install skim
  curl -L 'https://github.com/lotabout/skim/releases/download/v0.9.4/skim-v0.9.4-x86_64-unknown-linux-musl.tar.gz' | tar xz -C /tmp && \
  mv /tmp/sk /usr/local/bin && \
  # install hadolint
  curl -L https://github.com/hadolint/hadolint/releases/download/v2.12.0/hadolint-Linux-x86_64 -o /usr/local/bin/hadolint && \
  chmod 755 /usr/local/bin/hadolint

COPY ./.devcontainer/docker/config/ /home/${USERNAME}/.config
RUN chown ${USERNAME}:${GROUPNAME} -R /home/${USERNAME}

WORKDIR /workspace

EXPOSE 3000
