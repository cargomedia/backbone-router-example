var ConversationListItemView = Backbone.View.extend({
  tagName: 'li',
  model: Conversation,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var created = new Date(this.model.get('created')).toLocaleString({
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    var lastMessage = this.model.get('messages').slice(-1)[0];
    //var t = {conversation: {id: this.model.get('_id'), type: this.model.get('_type')}};
    //var t = {conversation: {id: this.model.get('_id')}};
    //var conversationLink = jQuery.param(t);
    //var conversationLink = 'conversation?sid=' + this.model.get('_id');
    var conversationLink = '?conversation';
    this.$el.html('<a href="' + conversationLink + '"><strong>' + created + ': </strong><span>' + lastMessage + '</span></a>');
    return this;
  }
});

var ConversationListView = Backbone.View.extend({
  model: ConversationCollection,

  initialize: function() {
    this.listenTo(this.model, 'add', this.render);
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html('');

    for (var i = 0; i < this.model.length; ++i) {
      var itemView = new ConversationListItemView({model: this.model.at(i)});
      this.$el.append(itemView.$el);
      itemView.render();
    }

    return this;
  }
});

var ConversationView = Backbone.View.extend({
  tagName: 'ul',
  model: Conversation,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    if (this.model) {
      this.model.get('messages').forEach(function(message) {
        this.$el.append('<li>' + document.createTextNode(message) + '</li>');
      });
    }
    return this;
  }
});
