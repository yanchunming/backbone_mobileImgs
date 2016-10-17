define(function(requier,exports,module){
	var w = ($(window).width() - 6 * 3) / 2;
	var ImgModel = Backbone.Model.extend({
		initialize:function(){
			this.on("add",function(model){
				var h = model.get("height") / model.get("width") * w;
				model.set({
					viewWidth:w,
					viewHeight:h
				});
			})
		}
	});
	module.exports = ImgModel;
})