---
layout: "post"
title: "Docker on Raspberry Pi"
subtitle: "Building DB server using Docker on Raspberry Pi"
date: "2022-01-12 19:30"
author: wojtek
post_id: ab5155b368574a36e3fac38a826ece19
categories: raspi
heading_image: 2022-01-rpi2.jpg
language: en
tags:
    - raspberrypi
    - docker
    - mysql
    - server
---

In this post, I will guide you on how to install [Docker](https://www.docker.com) and set up your first container on Raspberry Pi. Docker has revolutionised the way we work with servers and the development environment.  I remember creating a video about setting up a local server based on the [Vagrant](https://www.vagrantup.com) and VirtualBox virtualisation. Today I'd say it's completely outdated, even I think Vagrant was a revolution on its own.

This tiny computer is probably not the first thing that comes into your mind when you are thinking about Docker and containerisation. As Raspberry Pi is running on ARM architecture not everything is straight forward as on a normal computer. Fortunately, there are versions of everything built for it.

### Installing Docker

First of all, we need to install Docker itself. It's pretty simple to download and install it on your Raspberry Pi. Please follow the steps below. We are not doing it through `apt` so we don't need to update the package list for the moment.

Please run the commands below:

```sh
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Next, you need to change permission for your user and add yourself to the `docker` group. Here is a command for a standard Raspberry Pi OS user:

```sh
sudo usermod -aG docker pi
```

or for any current user:

```sh
sudo usermod -aG docker ${USER}
```

You can check it by running the command below:

```sh
groups ${USER}
```

For example, result as you can see `docker` is on the list

```sh
➜  ~ groups ${USER}
pi : pi adm dialout cdrom sudo audio video plugdev games users input netdev spi i2c gpio lpadmin docker
```

#### Run test container

Now you can check if the installation was successful by running:

```sh
docker run hello-world
```

This is the result you should see on your screen

<img class="img-responsive img-rounded" src="/assets/img/post/20220109-docker.png" alt="Docker container" />

### Installing Docker Compose

Docker-compose is a tool that allows us to define multiple containers in a single configuration and run them together.  It's useful for local environments as you can start everything you need with just a single command. First, we need to install Python 3, so we can use PIP to install `docker-compose`

```sh
sudo apt-get install libffi-dev libssl-dev
sudo apt install python3-dev
sudo apt-get install -y python3 python3-pip
```

Now we can install `docker-compose` using `pip3`

```sh
sudo pip3 install docker-compose
```

### DB Container

Now it's time to build our first functional container. I've chosen something useful MariaDB database. I'd suggest creating a folder first to keep things tidy.

Create a `docker-compose.yml` file and paste this content:

```yaml
version: '3.1'
services:
  db:
    image: yobasystems/alpine-mariadb
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: test
    ports:
      - "3306:3306"
```

Then all you need is to execute:

```sh
docker-compose up
```

If you don't have any firewall configured on your Raspi, by default there is none. You can access your database from your local network.

- host: is yours Raspi IP
- user: `root`
- password: `secret`
- port: `3306`

This is just one example of what you can do using Docker on Raspberry Pi. Unfortunately as Pi has ARM architecture, not all Docker images will work on it. But usually is a case of googling the right one. Maybe one day we will try with Docker Swarm and Raspberry Pi.
