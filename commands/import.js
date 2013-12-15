function importQuotesToDb(quotes_list, speaker){
    //for each item in array
    for ( var i = 0; i < quotes_list.length; i++){
        //insert into database
        db.run('INSERT OR REPLACE INTO QUOTES VALUES (?,?)',
        [speaker,
        quotes_list[i]
        ]);
    }
}

var some_quotes = ['WHT DOES THAT MEAN', 'WHYARE U PEARSING ME'];

exports.names = ['import some quotes'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    importQuotesToDb(some_quotes, "asiima");
    bot.chat('ok!');
};