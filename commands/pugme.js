// Pugs on demand

exports.names = ['pears pugme','.pugme'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
 request('http://pugme.herokuapp.com/random', function cbfunc(error, response, body) {
    if (!error && response.statusCode == 200) {
        var formatted = eval('(' + body + ')');

        try {
            bot.speak(formatted.pug);
        } catch (e) {
            console.log(e);
            bot.chat('I CAN\'T?');
        }
    }
 })
};