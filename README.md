node-build-leds
===============

A node api to control ws2801 leds at raspberry pi

fill post request
==============
request data:

> http post: http://raspi.ip.address:3000/api/fill

> http header: Content-Type: application/json

```json
{
    "leds": 32,
    "isActive": true,
    "duration": 60,
    "r": 0,
    "g": 0,
    "b": 0
}
```

demo post request
=============
request data:

> http post: http://raspi.ip.address:3000/api/demo

> http header: Content-Type: application/json

```json
{
    "start": true
}
```   

range
=============
> http post: http://raspi.ip.address:3000/api/range

> http header: Content-Type: application/json

```json
{
    "leds": 32,
    "from": 0,
    "to": 32,
    "rgb": "#FF0000",
    "duration":5000
}
```
