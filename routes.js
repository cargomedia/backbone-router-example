var MailboxRouter = Backbone.Router.extend({

  conversationCollection: null,
  conversationListView: null,
  conversationView: null,

  routes: {
    '?hello': 'defaultView',
    '?conversation': 'showConversation'
    //'/conversation?sid=:sid': 'showConversation'
    //'view?viewid=:viewid': 'handleRouteAll',
  },

  initialize: function() {
    this.conversationCollection = new ConversationCollection();
    this.conversationListView = new ConversationListView({el: $('#conversationList'), model: this.conversationCollection});
    this.conversationView = new ConversationView({el: $('#conversation')});
  },

  defaultView: function() {
    for (var i = 15; i > 0; i--) {
      var conversation = new Conversation();
      this.conversationCollection.add(conversation);
    }
  },

  showConversation: function(id) {
    debugger;
    this.conversationCollection.reset();
    this.conversationView.model = new Conversation;
    console.log('showConversation', arguments);
  }
});
