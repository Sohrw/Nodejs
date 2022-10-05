/*
 * WebSocketClientSocketIO.ino
 *
 *  Created on: 06.06.2016
 *
 */

#include <Arduino.h>
#include <DHT.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;


#define USE_SERIAL Serial
#define DHTPIN 4
#define DHTTYPE DHT22

int LED1 =16;
int LED2 =5;
int LED3 =0;
int LED4 =2;
int LED5 =14;
int LED6 =12;
int LED7 =13;
int LED8 =15;


DHT dht(DHTPIN,DHTTYPE);
bool led1 = false;
bool led2 = false;
bool led3 = false;
bool led4 = false;
bool led5 = false;
bool led6 = false;
bool led7 = false;
bool led8 = false;
bool led9 = false;
void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            socketIO.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
        {
            USE_SERIAL.printf("[IOc] get event: %s\n", payload);
            String msg = (char*)payload;
            if(payload[2] == 'p') {
            if(payload[23] == '1') {
              digitalWrite(LED1, HIGH);
            }
            else if (payload[23] == '0') {
              digitalWrite(LED1,LOW);
            }
            if(payload[32] == '1') {
              digitalWrite(LED2, HIGH);
            }
            else if (payload[32] == '0') {
              digitalWrite(LED2,LOW);
            }
            if(payload[41] == '1') {
              digitalWrite(LED3, HIGH);
            }
            else if (payload[41] == '0') {
              digitalWrite(LED3,LOW);
            }
            if(payload[50] == '1') {
              digitalWrite(LED4, HIGH);
            }
            else if (payload[50] == '0') {
              digitalWrite(LED4,LOW);
            }
            if(payload[59] == '1') {
              digitalWrite(LED5, HIGH);
            }
            else if (payload[59] == '0') {
              digitalWrite(LED5,LOW);
            }
            if(payload[68] == '1') {
              digitalWrite(LED6, HIGH);
            }
            else if (payload[68] == '0') {
              digitalWrite(LED6,LOW);
            }
            if(payload[77] == '1') {
              digitalWrite(LED7, HIGH);
            }
            else if (payload[77] == '0') {
              digitalWrite(LED7,LOW);
            }
            if(payload[86] == '1') {
              digitalWrite(LED8, HIGH);
            }
            else if (payload[86] == '0') {
              digitalWrite(LED8,LOW);
            }
            if(payload[95] == '1') {
              digitalWrite(LED_BUILTIN, HIGH);
            }
            else if (payload[95] == '0') {
              digitalWrite(LED_BUILTIN,LOW);
            }
            }
            break;
        }            
        case sIOtype_ACK:
            USE_SERIAL.printf("[IOc] get ack: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            USE_SERIAL.printf("[IOc] get error: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            USE_SERIAL.printf("[IOc] get binary: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
            hexdump(payload, length);
            break;
    }
}

void setup() {
    // USE_SERIAL.begin(921600);
    USE_SERIAL.begin(115200);
    pinMode(LED1, OUTPUT);
    pinMode(LED2, OUTPUT);
    pinMode(LED3, OUTPUT);
    pinMode(LED4, OUTPUT);
    pinMode(LED5, OUTPUT);
    pinMode(LED6, OUTPUT);
    pinMode(LED7, OUTPUT);
    pinMode(LED8, OUTPUT);
    pinMode(LED_BUILTIN, OUTPUT);

    //Serial.setDebugOutput(true);
    USE_SERIAL.setDebugOutput(true);
    dht.begin();

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

      for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);
      }

    // disable AP
    if(WiFi.getMode() & WIFI_AP) {
        WiFi.softAPdisconnect(true);
    }

    WiFiMulti.addAP("iptime", "aaaaaaa1");

    //WiFi.disconnect();
    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }

    String ip = WiFi.localIP().toString();
    USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

    // server address, port and URL
    socketIO.begin("192.168.0.4", 5002, "/socket.io/?EIO=4");

    // event handler
    socketIO.onEvent(socketIOEvent);
}

unsigned long messageTimestamp = 0;
void loop() {
    socketIO.loop();
    

    uint64_t now = millis();
    

    if(now - messageTimestamp > 2000) {
        messageTimestamp = now;

        // creat JSON message for Socket.IO (event)
        DynamicJsonDocument doc(1024);
        JsonArray array = doc.to<JsonArray>();

        // add evnet name
        // Hint: socket.on('event_name', ....
        array.add("sendData");
        
        
        
        float t = dht.readTemperature();
        float h = dht.readHumidity();
        
        
        
        
        
        // add payload (parameters) for the event
        JsonObject param1 = array.createNestedObject();
        param1["t"] = floor(t);
        param1["h"] = floor(h);       

        
        


        // JSON to String (serializion)
        String output;
        serializeJson(doc, output);

        // Send event
        socketIO.sendEVENT(output);

        // Print JSON for debugging
        USE_SERIAL.println(output);
    }
}
