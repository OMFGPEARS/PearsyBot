function getUsernameById(id){
    var statement = 'SELECT userid FROM USERS WHERE username=?';
        db.get(statement, id, function(err,row){
            console.log(err);
            console.log(row);
            bot.chat(row['userid']);
        });
}

exports.names = ['getuserid'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
    id = data.message.substring(10);
    getUsernameById(id);
};