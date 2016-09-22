socketio-session
==============

A simple NPM module for session managament in socket.io using express.js (Node.js Framework).
The main problem faced using socket.io is handling sessions. We may need session info for authentication and other factors.
Using socketio-session , one can simply get the session info.

##requirements
  <em>redis</em> installed ( small db for storing sessionid and session info pair)
  ( for installing redis go for https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis )

  <em>node</em> and <em>socket.io</em> ( <span style = 'color:orange'>ofcourse :P</span>)

##Setup
  install socketio-session


    sudo npm install socketio-session

  Require socketio-session

    var socketSession = require('socketio-session');

  Initialize the Redis

    socketSession.initializeRedis(session); // here session is the express-session using var session = require('express-session')  

  Set the parameters of the session by:

  here we need session secret and session key, you can directly pass these params directly or create a config.js file and set the variables there and simply import the config.js file and use the params ( config.sessionSecret and config.sessionKey ).

  here is the config.js file :

    module.exports = {
      'sessionKey' : < key >,
      'sessionSecret' : '<secret>'
    };

  simply require the file using:

    var config = require('./config');

  and then:

    app.use(session({
      store : socketSession.getRedisStore(),   // get the redisStore

      secret : < sessionSecret || config.sessionSecret >,

      resave : true,

      saveUninitialized : true,

      key : < sessionKey || config.sessionKey >                    // important
    }));

  Now you are ready to go :)

##Use
  socketio-session provides two functions to fetch the session object:

  First one takes 3 args and a callback function

    parseCookieViaArgs((sessionSecret, sessionKey, socket, function(session){
      console.log(session); // and we have our session :)
    });

  Second one takes 2 args and a callback function
  here config is the object having => { sessionSecret : ' <secret> ' ,  sessionKey : ' <key> '}

    parseCookieViaObject(config, socket, function(session){
        console.log(session); // and we have our session :)
    });

  You can simply use them in the socket.io middleware or any other socket.io namespace

  eg :

    io.use(function(socket, next){
      socketSession.parseCookieViaArgs((sessionSecret, sessionKey, socket, function(session){
        console.log(session); // and we have our session :)

        //code for authenticating the user

      });
    });

  or

    io.use(function(socket, next){
      socketSession.parseCookieViaObject((configObject, socket, function(session){
        console.log(session); // and we have our session :)

        //code for authenticating the user

      });
    });

##Version
  0.2.0

##Issues
  Feel free to contribute and bug fixes

  https://github.com/abhishekg785/redis-session.js

##License
  MIT
