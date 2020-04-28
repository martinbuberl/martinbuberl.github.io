---
layout: post
navigation: "blog"
title: "Control Raspberry Pi with a PlayStation 4 Controller"
description: ""
image: ""
---

I'd like to hook up my Raspberry Pi with a PS4 controller and capture the input.

For this tutorial you'll need:
- <a target="_blank" href="https://www.raspberrypi.org/products/raspberry-pi-3-model-b/">Raspberry Pi 3 Model B</a>, running <a target="_blank" href="https://www.raspberrypi.org/downloads/raspbian/">Raspian</a> setup [headless]({{ site.url }}/blog/setup-headless-raspberry-pi/).
 - PlayStation 4's <a target="_blank" href="https://www.playstation.com/en-us/explore/accessories/gaming-controllers/dualshock-4/">DualShock 4 Wireless Controller</a>


ssh into Raspberry Pi and run:

```
sudo pip install ds4drv
```

## Start the driver

Run `sudo ds4drv`

### Pair 'em

To put the controller into pairing mode, press and hold the *Share* button then the *PS* button. After a few seconds, the light bar will strobe, indicating that the controller is now in pairing mode.

You'll see output like this:

<!-- make this pic smaller -->
<img src="{{ site.url }}/content/img/control-raspberry-pi-with-a-playstation-4-controller-01.png" />

You're paired :)

To turn the controller off, hold the PS button for 10 seconds.

In theory, you should be able to tap the PS button to wake up the controller and it will automatically re-connect. However, this didn't work for me and I had to re-pair the controller again.


<!--
https://github.com/martinbuberl/pi/tree/master/controller
https://github.com/chrippa/ds4drv
-->
