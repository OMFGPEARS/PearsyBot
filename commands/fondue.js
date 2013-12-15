
exports.names = ['pears fondue', 'pears mattchop', 'pears matt', 'pears dudebro', 'pears fondle'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    db.get('SELECT quote from QUOTES WHERE speaker="fondue" ORDER BY RANDOM() LIMIT 1', function(err, row) {
        bot.chat(row['quote']);
    })
};