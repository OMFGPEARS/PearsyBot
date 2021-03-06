var PlugAPI = require('plugapi');
var fs = require('fs');
var config = require('./config.json');
var songtimer = null;
path = require('path')

var scribble = require('scribble');
var Scrobbler = new scribble(config.lastfm.apikey, config.lastfm.apisecret, config.lastfm.username, config.lastfm.password);
    

    // Instead of providing the AUTH, you can use this static method to get the AUTH cookie via twitter login credentials:
    PlugAPI.getAuth({
        username: config.botinfo.twitterUsername,
        password: config.botinfo.twitterPassword
    }, function(err, auth) { // if err is defined, an error occurred, most likely incorrect login
        if(err) {
            console.log("An error occurred: " + err);
            return;
        }
            PlugAPI.getUpdateCode(auth, config.roomName, function(err, updateCode) {
           runBot(err, auth, updateCode);
        });
    });
    
    function runBot(error, auth, updateCode) {
        if(error) {
            console.log("An error occurred: " + err);
            return;
        } 
    
    initializeModules(auth, updateCode);
    
    bot.connect(config.roomName);

    bot.on('roomRegister', function(data){
        bot.chat('A wild @' + data.user.profile.username + ' has appeared!');
    });
    
    bot.on('roomJoin', function(data) {    
        // Set up the room object
        // console.log(data);
        room = data.room;
        console.log('[CONNECTED]');
        
        room.users.forEach(
            function(user) { addUserToDb(user);
        });
        
        if ( data.user.profile.username !== 'omfgpears'){
            bot.chat('A wild @' + data.user.profile.username + ' has appeared!');
        }
    });

    bot.on('chat', function(data) {
        console.log('[CHAT] ' + data.from + ': ' + data.message);
        lastRpcMessage = new Date();
        if (data.fromID !== '52a1208496fba535c1318a48') handleCommand(data);
    });
    
    bot.on('emote', function(data) {
        console.log('[EMTE] ' + data.from + ': ' + data.from + ' ' + data.message);
        handleCommand(data);
    });
    
    bot.on('user_join', function(data) {
        console.log('[JOIN] ' + data.username);
        if ( data.username !== 'omfgpears'){
            try{
                bot.chat('A wild @' + data.username + ' has appeared!');
            }finally{}
        }
        // Add to DB
        addUserToDb(data);
        room.users.push(data);
    })
    
    bot.on('user_leave', function(data) {
        console.log('User left: ', data);
        //the only data is the user id, needs to pull from the database to get username
        
        var username = _.findWhere(room.users, {id: data.id}).username;
        lastRpcMessage = new Date();
        bot.chat('A wild @' + username + ' has fled!');
        
        // Update DB
        db.run('UPDATE OR IGNORE USERS SET lastSeen = CURRENT_TIMESTAMP WHERE userid = ?', [data.id]);
        
        // Remove user from users list
        room.users.splice(_.pluck(room.users, 'id').indexOf(data.id), 1);
    });
    
    bot.on('userUpdate', function(data) {
        console.log('User update: ', data);
        // bot.chat('A wild @' + data.user.username + ' has appeared!');
    });
    
    bot.on('curateUpdate', function(data) {
        bot.chat('/me '+ room.users.filter(function(user) { return user.id == data.id })[0].username + ' just farted a heart');
        console.log('[SNAG] ' + room.users.filter(function(user) { return user.id == data.id; })[0].username + ' snagged this song');
        lastRpcMessage = new Date();
        room.curates[data.id] = true;
    });
    
    bot.on('dj_advance', function(data) {
        // console.log('New song: ', data);
        if((room.media)){ //make sure next dj
            // Write previous song data to DB
            db.run('INSERT OR REPLACE INTO SONGS VALUES (?, ?, ?, ?, ?, ?)', [room.media.id, room.media.title, room.media.format, room.media.author, room.media.cid, room.media.duration]);
            
            db.run('INSERT INTO PLAYS (userid, songid, upvotes, downvotes, snags, started, listeners) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)',
            [room.currentDJ, 
            room.media.id, 
            _.values(room.votes).filter(function(vote) { return vote == 1; }).length, 
            _.values(room.votes).filter(function(vote) { return vote == -1; }).length, 
            _.values(room.curates).length, 
            room.users.length]);
            
            // Update room object
            room.media = data.data.media;
            room.djs = data.data.djs;
            room.votes = {};
            room.mediaStartTime = data.data.mediaStartTime;
            room.currentDJ = data.data.currentDJ;
            room.playlistID = data.data.playlistID;
            room.historyID = data.data.historyID;
            room.curates = {}; 

            var length1 = room.media.duration;
            var length2 = Math.floor(length1);
            var thesong = {
                artist: room.media.author,
                track: room.media.title,
                length: length2
            };

            if (config.lastfm.scrobble) Scrobbler.NowPlaying(thesong, function (post_return_data) {});

            if (songtimer != null) {
                    clearTimeout(songtimer);
                    songtimer = null;
                }


            songtimer = setTimeout(function () {
                songtimer = null;

                if (config.lastfm.scrobble) Scrobbler.Scrobble(thesong, function (post_return_data) {});

                }, (length2 - 3) * 1000);

            }
    });
    
    bot.on('djUpdate', function(data) {
        console.log('DJ update', data);
        room.djs = data.djs;
    });
    
    bot.on('update_votes', function(data) {
        console.log('[VOTE] ' + _.findWhere(room.users, {id: data.id}).username
            + ' voted ' + data.vote);
        
        // Log vote
        room.votes[data.id] = data.vote;
        
        // Check if bot needs to bop
        if (room.votes[bot.getSelf().id] == null) {
            
            upvotes = _.values(room.votes).filter(function(vote) { return vote == 1; }).length;
            target = room.users.length <= 3 ? 2 : Math.ceil(Math.pow(1.1383 * (room.users.length - 3), 0.6176));
            if (upvotes >= target) {
                bot.woot();
            }
        }
    });
    
    function addUserToDb(user) {
        db.run('INSERT OR REPLACE INTO USERS VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)', 
        [user.id,
        user.username,
        user.language,
        user.dateJoined.replace('T', ' '),
        user.avatarID]);
    }
    
    function initializeModules(auth, updateCode) {
        // load context
        require(path.resolve(__dirname, 'context.js'))({auth: auth, updateCode: updateCode, config: config});
        
        // Allow bot to perform multi-line chat
        bot.multiLine = true;
        bot.multiLineLimit = 3;
        
        // Load commands
        try {
            fs.readdirSync(path.resolve(__dirname, 'commands')).forEach(function(file) {
                var command = require(path.resolve(__dirname, 'commands/' + file));
                commands.push({names: command.names,
                    handler: command.handler,
                    hidden: command.hidden,
                    enabled: command.enabled,
                    matchStart: command.matchStart
                })
            });
        } catch (e) {
            console.error('Unable to load command: ', e);
        }
        
        initializeDatabase();
    }
    
    function initializeDatabase() {
        db.run('CREATE TABLE IF NOT EXISTS USERS (userid VARCHAR(255) PRIMARY KEY, username VARCHAR(255), language VARCHAR(10), dateJoined TIMESTAMP, avatarID VARCHAR(255), lastSeen TIMESTAMP)');
        
        db.run('CREATE TABLE IF NOT EXISTS SONGS (id VARCHAR(255) PRIMARY KEY, title VARCHAR(255), format VARCHAR(255), author VARCHAR(255), cid VARCHAR(255), duration DOUBLE)');
        
        db.run('CREATE TABLE IF NOT EXISTS PLAYS (id INTEGER PRIMARY KEY AUTOINCREMENT, userid VARCHAR(255), songid VARCHAR(255), upvotes INTEGER, downvotes INTEGER, snags INTEGER, started TIMESTAMP, listeners INTEGER)');
        
        db.run('CREATE TABLE IF NOT EXISTS CHAT (id INTEGER PRIMARY KEY AUTOINCREMENT, message VARCHAR(255), userid VARCHAR(255), timestamp TIMESTAMP)');
    }
    
    function handleCommand(data) {
        var matches = data.message.match(/^(?:pears)\s+(.*)/);
        if (matches) {
            var cmmnd = matches[1];
            Commander(data, cmmnd); //will check to see if any of the command names match the words after 'pears'
        } else {
            Commander(data, data.message); //if data.message doesn't start with 'pears', we'll check data.message string against all command names
        }
    }
 
    function Commander(data, cmmnd) {
        var command = commands.filter(function (cmd) {
            var found = false;
            for (i = 0; i < cmd.names.length; i++) {
                if (!found) {
                    found = (cmd.names[i] == cmmnd.toLowerCase() || (cmd.matchStart && cmmnd.toLowerCase().indexOf(cmd.names[i]) == 0));
                }
            }
            return found;
        })[0];
     
        if (command && command.enabled) {
            //run command
            command.handler(data);
        }
    }
    
      // Hack to make sure bot stays connected to plug
     // Every 15 seconds, check how much time has elapsed since the most recent RPC message.
     // If a song is playing and more than 15 seconds has passed since the expected end
     // of the song, stop the bot. If no song is playing and more than 30 minutes have passed
    // since an RPC event, stop the bot.
    if (config.stopBotOnConnectionLoss) {
        setInterval(function() {
            if (room.media != null) {
                console.log('checking ' + (new Date().getTime() - lastRpcMessage.getTime()) + ' < '
                     + ((room.media.duration * 1000) + 15000));
                 if (new Date().getTime() - lastRpcMessage.getTime() > 15000 + (room.media.duration * 1000)) {
                     console.log('Suspected connection loss at ' + new Date());
                     process.exit(1);
                 }
            } else {
                if (new Date().getTime() - lastRpcMessage > 1800000) {
                     console.log('Suspected connection loss at ' + new Date());
                     console.log('No song playing.');
                     process.exit(1);
                 }
             }
         }, 15000);
    }
}