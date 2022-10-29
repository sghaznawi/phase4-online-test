var quizRoute  = require('./quiz-api.json');
var userRoute = require('./user-api.json'); 
 

module.exports = function() {
return {
    quizRoute  : quizRoute,
userRoute : userRoute 
 
 }
}