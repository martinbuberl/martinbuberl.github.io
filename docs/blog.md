---
layout: default
navigation: "blog"
title:  "Blog"
permalink: /blog/
---

<ul class="posts">{% for post in site.posts %}<li><a href="{{ post.url }}">{{ post.title }}</a></li>{% endfor %}</ul>