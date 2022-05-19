#include <Arduino.h>
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"
#include "controllers/controllers.h"
#include "webServer.h"

void routes(AsyncWebServer *webServer) {
  // Static files
  (*webServer).serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");

  // Attach SSE socket
  (*webServer).addHandler(&events);

  // APIs
  (*webServer).on("/api/on", HTTP_GET, handleOn);
  (*webServer).on("/api/off", HTTP_GET, handleOff);
  (*webServer).on("/api/status", HTTP_GET, handleStatus);
}
