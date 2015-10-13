var frontend = (function (){

  var ajax = function(method, url, callback) {
    var openRequest = new XMLHttpRequest();
    openRequest.onreadystatechange = function() {
      if (openRequest.readyState == 4 && openRequest.status == 200) {
        callback(openRequest.responseText);
      }
    };
    openRequest.open(method, url, true);
    openRequest.send();
  };

  function getreq(callback) {
    ajax('GET', '/', callback);
  }

  // function getMeows(callback) {
  //   ajax('GET', '/meows', callback);
  // }


  // return {
  //   getMeows: getMeows,
  // };

  getreq(console.log('heloo'));
  console.log("loaded mews module");
}());
