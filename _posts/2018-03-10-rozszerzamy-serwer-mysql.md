---
layout: "post"
title: "Rozszerzamy serwer - MySQL"
subtitle: "Czym jest aplikacja która nie może przechowywać danych"
date: "2018-03-10 11:06"
author: wojtek
post_id: 7368d2377b894e9b8e0e447f9e28f803
heading_image:
categories: development
language: pl
tags:
    - vagrant
    - php
    - mysql
    - bash
    - sql
---

Jakiś czas temu zrobiłem pierwszy odcinek kursu [*PHP w Praktyce*](/php) w którym to pokazałem jak zrobić własny lokalny serwer na którym możecie budować aplikacje z użyciem PHP. Sensownie jest rozpocząć taki kurs od narzędzia umożliwiającego uruchamianie wszystkiego tego o czym będzie w dalszych odcinkach. Żeby uprościć sprawę na tak zwanego maksa a dodatkowo jeszcze wprowadzać dobre standardy zamiast udostępnić serwer do pobrania z własnej strony stworzyłem repozytorium [`wpraktyce/server`](https://github.com/wpraktyce/server) z które to można sobie pobrać zrobić [fork](https://pl.wikipedia.org/wiki/Fork). Oczywiście projekt był prosty adekwatnie do potrzeb kursu. Co prawda kurs nie doczekał się jeszcze odcinka w którym potrzebowalibyśmy baz danych jednak chcąc sobie odświeżyć trochę wiedzę z zakresu `bash` postanowiłem rozszerzyć trochę funkcjonalność tego serwera. Co opisze w tym poście.  
*Oryginalny odcinek kursu można znaleźć tutaj: [Lokalny Server PHP](/php/00/01).*

## Obsługa błędów
Najpierw jednak muszę się przyznać do pewnego przeoczenia, mógłbym wręcz powiedzieć, że błędu. Zapomniałem prawidłowo skonfigurować wyświetlanie błędów więc bardzo trudne było rozwiązywanie jakichkolwiek pomyłek w kodzie PHP. Zamiast czytelnego błędu wyświetlała nam się pusta strona ponieważ serwer był w konfiguracji produkcyjnej. Oczywiście wystarczyło zajrzeć do notatek sprzed lat i wprowadzić kilka dodatkowych linijek do naszego skryptu. Przede wszystkim chodziło o włączenie następujących dyrektyw:

```sh
display_errors = On
error_reporting = E_ALL
```

Zrobiłem to z użyciem komendy [`sed`](https://pl.wikipedia.org/wiki/Sed_(program)) całość zmian znajdziecie tutaj: [72b2fd5](https://github.com/wpraktyce/server/commit/72b2fd5659a510dbbd978be3e8f5c161594c83cf)

## Reorganizacja skryptu
Jako kolejny element ulepszeń postanowiłem podzielić skrypt który znajduje się w jednym pliku na funkcje zajmujące się poszczególnymi sekcjami naszego serwera. Skrypt lada moment będzie rozszerzony o kolejne n linijek odpowiedzialnych za serwer bazy danych, jego konfigurację i użytkowników, czyli moment wprowadzenia modułowości jest idealny. Pozwoli nam to łatwiej zarządzać wszystkim w przyszłości.

Stworzyłem folder `src` w którym będę przechowywał funkcje `bash`. Oczywiście pierwszym krokiem  musi być załadowanie tych wszystkich funkcji do naszego głównego skryptu, jeśli wszystkie interesujące nas funkcje znajdują się w jednym katalogu i są tam tylko pliki z funkcjami możemy to zrobić za pomocą jednej pętli:

```bash
for THIS_FILE in src/*
do
    source $THIS_FILE
done
```

Jeśli w przyszłości potrzebowalibyśmy dodać jakiś plik z innej lokalizacji możemy to zrobić z użyciem komendy `source` podając ścieżkę do tego pliku. Funkcje definiujemy bardzo prosto bo:

```bash
function nazwa_funkcji()
{
    # kod funkcji
}
```

> **Uwaga!**
> Należy pamiętać żeby wszystkie kody umieścić w funkcjach dzięki czemu wykonają się one dopiero w momencie wywołania przez nas funkcji, ze wszystkimi wymaganymi parametrami. W przeciwnym wypadku skrypty wykonają się w momencie ich załadowania.

Następnie należy już tylko w odpowiedniej kolejności wywołać nasze funkcje:

```bash
base_setup
install_apache
install_composer
```

Całość zmian znajdziecie tutaj: [512cad3](https://github.com/wpraktyce/server/commit/512cad3f53b0f6048bfdeacc769d98c901f24cbb)

## MySQL
Przejdźmy do właściwego tematu tego wpisu, chcemy dodać zarówno sam serwer MySQL jak i jego obsługę w PHP, więc zacznijmy od tego pierwszego. W tym celu dodałem jedną dodatkową bibliotekę `php5-mysql` do skryptu `install_apache` instalującego nam PHP. Podstawowa instalacja PHP wygląda teraz tak:

```bash
apt-get -y install php5 php5-mysql
```

Kolejnym krokiem jest instalacja samego serwera, jako że to zadanie jest dość duże samo w sobie stworzyłem mu osobną funkcję `install_mysql`. W skrócie funkcja instaluje nam sam serwer oraz przeprowadza podstawową konfigurację taką jak:
- ustawienie hasła dla użytkownika `root` które można podać jako pierwszy parametr funkcji
- umożliwienie dostępu publicznego do bazy
- kopiujemy domyślny plik konfiguracji `local.cnf`
- utworzenie pierwszej bazy danych której nazwa może być opcjonalnie ustawiona jako drugi parametr

### Dodawanie użytkowników
Kolejnym krokiem będzie dodanie użytkownika którego będziemy używać do połączenia z naszą bazą danych, w tym celu stworzyłem funkcję `mysql_add_user`. Pierwszym parametrem jest nazwa użytkownika drugim jego hasło. Funkcja nie tylko dodaje użytkownika ale również przyznaje mu wszystkie uprawnienia do tej bazy danych. W skrypcie domyślnie dodajemy jednego użytkownika na start.

```bash
mysql_add_user user pass [root_pass] [db_name]
```

### Konfiguracja połączenia
Teraz pozostało nam tylko użyć klienta MySQL żeby połączyć się z naszą bazą danych. Ja osobiście używam [Sequel Pro](https://www.sequelpro.com/)
jeśli chodzi o coś na inne platformy to [MySQL Workbench](https://www.mysql.com/products/workbench/) lub pobawić się w instalację webowego [phpMyAdmin](https://www.phpmyadmin.net/). Bez różnicy jakiego klienta użyjemy nasze dane do logowania na początek będą takie:

Host | `172.11.1.111`
---|---
User | `user`
Password | `pass`
Database | `develop`
Port  | `3306`

Zmiany w kodzie możecie oczwyiście znaleźć tutaj: [175c0a5](https://github.com/wpraktyce/server/commit/175c0a55728ca777e05f65f699a7fd230668a596)

## Konfiguracja
Oczywiście opisanie wszystkiego dokładnie zajęło by mi znacznie więcej czasu. Myślę, że wyjaśniłem najważniejsze elementy teraz czas na ostatni konfigurację modułów. Obecnie komenda `vagrant up` zainstaluje nam wszystko zarówno PHP jak i MySQL ale nie zawsze jest nam potrzebna pełna konfiguracja. Wygląda to tak:

```bash
base_setup

## Configuration:

install_apache
install_composer
install_mysql
mysql_add_user user pass
install_tools
```

Jeśli któryś z elementów nie będzie nam potrzebny wystarczy daną linijkę zakomentować używając `#`. Oczywiście nie polecam usuwania `base_setup`. Dla przykładu jeśli nie chcemy instalować bazy danych:

```bash
base_setup

## Configuration:

install_apache
install_composer
install_mysql
# mysql_add_user user pass
# install_tools
```

Cały pull request dostępny jest tutaj [PR#1](https://github.com/wpraktyce/server/pull/1).  

## Inne dostępne narzędzia
Ważne jest to żeby wspomnieć o tym, że w przypadku serwerów PHP istnieją również inne gotowe narzędzia. Bo czy tworząc ten mały projekt nie powieliłem już istniejących dobrze wspieranych projektów? Oczywiście, że tak! Ale zrobiłem to w celach edukacyjnych, łatwiej zrozumieć działanie pewnych rzeczy na prostszych przykładach. Jeśli chodzi o użytkowanie komercyjne to oczywiście polecam użycie bardziej profesjonalnych narzędzi.

Tak jak już wspominałem od tych bardziej ogólnych przechodzimy do tych bardziej wyspecjalizowanych. *VirtualBox* jest ogólnie platformą do tworzenia maszyn wirtualnych, *Vagrant* wspomaga automatyczne i powtarzalne tworzenie maszyn wirtualnych a [Homestead](https://laravel.com/docs/5.6/homestead) zbiera to wszystko razem do kupy i tworzy nam gotowe do działania środowisko PHP przystosowane do współpracy z framework'iem *Laravel*. Jest to oczywiście narzędzie znacznie bardziej rozbudowane od przedstawionego przeze mnie serwera i jeśli interesuje nas tylko korzystanie to czemu nie użyć czegoś co w szybki sposób pozwala nam stworzyć wiele lokalnych stron.

Innym rozwiązaniem o którym tutaj tylko wspomnę jest [Docker](https://www.docker.com/) czyli inny rodzaj wirtualizacji. Można go określić liderem przyszłości a dokładniejsze opisy zostawię specjalistom z dziedziny.

## Co dalej?
Jeśli chodzi o następne etapy to:
- koniecznie trzeba przenieść serwer na **PHP7**
- wprowadzić obsługę *SQLite* oraz *MongoDB* żeby poszerzyć możliwości edukacyjne, ale to też może dopiero z odcinkami kursu
- może zmiana architektury w celu łatwiejszego importowania serwera do innych projektów lub lepszy mechanizm do zarządzania `vhost` z różnych lokalizacji

> **Wersja do której się odnosi ten wpis to [v2.0.0](https://github.com/wpraktyce/server/releases/tag/2.0.0)**
