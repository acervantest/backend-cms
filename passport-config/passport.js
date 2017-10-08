const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');

module.exports = function(passport){
    
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.getSecret()
    }
    
    passport.use( new JwtStrategy(opts, function(jwt_payload, done) {
        console.log('JwtStrategy invoqued with opts:');
        console.log(jwt_payload);
        
        User.getUserById(jwt_payload.id, function(err, user) {
            
            if (err) {
                return done(err, false);
            }
            
            if (user) {
                done(null, user);
            } else {
                done(null, false);
                // or you could create a new account 
            }
        });
    }));
}