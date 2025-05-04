---
title: PHP Collections
author: wojtek
post_id: a89437bdbf4345c6b1284f41b0dc3df3
layout: post
language: en
categories:
  - development
tags:
  - php
  - development
  - collections
  - oop
---
As everybody knows PHP is OOP language but not in the same way as other languages (ex. Java). So sometimes we can find there some gaps. One of them is a lack of good solution for collections. As we are working in OOP (or even something which is extension of it) we want to have control on types of objects we are using. PHP is not good on [type hinting](http://php.net/manual/en/language.oop5.typehinting.php) at all or in the other hand is the best one because is so flexible. We can only force arguments to be arrays, Objects of Classes (or Interface) and callable. But if we want array of specific type it's impossible to force.

We can solve this issue in few ways, first of all will be every time we want to use method form assumed object we should check it by [is_a()](http://php.net/manual/en/function.is-a.php) function. Or instead of passing that as array of objects we can add it one by one using method defined like below to be sure of getting expected type.

```php
<?php
public function add(MyClass $object)
{
    $this->data[] = $object;
}
```

## Available Solutions
There are some solutions available, but none of them are not focused on *type hinting* and some not even implement [Iterator](http://php.net/manual/en/class.iterator.php).

- [Collection Classes in PHP](http://www.sitepoint.com/collection-classes-in-php)
- [PHP Collection](http://jmsyst.com/libs/PHP-Collection)
- [Object Collections in PHP](http://www.aaron-fisher.com/articles/web/php/object-collections-in-php/)
- [Laravel Collections](http://laravel.com/docs/5.0/collections)

## Proposed Solution
In other languages we can find solutions for our issue or we can say there is no need for solution because there is no issue. Like [Generics in Java](http://en.wikipedia.org/wiki/Generics_in_Java) or [Hack Collections](http://docs.hhvm.com/manual/en/hack.collections.php). Proposed solution is based on all good practices about collection adopted to a PHP world. It's not an ideal solution as this is a kind of trick to give us at least some of collections flavor in PHP.

You can find it at [wnowicki/collections](https://github.com/wnowicki/collections). Feel free to contribute.
