# node-build-leds

A node application to control a ws2801 led stripe connected to a Raspberry Pi over http. Interfacing the RGB LED strip to the Raspberry Pi is super simple, requiring just a few connections between the board, strip and a DC power jack. [Adafruit][] has a very good [example here][]. 

[example here]: https://learn.adafruit.com/light-painting-with-raspberry-pi/hardware "Connection Sample"
[Adafruit]: https://learn.adafruit.com "Adafruit"

## Install and run

```sh
git clone https://github.com/Stmu/node-build-leds.git
npm install

node bin/www
```

## Fill complete stripe with one post request

Http-Request:

````http-header
POST /api/fill HTTP/1.1
HOST: raspi.address:3000
CONTENT-TYPE: application/json

{
    "duration": 5000,
    "r": 0,
    "g": 0,
    "b": 0
}
````

curl:

````sh
curl -X POST -H "Content-Type: application/json" -d "{ \"duration\": 1200000, \"r\": 0, \"g\": 127, \"b\": 127 }" http://rapi.address:3000/api/fill
````

## Fill a specific range

```http-header
GET /fill/from/:start/to/:to/:color HTTP/1.1
HOST: raspi.address:3000

``` 

```sh
curl http://rapi.address:3000/fill/from/:start/to/:to/:color
```
* :start first pixel with color
* :to last pixel with color
* :color hex color (without hash e.g. F7f7ab) value or color name like blue or yellow are possible

### Samplerequest
```sh
curl http://rapi.address:3000/fill/from/0/to/31/00FF00
```


## Run a super duper cool demo

Http-Request:

````http-header
POST /api/fill HTTP/1.1
HOST: raspi.address:3000
CONTENT-TYPE: application/json

{
    "start": true
}
````

curl:

```sh
curl -X POST -H "Content-Type: application/json" -d "{\"start\": true}" http://rapi.address:3000/api/demo
```

## Stop the demo

Http-Request:

````http-header
POST /api/fill HTTP/1.1
HOST: raspi.address:3000
CONTENT-TYPE: application/json

{
    "start": false
}
````

curl:

```sh
curl -X POST -H "Content-Type: application/json" -d "{ \"start\": false}" http://rapi.address:3000/api/demo
```

## Fill a range of the stripe

fills a specific range of leds with given colors

Http-Request:

````http-header
POST /api/range HTTP/1.1
HOST: raspi.address:3000
CONTENT-TYPE: application/json

{
    "from": 0,
    "to": 31,
    "rgb": "#FF00FF",
    "duration":5000
}
````

curl:

```sh
curl -X POST -H "Content-Type: application/json" -d "{ \"from\": 0, \"to\": 31, \"rgb\": \"#FF00FF\", \"duration\": 1200000 }" http://rapi.address:3000/api/range
```

## Color a specific led of the stripe

Sets the given color name of a specific LED on the stripe.

NUMBER: index of the LED (e.g. 0 to 31 if your stripe has 32 LEDs)
COLOR: the name of the color. Supported color names are found in app/controller/rgbcolor.js

curl sample call:

```sh
curl http://rapi.address:3000/led/<NUMBER>/fill/<COLOR>
```

