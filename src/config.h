#pragma once

// WEB SERVER
#define MSG_BUFFER_SIZE 50
#define RECONNECTION_TIME 1000
#define HTTP_SERVER_PORT 80

// GPIO
#define BOILER_PIN 26
#define TEMP_PROBE_PIN 34

// TEMP SENSOR
#define INPUT_VOLTS 3.3
#define KNOWN_RESISTOR_OHM 50000
#define RAW_TEMP_SENSOR_SAMPLES 60
#define TEMP_SENSOR_SAMPLES 40
#define TRIM_PERCENTAGE 10
#define TRIM_SAMPLES (int)(TEMP_SENSOR_SAMPLES / 100) * TRIM_PERCENTAGE

// DEFAULT CONFIGURATION
#define DEF_COFFEE_TEMP_STOP_CELSIUS 95
#define DEF_COFFEE_TEMP_START_CELSIUS 85
#define DEF_AUTO_OFF_TIME_MINUTES 5

#define DEF_CORTO_CUP_DISPENSING_SECONDS 4
#define DEF_NORMAL_CUP_DISPENSING_SECONDS 6
#define DEF_LUNGO_CUP_DISPENSING_SECONDS 9

#define DEF_DOUBLE_CORTO_CUP_DISPENSING_SECONDS 4
#define DEF_DOUBLE_NORMAL_CUP_DISPENSING_SECONDS 6
#define DEF_DOUBLE_LUNGO_CUP_DISPENSING_SECONDS 9

#define DEF_AP_SSID "CoffeeMaker"
#define DEF_AP_PASSWORD "givemecoffee"

