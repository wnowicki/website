---
layout: page
title: Categories
heading: Blog Categories
subheading:
heading_image: blog.jpg
---

{% assign categories_ordered = site.categories | sort  %}
{% for category in categories_ordered %}
<div id="{{ category | first }}" class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">{{ category | first | capitalize }} </h3>
    </div>
    <ul class="list-group">
    {% for post in category[1] %}
    <li class="list-group-item">
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        {% for tag in post.tags %}
        <a href="{{ site.baseurl }}/blog/tags#{{ tag }}" class="badge">#{{ tag }}</a>
        {% endfor %}
    </li>
    {% endfor %}
    </ul>
</div>
{% endfor %}
