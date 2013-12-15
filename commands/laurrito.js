
exports.names = ['pears damp', 'pears bikes', 'pears laurrito', 'pears hefty bitch 69'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    db.get('SELECT quote from QUOTES WHERE speaker="laurrito" ORDER BY RANDOM() LIMIT 1', function(err, row) {
        bot.chat(row['quote']);
    })
};