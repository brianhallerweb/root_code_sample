const fs = require("fs");
const store = require("./store/store");
const createOutput = require("./createOutput");
const createDrivingRecords = require("./createDrivingRecords");

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
    const drivingHistoryReport = createOutput(store);
    console.log(drivingHistoryReport);
  });
}

run();
