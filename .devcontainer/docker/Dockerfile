FROM debian:bookworm-slim

ARG USERNAME=devuser
ARG GROUPNAME=devusers

# locale setting
# slim imageにデフォルトでUTF-8のファイル入ってない
RUN \
  apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y \
  locales=2.36-9+deb12u3 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  localedef -f UTF-8 -i en_US en_US.UTF-8

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

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

RUN \
  apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y \
  ca-certificates=20230311 \
  git=1:2.39.2-1.1 \
  openssh-client=1:9.2p1-2+deb12u1 \
  curl=7.88.1-10+deb12u3 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* 

# Install ASDF
ARG ASDF_VERSION=0.13.1
RUN \
  gosu ${USERNAME} fish -c " \
  git clone https://github.com/asdf-vm/asdf.git /home/${USERNAME}/.asdf --branch v${ASDF_VERSION} && \
  mkdir -p /home/${USERNAME}/.config/fish/completions && \
  ln -s /home/${USERNAME}/.asdf/completions/asdf.fish /home/${USERNAME}/.config/fish/completions && \
  mkdir -p /home/${USERNAME}/.config/fish/conf.d && \
  echo 'source ~/.asdf/asdf.fish' > /home/${USERNAME}/.config/fish/conf.d/asdf.fish \
  "

# Node.js
ARG NODE_VERSION=20.8.0
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
  asdf install nodejs ${NODE_VERSION} && \
  asdf global nodejs ${NODE_VERSION} \
  "

# Tools
RUN \
  apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y \
  neovim=0.7.2-7 \
  unzip=6.0-28 \
  less=590-2 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  # install delta
  curl -L 'https://github.com/dandavison/delta/releases/download/0.16.5/delta-0.16.5-x86_64-unknown-linux-musl.tar.gz' | tar xz -C /tmp && \
  mv /tmp/delta-0.16.5-x86_64-unknown-linux-musl/delta /usr/local/bin && \
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
