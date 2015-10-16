var socket = io();
var titlesContainer = document.getElementById('titles-container');
var quesTitleInput = document.getElementById('question-title');
var quesContentInput = document.getElementById('question-content');

document.getElementsByTagName('form')[0].addEventListener('submit',function(event){
  event.preventDefault();
  var thisQuestion = collectQuestionInfo();
  socket.emit('send new question', thisQuestion);
  quesTitleInput.value = '';
  quesContentInput.value = '';

});

socket.on('recieve updated questions', function(recievedQuestions){
  var theseQuestions = JSON.parse(recievedQuestions);
  theseQuestions.map(createQuestionHTML);
});

function createQuestionHTML(object) {
  titlesContainer.innerHTML += "<a class = \"questionFP\" href=\"/question/"+ object.myId + "\"<span>Date:" + object.date + "\nID:" + object.myId + "Username:" + object.username + "</span><br><p>" + object.title + "</p></a>";
}

function collectQuestionInfo() {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

    var thisQuesTitle = quesTitleInput.value;
    var thisQuesContent = quesContentInput.value;

    var quesDate = year + "/" + month + "/" + day;
    var cookie = document.cookie.split('access=')[1].split(';')[0];

    var username = document.cookie.split('access=')[1].split(';')[0].split('&')[1];


    var questionObject = {
        cookie: cookie,
        username: username,
        date: quesDate,
        title: thisQuesTitle,
        content: thisQuesContent
    };
    return JSON.stringify(questionObject);

}
