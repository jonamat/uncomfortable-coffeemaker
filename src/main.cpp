#include <Arduino.h>
#include <WiFi.h>
#include <AsyncElegantOTA.h>
#include <SPIFFS.h>
#include "webServer/webServer.h"

#include "config.h"
#include "sensor.h"
#include "../secret.h"

AsyncWebServer webServer(HTTP_SERVER_PORT);
WiFiClient wifiClient;
AsyncElegantOtaClass ota;
AsyncEventSource events("/events");

bool isCoffeeMakerOn = false;
unsigned long long lastStartupMillis = 0;
String lastStatusWarned = "off";

// TODO save config in eeprom
// struct Config {
  // String wifiSsid = "";
  // String wifiPassword = "";

//   String apSsid = DEF_AP_SSID;
//   String apPassword = DEF_AP_PASSWORD;

//   int coffeeTempStopCelsius = DEF_COFFEE_TEMP_STOP_CELSIUS;
//   int coffeeTempStartCelsius = DEF_COFFEE_TEMP_START_CELSIUS;
//   int autoOffMinutes = DEF_AUTO_OFF_TIME_MINUTES;

//   int cortoCupDispensingSeconds = DEF_CORTO_CUP_DISPENSING_SECONDS;
//   int normalCupDispensingSeconds = DEF_NORMAL_CUP_DISPENSING_SECONDS;
//   int lungoCupDispensingSeconds = DEF_LUNGO_CUP_DISPENSING_SECONDS;

//   int doubleCortoCupDispensingSeconds = DEF_DOUBLE_CORTO_CUP_DISPENSING_SECONDS;
//   int doubleNormalCupDispensingSeconds = DEF_DOUBLE_NORMAL_CUP_DISPENSING_SECONDS;
//   int doubleLungoCupDispensingSeconds = DEF_DOUBLE_LUNGO_CUP_DISPENSING_SECONDS;
// };

void setup(void) {
  // Serial
  Serial.begin(115200);
  while (!Serial) {
    delay(500);
  }

  // Initialize SPIFFS
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
  }

  // GPIO setup
  pinMode(BOILER_PIN, OUTPUT);
  digitalWrite(BOILER_PIN, HIGH);

  // Wifi
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  char buf[255];
  sprintf(buf, "Connecting to SSID  %s...", WIFI_SSID);
  Serial.println(buf);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  sprintf(buf, "Connected to  %s. IP Address: %s", WIFI_SSID, WiFi.localIP().toString().c_str());
  Serial.println(buf);

  // SSE Socket
  events.onConnect([](AsyncEventSourceClient* client) {
    if (client->lastId()) {
      Serial.printf("client reconnected. Last message ID: %u\n", client->lastId());
    }

    client->send("socket attached", "message", millis(), 10000);
    });

  // OTA
  ota.begin(&webServer);

  // Server start
  routes(&webServer);
  webServer.begin();

}


void loop(void) {
  // Wifi controller
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  }

  // Coffee maker controller
  float temp = readTemp(TEMP_PROBE_PIN);

  if (isCoffeeMakerOn) {
    if (temp <= (float)DEF_COFFEE_TEMP_START_CELSIUS) {
      digitalWrite(BOILER_PIN, LOW);

      if (lastStatusWarned == "off") {
        events.send("boiler is turned on", "message", millis());
        lastStatusWarned = "on";
      }
    }

    if (temp >= (float)DEF_COFFEE_TEMP_STOP_CELSIUS) {
      digitalWrite(BOILER_PIN, HIGH);

      if (lastStatusWarned == "on") {
        events.send("boiler is turned off", "message", millis());
        lastStatusWarned = "off";
      }
    }
  }
  else {
    digitalWrite(BOILER_PIN, HIGH);

    if (lastStatusWarned == "on") {
      events.send("boiler is turned off", "message", millis());
      lastStatusWarned = "off";
    }
  }

  if (isCoffeeMakerOn && millis() - lastStartupMillis > DEF_AUTO_OFF_TIME_MINUTES * 60000) {
    isCoffeeMakerOn = false;
    lastStartupMillis = 0;
    events.send("timeout reached. coffee maker turned off", "message", millis());
  }

  delay(10);
}
