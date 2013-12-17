exports.names = ['quote'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
    console.log(data.message);
	if (data.message.substring(0, 5).match(/pears/)){
	  var person = data.message.slice(12);
	} else {
	  var person = data.message.slice(6);
	}

    db.get('SELECT quote from QUOTES WHERE speaker="'+person+'" ORDER BY RANDOM() LIMIT 1', function(err, row) {
        console.log(row);
       if (row) bot.chat(row['quote']);
    })
};
