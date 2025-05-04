---
layout: "post"
title: "Language flags"
subtitle: "How to add language flags to Jekyll?"
date: "2018-09-16 17:25"
author: wojtek
post_id: 71c087c57e004f89af19fb02cf2862b6
categories: development
language: en
tags:
    - jekyll
    - blog
    - webdev
---

As I'm writing my blog in two languages I thought it would be nice to show which posts are written in which language. Not that you can't figure this out from the title itself. But why not be absolutely clear on what you can expect from each post? And that's a good opportunity to do something in Jekyll and write a blog post about it.

## Get some flags

First, you need to get some flags... not the actual flags but images of them. Personally, I've used [Flag Sprites](https://www.flag-sprites.com/) and generated two flags for two languages I'm supporting. Download them and unpack them somewhere in your website folder. There is a nice readme file that explains how you can add flags to your website. We will start by adding a CSS stylesheet to the page template, simply paste the below code to `<head>` section:

```html
<link href="/assets/flags/flags.min.css" rel=stylesheet type="text/css">
```

Of course change `/assets/flags/` to relative location in your structure.

## Configure your blog

Now we have to add some configuration to `_config.yml` to make things a little bit more flexible.

```yaml
languages:
    pl:
        flag: pl
        name: Polski
    en:
        flag: gb
        name: English
```

Basically, now you can set up a human-readable name for a language and transform the language into the country code for a flag. As you've probably noticed for English I'm using Union Jack so my language code is `en` but the flag code is `gb`.

## Add flags

It's time to add those flags somewhere, in my case I've added them to the standard post list as well as my [yearly post list](/blog/all).
{% raw %}

```html
{% if post.language %}
    <img src="/assets/flags/blank.gif"
         class="flag flag-{{ site.languages[post.language].flag }}"
         alt="{{ site.languages[post.language].name }}" />
{% endif %}
```

{% endraw %}

So if `post.language` is set then display a picture with a specific class which is set to {% raw %}`flag-{{site.languages[post.language].flag}}`{% endraw %} that's the key element we are using configuration for this language.

## Set your language

Finally, it's time to set the language of posts. You need to add language configuration to the [Front Matter](https://jekyllrb.com/docs/front-matter/) of posts that you want to display a flag.

```yaml
language: en
```

I hope that this simple tutorial not only showed you how to add flags but inspired how in many different ways you can extend your Jekyll-based website. If you have any interesting ideas please share them in comments.
