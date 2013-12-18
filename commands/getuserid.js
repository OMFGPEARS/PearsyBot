function getUsernameById(id){
    var statement = 'SELECT userid FROM USERS WHERE username=?';
        db.get(statement, id, function(err,row){
            if (!err){
                bot.chat(row['userid']);
            }else{bot.chat('I\'m too tired for this maybe later');}
        });
}

exports.names = ['getuserid', 'getuserprofile'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
    if (data.message.indexOf('getuserprofile') != -1){
        id = data.message.substring(15);
        //meh not interesting right now
        console.log(id);
        console.log(bot.getUser(id));
    }else{
        id = data.message.substring(10);
        getUsernameById(id);
    }
};