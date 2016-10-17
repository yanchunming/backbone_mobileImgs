define(function(require,exports,module){
	require("modules/list/list.css");
	var List = Backbone.View.extend({
		_tpl:_.template('<div style="<%=style%>" class="box"><p style="<%=styletoo%>"><%=info%></p><a href="#layer/<%=id%>"><img src="<%=url%>" style="<%=style%>" alt="" /></a></div>'),
		leftHeight:0,
		rightHeight:0,
		types:["龙宠","美女","海报","风景","摄影","宠物","明星","其它"],
		events:{
			"click .search span":"showSearchView",
			"click .nav li":"showTypeView",
			"click .image-container p":"showshowTypeViewToo",
			"tap .list .header .arrow-container":"showTypeImage",
			"tap .go-back":"goTop"
		},
		initialize:function(){
			this.getData();
			this.initDom();
			var self = this;
			this.listenTo(this.collection,"add",function(model,collection){
				if (model.get("cover")) {
					model.set({info:self.types[model.get("type")]});
					this.rendertemp(model);
				};
			})
			var self = this;
			$(window).on("scroll",function(){
				// var h = $("body").height() - $(window).height() - $(window).scrollTop() - 200 < 0;
				// if (h) {
				// 	self.getData();
				// };
				if ($(window).scrollTop() > 300) {
					self.gobackShow();
				} else {
					self.gobackHide();
				}
			})
		},
		showTypeImage:function(){
			var self = this;
			var result = this.collection.filter(function(model) {
				return model.get("cover") === true;
			});
			this.clearView();
			result.forEach(function(model){
				model.set({info:self.types[model.get("type")]});
				self.rendertemp(model);
			})
		},
		gobackShow:function(){
			this.$el.find(".go-back").show();
		},
		gobackHide:function(){
			this.$el.find(".go-back").hide();
		},
		goTop:function(){
			window.scrollTo(0, 0);
		},
		showTypeView:function(e){
			var dom = e.target;
			var did = this.getDataid(dom);
			var result = this.getDataByKeyValue(did,"type");
			this.resetView(result);
		},
		showshowTypeViewToo:function(e){
			var dom = e.target;
			dom.style.display = "none";
			var info = dom.innerHTML;
			var did = this.types.indexOf(info);
			var result = this.getDataByKeyValue(did,"type");
			this.resetView(result);
		},
		getDataid:function(dom){
			// return $(dom).data("id");
			return $(dom).attr("data-id");
		},
		showSearchView:function(){
			var value = this.getValue();
			if (!this.checkValue(value)) {
				return;
			}
			value = value.replace(/^\s+|\s+$/g,"");
			var result = this.getDataByKeyValue(value);
			if (result.length === 0) {
				var id = this.types.indexOf(value);
				var result  = this.getDataByKeyValue(id,"type");
				if (result.length === 0) {
					alert("没有找到相关内容！");
					return;
				};
			};
			this.resetView(result);

		},
		clearView:function(){
			this.leftContainer.html("");
			this.leftHeight = 0;
			this.rightContainer.html("");
			this.rightHeight = 0;
		},
		resetView:function(arr){
			var self = this;
			this.clearView();
			arr.forEach(function(model){
				self.render(model);
			})
		},
		getDataByKeyValue:function(val,key){
			var mykey = key || "title";
			var result = this.collection.filter(function(model){
				if (mykey === "title") {
					return model.get(mykey).indexOf(val) > -1;
				};
				return model.get(mykey) == val;
			})
			return result;
		},
		checkValue:function(value){
			if (/^\s*$/.test(value)) {
				alert("请输入搜索内容！");
				return false;
			};
			return true;
		},
		getValue:function(){
			return this.$el.find(".search input").val();
		},
		getData:function(){
			this.collection.fetchData();
		},
		initDom:function(){
			this.leftContainer = this.$el.find(".left-container");
			this.rightContainer = this.$el.find(".right-container");
		},
		render:function(model){
			var tpl = this._tpl;
			var data = {
				id:model.get("id"),
				url:model.get("url"),
				info:model.get("info"),
				style:"width:" + model.get("viewWidth") + "px;height:" + model.get("viewHeight") + "px;",
				styletoo:"display:none;"
			};
			var html = tpl(data);
			if (this.leftHeight <= this.rightHeight) {
				this.renderLeft(model,html);
			} else {
				this.renderRight(model,html);
			}
		},
		rendertemp:function(model){
			var tpl = this._tpl;
			var data = {
				id:model.get("id"),
				url:model.get("url"),
				info:model.get("info"),
				style:"width:" + model.get("viewWidth") + "px;height:" + model.get("viewHeight") + "px;",
				styletoo:"width:" + model.get("viewWidth") + "px;height:" + model.get("viewHeight") + "px;line-height:" + model.get("viewHeight") + "px;"
			};
			var html = tpl(data);
			if (this.leftHeight <= this.rightHeight) {
				this.renderLeft(model,html);
			} else {
				this.renderRight(model,html);
			}
		},
		renderLeft:function(model,html){
			this.leftContainer.append(html);
			this.leftHeight += model.get("viewHeight") + 6;
		},
		renderRight:function(model,html){
			this.rightContainer.append(html);
			this.rightHeight += model.get("viewHeight") + 6;
		}
	})
	module.exports = List;
	
})