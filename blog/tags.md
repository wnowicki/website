---
layout: page
title: Tags
heading: Blog Tags
subheading:
heading_image: blog.jpg
---

<div class="row">
{% assign tags_ordered = site.tags | sort  %}
{% for tag in tags_ordered %}
<div id="{{ tag | first }}" class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">#{{ tag | first }}</h3>
    </div>
    <ul class="list-group">
    {% for post in tag[1] %}
    <li class="list-group-item">
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        <a href="{{ site.baseurl }}/blog/categories#{{ post.categories|first }}" class="badge">{{ post.categories|first|capitalize }}</a>
    </li>
    {% endfor %}
    </ul>
</div>
{% endfor %}
</div>
