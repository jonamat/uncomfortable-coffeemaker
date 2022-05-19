#include <Arduino.h>
#include "config.h"
#include "sensor.h"

float ohmToCelsius(int ohm) {
  return 424.5460 - (36.3507 * log1p(ohm));
}

int inputToOhm(int input) {
  float Vout = (input * (float)INPUT_VOLTS) / 4095.0;
  return (float)KNOWN_RESISTOR_OHM * (((float)INPUT_VOLTS / Vout) - 1);
}

float readTemp(int pin) {
  int samples[RAW_TEMP_SENSOR_SAMPLES];

  // Collect samples
  for (int i = 0; i < RAW_TEMP_SENSOR_SAMPLES; i++) {
    samples[i] = analogRead(pin);
  }

  // Sort
  for (int i = 0; i < RAW_TEMP_SENSOR_SAMPLES; i++) {
    for (int j = i + 1; j < RAW_TEMP_SENSOR_SAMPLES; j++) {
      if (samples[i] > samples[j]) {
        int temp = samples[i];
        samples[i] = samples[j];
        samples[j] = temp;
      }
    }
  }

  // Trim 10% from top and bottom of samples
  int trimmedSamples[TEMP_SENSOR_SAMPLES];
  for (int i = TRIM_SAMPLES; i < TEMP_SENSOR_SAMPLES - TRIM_SAMPLES; i++) {
    trimmedSamples[i - TRIM_SAMPLES] = samples[i];
  }

  // Calculate average
  int sum = 0;
  for (int i = 0; i < TEMP_SENSOR_SAMPLES; i++) {
    sum += trimmedSamples[i];
  }
  float meanRead = sum / TEMP_SENSOR_SAMPLES;

  return ohmToCelsius(inputToOhm(meanRead));
}
