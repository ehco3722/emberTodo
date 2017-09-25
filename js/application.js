window.Todos = Ember.Application.create();
Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
//适配器主要负责与应用的一个数据源进行通信.通常可能会是一个Web服务器接口
//在此使用了一个加载夹具数据的适配器：
// Todos.ApplicationAdapter = DS.LSAdapter.extend({
//   namespace: 'todos-emberjs'
// });