$(function(){
	//商品详情
	$.get(
		'http://10.35.161.52:8080/myWeb/addGoods.jsp',
		{stuId:'53',goodsId:1000101},
			function(responseStr,status){
				if(status == 'success'){
					var json = eval( '(' + responseStr + ')' );
					console.log(json);
					createGoods(json);
				}
			}
	)
	function createGoods(obj){
		console.log(obj);
		var	cjt1 =  "<li class='edition active' data-price='1499元' data-id='101' data-name='屌丝版'>"+obj.goodsType+"</li>";
		$('.step1').find('ul').prepend(cjt1);
		liHover.init();
		goodsStep.init();
	}
	
	$.get(
		'http://10.35.161.52:8080/myWeb/addGoods.jsp',
		{stuId:'53',goodsId:1000102},
			function(responseStr,status){
				if(status == 'success'){
					var json1 = eval( '(' + responseStr + ')' );
					console.log(json1);
					createGoods(json1);
				}
			}
	)
	function createGoods(obj1){
		var	cjt2 =  "<li class='edition' data-price='2172元' data-id='102' data-name='土豪版'>"+obj1.goodsType+"</li>";
		$('.step1').find('ul').prepend(cjt2);
		liHover.init();
		goodsStep.init();
	}
	
	
	
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
			$(".your-choose .cjt1").html("金立M16"+ "  " + $(".step1 li.active").html() );
			this.chooseStep1.find(".edition").each(function(i){
				$(this).on('click',function(){
					that.nextStep.show();
					that.buyPhone.removeClass('cjt');
					that.detailTitlePrice.html($(this).attr("data-price"));
					$(this).addClass("active").siblings().removeClass("active");
					$(".your-choose .cjt1").html("金立M16"+ "  " + $(".step1 li.active").html());
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
						$(".your-choose .cjt1").html("金立M16"+ "  " + $(".step1 li.active").html() +" "+$(this).find(".color").html()+" "+$(".step1 li.active").attr("data-price"));
						that.chooseStep3.show();
						that.packageList.hide();
						that.buyPhone.removeClass('cjt');
						$('.next-step').show();
						that.chooseItem.removeClass("active")
						$(this).addClass("active").siblings().removeClass("active");
						$(".goods-img img").attr({
							"src": "img/1000"+(i+1)+".jpg"
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
				//跳转特效
				var img = $('<img class="img-to-cart" src="img/10001.jpg"/>')
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
				
				$.get(
					'http://10.35.161.52:8080/myWeb/addGoods.jsp',
					{
						stuId:'53',
						userName: 'yaoyao',
						goodsId: 1000101,
						goodsCount: 1
					},
						function(responseStr,status){
							if(status == 'success'){
								console.log(responseStr);
								console.log(status);
							}
						}
				)
				
				
			})
		}
	}
})


