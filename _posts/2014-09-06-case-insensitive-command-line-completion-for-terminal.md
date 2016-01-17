---
layout: post
navigation: "blog"
title: "Case insensitive command-line completion for Terminal"
description: "You might call me stubborn - coming from a strong Windows background - but I find it annoying that OS X's Terminal is case sensitive if it comes to command-line completion."
image: "og-4f71b3607f1c4881853047e9d97b1bb1.jpg"
date: 2014-09-06
updated: 2014-09-18
---

You might call me stubborn - coming from a strong Windows background - but I find it annoying that **OS X's Terminal** is case sensitive if it comes to <a target="_blank" href="http://en.wikipedia.org/wiki/Command-line_completion">command-line completion</a>.

You can change its behavior to case insensitive by putting the following line into a file `.inputrc` in your home directory `~/`:

```
set completion-ignore-case On
```

Or you could just open a Terminal window (<kbd>Command</kbd> + <kbd>Space</kbd> and type `Terminal`) and execute the following command (which does exactly the same):

```
echo "set completion-ignore-case On" >> ~/.inputrc
```

Now your Terminal's command-line completion is set to be case insensitive.

Note that you'll need to open a new Terminal window for the changes to be effective.