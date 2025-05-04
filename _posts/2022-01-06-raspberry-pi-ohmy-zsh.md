---
layout: "post"
title: "Raspberry Pi"
subtitle: "How to install Oh My ZSH!"
date: "2022-01-06 17:25"
author: wojtek
post_id: 07206171aeb03b64a74ec69afd451526
categories: raspi
heading_image: 2022-01-rpi.jpg
language: en
tags:
    - raspberrypi
    - bash
---

Writing an introduction to [Raspberry Pi](https://www.raspberrypi.com) nowadays would be a little bit too late as the initial release was in 2012. Since that, it become really popular, not only in education which was the original purpose. But as well in some academic and commercial projects where such a small computer suits the needs.

If you have one already you probably know how easy is to set it up. If you thinking of getting one all you need you will be able to find is [here](https://www.raspberrypi.com/software/). There are versions available for macOS, Linux and Windows. It's really simple just download this software, put a microSD card into your computer and choose which operating system you would like to install. Put a card in the computer, and connect the screen, keyboard, mouse and power supply. If your choice was Raspberry Pi OS it should start in a graphical mode and welcome you with some setting screen.  You can start using it as an almost standard computer, depending on the version of hardware you have it can be a little bit slower in some actions.

Raspberry Pi is a great learning programming platform for kids. It has great support for Scratch and Python. There are hardware extensions like [Sense HAT](https://www.raspberrypi.com/products/sense-hat/) which are making coding a little bit more realistic game. Of course, you can use it for coding in almost any language or host a web server, DB server or maybe game server ex. MineTest one. Opportunities are almost limitless.

<img class="img-responsive img-rounded" src="/assets/img/post/20220106-rpi.png" alt="Terminal view" />

I have at the moment three older boards, two RPi2 and one RPi3. One of them is set up to be a retro game console, the other one has a media center OS installed. Both are not in use at the moment, I don't have time for games and TV has Netflix built-in. RPi3 was always to play with, I have installed the latest Raspberry Pi OS, default running in console mode and most of the time I'm using it with SSH. Based on it I'll write a couple of posts/tutorials.

## Install Oh My ZSH

The first one, really short is about installing [Oh My ZSH](https://ohmyz.sh) on RPi. What is this? If you work a lot in a computer console you probably like to improve a little bit your experience and make your work more efficient. Oh My ZSH is a framework that comes with a lot of [plugins](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins) and [themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) that you can use. For example, you can see the git branch that you are checkout to.

<img class="img-responsive" src="/assets/img/post/20220106-terminal-1.png" alt="Terminal view" />

Installation is really simple, first install ZSH shell:

```sh
sudo apt-get update && sudo apt-get install zsh
```

Then you need to install Oh My ZSH itself:

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

You will be asked if you want to change your default shell to zsh after confirming that you should see something like that on your screen:

<img class="img-responsive" src="/assets/img/post/20220106-terminal-2.png" alt="Terminal view" />
