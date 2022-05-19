#include <ArduinoJson.h>
#include "ESPAsyncWebServer.h"
#include "../../sensor.h"
#include "../../config.h"
#include "controllers.h"

void handleOff(AsyncWebServerRequest* request) {
  request->send(200, "text/plain");
  isCoffeeMakerOn = false;
  lastStartupMillis = 0;
  events.send("coffee maker turned off", "message", millis());
}
