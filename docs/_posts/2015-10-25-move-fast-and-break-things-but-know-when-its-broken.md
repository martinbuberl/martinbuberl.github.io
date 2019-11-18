---
layout: post
navigation: "blog"
title: "Move fast and break things, but know when it’s broken"
description: "I love moving fast. Living in New York City only seems to strengthen this habit. It needs to be fast here, and most everything certainly is. It really annoys me if it isn’t."
image: "og-j0g8taxHZa0.jpg"
date: 2015-10-25
---

I love moving fast. Living in New York City only seems to strengthen this habit. It needs to be fast here, and most everything certainly is. It really annoys me if it isn’t.

The worst thing is if something is stuck - not moving anywhere - like a tourist blocking the subway entrance during rush hour. Things need to be in motion, constantly.

I feel the same way about software projects. Mark Zuckerberg once said “<a target="_blank" href="https://startupquote.com/post/1624569753">Move fast and break things. Unless you are breaking stuff, you are not moving fast enough</a>,” and I couldn’t agree more. For me, developing new features in short iterations and rapidly shipping them is an integral part of a modern software development lifecycle.

I made it a custom that every new developer writes code and ships it on their first day of work. That’s the speed I desire, and my team loves it <sup id="cite_ref-1" class="reference"><a href="#cite_note-1">[1]</a></sup>.

<blockquote>“Go that way, really fast! If something gets in your way, turn.”<footer>— <cite><a target="_blank" href="https://www.youtube.com/watch?v=lEHZJNQ5Y4A">Better Off Dead (1985)</a></cite></footer></blockquote>

To “move fast and break things” doesn’t mean intentionally introducing bugs. But as they say, “you have to break an egg to make an omelette.” You certainly shouldn’t be afraid of breaking stuff or let that fear slow you down as long as - and this is the important part - you always know when it’s broken.

A while ago, I received a bug report that something stopped working. Once I looked into the service in question I realized pretty quickly that it was offline. A DNS record was pointing to a concrete instance rather than the load balancer. The instance in question had been recreated, and the DNS record broke. Noob mistake, no big deal.

But wait, it was offline for seven days. Seven!

How could we not have realized this sooner? It wasn’t a very important service, but still. Seven fucking days. We ship as a team, and usually we succeed as a team, but that day we failed as a team, and we failed hard. As I was in charge, I felt particularly embarrassed. In this moment I realized that breaking things - at any speed - is only an option as long as you always know when it’s broken. When moving fast, it’s even more important to know when something is broken - because it’s more likely to happen. Lesson learned - the hard way - and these are usually the most valuable ones.

Today we have a lot of tools and practices in place that help us to deploy rapidly and provide reassurance that if we break stuff, we’ll know about it immediately and can fix it.

First, every commit has to be code reviewed. Together with a decent unit test code coverage alongside running <a target="_blank" href="https://en.wikipedia.org/wiki/List_of_tools_for_static_code_analysis">static code analysers</a> on our continuous integration servers ensures that the overall quality of our source code stays high and the odds of introducing new bugs remain low.

Second, we constantly monitor all of our infrastructure for uptime, different Apdex (Application Performance Index) metrics and errors. If something goes wrong, we get alerts immediately.

Third, we have automated end-to-end tests to make sure the overall integration of services is always working as expected. This is a lifesaver, and I wouldn’t want to go back to a time without having them in place.

Last but not least, we create visibility and awareness by having dashboards on large screens in our office in a prominent space. The human mind is incredibly good at detecting patterns, and there could be numbers or graphs that look off and deserve further investigation.

What gives you a warm and fuzzy feeling deploying your code? Let me know on <a target="_blank" href="https://twitter.com/martinbuberl">Twitter</a>.

<ol class="reference">
  <li id="cite_note-1">Full disclosure: They probably wouldn’t have been hired if this weren’t the case.</li>
<ol>
