
exports.names = ['pears asiima'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    db.get('SELECT quote from QUOTES WHERE speaker="asiima" ORDER BY RANDOM() LIMIT 1', function(err, row) {
        bot.chat(row['quote']);
    })
};