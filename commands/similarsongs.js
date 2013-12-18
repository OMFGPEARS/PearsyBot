function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
//similar songs

exports.names = ['coolartist', 'coolsong', 'cool song', 'cool artist'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    if (
    var artist = room.media.author;
    request('http://developer.echonest.com/api/v4/artist/similar?api_key='+config.echonest.api_key + '&name=' + htmlEntities(room.media.author) + '&results=5', function cbfunc(error, response, body) {
            console.log(error);
            if (!error){
                var results = JSON.parse(body).response.artists;
                if (results){
                    bot.chat('You might also like these artists: ' + results.map(function(obj){return obj.name}).join(', '));
                }else{
                    bot.chat('I got nothing');
                }
            }
        });
}