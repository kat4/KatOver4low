var client = require('redis').createClient(process.env.REDIS_URL, {
    no_ready_check: true
  });

var redisKato = {

    addQuestion: function(question, myEmit) {
        var access = question.cookie.split('&')[0];
        var username = question.cookie.split('&')[1];

        redisKato.checkUser(access, username, function(){
          client.incr('idCounter', function(err, reply) {
              var thisId = reply;
              client.zadd("qScoreboard", 0, thisId);
              client.lpush(["question", thisId], function(err, reply) {

              });

              question['title'] = question['title'].replace(/<.*>/g, '');
              question['content'] = question['content'].replace(/<.*>/g, '');
              question.myId = thisId;
              console.log('EDITED QUESTION IS ', question);

              client.hmset(thisId, question, function() {
                  redisKato.getLatestQuestions(myEmit);
              });
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


    addComment: function(comment, myEmit) {
        client.incr('idCounter', function(err, reply) {
            var thisId = reply;
            comment.cId = thisId;
            comment['content'] = comment['content'].replace(/<.*>/g, '');


            client.zadd("quesCommentLink", comment.qId, thisId);

            client.lpush(["comment", thisId], function(err, reply) {

            });
            console.log('comment about to get set', comment);
            client.hmset(thisId, comment, function() {
                redisKato.getQuestionComments(comment.qId, myEmit);
                console.log('comment just got set', comment);
            });
        });
    },

    getQuestionComments: function(qid, myEmitcallback) {
        client.zrangebyscore("quesCommentLink", qid, qid, function(err, reply) {

            redisKato.idsToObjects(reply, myEmitcallback);
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
    },

    checkUser: function(access, username, callback) {
    client.get(username,function(err, reply){
      if (err) {console.log('checkuserror');}
      else {
        if(access === reply){
          callback();
        }


      }
    });
  },

  addUser: function(access, username){
    client.set(username, access);

  }

};


module.exports = redisKato;
