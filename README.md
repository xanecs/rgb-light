# RGB-Light

This nodejs application controls an RGB-LED connected via an Arduino.

## Electronics

Connect the LED to the Arduino. If you want to use a 12V LED strip, I'd suggest to use an `ULN2803` to connect it.

Programm the Arduino with the StandardFirmata sketch found in the examples of the Arduino IDE.

The default pinout is:

|Color |Pin |
|:-----|---:|
|Red   |`10`|
|Green |`09`|
|Blue  |`11`|

## Usage

Connect the Arduino to your PC or Raspberry Pi. Then start the server

```
node server.js
```

Now open a webbrowser at `http://localhost:2000`

## Controls

The LED is turned off at startup.  
Click `ON` to turn the light on.  
Drag the color picker to change the LED color.  
Click `OFF` to turn the light back off.

Hitting any key in your browser window enables 'strobe mode'.
The LED will then be on as long as the key is kept pressed.
