---
title: Konfiguracja Bitwise w Pythonie
layout: post
subtitle: Wprowadzenie i uzycie biblioteki BitAware
description: Zapisywanie konfiguracji jako bitmask to nie „retro-sztuczka”, lecz praktyka obecna od pierwszych komputerów aż po współczesne API. Jej siłą są prostota sprzętu i ekonomia danych – a dzięki narzędziom takim jak BitAware możesz korzystać z niej równie wygodnie, jakbyś operował listą pól typu bool.
date: 2025-06-26 20:24
author: wojtek
post_id: e51d063b09669ab8088fe822814d38aa
categories:
- development
heading_image: 2025-06-25.jpg
language: pl
toc: true
tags:
- python
- development
---

## Wstęp

Od zawsze czułem pewną słabość do przechowywania konfiguracji z uyciem podejscia bitwise. Uycie bitmasek w konfiguracji sięgają napewno pierwszych systemów UNIX. Ogólnie cięzko jest tutaj stwierdzić kiedy moemy mówić o uyciu takim jak teraz gdyz pierwsze komputery miały przeciez konfiguracje wprowadzana przez fizyczne załączanie bitów.

W czasach języków wysokopoziomowych jest to zdecydowanie mniej popularne podejście a posiadanie widzy o operacjach bitowych nie jest juz tak oczywiste wsrod programistow. Dlatego warto zacząć od małęgo wstępu teoretycznego.

## Teoria

### Bity

Każdy bajt składa się z 8 bitów – najmniejszych jednostek informacji, które mogą przyjąć wartość `0` lub `1`. Operacje bitowe (ang. *bitwise*) pozwalają pracować bezpośrednio na tych bitach, dzięki czemu:

- **oszczędzamy pamięć** – w jednej liczbie całkowitej możemy schować nawet 32 lub 64 flagi typu „tak/nie”;
- **zyskujemy wydajność** – procesor wykonuje operacje `AND`, `OR`, `XOR` czy przesunięcia bitowe w pojedynczych cyklach zegara;
- **upraszczamy kod** – zamiast wielu zmiennych boole’owskich przechowujemy spójny zestaw ustawień w jednym polu.

To podejście spotkasz m.in. w uprawnieniach plików Unix, protokołach sieciowych czy grafice komputerowej.

---

### Operatory bitowe

| Operator | Nazwa       | Przykład (`a = 0b0101`, `b = 0b0011`) | Wynik (`bin(...)`) |
| -------- | ----------- | ------------------------------------- | ------------------ |
| `&`      | AND         | `a & b`                               | `0b0001`           |
| `|`      | OR          | `a|b`                                 | `0b0111`           |
| `^`      | XOR         | `a ^ b`                               | `0b0110`           |
| `~`      | NOT         | `~a` (na 32 bitach)                   | `0b…111010`        |
| `<<`     | shift left  | `a << 1`                              | `0b1010`           |  
| `>>`     | shift right | `a >> 2`                              | `0b0001`           |
{: .table .table-striped }

---

### Flagi bitowe

- Każdej fladze przypisujemy **potęgę dwójki**: `1, 2, 4, 8…`.
- Dzięki temu każda zajmuje inny bit i może występować niezależnie od pozostałych.
- Zestaw aktualnie włączonych flag przechowujemy w pojedynczej liczbie całkowitej.

Przykład „na surowo”:

```python
READ  = 1 # 0b001

WRITE = 2 # 0b010

EXEC  = 4 # 0b100


perm = READ | WRITE          # włączamy dwie flagi

can_exec = bool(perm & EXEC) # sprawdzamy EXEC

perm &= ~WRITE               # wyłączamy WRITE
```

Kod działa, ale… łatwo się pomylić (magiczne liczby) i brakuje wygodnego API.

---

## Biblioteka BitAware

[BitAware](https://pypi.org/project/bitaware/) to moja próba uproszczenia pracy z flagami bitowymi. W przypadku uycia biblioteki ubieramy powyższy „goły” mechanizm w typowany, czytelny interfejs:

- **`BitFlag`** – deklarujesz zbiór flag podobnie do `enum.IntFlag`, ale bez ręcznego liczenia wartości.
- **`BitAware[T]`** – klasa-kontener, która przechowuje kombinację flag typu `T` i dostarcza metody pomocnicze (`has`, itp.).
- Integruje się z **Pydantic** – pole modelu potrafi automatycznie zamienić int ⇄ flagi.

### Instalacja

Z uyciem `uv`:

```bash
uv add bitaware
```

Lub po staremu przy uyciu `pip`:

```bash
pip install bitaware
```

### Deklaracja

```python
from bitaware import BitFlag, BitAware

class PermissionTypes(BitFlag):
    ADMIN     = 1
    USER      = 2
    GUEST     = 4
    MODERATOR = 8

class UserPermission(BitAware[PermissionTypes]):
    def __init__(self, value: int = 0):
        super().__init__(value, PermissionTypes)
```

### Operacje

Tworząc nowy mo

```python
# Tworzymy użytkownika z dwoma uprawnieniami

perm = UserPermission(PermissionTypes.ADMIN | PermissionTypes.USER)

perm.has(PermissionTypes.ADMIN)     # → True

perm.has(PermissionTypes.GUEST)     # → False
```

### Użycie z Pydantic

Przechodzimy do uzycia z Pydantic a co za tym idzie chociaby FastAPI.

```python
from pydantic import BaseModel

class User(BaseModel):
    name: str
    permissions: UserPermission

jane = User(name="Jane", permissions=PermissionTypes.ADMIN | PermissionTypes.USER)
assert jane.permissions.has(PermissionTypes.ADMIN)
```

Oczywiście wszystkie standardowe operacje Pydantic będą wspierane, na przykład serializacja:

```python
print(jane.model_dump_json(indent=2))
```

zwróci nam:

```json
{
  "name": "Jane",
  "permissions": 3
}
```

---

## Podsumowanie

- Operacje bitowe są szybkie i oszczędne, ale na „surowych” liczbach szybko robi się nieczytelnie.
- [**BitAware**](https://github.com/wnowicki/bitaware) łączy zalety flag bitowych z czytelnością i bezpieczeństwem typów Pythona. W rezultacie otrzymujesz API, które początkujący zrozumieją po kilku minutach, a doświadczeni docenią za brak narzutu wydajnościowego.

Jeśli Twoja aplikacja trzyma setki tysięcy rekordów z prostymi przełącznikami (feature toggles, uprawnienia, statusy), wypróbuj BitAware zanim napiszesz własne „kolejne” rozwiązanie. Zyskasz mniej kodu do utrzymania i mniej pomyłek przy bitowych sztuczkach.
