var socket = io();

var questionContainer = document.getElementById('question-container');
var questionTitle = document.getElementById('qpage-title');
var questionContent = document.getElementById('qpage-content');
var questionUser = document.getElementById('qpage-user');
var commentContainer = document.getElementById('comment-container');

var urlArray = window.location.pathname.split('/');
var qIdInUrl = urlArray[2];

var thisComContent = document.getElementById('comment-content');

socket.emit('send question id', qIdInUrl);

socket.on("recieve question from db", function(recievedQuestion) {
    var questionToDisplay = JSON.parse(recievedQuestion)[0];
    createQuestionPageHTML(questionToDisplay);
});

function createQuestionPageHTML(object) {
    questionTitle.innerHTML = object.title;
    questionContent.innerHTML = object.content;
    questionUser.innerHTML = object.username;
}

var submitComment = document.getElementById('submit-comment');

submitComment.addEventListener('click', function() {
    var thisComment = collectCommentInfo();
    console.log('submitComment is clicked');
    console.log(thisComment);

    socket.emit('send new comment', thisComment);
    document.getElementById('comment-content').value = '';
});

socket.on('recieve updated comments', function(recievedComments) {
    var theseComments = JSON.parse(recievedComments);
    console.log(theseComments);
    commentContainer.innerHTML = '';
    theseComments.map(createCommentHTML);
});

function createCommentHTML(object) {
    console.log(object);
    commentContainer.innerHTML = "<div class='comment'><span>User:"+object.username+"</span>   <span> Date:"+object.date+" </span>   <div>"+object.content+"</div></div>" + commentContainer.innerHTML;
    // questionTitle.innerHTML = object.title;
    // questionContent.innerHTML = object.content;
}



function collectCommentInfo() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();


    var comDate = year + "/" + month + "/" + day;
    // var cookie = document.cookie.split('access=')[1].split(';')[0];
    //
    // var username = document.cookie.split('access=')[1].split(';')[0].split('&')[1];

    var commentObject = {
        qId: qIdInUrl,
        cookie: 'cookie',
        username: 'username',
        date: comDate,
        content: thisComContent.value
    };
    return JSON.stringify(commentObject);

}
