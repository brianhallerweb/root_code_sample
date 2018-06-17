function parseCommands(file) {
  const commands = {
    driverCommands: [],
    tripCommands: []
  };
  const commandStrs = file.trim().split("\n");
  commandStrs.forEach(command => {
    if (command.startsWith("Driver")) {
      commands.driverCommands.push(command.trim());
    } else if (command.startsWith("Trip")) {
      commands.tripCommands.push(command.trim());
    }
  });
  return commands;
}

module.exports = parseCommands;
