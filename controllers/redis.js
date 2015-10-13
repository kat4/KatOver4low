var client = require('redis').createClient(process.env.REDIS_URL);

var redisKato = {

    addQuestion: function(question, callback) {
        client.incr('idCounter', function(err, reply) {
            var thisId = reply;
            question.id = thisId;

              client.zadd("qScoreboard", 0, thisId);

            client.lpush(["question", thisId], function(err, reply) {
                console.log('reply from questions list', reply);
            });
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
                comment.id = thisId;

                  client.zadd("quesCommentLink", 0, thisId);

                client.lpush(["comment", thisId], function(err, reply) {
                    console.log('reply from comments list', reply);
                });
                client.hmset(thisId, comment, function() {
                    callback();
                });
            });
        },


};

var samplePost = {
    username: 'kat',
    title: 'First kato',
    content: 'Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content.',
    date: '2015-10-10'
};

var sampleComment = {
    qId: 2,
    username: 'josh',
    content: 'Loads of comment content. Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content.',
    date: '2015-10-10'
};


redisKato.addPost(samplePost, 'question', function(){console.log('added the post');});

module.exports = redisKato;
