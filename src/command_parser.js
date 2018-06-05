// Incoming text files have "Driver" commands and "Trip" commands.
// The parseInputFile function organizes those commands into arrays.

const driverCommands = [];
const tripCommands = [];

function parseInputFile(file) {
  const commands = file.split("\n");
  while (commands[commands.length - 1] === "") {
    commands.pop();
  }
  commands.forEach(command => {
    trimmedCommand = command.trim();
    if (trimmedCommand[0] === "D") {
      driverCommands.push(trimmedCommand);
    } else if (command[0] === "T") {
      tripCommands.push(trimmedCommand);
    }
  });
}

module.exports = {
  driverCommands,
  tripCommands,
  parseInputFile
};
