---
layout: post
navigation: "blog"
title: "TortoiseGit icons not showing workaround"
description: "Sometimes the TortoiseGit overlay icons are just not showing up in Windows Explorer. While this issue is officially still open, there are workarounds to make it happen."
image: "og-FOeDIUwYiSw.jpg"
date: 2014-11-19
---

Sometimes the <a target="_blank" href="https://code.google.com/p/tortoisegit/">TortoiseGit</a> overlay icons are just not showing up in Windows Explorer. While this issue <a target="_blank" href="https://code.google.com/p/tortoisegit/issues/detail?id=692">is officially still open</a>, there are workarounds to make it happen.

The following steps worked for me on **Windows 7** and **Windows 8**:

<h2 id="increase-shell-icon-cache" class="has-permalink">Increase shell icon cache<a class="permalink" title="Permalink" href="#increase-shell-icon-cache">#</a></h2>

- Open the **Registry Editor** (`Windows Key` + `R` and type `regedit`).
- Navigate to the following registry key:

```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer
```

- Add a new **String Value** named `Max Cached Icons` with the value data `2000`. Note that if it exists already, just update the value data to `2000`.

<h2 id="rename-shell-icon-overlay-identifiers" class="has-permalink">Rename shell icon overlay identifiers<a class="permalink" title="Permalink" href="#rename-shell-icon-overlay-identifiers">#</a></h2>

- Open the **Registry Editor** (`Windows Key` + `R` and type `regedit`).
- Navigate to the following registry key:

```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers
```

- Rename all Tortoise **Key** names by escaping them in double quotes (`"`):

| Key name (before)      | Key name (after)         |
| ---------------------- | ------------------------ |
| `1TortoiseNormal`      | `"1TortoiseNormal"`      |
| `2TortoiseModified`    | `"2TortoiseModified"`    |
| `3TortoiseConflict`    | `"3TortoiseConflict"`    |
| `4TortoiseLocked`      | `"4TortoiseLocked"`      |
| `5TortoiseReadOnly`    | `"5TortoiseReadOnly"`    |
| `6TortoiseDeleted`     | `"6TortoiseDeleted"`     |
| `7TortoiseAdded`       | `"7TortoiseAdded"`       |
| `8TortoiseIgnored`     | `"8TortoiseIgnored"`     |
| `9TortoiseUnversioned` | `"9TortoiseUnversioned"` |

<h2 id="restart-windows-explorer" class="has-permalink">Restart Windows Explorer<a class="permalink" title="Permalink" href="#restart-windows-explorer">#</a></h2>

- Open the **Task Manager** and end all **explorer.exe** processes.
- Keep the Task Manager open, and navigate to **File** > **Run new task**.
- Type `explorer` into the **Run** dialog box to restart Windows Explorer.

Alternatively, just restart Windows.