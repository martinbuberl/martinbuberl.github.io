---
layout: post
navigation: "blog"
title: "Deploy ASP.NET MVC on Amazon EC2 with Web Deploy"
description: "If you're still using FTP to deploy your web application or site to IIS (Internet Information Services) - you're doing it wrong."
image: "og-OIVuAKXW9VA.jpg"
date: 2014-02-05
updated: 2014-09-12
---

If you're still using FTP to deploy your web application or site to IIS (Internet Information Services) - <a target="_blank" href="http://imgur.com/UowWBQA">you're doing it wrong</a>.

I thought that every .NET developer would know about <a target="_blank" href="http://www.iis.net/downloads/microsoft/web-deploy">Web Deploy</a>, but I just recently learned that's not necessarily true. So what exactly is Web Deploy and how does it work?

In a nutshell, Web Deploy simplifies the deployment of web applications to an IIS web server by synchronizing it with your local version.

Note that it is an extension on top of IIS and not the technology stack you're using (ASP.NET, PHP etc.). That means it will help you to streamline your deployment process no matter what you're developing in as long as the web server you want to deploy to is IIS.

In this post I'll run you through a step-by-step example of deploying a standard <a target="_blank" href="http://www.asp.net/mvc">ASP.NET MVC</a> application with Web Deploy from <a target="_blank" href="http://www.visualstudio.com/">Visual Studio</a> to an IIS web server running on <a target="_blank" href="http://aws.amazon.com/ec2/">Amazon EC2</a>.

Sounds good? Let's get started then.

<h2 id="create-ec2-instance" class="has-permalink">Create EC2 instance<a class="permalink" title="Permalink" href="#create-ec2-instance">#</a></h2>

If you don't already have an AWS account, go ahead and <a target="_blank" href="https://portal.aws.amazon.com/gp/aws/developer/registration/index.html">sign up</a>. Amazon offers a <a target="_blank" href="http://aws.amazon.com/free/">Free Usage Tier</a> to get you started in the cloud, which includes 750 hours of Windows Micro Instances on EC2 each month for one year.

Once you're signed in, open the <a target="_blank" href="https://console.aws.amazon.com/ec2">EC2 Management Console</a>, go to **Instances** and select **Launch Instance**. In the **Quick Start** tab select **Microsoft Windows Server 2012 Base** as the Amazon Machine Image (AMI).

For this tutorial you can just stick with the instance default settings, but at the step **Configure Security Group** create a **new** security group (e.g. `webdeploy-tutorial`) and add two rules:

