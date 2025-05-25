---
title: Standardy w Projektach Python
layout: post
subtitle: Wprowadzenie do narzędzi `uv`, `ruff` i `ty`
date: 2025-05-25 19:10
author: wojtek
post_id: 9112b822838bee19ce8db72fc5abe344
categories:
- development
# heading_image: 2025-04-23.jpg
language: pl
toc: true
tags:
- python
---

## Wstęp

Python jest bardzo wyjątkowym językiem programowania. W sumie jest z nim trochę tak jak by to wynikało z jego nazwy:

> When he began implementing Python, Guido van Rossum was also reading the published scripts from “Monty Python’s Flying Circus”, a BBC comedy series from the 1970s. Van Rossum thought he needed a name that was short, unique, and slightly mysterious, so he decided to call the language Python.
> [source](https://docs.python.org/3/faq/general.html#why-is-it-called-python)

Jego zalety są jego wadami a wady zaletami. Faktem jest że korzysta z niego niezliczona rzesza ludzi i to w bardzo szerokim spektrum zastosowań, od prostych skryptów automatyzujących czy wykonujących jednorazowe przetwarzanie danych po całe aplikacje napisane w tym języku. A przede wszystkim jest obecnie używany do **uczenia maszynowego** (ML) i **sztucznej inteligencji** (AI). W związku z tym jego użytkownikami (nie wiem czy programista jest tu dobrym określeniem) są zarówno zaawansowani architekci oprogramowania jak również naukowcy którzy skupiają się na nauce a nie kodzie.

Dołączając do tego bardzo dynamiczny rozwój samego pythona i jego bibliotek, otrzymujemy projekty o bardzo zróżnicowanych standardach. Ponieważ te standardy również ulegają dynamicznemu rozwojowi. W związku z tym w wielu nowych artykułach w internecie dalej opisywane są jako metody do używania również te starsze standardy. Z jednej strony to dobrze że mamy szersze możliwości, że mamy możliwość z drugiej strony czy to dobrze czy nie lepsza byłaby jedna silnie rozwijana ścieżka? Kiedy jeszcze aktywnie pisałem coś w PHP wiadome był że w nowym projekcie użyjemy composer, phpunit itd. A w Python? Od jakiegoś czasu rozwijam swój własny szablon projektu [`wnowicki/pytemp`](https://github.com/wnowicki/pytemp), w ostatnim czasie musiałem znacząco przyspieszyć z jego aktualizacjami żeby w nowych projektach używać tych nowszych narzędzi. Zapraszam do zapoznania się z przyszłością projektów w Python.

Mam nadzieję że liczba projektów nie używających żadnego narzędzia do zarządzania zależnościami się sukcesywnie zmniejsza. Używasz pip w swoim? To bardzo dobrze jednak po zapoznaniu się z uv pewnie rozpoczniesz migracje. Zaczynając swoją przygodę z Python (jakieś pięć lat temu), przesiadałem się z rozbudowanej struktury `composer.json` na… no właśnie `requirements.txt` w którym nie do końca wiadomo czy lepiej zapisywać wszystko poprzez `pip freeze` czy tylko te zdefiniowane przez nas zależności. A jakiś plik projektu… `config.py` no ale… ja zacząłem odrazu z `pyproject.toml` (który moim zdaniem ma więcej sensu, no jest nowocześniejszy). Do tego `pylint` ze swoją konfiguracją itd.  

Dalej jednak mi się to wszystko nie zgrywało. Na sam koniec warto wspomnieć o samych wirtualnych środowiskach które poza tym że są genialnym pomysłem z czasem zaczynają się wydawać trochę toporne. Co jednak w Python jest jedną z lepszych rzeczy to jego standardy czyli Python Enhancement Proposals znany jako PEP. To są standardy jednak bez ich przestrzegania są tylko dokumentami które definiują jak coś powinno być. Bez konsekwencji ich użycia ciężko tak naprawdę mówić o standardzie. Dlatego tak ważne są narzędzia do ich przestrzegania. Przespałem trochę erę narzędzi takich jak `pyflake8`, `Black` czy `poetry` (tak są to różnego rodzaju narzędzia). Długo nie startowałem żadnego projektu, a kiedy nadszedł ten dzień utworzyłem go na bazie `uv` i `ruff`.

## Technikalia

### UV

Na pierwszy ogień UV narzędzie do zarządzania projektem oraz jego zależnościami zależnościami (pakietami, paczkami). Sami o sobie piszą “An extremely fast Python package and project manager, written in Rust.” Jest to jedyna rzecz którą musimy najpierw zainstalować sami ręcznie.

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Ja przytaczam tu pewne rozwiązania, jednak najlepiej zawsze odnosić się to aktualnej wersji dokumentacji narzędzia. Swoją drogą taki disclaimer i odnośnik powinien znajdować się w każdym artykule.

Po zainstalowaniu, jeśli startujemy nowy projekt to wystarczy odpalić poniższą komendę, zbuduje ona za nas niezbędny szkielet projektu.

```shell
uv init example
```

Jeśli chcemy dodać coś do naszego projektu to:

```shell
uv add pandas
```

Wirtualne środowisko? Jest ale my się nim już nie przejmujemy, nie trzeba nic aktywować itd. Jeśli chcemy uruchomić jakiś skrypt to używamy do tego komendy:

```shell
uv run demo.py
```

Możliwości jest znacznie więcej, jest również kompatybilność z pip. Możemy sobie wyeksportować nasze aktualne zależności do `requirements.txt` jeśli jakieś środowisko by tego wymagało, na przykład Jupyter Notebooks. Nie będziemy narazie wchodzić w to głębiej.

### Ruff

Mając już zainstalowane `uv` możemy przystąpić do instalowania kolejnego narzędzia, którym jest linter i formatter `ruff` i tu ciekawostka, dzięki `uv` nie musimy nic bezpośrednio instalować. Jako że `ruff` jest tak zwanym narzędziem, czyli skryptem który działa poza środowiskiem naszego projektu wystarczy że go po prostu wywołamy jednym z poniższych poleceń:

```shell
uvx ruff check # linter
uvx ruff format # formatowanie kodu
```

Oczywiście jeśli ktoś potrzebuje są jeszcze inne sposoby instalacji które znajdują się w dokumentacji https://docs.astral.sh/ruff/installation/

Aby narzędzie zachowywało się dokładnie tak jak chcemy należy je skonfigurować odpowiednio w pliku `pyrpject.toml` wszystkie opcje opisane są w dokumentacji. O tyle dla samego formatora wystarczy zdefiniować preferowaną przez nas długość linii kodu. To linier czyli komenda `check` wymaga już większego dostosowania do standardów które chcemy przestrzegać. Dla przykładu:

```toml
[tool.ruff.lint]
# 1. Enable flake8-bugbear (`B`) rules, in addition to the defaults.
select = ["E4", "E7", "E9", "F", "B", "Q"]

# 2. Avoid enforcing line-length violations (`E501`)
ignore = ["E501"]
```

Formatter sam zmienia pliki w projekcie, linter w standardzie wypisuje tylko znalezione problemy, część z tych problemów może zwykle zostać naprawiona automatycznie, żeby to uczynić należy dodać parametr `—fix`:

```shell
uvx ruff check --fix
```

### ty

Jesteś zwolennikiem adnotacji typu w języku? Dynamiczne typowanie i możliwość nie używania konkretnych typów w trakcie tworzenia prostych skryptów ma swoje zalety. Jednak w większych aplikacjach jest po prostu gwoździem do trumny. Niechcesz czekać aż w trakcie działania aplikacji pojawi się jakiś mało prawdopodobny edge-case i zostanie zwrócona wartość innego typu niż oczekiwany? Na ratunek przychodzi kolejne narzędzie `ty`

```shell
uvx ty check
```

 Powyższa komenda przeanalizuje kod i zwróci wszelkie błędy związane z typami. Ja jestem na etapie wprowadzania tego narzędzia do użycia, sprawdziłem jeden ze swoich projektów i wyniki są ciekawe.

```shell
error[invalid-parameter-default]: Default value of type `None` is not assignable to annotated parameter type `int`
   --> app/xxx/yyy:236:62
    |
235 |     def __container_url(
236 |         self, cont_id: int, only_not_assessed: bool = False, page: int = None
    |                                                              ^^^^^^^^^^^^^^^^
237 |     ) -> str:
238 |         url_params = {}
    |
info: rule `invalid-parameter-default` is enabled by default
```

Udanej zabawy z naprawianiem.

## Podsumowanie

To tylko krótkie wprowadzenie do trzech narzędzi, którym w najbliszym czasie poświęcę uwagę na blogu. 
