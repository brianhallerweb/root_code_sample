const fs = require("fs");
const parseCommands = require("./parseCommands");
const executeCommands = require("./executeCommands");
const createOutput = require("./createOutput");
const drivingRecords = require("./drivingRecords");

function run() {
  if (process.argv.length !== 3) {
    throw Error(
      "App must be started with a command in this format: $ node src/app.js ./inputfile.txt"
    );
  }
  const inputFilePath = process.argv[2];

  fs.readFile(inputFilePath, "utf8", (err, drivingData) => {
    if (err) {
      throw Error(err);
    }

    const commands = parseCommands(drivingData);
    executeCommands(commands, drivingRecords);
    const drivingHistoryReport = createOutput(drivingRecords);
    console.log(drivingHistoryReport);
  });
}

run();
