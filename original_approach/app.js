const fs = require("fs");
const parseCommands = require("./command_parser");
const executeCommands = require("./command_executer");
const database = require("../database/database");
const logOutput = require("./logger");

function run() {
  if (process.argv.length !== 3) {
    throw Error(
      "App must be started with a command in this format: $ node src/app.js ./inputFile.txt"
    );
  }
  const inputFilePath = process.argv[2];

  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      throw Error(err);
    }

    const commands = parseCommands(data);
    executeCommands(commands, database);
    const drivingHistoryReport = logOutput(database);
    console.log(drivingHistoryReport);
  });
}

run();
