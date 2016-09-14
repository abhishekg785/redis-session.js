module.exports = Functions = {
  get : function(handshake, callback){
    var sessionId = Functions.getSessionId(handshake);
    Functions.getSessionBySessionID(sessionId, function(err, session){
      if(err) callback(err);
      if(callback != undefined){
        callback(null, session);
      }
    });
  },

  getSessionBySessionID : function(sessionId, callback){
    redisStore.load(sessionId, function(err, session){
      if(err) callback(err);
      if(callback != undefined){
        callback(null, session);
      }
    });
  },

  getSessionId : function(handshake, sessionKey){
    return handshake.signedCookies[sessionKey];
  }
}
