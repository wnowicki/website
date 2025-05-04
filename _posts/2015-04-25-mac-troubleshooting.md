---
title: Mac Troubleshooting
author: wojtek
post_id: 0947b4b52b76498eae67a27ed153c59c
heading_image: 2015-04-25.jpg
layout: post
language: en
categories:
  - default
tags:
  - mac
  - troubleshooting
---
My private Mac Book Pro was affected with last post update issue. It’s *15” Late 2011* so in grup affected with some [video issues](https://www.apple.com/support/macbookpro-videoissues/). So one day it just stucked on boot screen. But it’s a good opportunity to refresh knowledge about Mac hidden opptions and command line tools. Without unnecessary long introduction I’ll just list them.

## Boot Options

### Startup Manager
Press and hold `Option` key while booting. Instead of logging screen you’ll see *Startup Manager* showing options to boot with. In addition pressing and holding `C` will boot directly from CD/DVD drive and `N` for network boot.

### Apple Diagnostics
Simply press and hold `D` key while booting.

### Safe Boot
Could be known as *Safe Mode*. This is minimal load, all third party stuff will be disabled and only necessary kernel extensions will be loaded. This could be really helpful in some cases. Just press and hold `Shift` just after booting sound.

### Single-User Mode
Are you command line ninja? Then this mode is for you. Command line you will get after pressing and holding `Command` + `S` while booting.

### Verbose Mode
To check hidden system messages while booting, hold and press `Command` + `V` on startup.

### Reset PRAM
[PRAM](https://support.apple.com/kb/PH14222?locale=en_US&viewlocale=en_US) stores some important information. But usually is the first and the simplest way to troubleshoot your Mac. So press and hold `Command` + `Option` + `P` + `R`. Yes it’s probably one of the most difficult keyboard shortcuts but sometimes you need to put that efford.

### Recovery Mode
Probably the last thing you want to do but still good to know how to do is running recovery mode. Also simple command press and hold `Command` + `R`.

## Command Line Tools
If you enter *command line* you probably want to take some actions there. Here are some useful commands:

### Update
To run system updates in command line use:

```bash
sudo softwareupdate -i -a
```

### Enabling WiFi
To enable

```bash
networksetup -setairportpower en0 on
```
and just in case to disable

```bash
networksetup -setairportpower en0 off

```
to join WiFi network

```bash
networksetup -setairportnetwork en0 WIFI_SSID WIFI_PASSWORD
```
to add DNS

```bash
sudo networksetup -setdnsservers "AirPort" 10.0.0.11 10.0.0.12
```
and to list network interfaces

```bash
networksetup -listallhardwareports
```

### Reboot
```bash
reboot
```

For more options just use `man` works like in Linux ;)

*Credit: [image](https://www.flickr.com/photos/luderbrus/268023647/in/photostream/)*
