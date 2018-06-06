// driver command execution
// 1. new driver objects are created for each unique name
// 2. those new driver objects are added into the "database"

// trip command execution
// 1. trip data (total time and total miles) are added to
//    each driver object in the database

const { driverCommands, tripCommands } = require("./command_parser");

const database = require("../database/database");

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

function executeDriverCommands() {
  driverCommands.forEach(command => {
    const name = command.split(" ")[1];
    const newDriver = new Driver(name);
    database[newDriver.name] = newDriver;
  });
}

function executeTripCommands() {
  tripCommands.forEach(command => {
    const commandArr = command.split(" ");
    const name = commandArr[1];
    const hours = calculateTime(commandArr[2], commandArr[3]);
    const miles = Number(commandArr[4]);
    if (miles / hours > 5 && miles / hours < 100) {
      database[name].time += hours;
      database[name].miles += miles;
    }
  });
}

function calculateTime(start, end) {
  const startTimeArr = start.split(":");
  const startMinutes =
    parseInt(startTimeArr[0]) * 60 + parseInt(startTimeArr[1]);
  const endTimeArr = end.split(":");
  const endMinutes = parseInt(endTimeArr[0]) * 60 + parseInt(endTimeArr[1]);
  return (endMinutes - startMinutes) / 60;
}

module.exports = {
  Driver,
  executeDriverCommands,
  executeTripCommands,
  driverCommands
};
