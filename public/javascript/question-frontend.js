var socket = io();

var questionContainer = document.getElementById('question-container');
var questionTitle = document.getElementById('qpage-title');
var questionContent = document.getElementById('qpage-content');

var urlArray = window.location.pathname.split('/');
var qIdInUrl = urlArray[2];

socket.emit('send question id', qIdInUrl);

socket.on("recieve question from db", function(recievedQuestion) {
  var questionToDisplay = JSON.parse(recievedQuestion)[0];
  createQuestionPageHTML(questionToDisplay);
});

function createQuestionPageHTML(object) {
  questionTitle.innerHTML = object.title;
  questionContent.innerHTML = object.content;
}