Protocol **HTTP** with port `80` and a **Custom TCP Rule** with port `8172` (that's the port Web Deploy is listening on).

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-01.png" />

<h3 id="review-and-launch-your-instance" class="has-permalink">Review and launch your instance<a class="permalink" title="Permalink" href="#review-and-launch-your-instance">#</a></h3>

Before the instance launches AWS will ask you to **select an existing key pair or create a new key pair**. For Windows AMIs, the private key file `.pem` is required to obtain the password used to log into your instance. Make sure to download it before you continue. **You won't be able to download the file again after it's created.**

<h3 id="connect-to-windows-server-via-remote-desktop" class="has-permalink">Connect to Windows Server via Remote Desktop<a class="permalink" title="Permalink" href="#connect-to-windows-server-via-remote-desktop">#</a></h3>

Once the instance is created, select it in the EC2 Management Console and click on the **Connect** button. Follow the instructions to retrieve the `Administrator` password and download the **Remote Desktop File**.

Remote connect to the server instance using that `.rdp` file and enter your credentials.

<h2 id="install-web-deploy" class="has-permalink">Install Web Deploy<a class="permalink" title="Permalink" href="#install-web-deploy">#</a></h2>

On a fresh Windows Server instance **Internet Explorer** is the only installed browser, and furthermore it's configured by default with **Enhanced Security Configuration** enabled, so you can't just browse ahead and download something.

Don't get me wrong - that's generally a good thing for various security reasons - but it's a <a target="_blank" href="http://imgur.com/gallery/1VIbP">pain in the butt</a> if you want to write a step-by-step tutorial.

Thankfully there are plenty of ways to <a target="_blank" href="http://superuser.com/q/387501">download or share files on a Windows Server</a>. Personally I prefer to download first to my local machine and just copy and paste the files via Remote Desktop's clipboard sharing, but do whatever suits you best.

<h3 id="install-web-platform-installer" class="has-permalink">Install Web Platform Installer<a class="permalink" title="Permalink" href="#install-web-platform-installer">#</a></h3>

We're going to install Web Deploy via Microsoft's Web Platform Installer. The Web PI is a simple tool that automates the installation of Microsoft's entire Web Platform.

Browse to `http://www.microsoft.com/web/downloads/platform.aspx` and download the <a target="_blank" href="http://www.microsoft.com/web/downloads/platform.aspx">Microsoft Web Platform Installer</a>.

Run the `wpilauncher.exe` file to install the Web Platform Installer on your server.

<h3 id="install-web-deploy-for-hosting-server" class="has-permalink">Install Web Deploy for Hosting Server<a class="permalink" title="Permalink" href="#install-web-deploy-for-hosting-server">#</a></h3>

Now let's install Web Deploy. Open the Web Platform Installer, search for `web deploy`, select **Web Deploy 3.5 for Hosting Servers**, click **Add** and **Install**.

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-02.png" />

This will take a few minutes and most likely also install some depending products.

<h2 id="setup-web-server-(iis)" class="has-permalink">Setup web server (IIS)<a class="permalink" title="Permalink" href="#setup-web-server-(iis)">#</a></h2>

We're going to deploy an <a target="_blank" href="http://www.asp.net/mvc/mvc4">ASP.NET MVC 4</a> project, so we need to additionally install the **.NET Framework 4.5 Features** on this web server.

Otherwise you'll end up with a `500 Internal Server Error` or to be specific:

<blockquote>HTTP Error 500.21 - Internal Server Error<br/>Handler "ExtensionlessUrlHandler-Integrated-4.0" has a bad module "ManagedPipelineHandler" in its module list</blockquote>

To install the .NET Framework 4.5 Features, open the **Server Manager** and go to **Server Roles**. Navigate to **Web Server (IIS) > Web Server > Application Development**, select **.NET Extensibility 3.5** and **ASP.NET 4.5** and click **Install**. Voilà.

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-03.png" />

<h3 id="add-a-new-website" class="has-permalink">Add a new website<a class="permalink" title="Permalink" href="#add-a-new-website">#</a></h3>

First create a new directory `C:\www\webdeploy-tutorial`.

Next, open the **Internet Information Services (IIS) Manager** (`Windows Key` + `Q` and type `iis`). Stop the **Default Web Site** and add a new website `webdeploy-tutorial` pointing to that directory.

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-04.png" />

<h2 id="create-asp.net-mvc-project" class="has-permalink">Create ASP.NET MVC project<a class="permalink" title="Permalink" href="#create-asp.net-mvc-project">#</a></h2>

Back on your local machine open **Visual Studio** and create a new **ASP.NET MVC 4 Web Application** with the name `webdeploy-tutorial` and choose **Internet Application** as your template.

<h2 id="publish-via-web-deploy" class="has-permalink">Publish via Web Deploy<a class="permalink" title="Permalink" href="#publish-via-web-deploy">#</a></h2>

Now that you've made it this far we can finally get to the good stuff and use Web Deploy.

In **Visual Studio**, select the project in the **Solution Explorer** and either right-click it and select **Publish...** or in the navigation bar select **BUILD** and then **Publish webdeploy-tutorial**.

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-05.png" />

You should now see a new window **Publish Web**.

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-06.png" />

Click on the drop-down list and select **&lt;New Profile...&gt;**, enter a profile name `webdeploy-tutorial` - you guessed it - and click **OK**.

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-07.png" />

On the **Connection** screen you'll have to provide the connection details of the EC2 Windows Server instance and the name of the IIS website you want to deploy to.

Use your EC2 instance's **Public DNS** for the **Server** field (e.g. `ec2-54-211-203-178.compute-1.amazonaws.com`). The **Site name** is the actual name of your website in IIS, so in our case `webdeploy-tutorial`.

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-08.png" />

Press **Validate Connection**.

You'll most certainly get a warning about the security certificate:

<blockquote>The security certificate presented by this server (ec2-54-211-203-178.compute-1.amazonaws.com) was issued to a different server<br/>The security certificate presented by this server was not issued by a trusted certificate authority</blockquote>

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-09.png" />

Take note of the warning, check **Save this certificate for future sessions of Visual Studio** and click **Accept**.

I particularly mean "take note" and not ignore it. Even if they are sometimes annoying or you've seen the same warning already a million times, notice them, skim over them and then make a decision. Never just ignore something and click ahead.

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-10.png" />

Now that your connection settings are validated you can click the **Publish** button.

You'll notice some Web Deploy specific activity in your **Output** window. I formatted  the output a bit and reduced the noise so that we can better see what's going on here:

```
------ Build started: Project: webdeploy-tutorial, Configuration: Release Any CPU
------ Publish started: Project: webdeploy-tutorial, Configuration: Release Any CPU

Transformed Web.config.
Auto ConnectionString Transformed.
Start Web Deploy Publish the Application/package to
  https://ec2-54-211-203-178.compute-1.amazonaws.com:8172/msdeploy.axd?site=webdeploy-tutorial
Publish Succeeded.

====== Build: 1 succeeded, 0 failed, 0 up-to-date, 0 skipped
====== Publish: 1 succeeded, 0 failed, 0 skipped
```

As you can see, first the project gets built as `Release`. You can change the configuration in Web Deploy's **Settings** screen.

Then it transforms your `Web.config` file with the transformation actions defined in your `Web.Release.config`. You can read more about Web.config file transformations and how they work <a target="_blank" href="http://www.asp.net/mvc/tutorials/deployment/visual-studio-web-deployment/web-config-transformations">here</a>.

The next line `Auto ConnectionString Transformed.` isn't really relevant in our scenario, but Web Deploy offers an additional process of changing the connection string in your `Web.config` file along the file transformations. Again, you can play around with it in Web Deploy's **Settings** screen under **Databases**.

Finally it starts the **Web Deploy Publish** process and deploys the project to our IIS web server on the EC2 server at `https://ec2-54-211-203-178.compute-1.amazonaws.com:8172/msdeploy.axd?site=webdeploy-tutorial`.

<img src="{{ site.url }}/content/img/deploy-aspnet-mvc-on-amazon-ec2-with-web-deploy-11.png" />

<h2 id="wrapping-it-up" class="has-permalink">Wrapping it up<a class="permalink" title="Permalink" href="#wrapping-it-up">#</a></h2>

So why is <a target="_blank" href="http://www.iis.net/downloads/microsoft/web-deploy">Web Deploy</a> so much more convenient than using good old <a target="_blank" href="http://en.wikipedia.org/wiki/File_Transfer_Protocol">FTP</a>?

Well, it's actually really easy to setup and once it is, you can build and deploy your web application with a single click. Whereby Web Deploy does all the heavy lifting by taking care of your automation process and file transformations. It also makes sure that all of your files on the web server are in sync with your local version and only relevant files are getting deployed.

So if you're not already using Web Deploy, give it a try. You'll love it.