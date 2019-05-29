FROM node:10.15-stretch-slim

WORKDIR /app

RUN \
  echo 'alias ll="ls -lah"' >> ~/.bashrc \
  && curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.15.2 \
  && export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
