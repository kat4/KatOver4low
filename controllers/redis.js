var client = require('redis').createClient(process.env.REDIS_URL);

var redisKato = {

    addQuestion: function(question, callback) {
        client.incr('idCounter', function(err, reply) {
            var thisId = reply;
            question.qId = thisId;
            // adds question to the scoreboard, with initial score 0
            client.zadd("qScoreboard", 0, thisId);
            // adds question id to question list
            client.lpush(["question", thisId], function(err, reply) {
                console.log('reply from questions list', reply);
            });
            //
            client.hmset(thisId, question, function() {
                callback();
            });
        });
    },

    editHash: function() {
        // need to check that current user authored the question/comment

    },

    getLatestQuestions: function() {

    },

    getBestQuestions: function() {

    },

    upVote: function() {

    },

    downVote: function() {

    },

    addComment: function(comment, callback) {
        client.incr('idCounter', function(err, reply) {
            var thisId = reply;
            comment.cId = thisId;

            client.zadd("quesCommentLink", comment.qId, thisId);

            client.lpush(["comment", thisId], function(err, reply) {
                console.log('reply from comments list', reply);
            });
            client.hmset(thisId, comment, function() {
                callback();
            });
        });
    },

    getQuestionComments: function(qid, callback) {
        client.zrangebyscore("quesCommentLink", qid, qid, function(err, reply) {
            callback(reply);
        });
    }


};

var sampleQuestion = {
    username: 'kat',
    title: 'First kato',
    content: 'Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content.',
    date: '2015-10-10'
};

var sampleComment = {
    qId: 3,
    username: 'josh',
    content: 'Comment for question 3 kato content. Loads of kato content.',
    date: '2015-10-10'
};


redisKato.getQuestionComments(3, function(data) {
    console.log(data);
});

// redisKato.addComment(sampleComment, function() {
//     console.log('added the post');
// });

module.exports = redisKato;
