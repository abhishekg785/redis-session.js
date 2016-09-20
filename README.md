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

  <code>
    sudo apt-get install socketio-session
  </code>

  <code>
  var socketSession = require('socketio-session');

  socketSession.initializeRedis(session);             // here session is the express-session : var session = require('express-session')  
  </code>

  <code>
  app.use(session({
    store : socketSession.getRedisStore(),   // get the redisStore

    secret : < sessionSecret || config.sessionSecret >,

    resave : true,

    saveUninitialized : true,

    key : < sessionKey || config.sessionKey >                    // important
  }));
  </code>
  -
