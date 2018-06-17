const drivingRecords = require("./drivingRecords");

function sortRecords(records) {
  return Object.values(records).sort((a, b) => b.miles - a.miles);
}

function mph(miles, time) {
  return Math.round(miles / time);
}

function createOutput(records) {
  const sortedRecords = sortRecords(records);
  const outputArr = sortedRecords.map(driver => {
    if (!driver.miles) {
      return `${driver.name}: 0 miles\n`;
    } else {
      return `${driver.name}: ${Math.round(driver.miles)} miles @ ${Math.round(
        mph(driver.miles, driver.time)
      )} mph\n`;
    }
  });
  return `\nDriving history report:\n\n${outputArr.join("")}`;
}

module.exports = createOutput;
