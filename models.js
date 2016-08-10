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
      //_id: chance.string({length: 14, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'}),
      _id: chance.string({length: 3, pool: '123456789'}),
      _type: chance.integer({min: 301, max: 303}),
      created: chance.timestamp(),
      messages: randomMessages()
    }
  },

  idAttribute: '_compoundId',

  initialize: function() {
    this.set('_compoundId', this.get('_id') + '-' + this.get('_type'));
  }

});

var ConversationCollection = Backbone.Collection.extend({
  model: Conversation
});
