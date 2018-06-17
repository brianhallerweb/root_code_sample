const store = require("./store/store");
const { recordNewDriver, recordNewTrip } = require("./actions/actions");

function parseName(str) {
  return str.trim().split(" ")[1];
}

function parseDistance(str) {
  return Number(str.trim().split(" ")[4]);
}

function parseTime(str) {
  const start = str.trim().split(" ")[2];
  const end = str.trim().split(" ")[3];
  const [startHours, startMinutes] = start.split(":");
  const [endHours, endMinutes] = end.split(":");

  startTime = Number(startHours) * 60 + Number(startMinutes);
  endTime = Number(endHours) * 60 + Number(endMinutes);
  return (endTime - startTime) / 60;
}

function createDrivingRecords(input) {
  input
    .trim()
    .split("\n")
    .forEach(commandStr => {
      if (commandStr.startsWith("Driver")) {
        const name = parseName(commandStr);
        store.dispatch(recordNewDriver(name));
      }
      if (commandStr.startsWith("Trip")) {
        const name = parseName(commandStr);
        const miles = parseDistance(commandStr);
        const time = parseTime(commandStr);
        store.dispatch(recordNewTrip({ name, miles, time }));
      }
    });
}

module.exports = createDrivingRecords;
