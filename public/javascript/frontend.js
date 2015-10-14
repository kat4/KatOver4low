// var frontend = (function (){
var socket = io();
var titlesContainer = document.getElementById('titles-container');
var titleInput = document.getElementById('question-title');
var contentInput = document.getElementById('question-content');

document.getElementsByTagName('form')[0].addEventListener('submit',function(event){
  event.preventDefault();
  socket.emit('send new question', titleInput.value);
  titleInput.value = '';
});
socket.on('recieve updated questions', function(recievedTitle){
  console.log('RECIIIEVE', recievedTitle);
  titlesContainer.innerHTML += ("<li>" + recievedTitle + "</li>");
});
// }());
