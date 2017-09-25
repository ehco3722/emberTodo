Todos.Router.map(function() {
  this.resource('todos', { path: '/' }, function(){//当应用的URL与 '/' 匹配时，渲染（render） todos 模板。
    // 其他子路由以后在这里添加
    this.route('active');
    this.route('completed');
  });  
});

Todos.TodosRoute = Ember.Route.extend({//被Ember.js自动创建的Route将会默认渲染一个名为todos的模板
  model: function() {//通过model函数实现了一个TodosRoute类，这个函数的返回值是所有现存的待办事项：//
    return this.store.find('todo');
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('todos');
  }
});

Todos.TodosActiveRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller6) {
    this.render('todos/index', {controller: controller6});
  }
});

Todos.TodosCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});