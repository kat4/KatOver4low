var client = require('redis').createClient(process.env.REDIS_URL);

var redisKato = {

    addPost: function(post, qoc, callback) {
        client.incr('idCounter', function(err, reply) {
            var thisId = reply;
            post.id = thisId;
            client.lpush([qoc, thisId], function(err, reply) {
                console.log('reply from questions list', reply);
            });
            client.hmset(thisId, post, function() {
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

};

var samplePost = {
    username: 'kat',
    title: 'First kato',
    content: 'Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content. Loads of kato content.',
    date: '2015-10-10'
};

redisKato.addPost(samplePost, 'question', function(){console.log('added the post');});

module.exports = redisKato;
