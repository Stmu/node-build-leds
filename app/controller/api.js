var leds = require('rpi-ws2801');
var rgb = require("./rgbcolors");

exports.ledFill = function(req, res) {

  var led = req.params.led;
  var color = req.params.color;

  console.log("set led " + led + " to color " + color);

  var rgbColor = new rgb.RGBColor(color);
  if (rgbColor.ok) {
    console.log("Parsed color R:" + rgbColor.r + " G:" + rgbColor.g + " B:" + rgbColor.b);

    leds.setColor(led, [rgbColor.r, rgbColor.g, rgbColor.b]);
    leds.update();
  } else {
    console.log("Failed to parse color '" + color + "'");
  }

  res.end();
};

exports.fillRange = function(req, res) {
  var start = parseInt(req.params('start'));
  var end = parseInt(req.params('end'));
  var color = req.params('color');

  console.log("set leds from " + start + " til " + end + " to color " + color);

  var rgbColor = new rgb.RGBColor(color);
  if (rgbColor.ok) {
    console.log("Parsed color R:" + rgbColor.r + " G:" + rgbColor.g + " B:" + rgbColor.b);
    console.log("Parsed color:" + rgbColor);

    for (var index = start; index <= end; index++) {
      leds.setRGB(index, rgbColor.toHex())
    }

    leds.update();
  } else {
    console.log("Failed to parse color '" + color + "'");
  }

  res.end();
};

exports.range = function(req, res) {
  var data = req.body;
  console.log(data);

  leds.fill(0, 0, 0);

  for (var index = data.from; index <= data.to; index++) {
    console.log("set led" + index + " to '" + [data.rgb] + "'");
    leds.setRGB(index, data.rgb)
  }

  leds.update();

  setTimeout(function() {
    for (var index = data.from; index <= data.to; index++) {
      leds.setRGB(index, '#000000')
    }

    leds.update();

  }, data.duration);

  res.end();
};

exports.fill = function(req, res) {

  console.log('led fill request');
  var data = req.body;
  console.log(data);

  leds.fill(data.r, data.g, data.b);

  setTimeout(function() {

    leds.fill(0, 0, 0);

  }, data.duration);

  res.end();
};

exports.demo = function(req, res) {

  console.log('led demo request');
  var data = req.body;
  console.log(data);

  if (true === data.start) {
    console.log("-- random color animation --");
    console.log("send start=false to stop");

    var colorBuffer = new Buffer(leds.getChannelCount());
    var animationTick = 0.005;
    var angle = 0;
    var ledDistance = 0.6;
    setInterval(function() {
      angle = (angle < Math.PI * 2) ? angle : angle - Math.PI * 2;
      for (var i = 0; i < colorBuffer.length; i += 3) {
        //red
        colorBuffer[i] = 128 + Math.sin(angle + (i / 3) * ledDistance) * 128;
        //green
        colorBuffer[i + 1] = 128 + Math.sin(angle * -5 + (i / 3) * ledDistance) * 128;
        //blue
        colorBuffer[i + 2] = 128 + Math.sin(angle * 7 + (i / 3) * ledDistance) * 128;
      }
      leds.sendRgbBuffer(colorBuffer);
      angle += animationTick;
    }, 5);
  } else {
    leds.fill(0, 0, 0);
  }
  res.end();
};

exports.orange = function(req, res) {
  leds.fill(220, 80, 0);
  res.end();
};

exports.red = function(req, res) {
  leds.fill(255, 0, 0);

  res.end();
};

exports.yellow = function(req, res) {
  leds.fill(220, 140, 0);

  res.end();
};

exports.green = function(req, res) {
  leds.fill(0, 255, 0);

  res.end();
};

exports.black = function(req, res) {
  leds.fill(0, 0, 0);

  res.end();
};

exports.hotpink = function(req, res) {
  leds.fill(219, 7, 177);

  res.end();
};

exports.blue = function(req, res) {
  leds.fill(0, 0, 255);
  res.end();
};

exports.index = function(req, res) {
  res.json({
    test: true
  });
};
