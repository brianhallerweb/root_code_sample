function reducer(state, command) {
  switch (command.action) {
    case "CreateDriver":
      if (!state[command.name]) {
        state[command.name] = { name: command.name, miles: 0, time: 0 };
      }
      return state;
    case "CreateTrip":
      state[command.name].miles += command.distance;
      state[command.name].time += command.time;
      return state;
    default:
      return state;
  }
}

function parseName(str) {
  return str.trim().split(" ")[1];
}

function parseDistance(str) {
  return Number(str.trim().split(" ")[4]);
}

function parseTime(str) {
  const start = str.trim().split(" ")[2];
  const end = str.trim().split(" ")[3];
  const startTimeArr = start.split(":");
  const startMinutes = Number(startTimeArr[0]) * 60 + Number(startTimeArr[1]);
  const endTimeArr = end.split(":");
  const endMinutes = Number(endTimeArr[0]) * 60 + Number(endTimeArr[1]);
  return (endMinutes - startMinutes) / 60;
}

function createDrivingRecords(input, db) {
  input
    .trim()
    .split("\n")
    .map(commandStr => {
      if (commandStr.startsWith("Driver")) {
        return {
          action: "CreateDriver",
          name: parseName(commandStr)
        };
      }
      if (commandStr.startsWith("Trip")) {
        return {
          action: "CreateTrip",
          name: parseName(commandStr),
          distance: parseDistance(commandStr),
          time: parseTime(commandStr)
        };
      }
    })
    .filter(command => {
      if (command.action !== "CreateTrip") {
        return true;
      }
      const mph = command.distance / command.time;
      return 5 < mph && mph < 100;
    })
    .reduce((accum, command) => reducer(accum, command), db);
}

module.exports = createDrivingRecords;
