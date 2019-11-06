---
layout: post
navigation: "blog"
title: "Setup Android SDK in Unity with Android Studio"
description: "To build Unity projects for Android the Android SDK (Software Development Kit) needs to be installed. If you're using Android Studio the SDK will be already part of that installation."
image: "og-QP1dUyQ8WsI.jpg"
date: 2014-09-04
---

To build <a target="_blank" href="https://unity.com/">Unity</a> projects for Android the <a target="_blank" href="http://developer.android.com/sdk/">Android SDK</a> (Software Development Kit) needs to be installed. If you're using <a target="_blank" href="http://developer.android.com/sdk/installing/studio.html">Android Studio</a> the SDK will be already part of that installation.

So far so good, but when Unity asks you to select the Android SDK root folder you'll have a problem because it is part of the Android Studio package and therefore isn't accessible to Unity.

To work around this let's create a symbolic link to the SDK's root folder in our **Applications** root. Open a Terminal window and execute the following command:

```
sudo ln -s /Applications/Android\ Studio.app/sdk /Applications/Android\ SDK
```

The command `ln` used with the option `-s` will create a symbolic link to the SDK location `/Applications/Android\ Studio.app/sdk` as `/Applications/Android\ SDK`.

Note that a backslash `\` before a space (e.g. `\ SDK`) is escaping that space to prevent it from being treated as a separator, hence part of that directory.

Voilà. Now we can select the **Android SDK** root folder when Unity asks us:

<img src="{{ site.url }}/content/img/setup-android-sdk-in-unity-with-android-studio-01.png"/>
