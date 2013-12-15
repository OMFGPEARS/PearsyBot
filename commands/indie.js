
exports.names = ['pears indie'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    db.get('SELECT quote from QUOTES WHERE speaker="indie" ORDER BY RANDOM() LIMIT 1', function(err, row) {
        bot.chat(row['quote']);
    })
};