function recordNewDriver(name) {
  return {
    type: "CreateDriver",
    name
  };
}

function recordNewTrip({ name, miles, time }) {
  return {
    type: "CreateTrip",
    name,
    miles,
    time
  };
}

module.exports = { recordNewDriver, recordNewTrip };
