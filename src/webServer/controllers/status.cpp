#include <ArduinoJson.h>
#include "ESPAsyncWebServer.h"
#include "../../sensor.h"
#include "../../config.h"
#include "controllers.h"

void handleStatus(AsyncWebServerRequest *request){
    AsyncResponseStream* response = request->beginResponseStream("application/json");
    float temp = readTemp(TEMP_PROBE_PIN);

    DynamicJsonDocument json(1024);
    json["isCoffeeMakerOn"] = isCoffeeMakerOn ? true : false;
    json["temperature"] = temp;
    json["isBoilerOn"] = digitalRead(BOILER_PIN) ? false : true;
    json["isReadyForCoffee"] = temp > DEF_COFFEE_TEMP_START_CELSIUS;
    json["freeHeap"] = ESP.getFreeHeap();
    json["ssid"] = WiFi.SSID();
    json["ip"] = WiFi.localIP().toString();
    serializeJson(json, *response);
    request->send(response);

}
