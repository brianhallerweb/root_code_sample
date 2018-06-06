// The database is sorted by total miles driven, from most to least.
// A report is then generated that includes each driver's name, total
// miles driven and avgerage mph.

const database = require("../database/database");

const sortedDatabase = [];

function sortDatabase() {
  for (let driver in database) {
    sortedDatabase.push(database[driver]);
  }
  sortedDatabase.sort((a, b) => b.miles - a.miles);
}

function logOutput() {
  sortDatabase();
  let output = "";
  sortedDatabase.forEach(driver => {
    if (!driver.miles) {
      output += `${driver.name}: 0 miles\n`;
    } else {
      output += `${driver.name}: ${Math.round(
        driver.miles
      )} miles @ ${Math.round(driver.mph())} mph\n`;
    }
  });
  while (sortedDatabase.length) {
    sortedDatabase.splice(0, 1);
  }
  return `\nDriving history report:\n\n${output}`;
}

module.exports = logOutput;
