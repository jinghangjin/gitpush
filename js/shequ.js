$(function(){
	//显示与隐藏
	var count = {
		htter:$(".fengge"),
		beurn:$(".possd"),
		grodet:$(".grodet"),
		imges:$(".img_12"),
	    init:function(){
		this.hourt();
		},
		hourt:function(){
			var that = this;
			this.htter.on('mouseenter',function(){
				that.htter.children().filter(".possd").addClass("activet");
			});
			this.htter.on('mouseleave',function(){
				that.htter.children().filter(".possd").removeClass("activet");
			});
			this.grodet.on('mouseenter',function(){
				that.grodet.addClass("tterp");
				that.imges.css("display","block");
			});
			this.grodet.on('mouseleave',function(){
				that.grodet.removeClass("tterp");
				that.imges.css("display","none");
			});
		}
	}
	count.init();
	/*$(".fengge").mouseenter(function(){
		$(".possd").css("display","block");
	})
	$(".fengge").mouseleave(function(){
		$(".possd").css("display","none");
	})*/
	//轮播图
	var animates = {
		lundu:$(".lundu"),
		prote:$(".porte"),
		bordest:$(".bordest"),
		menus:$(".menus .menuse"),
		init:function(){
			this.pocurt();
		},
		pocurt:function(){
			var that = this;
			var bnnner = $(".bnnner")
			prote = bnnner.find(".porte")
			showNumber=bnnner.find(".menus .menuse")
			oneWidth=bnnner.find(".porte .bordest").eq(0).width();
			console.log(oneWidth);
			console.log(prote);
			var timer = null;
			var iNow = 0;
			this.menus.on('click',function(){
				$(this).addClass("activeo").siblings().removeClass("activeo");
				var index = $(this).index();
				inow = index;
				prote.animate({
                     "margin-left":-oneWidth*iNow, 
                         });
               });
		 timer=setInterval(function(){  //打开定时器
		   iNow++;       //让图片的索引值次序加1，这样就可以实现顺序轮播图片
		   if(iNow>showNumber.length-1){ //当到达最后一张图的时候，让iNow赋值为第一张图的索引值，轮播效果跳转到第一张图重新开始
		    iNow=0;
		   }
		   showNumber.eq(iNow).trigger("click"); //模拟触发数字按钮的click
		  },5000)
	     }
		}
	animates.init();
	//下拉表框
	var veode = {
		imgers:$(".imgers"),
		timwes:$(".imgers ul li"),
		init:function(){
			this.starts();
		},
		starts:function(){
			var that = this;
			this.timwes.on('mouseenter',function(){
				$(this).find("div").css("display","block");
			});
			this.timwes.on('mouseleave',function(){
				$(this).find("div").css("display","none");
			});
		}
	}
	veode.init();
	//遮罩层
	var looder = {
		shanner:$(".shanner .cours"),
		yunyi:$(".cours .yunyi"),
		init:function(){
			this.kooper();
		},
		kooper:function(){
			var that = this;
			this.shanner.each(function(i){
				that.shanner.eq(i).on('mouseenter',function(){
					that.shanner.eq(i).stop(true).animate({
						'top':15,
					});
					that.yunyi.eq(i).slideDown(300);
				});
				that.shanner.eq(i).on('mouseleave',function(){
					that.shanner.eq(i).stop(true).animate({
						'top':15,
					});
					that.yunyi.eq(i).slideUp(300);
				});
			});
		}
	}
	looder.init();
});
