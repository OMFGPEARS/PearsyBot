String.prototype.repeat = function(num){
    return new Array( num + 1 ).join(this);
}

 function getUsernameById(ids){
        // if (ids instanceof Object){
            var include = ids.join(',');
            var parameters = "?, ".repeat(ids.length-1) + "?";
            var statement = 'SELECT userid, username FROM USERS WHERE userid IN (' + parameters + ')';
                db.all(statement, ids.splice(0, ids.length), function(err,rows){
                    bot.chat('Our staff!: ' + rows.map(function(row){
                        return row['username'];
                    }).join(', '));
                });
        // }
    }
    
exports.names = ['staff'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
        staffids = new Array();
        for (var ids in room.staff){
            if (room.staff.hasOwnProperty(ids)){
                staffids.push(ids);
            }
        }
        getUsernameById(staffids);
        
};