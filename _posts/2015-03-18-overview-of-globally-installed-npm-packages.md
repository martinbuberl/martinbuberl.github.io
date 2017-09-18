---
layout: post
navigation: "blog"
title: "Overview of globally installed npm packages"
description: "Whenever I ask myself “Wait, what npm packages do I have installed globally?“ I find myself baffled to remember the exact command syntax. Everytime."
image: "og-RlYsCMbF6EI.jpg"
date: 2015-03-18
---

Whenever I ask myself “Wait, what [npm packages](https://www.npmjs.com/) do I have installed globally?“ I find myself baffled to remember the exact command syntax. Everytime.

When you do a simple `npm list -g` - hence the `-g` or `--global` operates npm in global mode - it outputs in fact all globally installed packages, but also each and every of their corresponding dependencies. If you're like me and have just a few npm packages installed this will result in a very long list and isn't quite what I'd call an overview.

The magic argument doing the trick is `--depth=0` and instead of searching for it one more time, I'll put it here. For my own convenience and maybe for yours as well.

<h2 id="tldr" class="has-permalink">tl;dr<a class="permalink" title="Permalink" href="#tldr">#</a></h2>

```
npm list -g --depth=0
```

An alternative to get an overview of globally installed npm packages is ``ls `npm root -g` ``, but that won't return the respective package versions. That's why I prefer the command above.
