// IoT & Embedded Systems Track — five builds, each going one step further than the last.
// Source: the track's spec sheets (overview, source code, media), rewritten in this site's voice.
// Unverified performance figures from the original reflections were left out.

export const track = {
  name: 'IoT & Embedded Systems Track',
  credit: 'Team build',
  intro:
    'Five builds on one ESP32, each going one step further: a web page served from the chip, then the cloud, then automations, then a live database, and finally exportable history.',
  steps: ['Local', 'Cloud', 'Automate', 'Database', 'History'],
}

export const tasks = [
  {
    n: '01',
    step: 'Local',
    title: 'ESP32 Local Web Server Control',
    short: 'A web page served from the chip itself switches an LED, with no cloud involved.',
    summary:
      'An HTTP server running directly on the ESP32, with no outside infrastructure. The board keeps a lightweight HTML page in RAM, serves it on TCP port 80, and toggles its GPIO pins when a browser on the same network sends a request.',
    highlights: [
      'The full request–response cycle is handled in the ESP32’s own RAM',
      'REST-style endpoints, /led/on and /led/off, mapped to handlers',
      'Joins the local Wi-Fi network as a station and gets an IP by DHCP',
      'Direct pin toggling for an immediate hardware response',
    ],
    concepts: [
      ['ESP32 system-on-chip', 'A dual-core, low-power microcontroller with built-in 2.4 GHz Wi-Fi and Bluetooth.'],
      ['TCP/IP and HTTP', 'Stateless request–response messaging that carries web pages to clients on the local network.'],
      ['REST-style routing', 'Each URL path is mapped to a function that changes a pin’s digital state.'],
    ],
    stack: ['ESP32 NodeMCU dev board', '5V relay / LED module', 'Wi-Fi access point', 'Jumper wires & breadboard'],
    reflection:
      'Fitting HTTP handling into the ESP32’s 520 KB of SRAM showed how an embedded network stack routes requests without a heavy framework.',
    code: {
      file: 'ESP32_Local_WebServer.ino',
      lang: 'cpp',
      src: `#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
const int ledPin = 2;

void handleRoot() {
  String html = "<html><body style='font-family:sans-serif; background:#07080d; color:#fff; text-align:center;'>";
  html += "<h1>ESP32 Local HTTP Actuation</h1>";
  html += "<a href='/led/on' style='padding:10px 20px; background:#10b981; color:#fff; text-decoration:none;'>LED ON</a> ";
  html += "<a href='/led/off' style='padding:10px 20px; background:#ef4444; color:#fff; text-decoration:none;'>LED OFF</a>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleLedOn() {
  digitalWrite(ledPin, HIGH);
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleLedOff() {
  digitalWrite(ledPin, LOW);
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  server.on("/", handleRoot);
  server.on("/led/on", handleLedOn);
  server.on("/led/off", handleLedOff);
  server.begin();
}

void loop() {
  server.handleClient();
}`,
    },
    media: [
      { type: 'video', src: 'media/bench-esp32-led.mp4', poster: 'media/bench-esp32-led.jpg', ratio: '576 / 1024', caption: 'Switching the LED on and off from a phone' },
    ],
  },
  {
    n: '02',
    step: 'Cloud',
    title: 'Adafruit IO Cloud Telemetry & MQTT Dashboards',
    short: 'The same board, now controlled from anywhere through an MQTT cloud dashboard.',
    summary:
      'Moves control from the local network to the internet by connecting the ESP32 to Adafruit IO over MQTT. Custom feeds stream state changes in real time, so people on other networks can safely switch a load through an optocoupler-isolated relay.',
    highlights: [
      'MQTT publish/subscribe over port 1883 with a persistent TCP connection',
      'Lightweight topic routing carries commands in both directions',
      'Optocoupler isolation keeps high-voltage back-EMF away from the chip',
      'A cloud dashboard shows live hardware state with a switch toggle',
    ],
    concepts: [
      ['MQTT protocol', 'A very light publish/subscribe transport, suited to constrained devices and low-bandwidth links.'],
      ['Adafruit IO feeds', 'Cloud endpoints that map live device variables to dashboard widgets.'],
      ['Optocoupler relay driver', 'Galvanic isolation between the 3.3 V logic and the mains-powered load.'],
    ],
    stack: ['ESP32 SoC', '5V optocoupler relay module', 'Adafruit IO MQTT broker', 'AC test bulb'],
    reflection:
      'MQTT only sends a message when something changes, which is far lighter than repeatedly asking a server over HTTP.',
    code: {
      file: 'ESP32_Adafruit_MQTT.ino',
      lang: 'cpp',
      src: `#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "YOUR_ADAFRUIT_IO_USERNAME"
#define AIO_KEY         "YOUR_ADAFRUIT_IO_KEY"

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Subscribe relayFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/relay-control");

const int RELAY_PIN = 4;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  WiFi.begin("YOUR_WIFI_SSID", "YOUR_WIFI_PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  mqtt.subscribe(&relayFeed);
}

void loop() {
  if (!mqtt.connected()) {
    int8_t ret;
    while ((ret = mqtt.connect()) != 0) {
      mqtt.disconnect();
      delay(5000);
    }
  }

  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(2000))) {
    if (subscription == &relayFeed) {
      char *message = (char *)relayFeed.lastread;
      if (strcmp(message, "ON") == 0) digitalWrite(RELAY_PIN, HIGH);
      else if (strcmp(message, "OFF") == 0) digitalWrite(RELAY_PIN, LOW);
    }
  }
}`,
    },
    media: [
      { type: 'image', src: 'media/t02-adafruit-dashboard.jpg', ratio: '732 / 414', caption: 'Adafruit IO dashboard — the bulb toggle' },
      { type: 'video', src: 'media/bench-bulb.mp4', poster: 'media/bench-bulb.jpg', ratio: '832 / 464', caption: 'Switching the bulb from the cloud dashboard' },
    ],
  },
  {
    n: '03',
    step: 'Automate',
    title: 'IFTTT Event Automation & Webhook Integration',
    short: 'Webhooks, schedules and a voice assistant drive the hardware with no app open.',
    summary:
      'Connects IFTTT (If This Then That) to the Adafruit IO feeds to run conditional automations. Incoming webhooks and REST triggers publish to the MQTT topic on a schedule or when an outside app fires an event.',
    highlights: [
      'Webhook HTTP POSTs dispatched to Adafruit IO REST API endpoints',
      'Event-to-hardware pipeline with no manual dashboard step',
      'One state kept in sync across triggers: webhooks, email, location',
      'Error handling for cloud events that arrive late',
    ],
    concepts: [
      ['Webhooks & REST APIs', 'HTTP POST callbacks that let separate systems notify each other of events.'],
      ['Event-driven architecture', 'The hardware acts when a state change arrives, not on a fixed loop.'],
    ],
    stack: ['ESP32 SoC', 'IFTTT service layer', 'Adafruit IO REST API', 'Status indicator LEDs'],
    reflection:
      'Webhooks connect a physical board to a whole ecosystem of apps and assistants without adding code to the microcontroller.',
    code: {
      file: 'IFTTT_Webhook_Payload.json',
      lang: 'json',
      src: `{
  "event": "scheduled_automation_trigger",
  "value1": "ON",
  "feed_key": "relay-control",
  "timestamp": "2026-09-28T10:00:00Z"
}`,
    },
    media: [
      { type: 'video', src: 'media/bench-phone-bulb.mp4', poster: 'media/bench-phone-bulb.jpg', ratio: '832 / 464', caption: 'Voice assistant to IFTTT webhook to bulb' },
    ],
  },
  {
    n: '04',
    step: 'Database',
    title: 'Firebase Realtime Database & Sensor Dashboard',
    short: 'Temperature, humidity and light streamed to Firebase, with a dashboard that can switch the bulb back.',
    summary:
      'A complete IoT loop: an ESP32 with a DHT temperature/humidity sensor and an LDR light sensor writes to Google Firebase Realtime Database, and an interactive web dashboard reads it live and can override the appliance.',
    highlights: [
      'Two-way sync with Firebase Realtime Database over an encrypted connection',
      'Several sensors sampled together: temperature, humidity, light (ADC)',
      'Two modes: manual switch from the cloud, or automatic by threshold',
      'A live web dashboard of gauge cards and device status',
    ],
    concepts: [
      ['Firebase Realtime DB', 'A NoSQL cloud database that keeps every connected client in sync in real time.'],
      ['Multi-sensor interfacing', 'Reading the DHT’s single-wire digital signal and the LDR’s analog voltage together.'],
      ['Threshold actuation', 'An embedded decision loop compares readings against user-set triggers.'],
    ],
    stack: ['ESP32 microcontroller', 'DHT sensor', 'LDR light sensor', 'Relay module', 'Firebase NoSQL cloud'],
    reflection:
      'With one shared data tree in the cloud, the board, the dashboard and the person using it all see the same state.',
    diagram: true,
    code: {
      file: 'ESP32_Firebase_RTDB_Telemetry.ino',
      lang: 'cpp',
      src: `#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11
#define LDRPIN 34
#define RELAYPIN 5

DHT dht(DHTPIN, DHTTYPE);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(RELAYPIN, OUTPUT);
  WiFi.begin("WIFI_SSID", "WIFI_PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  config.host = "YOUR_FIREBASE_PROJECT.firebaseio.com";
  config.signer.tokens.legacy_token = "YOUR_FIREBASE_DATABASE_SECRET";
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int ldrVal = analogRead(LDRPIN);

  if (!isnan(temp) && !isnan(hum)) {
    Firebase.RTDB.setFloat(&fbdo, "/sensorData/temperature", temp);
    Firebase.RTDB.setFloat(&fbdo, "/sensorData/humidity", hum);
    Firebase.RTDB.setInt(&fbdo, "/sensorData/lightLevel", ldrVal);
  }

  if (Firebase.RTDB.getBool(&fbdo, "/appliances/bulbState")) {
    bool state = fbdo.to<bool>();
    digitalWrite(RELAYPIN, state ? HIGH : LOW);
  }
  delay(3000);
}`,
    },
    media: [
      { type: 'image', src: 'media/smartenv-dashboard.jpg', ratio: '1577 / 811', caption: 'Overview dashboard — live telemetry from the ESP32 node', wide: true },
      { type: 'image', src: 'media/smartenv-console.jpg', ratio: '1583 / 821', caption: 'Hardware simulator & testing console — simulated readings and threshold checks' },
      { type: 'image', src: 'media/smartenv-login.jpg', ratio: '1591 / 810', caption: 'Sign-in — the gateway to the dashboard' },
      { type: 'image', src: 'media/t04-bench-frame.jpg', ratio: '449 / 626', caption: 'The sensor rig on the bench, bulb on', tall: true },
    ],
  },
  {
    n: '05',
    step: 'History',
    title: 'Time-Series Data Logging & CSV Export',
    short: 'Every reading kept with a timestamp, browsable as a log and downloadable as a CSV.',
    summary:
      'Extends the pipeline with a time-series history in Firebase RTDB, plus a small client-side JavaScript utility that queries, formats and exports the sensor readings as CSV reports.',
    highlights: [
      'Time-indexed JSON structure suited to quick range queries',
      'The CSV file is built in the browser, with no server involved',
      'Timestamps formatted and states labelled ready for analysis',
      'Historical trends across several sensors at once',
    ],
    concepts: [
      ['Time-series logging', 'Readings stored against timestamps so they can be analysed over time.'],
      ['Client-side export', 'A text/csv data URI built in the browser triggers a download directly.'],
    ],
    stack: ['ESP32 SoC', 'Firebase history node', 'JavaScript export utility'],
    reflection:
      'Closing the loop — from pin logic on the microcontroller to cloud storage to a report you can download — made the whole IoT lifecycle concrete.',
    code: {
      file: 'csvExporter.js',
      lang: 'js',
      src: `export function downloadSensorDataCSV(dataArray) {
  const headers = ["Timestamp", "Temperature (°C)", "Humidity (%)", "Light Level (ADC)", "Relay State", "System Mode"];
  const rows = dataArray.map(row => [
    row.timestamp,
    row.temperature,
    row.humidity,
    row.lightLevel,
    row.bulbState ? "ON" : "OFF",
    row.mode
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", \`esp32_sensor_log_\${Date.now()}.csv\`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}`,
    },
    media: [
      { type: 'image', src: 'media/ems-datalog.jpg', ratio: '1600 / 804', caption: 'Data log — 766 timestamped records, 39 pages', wide: true },
      { type: 'image', src: 'media/t05-serial-terminal.jpg', ratio: '515 / 515', caption: 'Serial terminal — timestamped telemetry output' },
      { type: 'image', src: 'media/t05-breadboard.jpg', ratio: '600 / 515', caption: 'The multi-sensor circuit on a breadboard' },
    ],
  },
]
