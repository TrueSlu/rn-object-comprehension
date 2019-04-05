# Mobile Object Comprehension

Built with React Native, Expo, and Google Cloud Platform for TSA (lol) in a night of rips and pizza

Installation & Setup:

1. Install node + npm from https://nodejs.org/en/
1. Clone repository (`git clone https://github.com/TrueSlu/rn-object-comprehension`)
1. `cd rn-object-comprehension`
1. `cd src`
1. `npm install -g expo-cli`
1. `npm install`
1. `npm start`
1. Install the Expo App on your phone
1. Scan the QR code with your Camera app (iOS) or the Expo app (Android)

App status: Working, MVP

Features:

- Take a picture
- Scan contents of image for top 3 annotations

Process:

- Take picture
- Convert image data from URI to base64
- Execute async fetch request to GCP API
- Parse JSON results
- Display in UI
