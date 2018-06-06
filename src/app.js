const fs = require("fs");

const {
  parseInputFile,
  driverCommands,
  tripCommands
} = require("./command_parser");

const {
  executeDriverCommands,
  executeTripCommands
} = require("./command_executer");

const database = require("../database/database");

const logOutput = require("./logger");

function run() {
  let inputFilePath;
  if (process.argv.length === 3) {
    inputFilePath = process.argv.pop();
  } else {
    console.log("An input file is required");
    return;
  }

  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.log("Something went wrong reading your input file");
      return;
    }
    parseInputFile(data);
    executeDriverCommands();
    executeTripCommands();
    const result = logOutput();
    console.log(result);
  });
}

run();
