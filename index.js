/**
* @author  abhishek goswami (hiro)
* @github  abhishekg785
* @gmail   abhishekg785@gmail.com
*/

var cookieParser = require('cookie-parser'),
    Functions = require('./Functions');
    redis = require('redis'),
    redisClient = redis.createClient(),
    redisStore = null;

module.exports = {

  /**
  * @param { session }
  * @return { null }
  */
  initializeRedis : function(session){
    var RedisStore = require('connect-redis')(session);
    redisStore = new RedisStore({ client: redisClient });
  },

  getRedisStore : function(){
    return redisStore;
  },

  parseCookieViaArgs : function(sessionSecret, sessionKey, socket, callback){
    var parseCookie = cookieParser(sessionSecret),
        handshake = socket.request;
    parseCookie(handshake, null, function(err, data){
      Functions.get(handshake, sessionKey, function(err, session){
        if(err) callback(err);
        if(!session) callback('no session');
        if(session){
          callback(session);
        }
      });
    });
  },

  /**
  * @param { configObject, socket, callback }
  * @return { session }
  * configObject : { sessionSecret : '', sessionKey : '' }
  */
  parseCookieViaObject : function(configObject, socket, callback){
    var sessionSecret = configObject.sessionSecret,
        sessionKey = configObject.sessionKey,
        handshake = socket.request,
        parseCookie = cookieParser(sessionSecret);
    parseCookie(handshake, null, function(err, data){
      Functions.get(handshake, sessionKey, function(err, session){
        if(err) callback(err)
        if(!session) callback('no session')
        if(session){
          callback(session);
        }
      });
    });
  }
}
