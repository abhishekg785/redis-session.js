/**
* @author { abhishek goswami (hiro) }
* @github { abhishekg785 }
* @gmail { abhishekg785@gmail.com }
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
    console.log('inside the initilzise redis store');
    var RedisStore = require('connect-redis')(session);
    redisStore = new RedisStore({ client: redisClient });
  },

  getRedisStore : function(){
    return redisStore;
  },

  parseCookie : function(sessionSecret, socket, callback){
    var parseCookie = cookieParser(sessionSecret),
        handshake = socket.request;
    parseCookie(handshake, null, function(err, data){
      Functions.get(handshake, function(err, session){
        if(err) callback(err);
        if(!session) callback('no session');
        if(session){
          callback(session);
        }
      });
    });
  }
}
