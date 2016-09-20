/**
* @author  abhishek goswami
* @github  abhishekg785
*/

module.exports = Functions = {

  /*
  * get the session id
  * retrieve the session info from the redisStore
  * return the session
  */
  get : function(handshake, sessionKey, callback){
    var sessionId = Functions.getSessionId(handshake, sessionKey);
    Functions.getSessionBySessionID(sessionId, function(err, session){
      if(err) callback(err);
      if(callback != undefined){
        callback(null, session);
      }
    });
  },

  //get the session from the redisStore using the session id
  getSessionBySessionID : function(sessionId, callback){
    redisStore.load(sessionId, function(err, session){
      if(err) callback(err);
      if(callback != undefined){
        callback(null, session);
      }
    });
  },

  // get the sesssionId by parsing the cookie
  getSessionId : function(handshake, sessionKey){
    return handshake.signedCookies[sessionKey];
  }
}
