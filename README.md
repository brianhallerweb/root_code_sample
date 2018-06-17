## Root Code Sample - driving history app

This app processes an input text file. Each line in the input file starts with a command. There are two possible commands.

The first command is Driver, which registers a new Driver in the app. Example:

`Driver Dan`

The second command is Trip, which will record a trip attributed to a driver. The line must be space delimited with the following fields: the command (Trip), driver name, start time, stop time, miles driven. Times require the format of hours:minutes,using a 24-hour clock and following the assumption that drivers never drive past midnight (the start time will always be before the end time). Example:

`Trip Dan 07:15 07:45 17.3`

The app will generate a report containing each driver with total miles driven and average speed, sorted by most miles driven to least.

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

Run the app with:

`$ node src/app.js ./inputfile.txt`

Unit tests are written in Jest:

`$ npm test`

---

#### App Diagram (original_approach)

![Alt text](/app_diagram.jpg)

---

##### Redux Approach

For the sake of curiosity, and a deeper understanding of modern state mangement, I rewrote the app with redux. That code is found in the redux_approach folder. It generates an equivalent output to my original approach.
