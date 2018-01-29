Install Raspbian on the Raspberry Pi
------------------------------------

- Download the latest version of Raspbian
https://www.raspberrypi.org/downloads/raspbian/
- Put your micro SD card into your computer
- Open the Disk Utility
- Format the SD card to MS-DOS (FAT-32) 
- Rename the card tp RASPBIAN
- Use [Etcher](https://etcher.io/) to burn the image to the SD card


Setup Raspberry Pi
------------------

Connect 7" touchscreen

Connect to WIFI

Go to "Raspberry Pi Configuration" > "Interfaces" and enable SSH and VNC

Get IP address of Raspberry Pi:
Terminal > `hostname -I`: 192.168.86.37

Connect from Mac via VNC
https://www.realvnc.com/en/connect/download/viewer/

Default user: pi
Default password: raspberry

Disconnect touchscreen


SSH into Raspberry Pi
---------------------

ssh pi@192.168.86.37


Setup TensorFlow
----------------

https://github.com/samjabrahams/tensorflow-on-raspberry-pi/blob/master/GUIDE.md

sudo apt-get update


Some Pi wisdom
--------------

sudo raspi-config
sudo poweroff
sudo reboot
