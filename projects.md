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

## PHP Libraries

### PHP Foundation
- Top level library with all base stuff that other projects are build on
- Base simple contracts (ex. `Entity`, `Arrayable`, `Persistable`, `Repository`) allowing the ability to define some top level characteristics of a class
- `AbstractEntity` support for *plain entities* automated setters (with *type hinting*) and getters as well as internal *factory* and *serialization* `toArray()`
- Top level *Exceptions* set
- *Automated Adviser* stack including *rules* and *condition* objects. *Conditions* are defined as *bitwise* values so can be combined together. Automated *Advice* processor implementation and *advice* and *risk* objects
- *Bitwise Property* to support bitwise solutions
- Repository: [`PayBreak/foundation`](https://github.com/PayBreak/foundation)
- Based on concept of [`wnowicki/generic`](https://github.com/wnowicki/generic) *abandoned*

### PHP Math
- *Polynomial* implementation
- Repository: [`PayBreak/math`](https://github.com/PayBreak/math)

### RPC Server
- Set of [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call) tools allowing to handle *request*, *response*, *validation* and *actions* for API
- Can be used as a micro API framework handling requests see [demo](https://github.com/PayBreak/rpc/tree/master/demo)
- Repository: [`PayBreak/rpc`](https://github.com/PayBreak/rpc)

###  API Client
- API Client with abstracted *request pre-processor* and *response post-processor* as well as some ready to use implementations
- Repository: [`PayBreak/api-client`](https://github.com/PayBreak/api-client)

### PayBreak Basket
- An open source integration with finance provider *PayBreak*
- Based on *Laravel v5.1*, using *PayBreak SDK*, *Foundation* and *API Client*
- Repository: `PayBreak/basket` _(discontinued)_

### Luhn Algorithm
- Simple implementation of [*Luhn Algorithm*](https://en.wikipedia.org/wiki/Luhn_algorithm) to calculate checksum for a number in PHP
- Repository: [`PayBreak/luhn`](https://github.com/PayBreak/luhn)

### Older Projects
- PHP Collections [`wnowicki/collections`](https://github.com/wnowicki/collections)
- PHP Cli [`wnowicki/cli`](https://github.com/wnowicki/cli) set of [command line](https://en.wikipedia.org/wiki/Command-line_interface) tools
- Telegramm [`telegramm/telegramm`](https://github.com/telegramm/telegramm) command line *like* web interface
- PayBreak SDK [`PayBreak/paybreak-sdk-php`](https://github.com/PayBreak/paybreak-sdk-php)

## Matlab
- Repository: [`wnowicki/matlab`](https://github.com/wnowicki/matlab)

## PHP Video Course
- YouTube PHP course in polish
- Currently under construction
- Link to website: [`PHP w Praktyce`](/php)
