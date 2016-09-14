$(document).ready(function() {
  var router = new MailboxRouter();
  Backbone.history.start({pushState: true, root: '/'});
});
