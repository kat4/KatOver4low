// var frontend = (function (){
var socket = io();
var titlesContainer = document.getElementById('titles-container');
document.getElementsByTagName('form')[0].addEventListener('submit',function(event){
  var titleInput = document.getElementById('question-title');
  var contentInput = document.getElementById('question-content');
  // var titlesContainer = document.getElementById('titles-container');
  event.preventDefault();
  console.log('log TCONT', titlesContainer);
  console.log('log TI', titleInput.value);
  socket.emit('send new question', titleInput.value);
  titleInput.value = '';
});
socket.on('recieve updated questions', function(recievedTitle){
  console.log('log titlesC', titlesContainer);
  var myText = recievedTitle;
  console.log('log myTXT', myText);
  titlesContainer.innerHTML += ("<li>" +myText+ "</li>");
});
// }());
