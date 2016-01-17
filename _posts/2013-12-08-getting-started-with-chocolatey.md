---
layout: post
navigation: "blog"
title: "Getting started with Chocolatey"
description: "Chocolatey sounds yummy and just like the real deal it can be addictive. But what is it?"
date: 2013-12-08
image: "og-89385df8ea154efcaad8d2caeb19ade2.jpg"
updated: 2014-11-19
---

Chocolatey sounds yummy and just like the real deal it can be addictive. But what is it?

<a target="_blank" href="http://chocolatey.org/">Chocolatey</a> is a package manager, somewhat like <a target="_blank" href="http://en.wikipedia.org/wiki/Advanced_Packaging_Tool">apt-get</a>, but built with Windows in mind. It makes it extremely easy to install Windows applications from a central catalog of installation scripts. With more than 1,300 <a target="_blank" href="http://chocolatey.org/packages">packages</a> and growing all you have to do is type one line in your console and let Chocolatey do the rest for you.

Let me give you an example of what I mean. If you would like to install the latest <a target="_blank" href="http://chocolatey.org/packages/ruby">Ruby</a> package via Chocolatey just type `cinst ruby` in your command line. Yum.

<h2 id="install-chocolatey" class="has-permalink">Install Chocolatey<a class="permalink" title="Permalink" href="#install-chocolatey">#</a></h2>

There are a <a target="_blank" href="https://github.com/chocolatey/chocolatey/wiki/Installation">few ways to install</a> the Chocolatey package manager, but really the easiest method is to open a **Command Prompt** (`Windows Key` + `R` and type `cmd`), copy and paste the line below and press `Enter`.

```
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin
````

So what does that scary line do? Excellent question.

Well, basically it utilizes PowerShell, sets your execution policy to unrestricted, dowloads and executes the script from here <a target="_blank" href="https://chocolatey.org/install.ps1">**https://<i></i>chocolatey.org/install.ps1**</a> and adds Chocolatey to your PATH variable (for this one prompt).

<h2 id="install-a-package" class="has-permalink">Install a package<a class="permalink" title="Permalink" href="#install-a-package">#</a></h2>

Let's install a package. I like <a target="_blank" href="http://redis.io/">Redis</a> so let's do that. Open a command line and execute the command `cinst redis`. Chocolatey should now work its magic and install the <a target="_blank" href="http://chocolatey.org/packages/redis">Redis package</a> for you.

<img src="{{ site.url }}/content/img/getting-started-with-chocolatey-01.gif"/>

All set. <a target="_blank" href="https://github.com/chocolatey/chocolatey/wiki/ChocolateyFAQs#what-is-with-the-chocolatey-gods-in-the-installs">The Chocolatey gods have answered your request</a>.

The Redis package should have also installed a Windows service running Redis Server. Let's double check that using PowerShell.

````
PS > get-service *redis*

Status   Name               DisplayName
------   ----               -----------
Running  redis              Redis Server
````

To uninstall Redis simply run `cuninst redis`.

For a list of all the different things you can pass to Chocolatey check out their <a target="_blank" href="https://github.com/chocolatey/chocolatey/wiki/CommandsReference">command reference</a> wiki.

<h2 id="wrapping-up" class="has-permalink">Wrapping up<a class="permalink" title="Permalink" href="#wrapping-up">#</a></h2>

Just to be clear and a word of warning: Chocolatey is not meant for non-tech savvy people. It is not a full replacement for all installation scenarios, but it is a very powerful tool, and if you're utilizing it properly, Chocolatey can make your developer or administrator life much easier.