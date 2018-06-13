const fs = require("fs");
const createDrivingRecords = require("./trip_recorder");
const database = require("../database/database");
const createOutput = require("./logger");

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
    createDrivingRecords(drivingData, database);
    const drivingHistoryReport = createOutput(database);
    console.log(drivingHistoryReport);
  });
}

run();
