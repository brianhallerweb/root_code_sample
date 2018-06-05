# Root Code Sample - driving history app

This app processes an input text file. Each line in the input file starts with a command. There are two possible commands.

The first command is Driver, which registers a new Driver in the app. Example:

`Driver Dan`

The second command is Trip, which will record a trip attributed to a driver. The line must be space delimited with the following fields: the command (Trip), driver name, start time, stop time, miles driven. Times require the format of hours:minutes,using a 24-hour clock and following the assumption that drivers never drive past midnight (the start time will always be before the end time). Example:

`Trip Dan 07:15 07:45 17.3`

Example input:

```
Driver Dan
Driver Alex
Driver Bob
Trip Dan 07:15 07:45 17.3
Trip Dan 06:12 06:32 21.8
Trip Alex 12:01 13:16 42.0
```

Expected output:

```
Alex: 42 miles @ 34 mph
Dan: 39 miles @ 47 mph
Bob: 0 miles
```

Start the app with:

`$ node app.js ./inputFile.txt`

Tests are written in Jest:

`$ npm test`

![Alt text](/app_diagram.jpg "App Diagram")
