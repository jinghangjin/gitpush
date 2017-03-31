$(function(){
var titre = {
	liHover:$(".deat_s ul li"),
	dismask:$(".mask"),
	init: function(){
		this.hoverLi();
	},
	hoverLi: function(){
		var that = this;
		this.liHover.each(function(i){
			that.liHover.eq(i).on('mouseenter',function(){
				that.liHover.eq(i).stop(true).animate({
					"top":-8
				},300);
				that.liHover.eq(i).css({
					"box-shadow":"10px 10px 40px #ddd"
				});
				that.dismask.eq(i).stop(true).slideDown(300);
			});
			that.liHover.eq(i).on('mouseleave',function(){
				that.liHover.eq(i).stop(true).animate({
					"top":0
				},300);
				that.liHover.eq(i).css({
					"box-shadow":"none"
				});
				that.dismask.stop(true).slideUp(300);
			});
		});
	}
}
titre.init();
//
var titre = {
	liHover:$(".deat_s ul li"),
	dismask:$(".box_st"),
	init: function(){
		this.hoverLi();
	},
	hoverLi: function(){
		var that = this;
		this.liHover.each(function(i){
			that.liHover.eq(i).on('mouseenter',function(){
				that.liHover.eq(i).css({
					"box-shadow":"10px 10px 40px #ddd"
				});
				that.dismask.eq(i).stop(true).css("display","block");
			});
			that.liHover.eq(i).on('mouseleave',function(){
				that.liHover.eq(i).css({
					"box-shadow":"none"
				});
				that.dismask.eq(i).stop(true).css("display","none");
			});
		});
	}
}
titre.init();
//搜索框
	$(".inter").click(function(){
		var s = $(".textInt").val();
		if(s.length > 0){
           $(".deat_s .showes").hide();
			$(".deat_s .showes:contains("+s+")").show();
		}else{
			$(".deat_s .showes").show();
		}
	})
});