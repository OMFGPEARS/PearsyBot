// Pugs on demand

exports.names = ['dogeme', '.dogeme'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
 request('http://dogeme.rowanmanning.com/random', function cbfunc(error, response, body) {
    if (!error && response.statusCode == 200) {
        try {
            bot.speak(JSON.parse(body).doge);
        } catch (e) {
            console.log(e);
            bot.chat('I CAN\'T?');
        }
    }
 })
};
