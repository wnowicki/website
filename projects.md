---
layout: page
title: Projects - Wojciech Nowicki
heading: My Projects
subheading: Always trying to make things better...
heading_image: projects.jpg
permalink: /projects/
excerpt: Here you can find projects that I've contributed to over the couple last years
---

> Please take a note that this list is showing only public available projects which are just a small part of my experience

## Python

### Python Project Template

My go to template for any new Python Project - [`wnowicki/pytemp`](https://github.com/wnowicki/pytemp)

### BitAware

Bitwise toolbox, compatible with Pydantic, source: [`wnowicki/bitaware`](https://github.com/wnowicki/bitaware)

### Sense Hat

Implementation of a simple racing game on [Raspberry Pi] with connected **Sense HAT**.

Source [wnowicki/sense](https://github.com/wnowicki/sense).

Related posts [Sense HAT Introduction](/2022/06/21/sense-hat) and [Sense Racing](/2024/04/02/sense-racing).

## PHP Libraries

### PHP Foundation

- Top level library with all base stuff that other projects are build on
- Base simple contracts (ex. `Entity`, `Arrayable`, `Persistable`, `Repository`) allowing the ability to define some top level characteristics of a class
- `AbstractEntity` support for *plain entities* automated setters (with *type hinting*) and getters as well as internal *factory* and *serialization* `toArray()`
- Top level *Exceptions* set
- *Automated Adviser* stack including *rules* and *condition* objects. *Conditions* are defined as *bitwise* values so can be combined together. Automated *Advice* processor implementation and *advice* and *risk* objects
- *Bitwise Property* to support bitwise solutions
- Repository: `PayBreak/foundation` *(discontinued)*
- Based on concept of [`wnowicki/generic`](https://github.com/wnowicki/generic) *abandoned*

### Older Projects

- PHP Collections [`wnowicki/collections`](https://github.com/wnowicki/collections)
- PHP Cli [`wnowicki/cli`](https://github.com/wnowicki/cli) set of [command line](https://en.wikipedia.org/wiki/Command-line_interface) tools

## Misc

- Matlab source: [`wnowicki/matlab`](https://github.com/wnowicki/matlab)

[Raspberry Pi]: /blog/categories/raspi/
