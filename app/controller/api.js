
exports.led = function(req, res) {
    console.log('led request');
    var data = req.body;
    console.log(data.led);
    res.json({
        led: true
    });
};

exports.index = function(req, res) {
    res.json({
        test: true
    });
};