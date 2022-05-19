# pragma once

#include "ESPAsyncWebServer.h"

extern AsyncEventSource events;

void routes(AsyncWebServer *webServer);
