---
layout: post
navigation: "blog"
title: "Poor man's sampling"
description: "I recently had the challenge to only load a particular third party JavaScript library for just 0.10% of our actual website traffic. That's 1 out of 1,000 page views."
image: "og-k1AFA4N8O0g.jpg"
date: 2017-09-18
---

I recently had the challenge to only load a particular third party JavaScript library for just 0.10% of our actual website traffic. That's <a target="_blank" href="https://www.google.com/search?q=%281*100%29%2F1000">1 out of 1,000</a> page views.

The library I'm referring to is part of a very popular performance monitoring SaaS product. Their pricing model is tight to actual invocations and therefore our costs were skyrocketing with an increased usage of their product.

Given a ton of traffic, all we really needed was a fraction of those page views to actually make it there, without losing any relevant insights. A textbook use case for sampling.

On top of cost savings, this also meant that we significantly improved the load time for the vast majority of page views by not having to load an additional dependency. I call this a <a target="_blank" href="http://gph.is/2aRZQsF">win-win</a>!

The "poor man's sampling" JavaScript code, turned out to be rather trivial:

```
var x = 1000;
var r = Math.ceil(Math.random()*x); // random number between 1 and x
if (r === 1) {
  // do it, but only 1 out of x times
}
```

I'm sharing this story because I believe that sampling can be easy and at the same time extremely powerful. Let me know if this inspired you to implement some "poor man's sampling" yourself.