// ping command

exports.names = ['pears shop', '.shop'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    bot.chat('http://omfgpears.appspot.com');
};