var leds = require('rpi-ws2801');

exports.fill = function(req, res){

    console.log('led fill request');
    var data = req.body;
    console.log(data);

    leds.connect(data.leds);
    leds.fill(data.b, data.g, data.r);

    res.end();
};

exports.demo = function(req, res) {

    console.log('led demo request');
    var data = req.body;
    console.log(data);

    if (true === data.start) {
        console.log("-- random color animation --");
        console.log("send start=false to stop");

        leds.connect(32); // assign number of WS2801 LEDs

        var colorBuffer = new Buffer(leds.getChannelCount());
        var animationTick = 0.005;
        var angle = 0;
        var ledDistance = 0.6;
        setInterval(function () {
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
        leds.connect(32);
        leds.fill(0, 0, 0);
        leds.disconnect();
    }
    res.end();
};

exports.red = function(req, res){
    leds.connect(32);
    leds.fill(0, 0, 255);

    res.end();
};

exports.yellow = function(req, res){
    leds.connect(32);
    leds.fill(0, 255, 255);

    res.end();
};

exports.green = function(req, res){
    leds.connect(32);
    leds.fill(0, 255, 0);

    res.end();
};

exports.black = function(req, res){
    leds.connect(32);
    leds.fill(0, 0, 0);
    leds.disconnect();

    res.end();
};

exports.index = function(req, res) {
    res.json({
        test: true
    });
};