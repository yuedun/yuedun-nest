/* 该插件实现了Banner图的滚动效果。
 * 
 * 一、插件的属性：
 * images : 接受数组类型，数组的每个值应为对象。对象具有属性： src->图片的路径 title->图片指上后的文字   href->点击图片跳转的页面
 * 
 * scrollTime : 每张图片的停留时间，单位毫秒。 2000
 * bannerHeight : Banner图的高度.  500px
 * 
 * iconColor : 提示图标的颜色。默认 white
 * iconHoverColor : 提示图标指上之后的颜色。  默认 orange
 * iconPosition : 提示图标的位置，可选值left/center/right。 默认center
 * 
 */
!function($){
	$.fn.scrollBanner = function(obj){
		// 声明各个属性的默认值
		var defaults = {
			images : [],
			scrollTime : 2000,
			bannerHeight : "500px",
			iconColor : "white",
			iconHoverColor : "orange",
			iconPosition : "center"
		}
		// 将默认值与传入的对象比对，如果传入的对象有未赋值属性，则使用默认对象的属性
		obj = $.extend(defaults,obj);
		
		// 组件DOM布局
		$("body").css({"padding":"0px","margin" : "0px"});
		
		this.empty().append("<div class='scrollBanner-banner'></div>");
		$.each(obj.images,function(index,item){
			$(".scrollBanner-banner").append("<div class='scrollBanner-bannerInner'><a href='"+item.href+"' target='_black'><img src='"+item.src+"' title='"+item.title+"' /></a></div>");
		});
		$(".scrollBanner-banner").append("<div class='scrollBanner-bannerInner'><a href='"+obj.images[0].href+"' target='_black'><img src='"+obj.images[0].src+"' title='"+obj.images[0].title+"' /></a></div>");
		
		this.append("<div class='scrollBanner-icons'></div>");
		$.each(obj.images,function(index,item){
			// data-* 属性是H5允许用户自行在HTML标签上保存数据的属性。
			// 保存在data-*中的数据，可以使用JS读取调用。
			$(".scrollBanner-icons").append("<span class='scrollBanner-icon' data-index='"+index+"'></span>");
		})
		
		// 设置各种CSS
		this.css({
			"width": "100%",
			"height": obj.bannerHeight,
			"overflow": "hidden",
			"position": "relative"
		});
		
		$(".scrollBanner-banner").css({
			"width": obj.images.length+1+"00%",
			"height": obj.bannerHeight,
			"transition": "all .5s ease"
		});
		
		$(".scrollBanner-bannerInner").css({
			"width": 100/(obj.images.length+1)+"%",
			"height": obj.bannerHeight,
			"overflow": "hidden",
			"float": "left"
		});
		
		$(".scrollBanner-bannerInner img").css({
			"width": "1920px",
			"height": obj.bannerHeight,
			"position": "relative",
			"left": "50%",
			"margin-left": "-960px",
		});
		
		$(".scrollBanner-icons").css({
			"width": 30*obj.images.length+"px",
			"height": "7px",
			"position":"absolute",
			"bottom":"40px",
			"z-index": "100",
		});
		
		switch (obj.iconPosition){
			case "left":
				$(".scrollBanner-icons").css({
					"left":"40px",
				});
				break;
			case "right":
				$(".scrollBanner-icons").css({
					"right":"40px",
				});
				break;
			case "center":
				$(".scrollBanner-icons").css({
					"left":"50%",
					"margin-left": "-"+15*obj.images.length+"px"
				});
				break;
		}
		
		$(".scrollBanner-icon").css({
			"width": "20px",
			"height": "7px",
			"background-color": obj.iconColor,
			"display": "inline-block",
			"margin": "0px 5px",
		});
		$(".scrollBanner-icon:eq(0)").css({
			"background-color":obj.iconHoverColor
		});
		
		
		// 实现Banner滚动功能
		var count = 1;
		var icons = $(".scrollBanner-icon");
		setInterval(function(){
			$(".scrollBanner-banner").css({
				"margin-left":"-"+count+"00%",
				"transition": "all .5s ease"
			});
			$(".scrollBanner-icon").css("background-color",obj.iconColor);
			$(".scrollBanner-icon:eq("+count+")").css("background-color",obj.iconHoverColor);
			
			if(count>=obj.images.length)
			$(".scrollBanner-icon:eq("+0+")").css("background-color",obj.iconHoverColor);
			
			if(count>obj.images.length){
				count = 0;
				$(".scrollBanner-banner").css({
					"margin-left":"0px",
					"transition": "none"
				});
			}
			count++;
		},obj.scrollTime);
		
		
		// 小图标指上以后变色并且切换Banner图
		$(".scrollBanner-icon").mouseover(function(){
			$(".scrollBanner-icon").css("background-color",obj.iconColor);
			// ↓ 由span触发mouseover事件，则this指向这个span。
			// ↓ 但是，这this是JS对象，必须使用$封装成JQuery对象。
			$(this).css("background-color",obj.iconHoverColor);
			
			var index = $(this).attr("data-index");
			// 将计数器count修改为index的值，让Banner滚动的定时器能够刚好滚到所指图片的下一张
			count  = index; 
			$(".scrollBanner-banner").css({
				"transition": "none",
				"margin-left": "-"+index+"00%"
			});
		});
		
		
	}
}(jQuery);


