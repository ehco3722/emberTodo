Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');//invoke 将会在数组中的每个对象上执行一个方法，如果这个对象上存在方法的话。      
      completed.invoke('save');
    },
    createTodo: function() {
//????这个this是谁actions?
      var title = this.get('newTitle');//这个模板对应的控制器的newTitle属性与<input>的value属性相连
      if (!title.trim()) { return; }

      var todo2 = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      this.set('newTitle', '');
//???为什么不设置也可以正常进行
      todo2.save(); //进行记录的持久化 //保存更新的值到Store  
    }
  },
  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),


  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),
  
  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'),


  allAreDone: function(key, value) {
    if (value === undefined) {
      return !!this.get('length') && this.isEvery('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted')
});