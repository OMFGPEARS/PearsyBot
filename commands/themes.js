var some_quotes = ['im so tired of hearin WHERES MATT OMG JUST STOP', 'what the IN GODS NAME ARE YOU GUYS TALKING ABOUT', 'STOP SAYIN THE SAME THING OVER AND OVER AGAIN'];

exports.names = ['pears theme', 'pears is tehre a theme', 'pears is there a theme?', 'pears is there a theme'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    db.get('SELECT theme from ROOM', function(err, row){
        bot.chat(row['theme']);
    });
};