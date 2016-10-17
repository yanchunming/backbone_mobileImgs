define(function(require,exports,module){
	var ImgCollection = require("modules/collection/imgs");
	var imgCollection = new ImgCollection();
	var List = require("modules/list/list");
	var Layer = require("modules/layer/layer");
	var list = new List({
		el:$("#app"),
		collection:imgCollection
	});
	var layer = new Layer({
		el:$("#app"),
		collection:imgCollection
	});
	var Router = Backbone.Router.extend({
		routes:{
			"layer/:id":"showLayer",
			"*other":"showList"
		},
		showList:function(){
			$("#app .layer").hide();
			$("#app .list").show();
		},
		showLayer:function(id){
			$("#app .list").hide();
			$("#app .layer").show();
			layer.render(id);
		}
	});
// var Router = Backbone.Router.extend({
// 		routes: {
// 			'layer/:id': 'showLayer',
// 			'*other': 'showList'
// 		},
// 		showLayer: function (id) {
// 			// 隐藏列表页显示大图页
// 			$("#app .list").hide()
// 			$('#app .layer').show()
// 			layer.render(id)
// 		},
// 		showList: function () {
// 			// 展示列表页
// 			// list.render()
// 			// 隐藏大图页，展示列表页
// 			$('#app .list').show();
// 			$('#app .layer').hide();
// 		}
// 	})

	var router = new Router();
	module.exports = function(){
		Backbone.history.start();
	}
})