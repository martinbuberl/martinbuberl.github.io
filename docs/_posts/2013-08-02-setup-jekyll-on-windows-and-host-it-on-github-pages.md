---
layout: post
navigation: "blog"
title: Setup Jekyll on Windows and host it on GitHub Pages
description: "Jekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through converters like Markdown and Liquid, and spits out a complete, ready-to-publish static website for your favorite web server."
image: "og-xiTFENI0dMY.jpg"
date: 2013-08-02
updated: 2015-02-27
---

<a target="_blank" href="https://jekyllrb.com/">Jekyll</a> is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through converters like <a target="_blank" href="https://daringfireball.net/projects/markdown/">Markdown</a> and <a target="_blank" href="https://github.com/Shopify/liquid/wiki">Liquid</a>, and spits out a complete, ready-to-publish static website for your favorite web server.

Jekyll also happens to be the engine behind <a target="_blank" href="https://pages.github.com/">GitHub Pages</a>, which means you can host your project's page, blog, or website from GitHub's servers for free. <a target="_blank" href="https://imgur.com/1ZOdv">Rawr!!!</a>

<h2 id="install-jekyll" class="has-permalink">Install Jekyll<a class="permalink" title="Permalink" href="#install-jekyll">#</a></h2>

Before you start, make sure that [Ruby and the DevKit are installed]({{ site.url }}/blog/install-ruby-for-windows/) on your Windows machine. Also check the <a target="_blank" href="https://pages.github.com/versions/">Jekyll version GitHub Pages is running</a>. Currently that's version 1.0.3.

Open PowerShell (`Windows Key` + `R` and type `powershell`) and install Jekyll by running the command `gem install jekyll -v 1.0.3`.

```
PS > gem install jekyll -v 1.0.3
Fetching: jekyll-1.0.3.gem (100%)
Successfully installed jekyll-1.0.3
1 gem installed
Installing ri documentation for jekyll-1.0.3...
Installing RDoc documentation for jekyll-1.0.3...
```

<h2 id="create-github-repository" class="has-permalink">Create GitHub repository<a class="permalink" title="Permalink" href="#create-github-repository">#</a></h2>

Open GitHub and <a target="_blank" href="https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-new-repository">create a new repository</a> named `username.github.io`. Note that `username` must be your own account's username or <a target="_blank" href="https://help.github.com/en/github/working-with-github-pages/about-github-pages#types-of-github-pages-sites">Pages will not build</a>. Make sure you don't initialize your repository with a README file.

<img src="{{ site.url }}/content/img/setup-jekyll-on-windows-and-host-it-on-github-pages-01.png" />

Next change to your desired working directory (e.g `cd D:\Work`) and <a target="_blank" href="https://git-scm.com/docs/git-clone">clone</a> your new GitHub repository locally `git clone https://github.com/martinbuberl/martinbuberl.github.io.git`.

```
PS > cd D:\Work
PS D:\Work> git clone https://github.com/martinbuberl/martinbuberl.github.io.git
Cloning into 'martinbuberl.github.io.git'...
warning: You appear to have cloned an empty repository.
```

<h2 id="create-jekyll-site" class="has-permalink">Create Jekyll site<a class="permalink" title="Permalink" href="#create-jekyll-site">#</a></h2>

To create a new Jekyll site in your repository directory run the command `jekyll new martinbuberl.github.io`.

```
PS > cd D:\Work
PS D:\Work> jekyll new martinbuberl.github.io
New jekyll site installed in D:/Work/martinbuberl.github.io.
```

<img src="{{ site.url }}/content/img/setup-jekyll-on-windows-and-host-it-on-github-pages-02.png" />

Next open the file `_config.yml` and change the line `pygments: true` to `pygments: false`. <a target="_blank" href="https://pygments.org/">Pygments</a> is a <a target="_blank" href="https://www.python.org/">Python</a> syntax highlighter and for the sake of simplicity we'll ignore it for now.

```
name: Your New Jekyll Site
pygments: false
```

<h2 id="run-jekyll-locally" class="has-permalink">Run Jekyll locally<a class="permalink" title="Permalink" href="#run-jekyll-locally">#</a></h2>

Head back to PowerShell and switch to your repository directory where you just installed Jekyll `cd D:\Work\martinbuberl.github.io`. Run the command `jekyll serve`. This will generate your static site into the folder `_site` and start Jekyll's built in server.

```
PS > cd D:\Work\martinbuberl.github.io
PS D:\Work\martinbuberl.github.io> jekyll serve
Configuration file: D:/Work/martinbuberl.github.io/_config.yml
            Source: D:/Work/martinbuberl.github.io
       Destination: D:/Work/martinbuberl.github.io/_site
      Generating... done.
```

