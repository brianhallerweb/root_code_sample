const fs = require("fs");
const store = require("./store/store");
const strOutput = require("./logger");
const createDrivingRecords = require("./trip_recorder");

function run() {
  if (process.argv.length !== 3) {
    throw Error(
      "App must be started with a command in this format: $ node src/app.js ./inputFile.txt"
    );
  }
  const inputFilePath = process.argv[2];

  fs.readFile(inputFilePath, "utf8", (err, drivingData) => {
    if (err) {
      throw Error(err);
    }

    createDrivingRecords(drivingData);
    const drivingHistoryReport = strOutput(store);
    console.log(drivingHistoryReport);
  });
}

run();
