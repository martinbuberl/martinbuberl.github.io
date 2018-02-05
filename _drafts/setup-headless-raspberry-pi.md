---
layout: post
navigation: "blog"
title: "Setup headless Raspberry Pi"
description: "..."
image: "og-raspberry.jpg"
---

- Raspberry Pi 3 Model B
- SanDisk Extreme Pro Micro SD 32GB

## Setup headless Raspberry Pi

- [Download](https://www.raspberrypi.org/downloads/raspbian/) Raspian Stretch with Desktop *(Version: November 2017)*
- Flash SD card with [Etcher](https://etcher.io/)
- [Enable SSH](https://www.raspberrypi.org/documentation/remote-access/ssh/) by adding an empty file `ssh` onto the SD card's **boot** partition `touch /Volumes/boot/ssh`
- [Configure WiFi](https://raspberrypi.stackexchange.com/a/37921) by adding a file `wpa_supplicant.conf` onto the SD card's **boot** partition `touch /Volumes/boot/wpa_supplicant.conf`:
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="YOUR_WIFI_SSID"
    psk="YOUR_WIFI_PASSWORD"
}
```
- [Get local network IP address](https://raspberrypi.stackexchange.com/q/13936/80323) of Raspberry Pi `ping raspberrypi`
- Connect via SSH `ssh pi@<YOUR_PI_IP_ADDRESS>` (default password for the `pi` user is `raspberry`)
- Run `sudo raspi-config` open **Interfacing Options** and enable **VNC**
- Connect via [VNC](https://www.realvnc.com/en/connect/download/viewer/)
```
- [Upate and upgrade Raspian](https://www.raspberrypi.org/documentation/raspbian/updating.md):
```
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get clean
```