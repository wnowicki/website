---
layout: page
title: Projects - Wojciech Nowicki
heading: My Projects
subheading: Always trying to make things better...
heading_image: projects.jpg
permalink: /projects/
excerpt: Here you can find projects that I've contributed to over the couple last years
toc: true
---

> Please take a note that this list is showing only public available projects which are just a small part of my experience

## Python

### Python Project Template

A batteries-included starter kit for modern Python 3 projects.  
It ships with:

- **uv + `pyproject.toml`** for fast dependency management  
- **Pre-configured CI** (GitHub Actions pipelines for Ruff, Pytest, Pylint & Markdown-lint)  
- **Opinionated tooling** – pre-commit hooks, `.editorconfig`, `.vscode` settings  
- **Typed code & test scaffold** so you can `uv run pytest` on day 1  
- MIT-licensed & release-ready (versioned, Changelog, SemVer tags)

---

### BitAware - Bitwise Toolbox

Tiny, type-safe helpers for modelling **bit-flag settings** in Python – perfect for  
permissions or feature toggles stored as a single integer.

- Seamless **Pydantic** integration (`User.permissions: UserPermission`)
- 100 % typed, fully-tested, MIT-licensed, published on PyPI

View on [GitHub](https://github.com/wnowicki/bitaware) • [PyPI](https://pypi.org/project/bitaware/)

---

### Sense Hat Sandbox

Mini-games & utilities for the **Raspberry Pi Sense HAT** (and the desktop emulator).

- “**Sense Racing**” – pixel-car dodging game with progressive speed boost
- “Slug” – classic snake-style tutorial ported to the LED matrix
- Works on real hardware **or** the `sense_emu` simulator
- One-command setup: `pip install -r requirements.txt`
- Extras: script to clear LEDs, ready-made virtual-env instructions

View on [GitHub](https://github.com/wnowicki/sense)  
Blog posts: [Sense HAT Intro](../2022/06/21/sense-hat) | [Sense Racing](../2024/04/02/sense-racing)

---

## PHP

### PHP Foundation

Lean, **framework-agnostic** toolbox that gives your domain layer the same conveniences you expect from a full framework—without dragging the framework in.

- **Smart Entity** base class – auto-generated getters / setters, value casting & change-tracking for clean data objects  
- **Reusable contracts** `Arrayable`, `Jsonable`, `Indexable`, `Persistable`, … keep DTOs & repositories strongly-typed  
- **PSR-friendly**: ships with `PsrLoggerTrait` and follows PSR-1/4/12 + PSR-3 where relevant  
- Built-in **Exception hierarchy** for consistent error handling  
- **Quality gates**: PHPUnit + PHPStan (level 9), Travis CI, StyleCI & Scrutinizer badges out of the box  
- PHP ≥ 8.1, MIT-licensed – install in seconds:  
  
  ```bash
  composer require code-bushido/foundation
  ```

- Based on concept of [`wnowicki/generic`](https://github.com/wnowicki/generic) *(abandoned)*

View on [GitHub](https://github.com/code-bushido/foundation) • [Packagist](https://packagist.org/packages/code-bushido/foundation)

---

### Older Projects

- PHP Collections [`wnowicki/collections`](https://github.com/wnowicki/collections)
- PHP Cli [`wnowicki/cli`](https://github.com/wnowicki/cli) set of [command line](https://en.wikipedia.org/wiki/Command-line_interface) tools

---

## Misc

- Mac install script [`wnowicki/misc`](https://github.com/wnowicki/misc/blob/master/mac-install.sh)
- Matlab source: [`wnowicki/matlab`](https://github.com/wnowicki/matlab)
