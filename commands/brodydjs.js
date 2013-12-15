// best DJs

exports.names = ['.brodydjs', 'brodydjs', 'worstdjs', '.worstdjs', 'djsuckfaces', 'meh djs', 'dj fartface'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    db.all('SELECT username, down from (SELECT userid, sum(downvotes) as down FROM PLAYS GROUP BY userid) a INNER JOIN USERS ON a.userid = USERS.userid WHERE down<>0 ORDER BY down desc LIMIT 5', function(error, rows) {
        bot.chat('The DJs with the worst mehs deccrued in this room: ' + rows.map(function(row) { return row['username'] + ': ' + row['down'] + ' mehs'; }).join(', '));
    });
};