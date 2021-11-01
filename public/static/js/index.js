$(document).ready(function () {
  var socket = io();
  socket.on("message", function (data) {
    $("#text").text(data);
  });
});
