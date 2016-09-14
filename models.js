function randomMessages() {
  var count = chance.integer({min: 4, max: 50});
  var messages = [];
  for (var i = count; i > 0; i--) {
    messages.push(chance.sentence({words: 5}));
  }
  return messages;
}

var Conversation = Backbone.Model.extend({
  defaults: function() {
    return {
      id: chance.string({length: 3, pool: '123456789'}),
      type: chance.integer({min: 301, max: 303}),
      created: chance.timestamp(),
      messages: randomMessages()
    }
  }

});

var ConversationCollection = Backbone.Collection.extend({
  model: Conversation
});
