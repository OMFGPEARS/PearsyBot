 function getUsernameById(ids){
        // if (ids instanceof Object){
            var include = ids.join(',');
            console.log(include);
                db.all('SELECT userid, username FROM USERS WHERE userid IN (?)', include, function(err,rows){
                    console.log(rows);
                    console.log(err);
                    bot.chat('The staff here are: ' + rows.map(function(row){
                    console.log(row);
                    return row['username'];
                    }).join(','));
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
                // staffids.push(ids);
                staffids.push("'"+ ids + "'");
            }
        }
        console.log(staffids);
        getUsernameById(staffids);
        
};