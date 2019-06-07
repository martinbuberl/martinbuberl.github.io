---
layout: post
navigation: "blog"
title: "Install Node.js for Windows"
description: "Node.js is a platform built on Chrome's V8 JavaScript engine for easily building fast and scalable network (especially server-side) applications."
image: "og-8WClaa1CmZ0.jpg"
date: 2013-09-23
---

<a target="_blank" href="http://nodejs.org/">Node.js</a> is a platform built on <a target="_blank" href="https://code.google.com/p/v8/">Chrome's V8 JavaScript engine</a> for easily building fast and scalable network (especially server-side) applications.

<h2 id="install-node.js" class="has-permalink">Install Node.js<a class="permalink" title="Permalink" href="#install-node.js">#</a></h2>

Installing Node.js for Windows these days is super simple. Just download the <a target="_blank" href="http://nodejs.org/download/">Windows Installer</a> and install it with the default features to a directory of your choice. That's it.

<img src="{{ site.url }}/content/img/install-nodejs-for-windows-01.png"/>

Note that in most cases <a target="_blank" href="http://stackoverflow.com/a/12522696/135441">it shouldn't make a difference</a> if you pick the 32 or 64-bit version.

To check if Node.js installed correctly, open a PowerShell window or - if you're feeling nostalgic - a Command Prompt window and simply type `node`.

    PS > node
    >

You are now in an interactive Node.js shell and can start typing JavaScript commands. For instance try typing `3+2`. That's right, you could use Node.js as a fancy calculator. Sweet.

    PS > node
    > 3+2
    5

To exit the shell at any time press `Ctrl` + `C`.

<h2 id="hello-world" class="has-permalink">Hello World<a class="permalink" title="Permalink" href="#hello-world">#</a></h2>

Of course usually you want to put your JavaScript code into a file and execute it with Node.js. So let's just jump in the water and write a simple <a target="_blank" href="http://en.wikipedia.org/wiki/Hello_world_program">"Hello World"</a> program.

Open your favorite text editor, create a file `helloworld.js` and add the following line of code:

    console.log("Hello World");

Save the file in the same directory where you installed Node.js and execute it with the `node` program through `node helloworld.js`.

    PS > node helloworld.js
    Hello World