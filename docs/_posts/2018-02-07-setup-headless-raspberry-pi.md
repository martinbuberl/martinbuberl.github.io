---
layout: post
navigation: "blog"
title: "Setup headless Raspberry Pi"
description: "If you'd like to setup your Raspberry Pi headless - without a monitor (the missing &quot;head&quot;), keyboard, and mouse - look no further. This step-by-step guide will walk you through it."
image: "og-pJILiyPdrXI.jpg"
date: 2018-02-07
updated: 2019-10-24
---

If you'd like to setup your Raspberry Pi <a target="_blank" href="https://en.wikipedia.org/wiki/Headless_computer">headless</a> - without a monitor (the missing &quot;head&quot;), keyboard, and mouse - look no further. This step-by-step guide will walk you through it - assuming a few things: you have a <a target="_blank" href="https://www.raspberrypi.org/products/raspberry-pi-3-model-b/">Raspberry Pi 3 Model B</a>, a <a target="_blank" href="https://www.amazon.com/b/?node=3015433011">microSD card</a> and are reading this on a Mac.

<h2 id="burn-raspian-onto-microsd-card" class="has-permalink">Burn Raspian onto microSD card<a class="permalink" title="Permalink" href="#burn-raspian-onto-microsd-card">#</a></h2>

- Download the latest <a target="_blank" href="https://www.raspberrypi.org/downloads/raspbian/">Raspian with Desktop</a> image *(currently, that's Raspian Buster version: September 2019)*
- Expand the `2019-09-26-raspbian-buster.img` file from `2019-09-26-raspbian-buster.zip`
- Flash the microSD card with <a target="_blank" href="https://https://www.balena.io/etcher/">balenaEtcher</a>
<!-- Etcher broken on macOS Catalina https://github.com/balena-io/etcher/issues/2833#issuecomment-511152047 -->

<img src="{{ site.url }}/content/img/setup-headless-raspberry-pi-01-3.png" />

<h2 id="configure-for-headless-operation" class="has-permalink">Configure for headless operation<a class="permalink" title="Permalink" href="#configure-for-headless-operation">#</a></h2>

- <a target="_blank" href="https://www.raspberrypi.org/documentation/remote-access/ssh/">Enable Secure Shell (SSH)</a> by adding an empty file `ssh`, without any extension, onto the microSD card's **boot** partition `$ touch /Volumes/boot/ssh`
- <a target="_blank" href="https://raspberrypi.stackexchange.com/a/37921">Configure WiFi</a> by adding a file `wpa_supplicant.conf` onto the SD card's **boot** partition `$ touch /Volumes/boot/wpa_supplicant.conf` and add the following lines (don't forget to replace `YOUR_WIFI_SSID` and `YOUR_WIFI_PASSWORD`):

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="YOUR_WIFI_SSID"
    psk="YOUR_WIFI_PASSWORD"
}
```

<h2 id="connect-via-ssh" class="has-permalink">Connect via SSH<a class="permalink" title="Permalink" href="#connect-via-ssh">#</a></h2>

- Insert the microSD card into your Raspberry Pi and power it up
- <a target="_blank" href="https://raspberrypi.stackexchange.com/q/13936/80323">Get the local network IP address</a> of your Raspberry Pi `$ ping raspberrypi`
- Connect via SSH `$ ssh pi@<YOUR_PI_IP_ADDRESS>` (default password for the `pi` user is `raspberry`)

<img src="{{ site.url }}/content/img/setup-headless-raspberry-pi-02.png" />

If you have been reinstalling Raspian and are using the same IP address, you will most likely get a `WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!` message. When you establish a new SSH connection, a fingerprint is created and cached on your local machine. Remove the cached key for the IP address <a target="_blank" href="https://linux.die.net/man/1/ssh-keygen">`$ ssh-keygen -R <YOUR_PI_IP_ADDRESS>`</a> and try again to connect via SSH.

<h2 id="connect-via-vnc" class="has-permalink">Connect via VNC<a class="permalink" title="Permalink" href="#connect-via-vnc">#</a></h2>

- [Connect to your Raspberry Pi via SSH](#connect-via-ssh)
- Run `$ sudo raspi-config`, open **Interfacing Options** and enable **VNC**
- Download [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/) and connect via Virtual Network Computing (VNC)

<img src="{{ site.url }}/content/img/setup-headless-raspberry-pi-03.png" />

<h2 id="some-housekeeping" class="has-permalink">Some housekeeping<a class="permalink" title="Permalink" href="#some-housekeeping">#</a></h2>

- [Upate and upgrade Raspian](https://www.raspberrypi.org/documentation/raspbian/updating.md) running:

```
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get clean
```
