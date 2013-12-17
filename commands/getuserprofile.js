var DDG = require('node-ddg-api').DDG;
var ddg = new DDG('omfgpears');

// search ddg
exports.names = ['lookup', 'similar'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
    var prefix = 0;
    var similar = 0;
    var searchtype = 'define';
    
    if (data.message.indexOf("pears") != -1 && data.message.substring(0) == 'p'){ prefix = 1;}
    if (data.message.indexOf("similar") != -1){ similar = 1; var searchtype = 'similar';}
    
    
    switch(prefix){
        case 1:
            if (similar == 1){ 
                var charindex = 14;
            }else{ var charindex = 13;}
        break;
        case 0:
            if (similar == 1){ 
                var charindex = 8;
            }else{ var charindex = 7; }
        break;
        default:
            var charindex = 7;
    }
    var subject = data.message.slice(charindex);
    ddg.instantAnswer(subject, {skip_disambig: '1'}, function(err, response){
        console.log(response);
        try{
            switch(searchtype){
                case 'similar':
                    bot.chat(response.RelatedTopics[0].FirstURL);
                case 'define':
                    bot.chat(response.Definition);
                default:
                    bot.chat(response.AbstractURL);
            }
        }catch(err){
            bot.chat("Dude I don't know!");
        }
    });
};
