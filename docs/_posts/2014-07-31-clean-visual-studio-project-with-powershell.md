---
layout: post
navigation: "blog"
title: "Clean Visual Studio workspace with PowerShell"
description: "When working in Visual Studio all sorts of temporary files get created in your workspace. From user specific *.suo, *.user and *.docstates files, to the build results in the bin/ and obj/ directories up to extension specific files for e.g. ReSharper."
image: "og-9EwxGJdTJNo.jpg"
date: 2014-07-31
---

When working in Visual Studio all sorts of temporary files get created in your workspace. From user specific `*.suo`, `*.user` and `*.docstates` files, to the build results in the `bin/` and `obj/` directories up to extension specific files for e.g. <a target="_blank" href="https://jetbrains.com/resharper/">ReSharper</a>. Just to name a few.

To get the situation under control again two things are necessary:

- A good <a target="_blank" href="https://github.com/github/gitignore/blob/master/VisualStudio.gitignore">`.gitignore`</a> file (or the equivalent for the source control of your choice)
- A script to wipe all temporary and unwanted files for a truly clean repository

Running Visual Studio's **Clean Solution** command doesn't do the trick. It's not configurable, only removes build artefacts and <a target="_blank" href="https://stackoverflow.com/a/3095935/135441">isn't even reliable</a> in doing that always for good.

So, if you run into an odd issue and just want to compile a truly clean solution from scratch, **Clean Solution** just isn't an option.

<h2 id="clean-script" class="has-permalink">Clean script<a class="permalink" title="Permalink" href="#clean-script">#</a></h2>

One of my all-time lifesaver scripts that I use quite frequently is this little PowerShell gem:

```
# Define files and directories to delete
$include = @("*.suo","*.user","*.cache","*.docstates","bin","obj","build")

# Define files and directories to exclude
$exclude = @()

$items = Get-ChildItem . -recurse -force -include $include -exclude $exclude

if ($items) {
    foreach ($item in $items) {
        Remove-Item $item.FullName -Force -Recurse -ErrorAction SilentlyContinue
        Write-Host "Deleted" $item.FullName
    }
}

Write-Host "Press any key to continue . . ."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
```

Placed in the root of your repository as `clean.ps1` you can execute it whenever you feel dirty (right mouse click and **Run with PowerShell**). Note that in order to run the script you might need to change your <a target="_blank" href="https://technet.microsoft.com/en-us/library/hh849812.aspx">PowerShell script execution policy</a>.

Let's have a quick look of what it does, shall we?

The variable `$include` holds an array of path elements or patterns to delete, such as `*.suo`. Wildcards are permitted.

The variable `$exclude` holds an array of path elements or patterns to omit within the defined scope for deletion. It's empty in the example above but it could look like this:

```
$exclude = @("ConnectionStrings.config.user")
```

The Cmdlet <a target="_blank" href="https://technet.microsoft.com/en-us/library/hh849800.aspx">`Get-ChildItem`</a> gets all the items and child items for the specified locations. Note that we're passing the `$include` and `$exclude` arrays as parameters.

```
Get-ChildItem . -recurse -force -include $include -exclude $exclude
```

Next, it loops over all of these items and deletes them one by one using <a target="_blank" href="https://technet.microsoft.com/en-us/library/hh849765.aspx">`Remove-Item`</a>.

```
Remove-Item $item.FullName -Force -Recurse -ErrorAction SilentlyContinue
```

The last line is not necessary and really just a preference of mine - how I usually execute it - so that the script <a target="_blank" href="https://technet.microsoft.com/en-us/library/ff730938.aspx">pauses until you press any key</a> on the keyboard.

```
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
```

You can find the code on <a target="_blank" href="https://github.com/martinbuberl/CleanVisualStudio">GitHub</a>.
