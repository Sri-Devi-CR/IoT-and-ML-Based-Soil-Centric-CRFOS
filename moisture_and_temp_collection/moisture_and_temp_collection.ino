#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 2 
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(9600); 
  sensors.begin(); 
  
  Serial.println("READY"); 
}

void loop() {
  if (Serial.available() > 0) { 
    String command = Serial.readStringUntil('\n'); 

    if (command == "FETCH") { 
      int moistureValue = analogRead(A0);
      int moisturePercent = map(moistureValue, 1020, 500, 0, 100); 

      sensors.requestTemperatures(); 
      float temperature = sensors.getTempCByIndex(0);

   
      Serial.print("{\"moisture\":");
      Serial.print(moisturePercent);
      Serial.print(",\"temperature\":");
      Serial.print(temperature);
      Serial.println("}");
    }
  }
}
