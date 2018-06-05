const fs = require("fs");

const commandParser = require("./src/command_parser");
const parseInputFile = commandParser.parseInputFile;
const driverCommands = commandParser.driverCommands;
const tripCommands = commandParser.tripCommands;

const commandExecuter = require("./src/command_executer");
const executeDriverCommands = commandExecuter.executeDriverCommands;
const executeTripCommands = commandExecuter.executeTripCommands;

const database = require("./database/database");

const logOutput = require("./src/logger");

function run() {
  fs.readFile("./input.txt", "utf8", (err, data) => {
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
