---
layout: "post"
title: "Sense Racing"
subtitle: "Sense HAT based Racing game"
date: "2024-04-02 17:10"
author: wojtek
post_id: 026513190db7cdcc244d9d7376eb964a
categories: raspi
heading_image: 2024-04-02.jpg
language: en
tags:
    - raspberrypi
    - sensehat
    - game
    - development
---

In the previous post [Sense HAT introduction](/2022/06/21/sense-hat) we started implementing a simple racing game in Phyton for RapberryPi Sense HAT. We made most of the base code and managed to get the track moving now it's time to add a car, obstacles and some logic.

## Small Green Car

The car itself is just a pixel and its position will change only horizontally. So we need to define only one value for its position and the initial one looks like that `car_position = 4`.

```python
car_position = 4


def draw_car(matrix):
    global car_position
    car_position = normalise_position(car_position)

    if matrix[0][car_position] == obstacle_colour:
        sense.show_message("GAME OVER! " + str(distance-8))
        exit()

    matrix[0][car_position] = car_colour

    return matrix


def normalise_position(x):
    return max(1, min(6, x))
```

Why do we need to normalise car position? It's actually keeping the car in track boundaries, it cannot be in column 0 or 7 and outside the track. Even if a user tries to push the car outside it will stay inside the track. We don't have at the moment any interaction with track edges, but it's one of the possible implementations for the future.

There is already game logic implemented here (potentially not the best place according to some software engineering rules, but it simplifies this example code). If we try to position the car in the same pixel as the obstacle, please be aware that at this point we already generated a new line of track and "moved" everything by one. So if the car's position is in the obstacle area it means the player wasn't fast enough to change position and a collision has happened. Check is based on the colour of the pixel which is enough in our case.

If the game ends message is printed and the program ends.

In case we are still driving safely new car position is "printed" on the track.

To make use of the new code we have to change one line in the main block, from

```python
draw(track[distance:distance + 8])
```

to

```python
draw(draw_car(track[distance:distance + 8]))
```

Before drawing `track` on the screen `draw_car()` will position our car in the correct place.

## Steering

Below you can see a simple function that reacts to the events related to keys and makes our car move. The important thing here is that steering is reversed as the matrix will get reversed later!

```python
def joystick_moved(event):
    global car_position, acc
    if event.action == 'pressed':
        if event.direction == 'left':
            car_position -= 1
        elif event.direction == 'right':
            car_position += 1
        elif event.direction == 'up':
            acc = -0.3

    if event.action == 'released' and event.direction == 'up':
        acc = 0
```

We are checking `event.action` value if it equals `pressed` it means that the function was triggered when one of the buttons got pressed. Next, we need to check which of the buttons got pressed, so `event.direction` if it's *left* or *right* we should move the horizontal position of our car. In case of `up` it means that we are accelerating the speed of the car. On the last thing is to check if the up button got released so we can drive at normal speed.

Remember to make use of it and assign it as a callback for the events in the main section.

```python
sense.stick.direction_any = joystick_moved
```

## Obstacles

Now we can drive forever on the empty track, but that's not fun at all. Let's make some obstacles. We have to change our `get_track()` function to:

```python
def gen_track():
    global obstacle_buffer

    line = [blank for x in range(8)]

    if distance % 4 > 1:
        line[0] = border_colour
        line[7] = border_colour

    obstacle_buffer += 1

    if randint(1, 5) > 3 and obstacle_buffer > 2:
        obstacle_buffer = 0
        s = randint(1, 5)
        w = min(randint(2, 7-s), 5)

        for i in range(s, w+s):
            line[i] = obstacle_colour

    return line
```

Obviously, we don't want to have a static pre-generated track, as it will be boring and have some end. The idea is to generate obstacles randomly as we go, to achieve this we use `randint(x, y)` function which returns [pseudorandom number](https://en.wikipedia.org/wiki/Pseudorandomness) in the range between `x` and `y`.

```python
if randint(1, 5) > 3 and obstacle_buffer > 2:
```

In our case between `1` and `5` and we will generate an obstacle only when the result is greater than `3` so the probability of getting the obstacle is `40%`. Additionally we don't want to have them too often so we can actually change position between rows of obstacles even in the worst scenario, that is why we have `obstacle_buffer` and it is only possible to generate obstacles once the value is greater than `2` so there are at least two rows of a break in between. When we are generating an obstacle buffer is reset to `0`.

Then we use `randint` once again to generate the size and position of the new obstacle and using `obstacle_colour` we paint the desired pixels. Collision detection was already implemented in `draw_car()`.

Don't forget to import `random` library at the beginning of our file.

```python
from random import randint
```

## Further You Go

Of course, driving at the initial low speed, we may never crash and potentially game won't be fun enough. So I made one last improvement at the end of file:

```python
if distance % 50 == 0:
    speed -= 0.05
```

So every 50 rows speed will slightly increase making the game more challenging but fun.

## Summary

Below you can find everything all together just in case I've skipped something in my explanation. This simple example proves that writing something fun and enjoyable isn't so difficult. Obviously, if you own SenseHat yourself you must try to play on the device itself not only in the emulator.

<script src="https://gist.github.com/wnowicki/80716b0a37c76068905f94ca101183b8.js"></script>

You can find the latest version of this game [here](https://github.com/wnowicki/sense/blob/main/race.py).

This was my first attempt to write something like that, please let me know in the comments or write me what you think about it. And I'm fully aware that it took me almost two years to publish the second part.
