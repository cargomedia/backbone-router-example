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
    var self = this;
    $('a[href^="/"]').click(function(event) {
      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
        var href = $(event.currentTarget).attr('href');
        var url = href.replace(/^\//, '').replace('\#\!\/', '');
        self.navigate(url, {trigger: true});
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
