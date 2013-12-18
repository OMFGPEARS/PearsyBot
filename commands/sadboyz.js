
exports.names = ['sadboyzz', 'pears sadboyzz', 'pears sadboyzzz', 'what are you doing later?', 'what are you doin later?', 'wht r u doin later', 'what are you doing this weekend?', 'wht r u doing this weekend', 'what are you doing this weekend', 'what are you doing', 'what are you doin'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    db.get('SELECT quote from QUOTES WHERE speaker="sadboyzz" ORDER BY RANDOM() LIMIT 1', function(err, row) {
        bot.chat(row['quote']);
    })
};