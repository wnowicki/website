---
layout: "post"
title: "Debugging Jekyll"
subtitle: "Have you ever wondered what's inside Jekyll variables?"
date: "2018-09-02 11:25"
author: wojtek
post_id: 5432ef209c2449508ecacab0a9f49504
categories: development
language: en
tags:
    - jekyll
    - debugging
    - troubleshooting
    - blog
---

So far I've faced it at least twice, so keeping my work [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) it's time to document this.

Have you ever wondered what's inside Jekyll's variables? So did I! And don't get me wrong it is in the [official Jekyll documentation](https://jekyllrb.com/docs/liquid/filters/), but I don't know how many people will get into such a detail. How many are aware of things like that so they can google it.

So here it is, a way to see what sits inside any variable in your blog, really useful if you want to create some features.

```liquid
{% raw %}
{{ variable | inspect }}
{% endraw %}
```

Just replace `variable` with the actual variable you want to inspect.

### Example

For example, this page, if you run

```liquid
{% raw %}
{{ page | inspect }}
{% endraw %}
```

You will get:

<pre>
{{ page | inspect }}
</pre>

Enjoy!
