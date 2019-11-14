---
layout: post
navigation: "blog"
title: "Install Ruby for Windows"
description: "Ruby is a dynamic, open source programming language with a focus on simplicity and productivity and probably best known for its excellent web application framework Ruby on Rails."
image: "og-X7dy114KWs4.jpg"
date: 2013-08-01
---

<a target="_blank" href="https://www.ruby-lang.org/">Ruby</a> is a dynamic, <a target="_blank" href="https://github.com/ruby/ruby">open source</a> programming language with a focus on simplicity and productivity and probably best known for its excellent web application framework <a target="_blank" href="https://rubyonrails.org/">Ruby on Rails</a>.

If you're a web developer who's always been curious about Ruby and RoR but didn't know where to start (especially because you have a Windows background) this hopefully gets you started.

Head over to <a target="_blank" href="https://rubyinstaller.org/">RubyInstaller for Windows</a> and download the installer <a target="_blank" href="https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-1.9.3-p448.exe?direct">**Ruby 1.9.3-p448**</a>. Choose a folder to install (for me that's `D:\App\Ruby`), check all boxes and install it.

<img src="{{ site.url }}/content/img/install-ruby-for-windows-01.png"/>

To check if Ruby installed correctly, open the Run dialog box (<kbd>Windows Key</kbd> + <kbd>R</kbd>) and type `powershell`. In the PowerShell window type in the command `ruby -v`. If everything went well you should see a message like `ruby 1.9.3p448 (2013-06-27) [i386-mingw32]`.

```
PS > ruby -v
ruby 1.9.3p448 (2013-06-27) [i386-mingw32]
```

<h2 id="development-kit" class="has-permalink">Development Kit<a class="permalink" title="Permalink" href="#development-kit">#</a></h2>

Next install the <a target="_blank" href="https://github.com/oneclick/rubyinstaller/wiki/Development-Kit">Development Kit</a>. Download the right DevKit for your version of Ruby. For version 1.9.3-p448 that's <a target="_blank" href="https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe">**tdm-32-4.5.2**</a>. Extract it to a folder of your choice (e.g. `D:\App\DevKit`) and change to that directory `cd D:\App\DevKit`.

Run the installation scripts by typing the command `ruby dk.rb init` to generate the `config.yml`. After that run the command `ruby dk.rb install` to bind the DevKit to your Ruby installation.

```
PS > cd D:\App\DevKit
PS D:\App\DevKit> ruby dk.rb init
PS D:\App\DevKit> ruby dk.rb install
```

Finally check that your Ruby environment is using the DevKit correctly by running `gem install json --platform=ruby`. This command will install the <a target="_blank" href="http://rubygems.org/">RubyGems</a> library <a target="_blank" href="http://rubygems.org/gems/json">JSON</a>, or gem like the Ruby folks call it.

If you have a .NET background think about RubyGems as something similar to <a target="_blank" href="http://www.nuget.org/">NuGet</a>, or <a target="_blank" href="http://maven.apache.org/">Maven</a> for the Java fanboy.

After JSON installed correctly run `ruby -rubygems -e "require 'json'; puts JSON.load('[42]').inspect"` to confirm that the JSON gem is working. This should show you <a target="_blank" href="https://www.google.com/search?q=the+answer+to+life%2C+the+universe%2C+and+everything">the answer to life, the universe, and everything</a>.

```
PS > gem install json --platform=ruby
PS > ruby -rubygems -e "require 'json'; puts JSON.load('[42]').inspect"
PS > [42]
```
