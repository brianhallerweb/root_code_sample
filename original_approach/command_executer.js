class Driver {
  constructor(name) {
    this.name = name;
    this.time = 0;
    this.miles = 0;
  }
}

function executeDriverCommands(driverCommandsArr, db) {
  driverCommandsArr.forEach(command => {
    const name = command.split(" ")[1];
    const newDriver = new Driver(name);
    if (!db[newDriver.name]) {
      db[newDriver.name] = newDriver;
    }
  });
}

function executeTripCommands(tripCommandsArr, db) {
  tripCommandsArr.forEach(command => {
    const commandArr = command.split(" ");
    const name = commandArr[1];
    const hours = calculateTime(commandArr[2], commandArr[3]);
    const miles = Number(commandArr[4]);
    if (miles / hours > 5 && miles / hours < 100) {
      db[name].time += hours;
      db[name].miles += miles;
    }
  });
}

function calculateTime(start, end) {
  const startTimeArr = start.split(":");
  const startMinutes = Number(startTimeArr[0]) * 60 + Number(startTimeArr[1]);
  const endTimeArr = end.split(":");
  const endMinutes = Number(endTimeArr[0]) * 60 + Number(endTimeArr[1]);
  return (endMinutes - startMinutes) / 60;
}

function executeCommands(commandsObj, db) {
  executeDriverCommands(commandsObj.driverCommands, db);
  executeTripCommands(commandsObj.tripCommands, db);
}

module.exports = executeCommands;
