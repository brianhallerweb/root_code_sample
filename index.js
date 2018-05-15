const fs = require("fs");

//The commands object has properties and methods that
//parse the input file data into distinct commands and
//then execute those commands. The end result is a
//database full of drivers with their driving records.
const commands = {
  driverCommands: [],
  tripCommands: [],
  parseInputFile(file) {
    const commands = file.split("\n");
    while (commands[commands.length - 1] === "") {
      commands.pop();
    }
    commands.forEach(command => {
      trimmedCommand = command.trim();
      if (trimmedCommand[0] === "D") {
        this.driverCommands.push(trimmedCommand);
      } else if (command[0] === "T") {
        this.tripCommands.push(trimmedCommand);
      }
    });
  },
  executeDriverCommands() {
    this.driverCommands.forEach(command => {
      const name = command.split(" ")[1];
      const newDriver = new Driver(name);
      drivers.database[newDriver.name] = newDriver;
    });
  },
  executeTripCommands() {
    this.tripCommands.forEach(command => {
      const commandArr = command.split(" ");
      const name = commandArr[1];
      const hours = this.calculateTime(commandArr[2], commandArr[3]);
      const miles = Number(commandArr[4]);
      if (miles / hours > 5 && miles / hours < 100) {
        drivers.database[name].time += hours;
        drivers.database[name].miles += miles;
      }
    });
  },
  calculateTime(start, end) {
    const startTimeArr = start.split(":");
    const startMinutes =
      parseInt(startTimeArr[0]) * 60 + parseInt(startTimeArr[1]);
    const endTimeArr = end.split(":");
    const endMinutes = parseInt(endTimeArr[0]) * 60 + parseInt(endTimeArr[1]);
    return (endMinutes - startMinutes) / 60;
  }
};

//The drivers object contains the "database" and related methods
const drivers = {
  database: {},
  sortedDatabase: [],
  sortDatabase() {
    for (let driver in this.database) {
      this.sortedDatabase.push(this.database[driver]);
    }
    this.sortedDatabase.sort((a, b) => b.miles - a.miles);
  },
  logOutput() {
    let output = "";
    this.sortedDatabase.forEach(driver => {
      if (!driver.miles) {
        output += `${driver.name}: 0 miles\n`;
      } else {
        output += `${driver.name}: ${Math.round(
          driver.miles
        )} miles @ ${Math.round(driver.mph())} mph\n`;
      }
    });
    return `\nDriving history report:\n\n${output}`;
  }
};

class Driver {
  constructor(name) {
    this.name = name;
    this.time = 0;
    this.miles = 0;
  }
  mph() {
    return Math.round(this.miles / this.time);
  }
}

//I am not sure how to test this function adequately
const run = () => {
  if (process.argv.length === 3) {
    var inputFilePath = process.argv.pop();
  } else {
    console.log("An input file is required");
    return;
  }

  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.log("Something went wrong reading your input file");
      return;
    }
    commands.parseInputFile(data);
    commands.executeDriverCommands();
    commands.executeTripCommands();
    drivers.sortDatabase();
    const result = drivers.logOutput();
    console.log(result);
  });
};

run();

module.exports = {
  commands,
  drivers,
  Driver
};
