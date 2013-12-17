

var lastfm = require('lastfm').LastFmNode;
var lastfmScrobbler = new lastfm({
    api_key: '91c0b9ad5a1d092070b59b28f5ef26ef',
    secret : 'XXXXXXX',
    useragent: 'omfgpears'
});
var session = lastfmScrobbler.session({
                   handlers: {
                      success: function(session) {
                         lastfm.update('nowplaying', session, { track: room.media.title } );
                         lastfm.update('scrobble', session, { track: room.media.title, timestamp: new Date.getTime() });
                      }
                   }
                });

exports.names = ['lastfm', 'lfm'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {};