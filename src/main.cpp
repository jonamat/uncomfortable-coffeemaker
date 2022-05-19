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

float ohmToCelsius(int ohm) {
  return 424.5460 - (36.3507 * log1p(ohm));
}

int inputToOhm(int input) {
  float Vout = (input * (float)INPUT_VOLTS) / 4095.0;
  return (float)KNOWN_RESISTOR_OHM * (((float)INPUT_VOLTS / Vout) - 1);
}

float readTemp(int pin) {
  int samples [60];

  // Collect samples
  for (int i = 0; i < 60; i++) {
    samples[i] = analogRead(pin);
  }

  // Sort
  for (int i = 0; i < 60; i++) {
    for (int j = i + 1; j < 60; j++) {
      if (samples[i] > samples[j]) {
        int temp = samples[i];
        samples[i] = samples[j];
        samples[j] = temp;
      }
    }
  }

  // Trim 10% from top and bottom
  int trimmedSamples[40];
  for (int i = 10; i < 50; i++) {
    trimmedSamples[i - 10] = samples[i];
  }

  // Calculate average
  int sum = 0;
  for (int i = 0; i < 40; i++) {
    sum += trimmedSamples[i];
  }
  float meanRead = sum / 40;

  return ohmToCelsius(inputToOhm(meanRead));
}

void setup(void) {
  pinMode(BOILER_PIN, OUTPUT);

  // Serial
  Serial.begin(115200);
  while (!Serial)
    delay(500);

  // GPIO init state
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
    request->send(200, "text/plain", String(readTemp(TEMP_PROBE_PIN)).c_str());
    });

  // Static files
  // webServer.serveStatic("/", SPIFFS, "/");

  webServer.begin();
}


void loop(void) {
  float temp = readTemp(TEMP_PROBE_PIN);

  if (isCoffeeMakerOn) {
    if (temp <= (float)COFFEE_TEMP_START_CELSIUS) {
      digitalWrite(BOILER_PIN, LOW);
    }

    if (temp >= (float)COFFEE_TEMP_STOP_CELSIUS) {
      digitalWrite(BOILER_PIN, HIGH);
    }
  } else {
    digitalWrite(BOILER_PIN, HIGH);
  }

  if (isCoffeeMakerOn && millis() - lastStartup > AUTO_OFF_TIME_MINUTES * 60000) {
    isCoffeeMakerOn = false;
    lastStartup = 0;
  }
}
