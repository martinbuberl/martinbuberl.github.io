---
layout: post
navigation: "blog"
title: "Backup Amazon S3 bucket with AWS CLI"
description: "If you want to backup or download an entire Amazon S3 bucket you'll probably notice that this isn't possible through the AWS Management Console. Fortunately this is super easy using the AWS Command Line Interface (CLI)."
image: "og-mnF75FoPBWY.jpg"
date: 2014-05-02
---

If you want to backup or download an entire <a target="_blank" href="https://aws.amazon.com/s3/">Amazon S3</a> bucket you'll probably notice that this isn't possible through the AWS Management Console. Fortunately this is super easy using the <a target="_blank" href="https://aws.amazon.com/cli/">AWS Command Line Interface (CLI)</a>.

<h2 id="install" class="has-permalink">Install<a class="permalink" title="Permalink" href="#install">#</a></h2>

First download and install the AWS CLI on your system:

- <a target="_blank" href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html#install-msi-on-windows">Install the AWS CLI using the MSI Installer (Windows)</a>
- <a target="_blank" href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html#install-bundle-other-os">Install the AWS CLI using the Bundled Installer (Linux, OS X, or Unix)</a>

To make sure that the AWS CLI installed correctly, open the command prompt and type `aws help`. You should see the help displayed.

<h2 id="configure" class="has-permalink">Configure<a class="permalink" title="Permalink" href="#configure">#</a></h2>

Next, configure the CLI at least with the <a target="_blank" href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html">minimal configuration</a>. In your command prompt, type `aws configure` and set the values for your AWS access keys, the default region name (e.g `us-east-1`) and your default output format `json`:

```
> aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

<h2 id="sync" class="has-permalink">Sync<a class="permalink" title="Permalink" href="#sync">#</a></h2>

Once, that is done you can go ahead and backup these precious buckets. Use the <a target="_blank" href="https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html">`s3 sync`</a> command to do so. For instance type `aws s3 sync s3://yourbucket .` in the CLI:

```
> aws s3 sync s3://yourbucket .
download: s3://yourbucket/001.tgz to 001.tgz
download: s3://yourbucket/002.tgz to 002.tgz
download: s3://yourbucket/003.tgz to 003.tgz
...
```

This will download all of your files and directories within that bucket.
