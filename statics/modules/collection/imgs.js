define(function(require,exports,module){
	var ImgModel = require("modules/model/img");
	var ImgCollection = Backbone.Collection.extend({
		model:ImgModel,
		imgId:0,
		type:NaN,
		fetchData:function(fn){
			var self = this;
			$.get("data/imageList.json",function(res){
				console.log(res);
				if (res && res.errno === 0) {
					res.data.map(function(obj){
						if (obj.type !== self.type ) {
							self.type = obj.type;
							obj.cover = true;
						};
						obj.id = self.imgId++;
					});
					console.log(res.data);
					// res.data.sort(function(){
					// 	return Math.random() > 0.5 ? 1 : -1;
					// });
					// res.data.map(function(obj){
					// 	obj.id = self.imgId++;
					// });
					console.log(res.data);
					self.add(res.data);
				};
			})
		}
	})
	module.exports = ImgCollection;
})