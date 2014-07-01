node-build-leds
===============

A node api to control ws2801 leds at raspberry pi

fill post request
==============
request:

http post: http://raspi.ip.address:3000/api/fill
http header: Content-Type: application/json

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
request:

http post: http://raspi.ip.address:3000/api/demo
http header: Content-Type: application/json

```json
{
    "start": true
}
```           
