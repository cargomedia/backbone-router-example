var MailboxRouter = Backbone.Router.extend({

  conversationCollection: null,
  conversationListView: null,
  conversationView: null,

  routes: {
    '': 'defaultView',
    'conversation': 'showConversation',
    'conversation?id=:id': 'showConversation'
  },

  initialize: function() {
    this.conversationCollection = new ConversationCollection();
    this.conversationListView = new ConversationListView({el: $('#conversationList'), model: this.conversationCollection});
    this.conversationView = new ConversationView({el: $('#conversation'), model: new Conversation});

    for (var i = 15; i > 0; i--) {
      var conversation = new Conversation();
      this.conversationCollection.add(conversation);
    }

    //intercept all clicks to delegate links to Backbone.router
    var domain = location.href.substr(0, location.href.lastIndexOf('/'));
    var self = this;
    $('body').click(function(event) {
      var $target = $(event.target).closest('a');
      if ($target.length) {
        var href = $target.prop('href');
        if (href) {
          var indexOfDomain = href.indexOf(domain);
          if (indexOfDomain === 0) {
            href = href.substring(domain.length);
          }
        }
        self.navigate(href, {trigger: true});
        return false;
      }
    });
  },

  defaultView: function() {
    this.conversationView.model.clear();
  },

  showConversation: function(id) {
    console.log('showConversation is called with queryString: ', Array.prototype.join.call(arguments));
    this.conversationCollection.reset();
    var conversation = this.conversationCollection.get(id);
    if (!conversation) {
      conversation = new Conversation({id: id});
    }
    this.conversationView.model.set(conversation.attributes);
  }
});
