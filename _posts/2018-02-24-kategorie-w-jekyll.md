---
layout: post
title: "Kategorie w Jekyll"
subtitle: "Jak używać kategorii na Twoim blogu opartym o Jekyll"
date: "2018-02-24 17:56"
author: wojtek
post_id: ac1105e39e284ec08761643002da084c
categories: development
language: pl
tags:
    - jekyll
    - blog
    - webdev
---

## Po co są kategorie?

Używasz silnika [Jekyll](https://jekyllrb.com) na swojej stronie internetowej? Prowadzisz tam bloga? Bo ja tak! Zastanawiałeś się kiedyś może po co tak naprawdę są tam kategorie?

Wszystkie strony w *Jekyll* zaczynają się od bloku [Front Matter](https://jekyllrb.com/docs/frontmatter/) w którym to definiujemy zmienne danej strony, są to przede wszystkim zmienne, które będą przekazane do szablonu naszej strony. Jak również zmienne które pozwalają chociażby zdefiniować adres pod którym dana strona ma się wyświetlać czy też kategorie i tagi danego postu. Zapewne wiesz do czego używa się kategorii i tagów na blogach czy innych serwisach treściami. Tak, zwyczajnie po to żeby połączyć artykuły ze sobą powiązane i ułatwić użytkownikom strony dostęp do nich.

## Lista kategorii

Jeszcze nigdy nie pisałem o samym *Jekyll'u* więc teraz większych wstępów zakładając, że masz podstawową wiedzę o szablonach i wyświetlaniu zmiennych zmiennych itd. Kategorie są dostępne w tablicy `site` która jest główną zmienną dostępną w całym zakresie naszej strony. Stwórz sobie na początek nową podstronę na której wyświetlimy listę naszych kategorii.

> Tutaj mała przydatna sztuczka, jeśli chcielibyśmy wiedzieć co tak naprawdę siedzi w jakiejkolwiek zmiennej możemy wyświetlić jej techniczną postać poprzez modyfikator **inspect**

Lista kategorii znajduje się w `site.categories` sprawdźmy zatem jak wygląda jej zawartość:

```liquid
{% raw %}
{{ site.categories | inspect }}
{% endraw %}
```

Pojawiło się trochę niekoniecznie zrozumiałych rzeczy. Ale teraz za pomocą prostej pętli `for` będziemy mogli wyświetlić listę wszystkich kategorii, ja zrobię to na początek za pomocą listy. W tym przypadku przydatny będzie modyfikator wyświetlania `fisrt` który wyświetli tylko pierwszy element tablicy. Kategorie są zapisane w tablicy której każdy element jest kolejną tablicą. Z czystej ciekawości możesz usunąć ten modyfikator i zobaczyć co się wyświetli.

```liquid
{% raw %}
<ul>
    {% for category in site.categories %}
        <li> {{ category | first }} </li>
    {% endfor %}
</ul>
{% endraw %}
```

### Lista postów w kategorii

Niestety w standardowej konfiguracji *Jekyll* nie posiada automatycznie generowanych podstron dla kategorii więc nie jesteśmy w stanie utworzyć linków do naszych kategorii. Jedynym elementem kategorii jest lista postów w niej zawartych, dlatego też utworzymy sobie ich listę.


```liquid
{% raw %}
{% for category in site.categories %}
    <h2>{{ category | first | capitalize }}</h2>
    <ul>
        {% for post in category[1] %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
    </ul>
{% endfor %}
{% endraw %}
```

Przy okazji zmieniłem sposób wyświetlania nazwy kategorii na nagłówek typu drugiego oraz dodałem kolejny modyfikator `capitalize` który zmienia pierwszą literkę nazwy kategorii na dużą nadając jej tym samym mniej techniczny wygląd.

Posty znajdują się w drugim elemencie tablicy `category` i są kolejną tablicą więc również wykorzystuję do ich wyświetlania pętlę for. O atrybutach jakie posiada post można poczytać na w dokumentacji. My wyświetlimy tylko tytuł i link.

A teraz do dzieła... oczywiście napisałem ten wpis tylko dlatego że sam właśnie stworzyłem swoją [stronę z kategoriami](/blog/categories), która w chwili obecnej jest oparta na tym wpisie.

## Kategorie i tagi w praktyce
Jeszcze na koniec mała uwaga nietechniczna. Jak używać kategorii i tagów, żeby wszystko miało jakiś logiczny sens? Bo co jest kategorią a co tagiem? Jaka jest między nimi różnica? Kiedy użyć którego?

Osobiście uważam, że post powinien należeć do jednej kategorii i może mieć wiele tagów. Czyli kategoria jest czym ważniejszym, co przydziela post do jakiejś ważniejszej grupy. A tag tak naprawdę w skrócie określa zawartość posta dzięki czemu możemy znaleźć inne odnoszące się do tego samego tematu.
