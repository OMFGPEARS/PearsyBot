var DDG = require('node-ddg-api').DDG;
var ddg = new DDG('omfgpears');

// Pugs on demand
exports.names = ['lookup'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
    if (data.message.substring(0, 5).match(/pears/)){
      var subject = data.message.slice(13);
    } else {
      var subject = data.message.slice(7);
    }
    ddg.instantAnswer(subject, {skip_disambig: '1'}, function(err, response){
        console.log(response);
        if (response.Definition){
            bot.chat(response.Definition);
        }else if (response.AbstractURL != ""){
            bot.chat(response.AbstractURL);
        }else{
            bot.chat("Dude I don't know!");
        }
    });
};
