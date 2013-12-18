function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
//similar songs

exports.names = ['coolsong'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    var artist = room.media.author;
    request('http://developer.echonest.com/api/v4/artist/similar?api_key='+config.echonest.api_key+'&name='+htmlEntities(room.media.author), 
        function cbfunc(error, response, body) {
            if (!error){
                var results = JSON.parse(body).response.artists;
                bot.chat('You might also like these artists: ' + results.map(function(obj){return obj.name}).join(', '));
            }
        }
    );
}