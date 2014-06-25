var leds = require('rpi-ws2801');


exports.demo = function(req, res) {
    console.log('led request');
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
        leds.clear();
        leds.disconnect();
    }

    res.end();
};

exports.index = function(req, res) {
    res.json({
        test: true
    });
};