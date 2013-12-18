exports.names = ['last played', '.lastplayed', 'lastplayed'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    db.get('SELECT username, started, upvotes, downvotes, snags FROM (SELECT userid, started, upvotes, downvotes, snags FROM PLAYS WHERE songid = ? ORDER BY started DESC LIMIT 1) a INNER JOIN USERS ON a.userid = USERS.userid', room.media.id, function(error, row) {
        if (row != null) {
            var utc_string = row['started'];
            var local_string = (function(dtstr) {
                var t0 = new Date(dtstr);
                var t1 = Date.parse(t0.toUTCString().replace('GMT', ''));
                var t2 = (2 * t0) - t1;
                return new Date(t2).toString();
            })(utc_string);
            bot.chat('I heard this song last ' + local_string + ' by ' + row['username'] + ' and it got ' + row['upvotes'] + ' woot and ' + row['downvotes'] + ' meh).');
        } else {
            bot.chat('This is the first time this song has been played in here.');
        }
    });
};