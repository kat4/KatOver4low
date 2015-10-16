var client = require('redis').createClient(process.env.REDIS_URL);

var redisKato = {

    addQuestion: function(question, myEmit) {

        client.incr('idCounter', function(err, reply) {
            var thisId = reply;
            client.zadd("qScoreboard", 0, thisId);
            client.lpush(["question", thisId], function(err, reply) {

            });

            question.myId = thisId;

            client.hmset(thisId, question, function() {
                redisKato.getLatestQuestions(myEmit);
            });
        });
    },
    getFullQuestion: function(id, callback){
            var multi = client.multi();
            multi.hgetall(id);
            multi.exec(function(err, replies) {
                callback(replies);
            });
        },



    getLatestQuestions: function(myEmitcallback) {
        // console.log('LOG2222', callback);
        client.lrange("question", 0, 10, function(err, reply){
            var questionsToGetArr = [];
            questionsToGetArr = reply;
            if (err) {
                console.log(err);
            }
            else{
            //  console.log('LOG3333', callback);
              redisKato.idsToObjects(questionsToGetArr, myEmitcallback);
            }
      });
    },


    addComment: function(comment, callback) {
        client.incr('idCounter', function(err, reply) {
            var thisId = reply;
            comment.cId = thisId;

            client.zadd("quesCommentLink", comment.qId, thisId);

            client.lpush(["comment", thisId], function(err, reply) {

            });
            client.hmset(thisId, comment, function() {
                callback();
            });
        });
    },

    getQuestionComments: function(qid, callback) {
        client.zrangebyscore("quesCommentLink", qid, qid, function(err, reply) {

            redisKato.idsToObjects(reply, callback);
        });
    },

    idsToObjects: function(ids, myEmitcallback) {
      var objects = [];
      var multi = client.multi();
        ids.forEach(function(id){

        multi.hgetall(id);
        });
        multi.exec(function(err, replies) {

        myEmitcallback(replies);


        });
    }
};


module.exports = redisKato;
