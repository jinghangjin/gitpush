$(function(){
   /* var next = now = 1;
	//设置定时器
	$(".imgs_item").mouseenter(function(){
		clearInterval(timer);
	});
	$(".imgs_item").mouseleave(function(){
		addInterval();
	});
	function addInterval(){
			    timer = setInterval(function(){
				   next++;
				   next %= $(".imgs_item").length;
				   shows();
				},5000)
			}
	addInterval();
	function shows(){
		animate($(".imgs")[0],{
			'margin-left':-1190*next
		},300,function(){
			if(next ==  $(".imgs_item").length - 1){
					   next = 1;
					  $('.imgs')[0].style.marginLeft = -1190 * next + 'px';
					 if(next == 0){
					   next = $(".imgs_item").length-1;
					   $('.imgs')[0].style.marginLeft = -1190 * next + 'px';
					 }
				  }
			//处理小圈圈事件
		     removeClass($(".clirsts")[now-1],'active');
			 addClass($(".clirsts")[next-1],'active');
			 now = next;
		}
	 );
    }
	 //导航鼠标点击事件
			for(var i=0;i<$(".clirsts").length;i++){
			// 保留当前下标的位置
			   $(".clirsts")[i].index = i;
			   $(".clirsts")[i].onclick = function(){
			      next = this.index+1;
				  shows();
			   }
			}
	*/
	//轮播图
	var animates = {
		prote:$(".imgs"),
		bordest:$(".imgs_item"),
		menus:$(".clirst .clirsts"),
		promoTrigger:$("#promoTrigger"),
		init:function(){
			this.pocurt();
		},
		pocurt:function(){
			var that = this;
			var bnnner = $(".sheet")
			prote = bnnner.find(".imgs")
			showNumber=bnnner.find(".clirst .clirsts")
			oneWidth=bnnner.find(".imgs .imgs_item").eq(0).width();
			console.log(oneWidth);
			console.log(showNumber);
			var timer = null;
			var iNow = 0;
			this.menus.on('mouseenter',function(){
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).index();
				console.log(index)
				iNow = index;
				$('.imgs').stop().animate({
                     left:-oneWidth*iNow, 
                },500);
                $(".clirst .clirsts").eq(index).addClass('active').siblings().removeClass('active');
               });
               console.log(prote);
		 timer=setInterval(function(){  //打开定时器
		   iNow++;       //让图片的索引值次序加1，这样就可以实现顺序轮播图片
		   if(iNow == $(".imgs_item").length){
		    iNow=1;
		    $(".imgs").css({left:0})
		   }
		   $('.imgs').stop().animate({left:-iNow*oneWidth},800);
		   if (iNow==$(".imgs_item").length-1) { 
	        $(".clirst .clirsts").eq(0).addClass('active').siblings().removeClass('active');
	      }else{
	        $(".clirst .clirsts").eq(iNow).addClass('active').siblings().removeClass('active');
	      }
		   //$(".clirst .clirsts").eq(iNow).stop().trigger("mouseenter"); //模拟触发数字按钮的click
		  },5000);
		  //点击上一按钮
		  $(".btn .left").click(function(){
		  	iNow--;
		  	if(iNow == -1){
		  		iNow = $(".imgs_item").length - 2;
		  		$('.imgs').css({left:-($(".imgs_item").length - 1)*oneWidth})
		  	}
		  	$('.imgs').stop().animate({left:-iNow*oneWidth},800);
		  	$(".clirst .clirsts").eq(iNow).addClass('active').siblings().removeClass('active');
		  });
		  //点击下一个按钮
		  $(".btn .right").click(function(){
		  	iNow++;
		  	if(iNow == $(".imgs_item").length){
		  		iNow = 1;
		  		$('.imgs').css({left:0});
		  	}
		  	$('.imgs').stop().animate({left:-iNow*oneWidth},800);
		  	if(iNow == $(".imgs_item").length - 1){
		  	    $(".clirst .clirsts").eq(0).addClass('active').siblings().removeClass('active');
		  	}else{
		  		$(".clirst .clirsts").eq(iNow).addClass('active').siblings().removeClass('active');
		  	}
		  });
		  //移入、移出显示按钮
		  $(".sheet").hover(function(){
		  	$(".btn").show();
		  },function(){
		  	$(".btn").hide();
		  });
		  //鼠标移入时、停止定时器，移出时、开启定时器
		  $(".sheet").hover(function(){
		  	clearInterval(timer);
		  },function(){
		  	timer=setInterval(function(){  //打开定时器
		   iNow++;       //让图片的索引值次序加1，这样就可以实现顺序轮播图片
		   if(iNow == $(".imgs_item").length){
		    iNow=1;
		    $(".imgs").css({left:0})
		   }
		   $('.imgs').stop().animate({left:-iNow*oneWidth},800);
		   if (iNow==$(".imgs_item").length-1) { 
	        $(".clirst .clirsts").eq(0).addClass('active').siblings().removeClass('active');
	      }else{
	        $(".clirst .clirsts").eq(iNow).addClass('active').siblings().removeClass('active');
	      }
		   //$(".clirst .clirsts").eq(iNow).stop().trigger("mouseenter"); //模拟触发数字按钮的click
		  },5000);
		  });
	     }
		}
	animates.init();
	//手风琴效果
	var flow = {
		bigbox : $('.flowbox .flow .ui_wind_item .ui_wind_context'),
		smallbox : $('.flowbox .flow .ui_wind_item .ui_wind_nav'),
		bigPicIndex:0,
		currShowIndex:0,
		init : function(){
			this.imgmouseenter();
		},
		imgmouseenter : function(){
			var that = this ;
			this.smallbox.mouseenter(function(){//鼠标进入小图
				//得到当前盒子前一个盒子的right值
				var Right = parseInt($(this).parent('.ui_wind_item').prev().css('right'))
				//得到当前盒子的right值
				var Rightnow= parseInt($(this).parent('.ui_wind_item').css('right'))
				//得到当前盒子的下标
				var pop = $(this).parent('.ui_wind_item').index();
				//当前盒子前面的所有元素 
				var other = $(this).parent('.ui_wind_item').prevAll();
				//当前盒子后面的所以元素 
				var next = $(this).parent('.ui_wind_item').nextAll();
			//	console.log(next)
				//console.log(other)
				//if(当前显示大图盒子的下标大于鼠标移入图片的盒子的下标--右移动 ){
				if( that.bigPicIndex  - pop == 1){
					$(this).parent('.ui_wind_item').stop().animate({
						right : Rightnow-313	
					})
					$(this).parent('.ui_wind_item').addClass('ui_wind_item_curr').siblings().removeClass('ui_wind_item_curr');
				//改变盒子的定位值（朝右横向移动盒子）
				}else if( pop - that.bigPicIndex == 1){
					$(this).parent('.ui_wind_item').addClass('ui_wind_item_curr').siblings().removeClass('ui_wind_item_curr');
					$(this).parent('.ui_wind_item').prev().stop().animate({
						right : Right +  313
					})
				}else if( pop - that.bigPicIndex  > 1){
					$(this).parent('.ui_wind_item').addClass('ui_wind_item_curr').siblings().removeClass('ui_wind_item_curr');
					for(var i = 0; i<other.length; i++){
						var Width = parseInt( other.eq(i).css("right") )
						other.eq(i).stop().animate({
							right : Width + 313
						})
					}
				}
				else if( that.bigPicIndex  - pop > 1){
					$(this).parent('.ui_wind_item').addClass('ui_wind_item_curr').siblings().removeClass('ui_wind_item_curr');
					//pop：鼠标当前放置的盒子的下标；
					//that.currShowIndex:当前显示盒子的下标
                    for(var i=that.currShowIndex-1;i>=pop;i--){
						var Width = parseInt($(that.bigbox.get(i)).parent().css("right") )
                    	//获得所有盒子的包装集
                    	$(that.bigbox.get(i)).parent().stop().animate({
							right : Width - 313
						})
                    }
				}
				that.currShowIndex = pop;				
				that.bigPicIndex = pop ;
			})
		}
	}
	flow.init();
	//精品区
	var showes = {
		init:function(){
			this.hover();
		},
		hover:function(){
			$('.s1').on('mouseenter',function(){
				$(this).css('z-index',2);
				$(this).stop().animate({
					'height':360
				},500)
			});
			$('.s1').on('mouseleave',function(){
				$(this).stop().animate({
					'z-index':1,
					'height':275
				},500)
			});
		}
	}
	showes.init();
	//导航
		$(".headse li").hover(function(){
			$(".bottoms").stop(true).animate({
				'margin-left': $(this).offsetParent().context.offsetLeft,
			});
			var index = $(".headse li").index(this);
			//console.log(index-1);
			$(this).parents().children().siblings().children()
				.children().find("div").eq(index+2).addClass("tab1_item")
				.siblings().removeClass("tab1_item").animate({
				"top":57,
			},0)
				.eq(index+1).animate({
				"top":57,
			},0);
			//console.log($(this).parents().find("#Jtab1Pro div"));
		});
	//下拉菜单
	//鼠标移入产品让产品列表盒子渐入，列表从左划入
			$(".class_items").mouseenter(
				function(){
					$(".seack").fadeIn(500);
					$(".seack_min").animate({"paddingLeft":"150px"},1000);
				}				
			) 
			//鼠标移出产品，启用定时器，让产品列表盒子渐出，列表恢复
			$(".class_items").mouseleave(function(){
				timer = setTimeout (function(){
					$(".seack_min").animate({"paddingLeft":"70px"},500);
					$(".seack").fadeOut(500)
				},200)				
			})
			//进入列表父盒子，清除定时器
			$(".seack_min").mouseenter(
				function(){
					clearTimeout(timer);
				}
			)
			//离开列表父盒子，让产品列表盒子渐出，列表恢复
			$(".seack_min").mouseleave(
				function(){
					$(this).parent().fadeOut(500);
					$(".seack_min").animate({"paddingLeft":"70px"},500)
				}
			)
	$(window).load(function(){
		//读取cookie
		this.cart = $.cookie('keepUps');
		this.cart = JSON.parse(this.cart);
		console.log(this.cart)
		if(this.cart){
			$('.head_s .zhuce').hide();
			$('.head_s .kount').html('欢迎您：'+this.cart.userName).css({
				height:'40px',
				lineHeight:'40px'
			})
		}
	})
	$(".head_s .kount").click(function(){
		if(confirm("亲，确定要注销吗？")){
			if(confirm){
				//$.cookie('keepUps',-1);
				//location.reload();
				$('.head_s .kount').hide();
				$('.head_s a').show();
				$(".head_s .kount").html('你好  请登录');
			}
		}
	});
});