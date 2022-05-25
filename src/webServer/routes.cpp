#include <Arduino.h>
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"
#include "controllers/controllers.h"
#include "webServer.h"

void routes(AsyncWebServer *webServer) {
  // APIs
  (*webServer).on("/api/on", HTTP_GET, handleOn);
  (*webServer).on("/api/off", HTTP_GET, handleOff);
  (*webServer).on("/api/status", HTTP_GET, handleStatus);

  // Attach SSE socket
  (*webServer).addHandler(&events);

  // Static files
  (*webServer).serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");
}
