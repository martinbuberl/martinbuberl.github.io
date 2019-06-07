---
layout: post
navigation: "blog"
title: "Invert Windows scroll direction"
description: "I'm running Windows 8 on a Macbook Pro via Boot Camp. One thing you'll notice - and it will quickly become annoying if you switch back and forth a lot - is that the trackpad's scroll direction on Windows is the opposite of OS X."
image: "og-liiqOto_Dw8.jpg"
date: 2014-09-03
---

I'm running Windows 8 on a Macbook Pro via <a target="_blank" href="http://en.wikipedia.org/wiki/Boot_Camp_(software)">Boot Camp</a>. One thing you'll notice - and it will quickly become annoying if you switch back and forth a lot - is that the trackpad's scroll direction on Windows is the opposite of OS X.

OS X is basically imitating a touchscreen whereby you push the page up to scroll down and vice versa to scroll up. That's perfectly fine and my prefered behavior.

To change the scroll direction in Windows, open a PowerShell window as Administrator <a target="_blank" href="http://technet.microsoft.com/en-us/library/hh847889.aspx">`Start-Process PowerShell -Verb RunAs`</a> and execute the following <a target="_blank" href="http://superuser.com/a/364353/65993">command</a>:

```
Get-ItemProperty HKLM:\SYSTEM\CurrentControlSet\Enum\HID\*\*\Device` Parameters FlipFlopWheel -EA 0 | ForEach-Object { Set-ItemProperty $_.PSPath FlipFlopWheel 1 }
```

That's it. The trackpad's scroll direction on Windows and OS X are now the same.

<a target="_blank" href="https://twitter.com/intent/tweet?text=.%40martinbuberl%20I%20liked%20your%20Windows%20tip,%20but%20mine%20is%20better:%20">Let me know</a> your favorite Windows tweak, tip or trick.

