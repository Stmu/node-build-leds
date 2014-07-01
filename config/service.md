<pre><code>
description "node-build-leds v0.1"
author      "http://localhost"

start on filesystem and net-device-up IFACE!=lo
stop on shutdown

respawn
respawn limit 99 1

script
    export HOME="/root"
    echo $$ > /var/run/node-build-leds.pid
    exec su [USER] -c "/usr/bin/node /home/[USER]/node-build-leds/bin/www" >> /var/log/node-build-leds.log 2>&1
end script

pre-start script
    echo "[`date -u +%Y-%m-%dT%T.%3NZ`] [System] Starting" >> /var/log/node-build-leds.log

    tail -n 1000 /var/log/node-build-leds.log > /opt/utilities/tmp/new.log
    cat /opt/utilities/tmp/new.log>/var/log/node-build-leds.log
    rm /opt/utilities/tmp/new.log
end script

pre-stop script
    rm /var/run/node-build-leds.pid
    echo "[`date -u +%Y-%m-%dT%T.%3NZ`] [System] Stopping" >> /var/log/node-build-leds.log
end script


</code></pre>