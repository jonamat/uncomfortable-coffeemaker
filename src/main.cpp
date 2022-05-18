#include <Arduino.h>
#include <WiFi.h>
#include <AsyncElegantOTA.h>

#include "../secret.h"
#include "config.h"

AsyncWebServer webServer(HTTP_SERVER_PORT);
WiFiClient wifiClient;
AsyncElegantOtaClass ota;

unsigned long lastMsg = 0;
char msg[MSG_BUFFER_SIZE];
bool isCoffeeMakerOn = false;
int lastStartup = 0;

float ohmToCelsius(double ohm) {
  return 424.5460 - (36.3507 * log1p(ohm));
}

void setup(void) {
  // Serial
  Serial.begin(115200);
  while (!Serial)
    delay(500);

  // GPIO init state
  digitalWrite(BOILER_PIN, LOW);

  // Wifi
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  char buf[255];
  sprintf(buf, "Connecting to SSID  %s...", WIFI_SSID);
  Serial.println(buf);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  sprintf(buf, "Connected to  %s. IP Address: ", WIFI_SSID, WiFi.localIP().toString().c_str());
  Serial.println(buf);

  // OTA
  ota.begin(&webServer);

  // APIs
  webServer.on("/api/on", HTTP_GET, [](AsyncWebServerRequest* request) {
    request->send(200, "text/plain");
    isCoffeeMakerOn = true;
    lastStartup = millis();
    });

  webServer.on("/api/off", HTTP_GET, [](AsyncWebServerRequest* request) {
    request->send(200, "text/plain");
    isCoffeeMakerOn = false;
    });

  webServer.on("/api/status", HTTP_GET, [](AsyncWebServerRequest* request) {
    request->send(200, "text/plain", isCoffeeMakerOn ? "on" : "off");
    });

  webServer.on("/api/temp", HTTP_GET, [](AsyncWebServerRequest* request) {
    request->send(200, "text/plain", String(ohmToCelsius(analogRead(TEMP_PROBE_PIN))).c_str());
  });

  // Static files
  // webServer.serveStatic("/", SPIFFS, "/");

  webServer.begin();
}


void loop(void) {
  if (isCoffeeMakerOn &&
    ohmToCelsius(analogRead(TEMP_PROBE_PIN)) >= (float)COFFEE_TEMP_CELSIUS
    ) {
    digitalWrite(BOILER_PIN, LOW);
  }
  else {
    digitalWrite(BOILER_PIN, HIGH);
  }

  if (isCoffeeMakerOn && millis() - lastStartup > AUTO_OFF_TIME_MINUTES * 60000) {
    isCoffeeMakerOn = false;
    lastStartup = 0;
  }
}

// void error(char* err) {
//   while(true) {
//     digitalWrite(BOILER_PIN, LOW);
//   }
// }