Now open a browser, go to **http://<i></i>localhost:4000/** and check out your new Jekyll site running locally. Note that you can stop the server at any time with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

<img src="{{ site.url }}/content/img/setup-jekyll-on-windows-and-host-it-on-github-pages-03.png" />

<h2 id="publish-jekyll-on-github-pages" class="has-permalink">Publish Jekyll on GitHub Pages<a class="permalink" title="Permalink" href="#publish-jekyll-on-github-pages">#</a></h2>

Switch to your repository directory `cd D:\Work\martinbuberl.github.io` and run the Git commands to <a target="_blank" href="https://git-scm.com/docs/git-add">add</a> `git add --all`, <a target="_blank" href="https://git-scm.com/docs/git-commit">commit</a> `git commit -m "Initial commit"` and <a target="_blank" href="https://git-scm.com/docs/git-push">push</a> everything to your GitHub's repository master branch `git push "origin" master:master`.

```
PS > cd D:\Work\martinbuberl.github.io
PS D:\Work\martinbuberl.github.io> git add --all
PS D:\Work\martinbuberl.github.io> git commit -m "Initial commit"
[master (root-commit) 814bfad] Initial commit
 8 files changed, 320 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 _config.yml
 create mode 100644 _layouts/default.html
 create mode 100644 _layouts/post.html
 create mode 100644 _posts/2013-08-05-welcome-to-jekyll.markdown
 create mode 100644 css/main.css
 create mode 100644 css/syntax.css
 create mode 100644 index.html
PS D:\Work\martinbuberl.github.io> git push "origin" master:master
Counting objects: 13, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (11/11), done.
Writing objects: 100% (13/13), 3.42 KiB, done.
Total 13 (delta 0), reused 0 (delta 0)
To https://github.com/martinbuberl/martinbuberl.github.io
 * [new branch]      master -> master
```

That's it! Open your browser, go to **http://martinbuberl.github.io/** and check out your new Jekyll site hosted on GitHub Pages. Note that you may have to wait up to 10 minutes before the content is available and you can reach your site at the respective URL.

<img src="{{ site.url }}/content/img/setup-jekyll-on-windows-and-host-it-on-github-pages-04.png" />

<h2 id="setting-up-a-custom-domain" class="has-permalink">Setting up a custom domain<a class="permalink" title="Permalink" href="#setting-up-a-custom-domain">#</a></h2>

Let's say you own the domain **martinbuberl.com** and would like to use it for your GitHub Pages. All you have to do are two easy steps to tell <a target="_blank" href="https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site">GitHub's server</a> to serve from this domain.

First create a file named `CNAME` in the root of your repository and put the domain in it:

```
martinbuberl.com
```

Next <a target="_blank" href="https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages#step-2-configure-dns-records">change the DNS settings</a> for your domain so that its **A records** are pointing to the IP addresses `192.30.252.153` and `192.30.252.154`. Piece of cake.

It may take a while until the changes are propagated through the DNS system. You can check the status of the A record using <a target="_blank" href="https://support.microsoft.com/kb/200525">NSlookup</a>:

```
PS > nslookup -type=A martinbuberl.com
Server: Unknown
Address: 192.168.0.1

Non-authoritative answer:
Name:    martinbuberl.com
Addresses:  192.30.252.153
          192.30.252.154
```

<h3 id="apex-domains" class="has-permalink">Apex domains<a class="permalink" title="Permalink" href="#apex-domains">#</a></h3>

Note that <a target="_blank" href="https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain">GitHub recommends using a custom subdomain</a> instead of an apex (or naked) domain for your GitHub Pages site.

While the solution above using A records is working in general for apex domains - it can cause redirect issues - <a target="_blank" href="https://news.ycombinator.com/item?id=7738293">resulting in slow load times</a>.

Personally, I ended up using <a target="_blank" href="https://dnsimple.com/">DNSimple</a> which supports <a target="_blank" href="https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider#configuring-an-alias-or-aname-record-with-your-dns-provider">**ALIAS records**</a> to be able using an apex domain without the hiccups.

<h2 id="keeping-jekyll-up-to-date" class="has-permalink">Keeping Jekyll up to date<a class="permalink" title="Permalink" href="#keeping-jekyll-up-to-date">#</a></h2>

As GitHub Pages updates Jekyll from time to time, your version may become out of date, resulting in your site appearing differently locally than it does when published.

To keep Jekyll up to date, you can compare <a target="_blank" href="https://pages.github.com/versions/">their version</a> occasionally to yours `jekyll -v` and install a newer one by running the command `gem install jekyll -v x.x.x` again.
