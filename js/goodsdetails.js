$(function(){
	//click效果
	var liHover = {
		chooseHead: $(".choose-head li"),
		init: function(){
			this.hover();
		},
		hover: function(){
			var that = this;
			this.chooseHead.each(function(i){
				that.chooseHead.eq(i).on('click',function(){
					that.chooseHead.eq(i).attr("class","active").siblings().removeAttr("class");
				})
			})
		}
	}
	liHover.init();
	//选择产品步骤
	var goodsStep = {
		chooseStep1: $(".step1"),
		detailTitlePrice: $(".detail-title-price"),
		detailTitleName: $(".detail-title-name"),
		chooseStep2: $(".step2"),
		chooseStep3: $(".step3"),
		packageList: $(".package-list"),
		chooseItem: $(".choose-item"),
		yourChoose: $(".your-choose"),
		goodsItem: $(".goods-item"),
		lunbo: $(".lunbo"),
		cItem: $(".c-item"),
		store: $("#store"),
		buyPhone: $(".buyPhone .buy-step"),
		haha: $(".haha"),
		nextStep: $('.next-step'),
		init: function(){
			this.chooseEdition();
			this.chooseMeal();
			this.banner();
			this.consume();
		},
		chooseEdition: function(){
			var that = this;
			$(".your-choose .cjt1").html("金立M16 Plus"+ "  " + $(".step1 li.active").html() );
			this.chooseStep1.find(".edition").each(function(i){
				$(this).on('click',function(){
					that.nextStep.show();
					that.buyPhone.removeClass('cjt');
					that.detailTitlePrice.html($(this).attr("data-price"));
					$(this).addClass("active").siblings().removeClass("active");
					$(".your-choose .cjt1").html("金立M16 Plus"+ "  " + $(".step1 li.active").html());
					that.chooseStep1.find(".active").attr("data-amount","1");
					that.store.attr({
						"data-gtype": that.chooseStep1.find(".active").html(),
						"data-gprice": that.chooseStep1.find(".active").attr("data-price"),
						"data-gamount": that.chooseStep1.find(".active").attr("data-amount"),
						"data-id": that.chooseStep1.find(".active").attr("data-id"),
						"data-gname": that.chooseStep1.find(".active").attr("data-name"),
						"data-name": that.detailTitleName.attr("data-shop")
					})
				})
				that.chooseStep2.find(".edition").each(function(i){
					$(this).on('click',function(){
						$(".your-choose .cjt1").html("金立M16 Plus"+ "  " + $(".step1 li.active").html() +" "+$(this).find(".color").html()+" "+$(".step1 li.active").attr("data-price"));
						that.chooseStep3.show();
						that.packageList.hide();
						that.buyPhone.removeClass('cjt');
						$('.next-step').show();
						that.chooseItem.removeClass("active")
						$(this).addClass("active").siblings().removeClass("active");
						$(".goods-img img").attr({
							"src": "imgs/1000"+(i+1)+".jpg"
						})
						$(".goods-imgs img").attr({
							"src": "imgs/1000"+(i+1)+".jpg"
						})
						that.store.attr({
							"data-gcolor": $(this).find(".color").html(),
							"data-gimg": $(".goods-img img").attr("src"),
							"data-gid": "1000"+(i+1)
						})
					})
					that.chooseStep1.on('click',function(){
						that.chooseStep2.find(".edition").removeClass("active");
						that.chooseStep3.hide();
						that.packageList.hide();
					})
				})
			})
		},
		chooseMeal: function(){
			var that = this;
			this.chooseItem.each(function(i){
				$(this).on('click',function(){
					that.packageList.show();
					that.buyPhone.addClass('cjt');
					that.nextStep.hide();
					$(this).addClass("active").siblings().removeClass("active");
					$(".your-choose .cjt2").html($(this).text());
				})
				$(".choose-item:last-child").on('click',function(){
					that.packageList.hide();
				})
			})
		},
		banner: function(){
			var that = this;
			this.cItem.each(function(i){
				$(this).on('click',function(){
					that.lunbo.removeClass("active");
					that.lunbo.eq(i).addClass("active");
					that.cItem.removeClass("active");
					$(this).addClass("active");
				})
			})
		},
		consume: function(){
			this.buyPhone.on('click',function(e){
				
				
				var info = {
					id: $("#store").attr("data-id"),	  //店铺id
					name: $("#store").attr("data-name"), //店铺name
					gname: $("#store").attr("data-gname"),
					gamount: $("#store").attr("data-gamount"),
					gprice: $("#store").attr("data-gprice"),
					gtype: $("#store").attr("data-gtype"),
					gcolor: $("#store").attr("data-gcolor"),
					gimg: $("#store").attr("data-gimg"),
					gid: $("#store").attr("data-gid")
				}
				//读取goods-box的内容
				var cjtCart = $.cookie("carters");
				cjtCart = cjtCart || '{}';
				cjtCart = JSON.parse(cjtCart);
				//判断商品在购物车中是否存在
					//1.当前购物车没有当前店铺
					//2.当前购物车没有当前商品
					//3.购物车已存在当前商品
				if(!cjtCart[info.id]){
					cjtCart[info.id] = {
						id: info.id,
						name: info.name,
						goods: {}
					}
				}
				if(!cjtCart[info.id].goods[info.gid]){
					cjtCart[info.id].goods[info.gid] = {
						gamount: parseInt(info.gamount),
						gname: info.gname,
						gprice: parseInt(info.gprice),
						gtype: info.gtype,
						gcolor: info.gcolor,
						gimg: info.gimg,
						gid: info.gid
					}
				}else{
					cjtCart[info.id].goods[info.gid].gamount++;
				}
				
				
				$.cookie('carters',JSON.stringify(cjtCart),{expires: 70,path: '/cheart21'});
				console.log(cjtCart);
				
				
				//跳转特效
				var img = $('<img class="img-to-cart" src="'+cjtCart[info.id].goods[info.gid].gimg+'"/>')
				img.fly({
					start: {
						left: e.pageX,
						top: e.pageY - $(document).scrollTop() - 20
					},
					end: {
						left: $('.haha').offset().left,
						top: $('.haha').offset().top - $(document).scrollTop(),
						width: 20,
						height: 20
					}
				});
			})
		}
	}
	goodsStep.init();
	var zoom = {
		sWrapper: $('.goods-img'),
		lWrapper: $('.goods-imgs'),
		filter: $('.goods-img .filer'),
		imgShow: $('.goods-imgs .img-show'),
		//获取小图距离文档的距离
		offset: $('.goods-img').offset(),
		//初始化数据及方法调用
		init: function(){
			this.hover();
			this.mousemove();
		},
		//鼠标进入图片区域
		hover: function(){
			var that = this;
			this.sWrapper.hover(function(e){
				//显示放大镜（滤镜）
				that.filter.show();
				that.lWrapper.show();
				that.getPos(e);
				that.filterMove();
			},function(){
				that.filter.hide();
				that.lWrapper.hide();
			});
		},
		mousemove: function(){
			var that = this;
			this.sWrapper.mousemove(function(e){
				that.getPos(e);
				that.filterMove();
				that.imgShowMove();
			});
		},
		filterMove: function(){
			//console.log(e.offsetX,e.offsetY);
			this.filter.css({
				top: this.y - 50,
				left: this.x - 50
			});
		},
		imgShowMove: function(){
			this.imgShow.css({
				top: -(this.y - 100) * 3, // 大图是小图的3倍
				left: -(this.x - 100) * 3
			});
		},
		getPos: function(e){
			//获取鼠标距离小图盒子的距离
			var posX = e.pageX - this.offset.left;
			var posY = e.pageY - this.offset.top;
			this.x = (posX > 600 ? 600 : (posX < 50 ? 50 : posX));
			this.y = (posY > 600 ? 600 : (posY < 50 ? 50 : posY));
		}
	};
	zoom.init();
	//阻止客户未登录下，添加商品到购物车
	$(".buy-step").on('click',function(){
		if($('.head_s .kount').html(this.cart.userName)){
			location.href="shops.html";
		}else{
			$(".boxs").css("display","block");
		}
	});
 });
