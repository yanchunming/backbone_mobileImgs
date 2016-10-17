define(function(require,exports,module){
	require("modules/layer/layer.css");
	var h = $(window).height();

	var Layer = Backbone.View.extend({
		_tpl:_.template($("#tpl_layer").html()),
		imageId:0,
		imageList:[],
		type:NaN,
		lock:true,
		events:{
			"swipeLeft .layer-container img":"showNextImage",
			"swipeRight .layer-container img":"showPrevImage",
			"tap .layer-container img":"showHeader",
			// "tap .layer .arrow-btn":"goback",
			"tap .layer .arrow-btn":"gobackNew"

		},
		goback:function(){
			location.hash = "#";
		},
		gobackNew:function(){
			this.imageList.pop();
			var id = this.imageList[this.imageList.length -1];
			if (id !== undefined) {
				var model = this.collection.get(id);
				this.imageId--;
				this.changeView(model);
			} else {
				location.hash = "#";
			}

		},
		showHeader:function(){
			this.$el.find(".header").toggleClass('hide');
		},
		showPrevImage:function(){
			this.imageId--;
			var model = this.collection.get(this.imageId);
			if (model) {
				if (model.get("type") !== this.type) {
					alert("已经是第一张了！");
					this.imageId++;
					return;
				};
				this.changeView(model);
				this.imageList.push(model.get("id"));
			} else {
				alert("已经是第一张了！");
				this.imageId++;
			}
		},
		showNextImage:function(){
			console.log(model);
			this.imageId++;
			var model = this.collection.get(this.imageId);
			if (model) {
				if (model.get("type") !== this.type) {
					alert("已经是最后一张了！");
					this.imageId--;
					return;
				};
				this.changeView(model);
				this.imageList.push(model.get("id"));
			} else {
				alert("已经是最后一张了！");
				this.imageId--;
			}

		},
		changeView:function(model){
			var self = this;
			// this.$el.find(".layer .layer-container img").css("opacity",0);
			// setTimeout(function(){
			// self.$el.find(".layer .layer-container img").attr("src",model.get("url"));
			// self.$el.find(".layer .layer-container img").css("opacity",1);
			// }, 400)
			
			// this.$el.find(".layer .header h1").css("opacity",0);
			// setTimeout(function(){
			// self.$el.find(".layer .header h1").html(model.get("title"));
			// self.$el.find(".layer .header h1").css("opacity",1);
			// }, 400);
			this.$el.find(".layer .layer-container img").attr("src",model.get("url"));

			this.$el.find(".layer .header h1").html(model.get("title"));
		},
		render:function(id){
			console.log(id);
			var tpl = this._tpl;
			var model = this.collection.get(id);
			if (!model) {
				location.hash = "#";
				return;
			};
			this.imageId = model.get("id");
			this.type = model.get("type");
			this.imageList.push(this.imageId);
			var data = {
				title:model.get("title"),
				url:model.get("url"),
				style:"line-height:" + h + "px;"
			};
			var html = tpl(data);
			this.$el.find(".layer").html(html);

		}
	});
	module.exports = Layer;
})