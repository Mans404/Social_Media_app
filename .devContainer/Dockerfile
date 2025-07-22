FROM ubuntu:22.04

# Install system dependencies and programming languages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends \
  build-essential \
  gcc \
  curl \
  git \
  python3 \
  python3-pip \
  openssh-client \
  openjdk-17-jdk \
  docker-compose \
  postgresql-client \
  && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
  && apt-get install -y nodejs \
  # Clean up
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace
