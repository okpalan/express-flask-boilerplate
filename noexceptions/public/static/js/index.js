$(window).ready(function () {
  var socket = io();
  socket.on("message", function (data) {
    $(document).append(data);
  });
});
