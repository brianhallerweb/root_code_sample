const fs = require("fs");

const commandParser = require("./command_parser");
const parseInputFile = commandParser.parseInputFile;
const driverCommands = commandParser.driverCommands;
const tripCommands = commandParser.tripCommands;

const commandExecuter = require("./command_executer");
const executeDriverCommands = commandExecuter.executeDriverCommands;
const executeTripCommands = commandExecuter.executeTripCommands;

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
