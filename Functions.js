/**
* @author { abhishek goswami }
* @github { abhishekg785 }
*/

module.exports = Functions = {
  get : function(handshake, sessionKey, callback){
    var sessionId = Functions.getSessionId(handshake, sessionKey);
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
