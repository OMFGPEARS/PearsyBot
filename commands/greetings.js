// commands

exports.names = ['custom_greetings'];
exports.hidden = true;
exports.enabled = false;
exports.matchStart = false;
exports.handler = function(data) {
    bot.chat('Commands: ' + _.compact(_.map(commands, function(command) { if (command.enabled && !command.hidden) { return _.first(command.names) ; } })).join(' · '));
};