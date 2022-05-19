#pragma once

#include "ESPAsyncWebServer.h"

extern bool isCoffeeMakerOn;
extern int lastStartupMillis;
extern AsyncEventSource events;

void handleStatus(AsyncWebServerRequest *request);
void handleOff(AsyncWebServerRequest *request);
void handleOn(AsyncWebServerRequest *request);
