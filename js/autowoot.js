var wooting = true; 
function startWooting() {
        API.on(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
        wootSong();
}
 
function DJ_ADVANCE_LISTENER(obj) {
        wootSong();
}
 
function wootSong() {
        if(wooting) {
                $("#woot").click();
        }
} 
startWooting();
 
function initAPIListeners() {
        API.on(API.DJ_ADVANCE, djAdvanced);
          API.on(API.CHAT, autoRespond);
          API.on(API.DJ_UPDATE, queueUpdate);
          API.on(API.VOTE_UPDATE, function (obj) {
                    populateUserlist();
 
            });
        API.on(API.USER_JOIN, function (user) {
                  populateUserlist();
            });
            API.on(API.USER_LEAVE, function (user) {
                    populateUserlist();
            });
}