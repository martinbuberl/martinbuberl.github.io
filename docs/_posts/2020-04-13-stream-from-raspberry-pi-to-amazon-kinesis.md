---
layout: post
navigation: "blog"
title: "Stream from Raspberry Pi to Amazon Kinesis"
description: "At the end of this tutorial you'll be able to video stream from your Raspberry Pi to Amazon Kinesis."
image: "og-c3YpscwJb04.jpg"
date: 2020-04-13
---

At the end of this tutorial you'll be able to video stream from your Raspberry Pi to <a target="_blank" href="https://aws.amazon.com/kinesis/video-streams/">Amazon Kinesis</a>.


If you haven't already, [setup a headless Raspberry Pi]({{ site.url }}/blog/setup-headless-raspberry-pi/). For this tutorial I'm using a <a target="_blank" href="https://www.raspberrypi.org/products/raspberry-pi-3-model-b/">Raspberry Pi 3 Model B</a> with the <a target="_blank" href="https://www.raspberrypi.org/products/camera-module-v2/">Camera Module V2</a> running <a target="_blank" href="https://www.raspberrypi.org/downloads/raspbian/">Raspian with Desktop</a> *(currently, that's Raspian Buster version: February 2020)*.

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

You'll be using the <a target="_blank" href="https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp">Amazon Kinesis Video Streams Producer SDK for C++</a> to stream the Raspberry Pi's video to <a target="_blank" href="https://aws.amazon.com/kinesis/video-streams/">Amazon Kinesis Video Streams</a>. In order to do that we need to build it first.

<h3 id="install-prerequisites" class="has-permalink">Install prerequisites<a class="permalink" title="Permalink" href="#install-prerequisites">#</a></h3>

There are a few build-time tools/dependencies which need to be installed on your Raspberry Pi in order to build the core producer SDK libraries.

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
$ git clone --branch '2.1.0' https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp
```
(you should take version 2.1.0 to make it work since there is a new folders' structure and build tactics since version 3.0)

- Change your current working directory to the install directory and run the `min-install-script` script to build the Producer SDK:

```
$ cd amazon-kinesis-video-streams-producer-sdk-cpp/kinesis-video-native-build/
$ ./min-install-script
```

<img src="{{ site.url }}/content/img/stream-from-your-raspberry-pi-to-amazon-kinesis-05.jpg" />

<a target="_blank" href="https://giphy.com/gifs/mrw-week-job-4xpB3eE00FfBm/fullscreen">Success!!!</a>

<h3 id="setup-kvssink" class="has-permalink">Setup kvssink<a class="permalink" title="Permalink" href="#setup-kvssink">#</a></h3>

We need to adjust the path so that Gstreamer can refer to `libgstkvssink.so`. **kvssink** is the sink (final destination of the pipeline) to send video to the Producer SDK.

- You can do that by running the following commands:

```
$ export LD_LIBRARY_PATH=/home/pi/Downloads/amazon-kinesis-video-streams-producer-sdk-cpp/kinesis-video-native-build/downloads/local/lib:$LD_LIBRARY_PATH
$ export GST_PLUGIN_PATH=/home/pi/Downloads/amazon-kinesis-video-streams-producer-sdk-cpp/kinesis-video-native-build/downloads/local/lib:$GST_PLUGIN_PATH
$ mkdir /home/pi/Downloads/amazon-kinesis-video-streams-producer-sdk-cpp/kinesis-video-native-build/downloads/local/lib/gstreamer-1.0/
$ cp -p /home/pi/Downloads/amazon-kinesis-video-streams-producer-sdk-cpp/kinesis-video-native-build/libgstkvssink.so /home/pi/Downloads/amazon-kinesis-video-streams-producer-sdk-cpp/kinesis-video-native-build/downloads/local/lib/gstreamer-1.0/
```


<h2 id="stream-to-amazon-kinesis-video-streams" class="has-permalink">Stream to Amazon Kinesis Video Streams<a class="permalink" title="Permalink" href="#stream-to-amazon-kinesis-video-streams">#</a></h2>

<a target="_blank" href="https://console.aws.amazon.com/kinesisvideo/streams/create?region=us-east-1">Create a Kinesis video stream</a> in your AWS Management Console in the region **US East (N. Virginia)** `us-east-1` with the name `raspberry` using the **Default configuration**.

<img src="{{ site.url }}/content/img/stream-from-your-raspberry-pi-to-amazon-kinesis-06.jpg" />

Create an IAM user `raspberry` with the access type **programmatic access** and attach the **AmazonKinesisVideoStreamsFullAccess** policy (or the appropriate privileges for your AWS account).

Store this user's **access key ID** and **secret access key** in a safe place as we'll need those later.

<h3 id="setup-kvssink" class="has-permalink">Stream using Gstreamer<a class="permalink" title="Permalink" href="#setup-kvssink">#</a></h3>

Run `gst-launch-1.0` with the following options, but make sure to replace `YOUR_ACCESS_KEY` and `YOUR_SECRET_KEY` with your actual keys:

```
gst-launch-1.0 v4l2src device=/dev/video0 \
! videoconvert \
! video/x-raw,format=I420,width=640,height=480 \
! omxh264enc control-rate=2 target-bitrate=512000 periodicity-idr=45 inline-header=FALSE \
! h264parse ! video/x-h264,stream-format=avc,alignment=au,profile=baseline \
! kvssink stream-name="raspberry" \
access-key="YOUR_ACCESS_KEY" \
secret-key="YOUR_SECRET_KEY" \
aws-region="us-east-1"
```

<h3 id="verify-the-stream" class="has-permalink">Verify the stream<a class="permalink" title="Permalink" href="#verify-the-stream">#</a></h3>

Open the **Media playback** section of your Kinesis Video Streams' stream `raspberry` in the <a target="_blank" href="https://console.aws.amazon.com/kinesisvideo/streams/streamName/raspberry?region=us-east-1">AWS Management Console</a> to verify that the camera input is successfully sent to Amazon Kinesis.

<img src="{{ site.url }}/content/img/stream-from-your-raspberry-pi-to-amazon-kinesis-07.jpg" />
