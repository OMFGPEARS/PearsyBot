var DDG = require('node-ddg-api').DDG;
var ddg = new DDG('omfgpears');

// Pugs on demand
exports.names = ['lookup', 'similar'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
    var prefix = 0;
    var similar = 0;
    
    if (data.message.indexOf("pears") != -1){ prefix = 1;}
    if (data.message.indexOf("similar") != -1){ similar = 1;}
    
    switch(prefix){
        case 1:
            if (similar == 1){ 
                var subject = data.message.slice(14);
            }else{
                var subject = data.message.slice(13);
            }
        break;
        case 0:
            if (similar == 1){ 
                var subject = data.message.slice(8);
            }else{
                var subject = data.message.slice(7);
            }
        break;
        default:
            var subject = data.message.slice(7);
    }
    console.log(subject);
    ddg.instantAnswer(subject, {skip_disambig: '1'}, function(err, response){
        if (similar == 1){
            bot.chat(response.RelatedTopics[0].FirstURL);
        }else if (response.Definition){
            bot.chat(response.Definition);
        }else if (response.AbstractURL != ""){
            bot.chat(response.AbstractURL);
        }else{
            bot.chat("Dude I don't know!");
        }
    });
};
