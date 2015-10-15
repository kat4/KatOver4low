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
  var thisQuestion = JSON.parse(recievedQuestions);
  console.log(thisQuestion[0]);

  titlesContainer.innerHTML += ("<li>" + recievedQuestions + "</li>");
});

function collectQuestionInfo() {
    var thisQuesTitle = quesTitleInput.value;
    var thisQuesContent = quesContentInput.value;
    var quesDate = new Date();
    var cookie = '';
    var username = 'placeholder name';

    var questionObject = {
        cookie: cookie,
        username: username,
        date: quesDate,
        title: thisQuesTitle,
        content: thisQuesContent
    };
    return JSON.stringify(questionObject);

}
