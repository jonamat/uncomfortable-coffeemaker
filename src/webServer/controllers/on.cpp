#include <ArduinoJson.h>
#include "ESPAsyncWebServer.h"
#include "../../sensor.h"
#include "../../config.h"
#include "controllers.h"

void handleOn(AsyncWebServerRequest *request){
    request->send(200, "text/plain");
    isCoffeeMakerOn = true;
    lastStartupMillis = millis();
    events.send("coffee maker turned on", "message", millis());
}
