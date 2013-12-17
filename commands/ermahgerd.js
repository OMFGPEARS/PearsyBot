var ermahgerd = require('node-ermahgerd');

exports.names = ['!'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
        if (data.message.substring(0, 5).match(/pears/)){
          var args = data.message.slice(7);
        } else {
          var args = data.message.slice(1);
        }

        var translation = ermahgerd.translate(args);
        if (args !== '') bot.chat(translation);
};