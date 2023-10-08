FROM debian:bookworm-slim

ARG USERNAME=devuser
ARG GROUPNAME=devusers

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
  curl=7.88.1-10+deb12u3 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* 

# TODO: git
# RUN \
#   apt-get update -y && \
#   apt-get upgrade -y && \
#   apt-get install --no-install-recommends -y \
#   apt-get clean && \
#   rm -rf /var/lib/apt/lists/* 

RUN \
  curl -L https://github.com/hadolint/hadolint/releases/download/v2.12.0/hadolint-Linux-x86_64 -o /usr/local/bin/hadolint && \
  chmod 755 /usr/local/bin/hadolint


RUN chown ${USERNAME}:${GROUPNAME} -R /home/${USERNAME}

WORKDIR /workspace

EXPOSE 3000
