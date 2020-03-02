---
layout: post
navigation: "blog"
title: "Stream from Raspberry Pi to Amazon Kinesis"
description: ""
image: ""
date: 2019-11-24
---

If you haven't already, [setup a headless Raspberry Pi]({{ site.url }}/blog/setup-headless-raspberry-pi/). For this tutorial I'm using a <a target="_blank" href="https://www.raspberrypi.org/products/raspberry-pi-3-model-b/">Raspberry Pi 3 Model B</a> with the <a target="_blank" href="https://www.raspberrypi.org/products/camera-module-v2/">Camera Module V2</a> running <a target="_blank" href="https://www.raspberrypi.org/downloads/raspbian/">Raspian with Desktop</a> *(currently, that's Raspian Buster version: September 2019)*.

<h2 id="configure-the-raspberry-pi-camera" class="has-permalink">Configure the Raspberry Pi camera<a class="permalink" title="Permalink" href="#configure-the-raspberry-pi-camera">#</a></h2>

- [Connect via SSH]({{ site.url }}/blog/setup-headless-raspberry-pi/#connect-via-ssh) `$ ssh pi@<YOUR_PI_IP_ADDRESS>`
- Open the `modules` file and add the following line `bcm2835-v4l2` to the end of the file:

```
$  sudo nano /etc/modules
```

<img src="{{ site.url }}/content/img/stream-from-your-raspberry-pi-to-amazon-kinesis-01.jpg" />

- This will effectively load the **<a target="_blank" href="https://en.wikipedia.org/wiki/Video4Linux">V4L2</a>** driver module for your camera every time your Raspberry Pi starts up (see <a target="_blank" href="https://hackaday.io/project/25581-inspectorbot/log/62600-raspberry-pi-camera-v2">`sudo modprobe bcm2835-v4l2`</a>)
- Save the `modules` file and exit the editor (<kbd>control</kbd> + <kbd>X</kbd>)
- Run `$ sudo raspi-config`, open **Interfacing Options** and enable **Camera**:

<img src="{{ site.url }}/content/img/stream-from-your-raspberry-pi-to-amazon-kinesis-02.jpg" />

- Reboot your Raspberry Pi if prompted, or run `$ sudo reboot now`

<h3 id="snap-a-picture" class="has-permalink">Snap a picture<a class="permalink" title="Permalink" href="#snap-a-picture">#</a></h3>

Let's snap a picture to verify that your Raspberry Pi camera is configured correctly. You can do this by using <a target="_blank" href="https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md">raspistill</a>.

- Reconnect to your Raspberry Pi via SSH `$ ssh pi@<YOUR_PI_IP_ADDRESS>`
- Run the following <a target="_blank" href="https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md">raspistill</a> command to take a picture:

```
$  raspistill -o cam.jpg
```

- Check if `cam.jpg` is there! You can simply check your file directory `$ ls` or <a target="_blank" href="https://stackoverflow.com/a/9427585/135441">download the picture via SSH</a>.

Congratulations! This is propably the first photo you've ever taken with your Raspberry Pi and most likely also the most complicated one you've ever taken, yay!

<h2 id="build-the-amazon-kinesis-video-streams-producer-sdk" class="has-permalink">Build the Amazon Kinesis Video Streams Producer SDK<a class="permalink" title="Permalink" href="#build-the-amazon-kinesis-video-streams-producer-sdk">#</a></h2>

You'll be using the <a target="_blank" href="https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp">Amazon Kinesis Video Streams Producer SDK for C++</a> to stream the Raspberry Pi's video to <a target="_blank" href="https://aws.amazon.com/kinesis/video-streams/">Amazon Kinesis Video Streams</a>. In order to that we need to build it first.

<h3 id="install-prerequisites" class="has-permalink">Install prerequisites<a class="permalink" title="Permalink" href="#install-prerequisites">#</a></h3>

There are few build-time tools/dependencies which need to be installed on your Raspberry Pi in order to build the core producer SDK libraries.

- Reconnect to your Raspberry Pi via SSH `$ ssh pi@<YOUR_PI_IP_ADDRESS>`
- Update your package lists and upgrade them to their newest version by running:

```
$ sudo apt-get update
$ sudo apt-get upgrade
```

- Install the build tools <a target="_blank" href="https://cmake.org/">CMake</a>, <a target="_blank" href="https://www.javatpoint.com/yacc">Yacc</a> and <a target="_blank" href="https://openjdk.java.net/">OpenJDK (Open Java Development Kit)</a>:

```
$ sudo apt-get install cmake
$ sudo apt-get install byacc flex
$ sudo apt-get install openjdk-8-jdk
```

- Set the `JAVA_HOME` environment variable:

```
$ export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-armhf/
```

- Create a certificate named `cert.pem`:

```
$  cd /etc/ssl
$  sudo nano cert.pem
```

- Copy and paste the following root certificate from the Amazon Trust Services into `cert.pem`:<br/>
**<a target="_blank" href="https://www.amazontrust.com/repository/SFSRootCAG2.pem">https://www.amazontrust.com/repository/SFSRootCAG2.pem</a>**

<img src="{{ site.url }}/content/img/stream-from-your-raspberry-pi-to-amazon-kinesis-03.jpg" />

- Save the `cert.pem` file and exit the editor (<kbd>control</kbd> + <kbd>X</kbd>)

<h3 id="build-the-producer-sdk" class="has-permalink">Build the Producer SDK<a class="permalink" title="Permalink" href="#build-the-producer-sdk">#</a></h3>

- Install the <a target="_blank" href="https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp/blob/master/install-instructions-linux.md#install-steps-for-ubuntu-17x-and-raspbian-stretch-using-apt-get">Producer library and Gstreamer artifact dependencies</a> to successfully run the `min-install-script` script on Raspbian:

```
$ sudo apt-get install libssl-dev libcurl4-openssl-dev liblog4cplus-1.1-9 liblog4cplus-dev
$ sudo apt-get install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev
$ sudo apt-get install gstreamer1.0-plugins-base-apps gstreamer1.0-plugins-bad gstreamer1.0-plugins-good gstreamer1.0-plugins-ugly gstreamer1.0-tools gstreamer1.0-omx
```

- Download the code from <a target="_blank" href="https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp">GitHub</a>:

```
$ cd /home/pi/Downloads
$ git clone https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp
```

- Change your current working directory to the install directory and run the `min-install-script` script to build the Producer SDK:

```
$ cd amazon-kinesis-video-streams-producer-sdk-cpp/kinesis-video-native-build/
$ ./min-install-script
```

<img src="{{ site.url }}/content/img/stream-from-your-raspberry-pi-to-amazon-kinesis-05.jpg" />

<a target="_blank" href="https://giphy.com/gifs/mrw-week-job-4xpB3eE00FfBm/fullscreen">Success!!!</a>

<h2 id="stream-to-amazon-kinesis-video-streams" class="has-permalink">Stream to Amazon Kinesis Video Streams<a class="permalink" title="Permalink" href="#stream-to-amazon-kinesis-video-streams">#</a></h2>

