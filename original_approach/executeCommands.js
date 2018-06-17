class Driver {
  constructor(name) {
    this.name = name;
    this.time = 0;
    this.miles = 0;
  }
}

function executeDriverCommands(driverCommandsArr, records) {
  driverCommandsArr.forEach(command => {
    const name = command.split(" ")[1];
    const newDriver = new Driver(name);
    if (!records[newDriver.name]) {
      records[newDriver.name] = newDriver;
    }
  });
}

function executeTripCommands(tripCommandsArr, records) {
  tripCommandsArr.forEach(command => {
    const commandArr = command.split(" ");
    const name = commandArr[1];
    const startTime = commandArr[2];
    const endTime = commandArr[3];
    const miles = Number(commandArr[4]);
    const hours = calculateTime(startTime, endTime);
    if (miles / hours > 5 && miles / hours < 100) {
      records[name].time += hours;
      records[name].miles += miles;
    }
  });
}

function calculateTime(start, end) {
  const [startHours, startMinutes] = start.split(":");
  const [endHours, endMinutes] = end.split(":");
  startTime = Number(startHours) * 60 + Number(startMinutes);
  endTime = Number(endHours) * 60 + Number(endMinutes);
  return (endTime - startTime) / 60;
}

function executeCommands(commandsObj, records) {
  executeDriverCommands(commandsObj.driverCommands, records);
  executeTripCommands(commandsObj.tripCommands, records);
}

module.exports = executeCommands;
