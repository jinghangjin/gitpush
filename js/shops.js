 $(function(){
	 //cookie
	var cartHandle = {
		dec: $('.dec'),
		add1: $('.add1'),
		cart: {},
		payCart: {},
		init: function(){
			this.handleData();
			this.addAmount();
			this.decAmount();
			this.inputAmount();
			this.deleteGoods();
			this.checkBoxSelect();
			this.shopSelect();
			this.selectAll();
			this.deleteSelect();
			this.totalAmount();
		},
		//处理购物车数据,拼接字符串,放到页面
		handleData: function(){
			this.readCart();
			//console.log(this.cart);
			var cartStr = '';
			for(var key in this.cart){
				var obj = this.cart[key];
				for(var Key2 in obj.goods){
					var goods = obj.goods[Key2];
						cartStr	+=	'<div class="item-box" data-id="'+obj.id+'">'
							+	'<div class="shop-table clearfix" data-gid="'+goods.gid+'">'
							+	'<div class="shop-deta clearfix">'
							+	'<div class="col col-check"><input class="phone-checked" type="checkbox"/></div>'
							+	'<div class="col col-img">'
							+	'<a href="javascript:;">'
							+	'<img src="'+goods.gimg+'" style="width:80px;height:80px;"/>'
							+	'</a>'
							+	'</div>'
							+	'<div class="col col-name">'+obj.name+' '+goods.gtype+' '+goods.gcolor+' </div>'
							+	'<div class="col col-price">'+goods.gprice+'</div>'
							+	'<div class="col col-amount">'
							+	'<a class="dec" href="javascript:;">-</a>'
							+	'<input class="amount-input" type="text" value="'+goods.gamount+'";/>'
							+	'<a class="add1" href="javascript:;">+</a>'
							+	'</div>'
							+	'<div class="col col-total">'+(goods.gprice*goods.gamount).toFixed(2)+'</div>'
							+	'<div class="col col-action"><a href="javascript:;">&times;</a></div>'
							+	'</div>'
							+	'</div>'
							+	'<div class="shop-notice">'
							+	'</div>'
							+	'</div>'
				}
			}
			$('.counthave').prepend(cartStr);
		},
		//增加数量
		addAmount: function(){
			var that = this;
			$('.add1').on('click',function(){
				//判断有没有达到上线
				var max = 20;  //购买上限
				var val = parseInt( $(this).prev().val() );
				if(val >= max){
					return;
				}
				val++;
				$(this).prev().val(val);
				that.optionHandle($(this),val);
				that.totalAmount();
			})
		},
		//减少数量
		decAmount: function(){
			var that = this;
			$('.dec').on('click',function(){
				//判断有没有达到下限
				var val = parseInt( $(this).next().val() );
				if(val <= 1){
					return;
				}
				val--;
				$(this).next().val(val);
				that.optionHandle($(this),val);
				that.totalAmount();
			})
		},
		//直接输入数量
		inputAmount: function(){
			var that = this;
			$('.amount-input').on('input propertychange',function(){
				//处理上限
				var max = 20;  //购买上限
				var val = parseInt( $(this).val() );
				if(val >= max){
					val = max;
				}
				//合法性验证
				var reg = /^[1-9]\d*$/;
				if(!reg.test(val)){
					val = 1;
				}
				$(this).val(val);
				that.optionHandle($(this),val);
				that.totalAmount();
			})
		},
		//删除商品
		deleteGoods: function(){
			var that = this;
			$('.col-action').on('click',function(){
				if(confirm('确定删除吗?')){
					location.reload();
					var item = $(this).parents('.item-box');
					var id = item.attr('data-id');
					var gid = $(this).parents('.shop-table').attr('data-gid');
					console.log(id,gid);
					//从页面移除当前商品
					item.remove();
					//从cookie移除当前商品
					delete that.cart[id].goods[gid];
					that.setCart();
				}
			})
		},
		//商品复选框选择
		checkBoxSelect: function(){
			var that = this;
			$('.phone-checked').on('change',function(){
				if($(this).prop('checked')){
					that.addPaycart($(this));
					//如果当前店铺的所有商品被选中	则让店铺的全选被选中
					var siblings = $(this).parents('.item-box').siblings();
					var siblingsSelect = siblings.find('input[type="checkbox"]:checked');
					if(siblings.length == siblingsSelect.length){
						$(this).parents('.cart-goods-list')
							.find('.list-head input[type="checkbox"]')
							.prop('checked',true);
					}
				}else{
					that.decPaycart($(this));
					//释放店铺全选和所有商品全选按钮
					$(this).parents('.cart-goods-list').find('.list-head input[type="checkbox"]').prop('checked',false);
					$(this).parents('.cart-box').find('.no-money input[type="checkbox"]').prop('checked',false);
				}
				that.payInfo();
			})
		},
		//店铺全选
		shopSelect: function(){
			var that = this;
			$('.list-head .all-checked').on('change',function(){
				var childs = $(this).parents('.cart-goods-list').find('.item-box  input[type="checkbox"]')
				if($(this).prop('checked')){
					childs.prop('checked',true);
					childs.change();
				}else {
					childs.prop('checked',false);
					childs.change();
				}
			})
		},
		//删除所选商品
		deleteSelect: function(){
			var that = this;
			$('.user-cart a').on('click',function(){
				if( confirm('确定删除宝贝吗?') ){
					var selectAllBtn = $('.no-money input[type="checkbox"]');
					//删除全部商品
					if(selectAllBtn.prop('checked')){
						$('.cart-goods-list').html('');
						that.cart = {};
						that.payCart = {};
					}
					//删除店铺
					$('.cart-goods-list').each(function(k,v){
						var id = $(this).find('.item-box').attr('data-id');
						console.log(id);
						var checked = $(this).find('.list-head input[type="checkbox"]').prop('checked');
						if(checked){
							$(this).remove();
							delete that.cart[id];
							delete that.payCart[id];
						}
					})
					//删除商品
					var id = $(this).parents('.cart-box').find('.item-box').attr('data-id');
					var gid = $(this).parents('.cart-box').find('.shop-table').attr('data-gid');
					console.log(id,gid);
					console.log($(this).parents('.cart-box').find('.shop-table'));
					var checked = $(this).parents('.cart-box').find('.shop-table').find('input[type="checkbox"]').prop('checked');
					if(checked){
						$(this).remove();
						delete that.cart[id].goods[gid];
						delete that.payCart[id].goods[gid];
					}
					that.setCart();
				}
			})
		},
		//购物车全选
		selectAll: function(){
			$('.no-money input[type="checkbox"]').on('click',function(){
				var allShop = $('.cart-goods-list').find('input[type="checkbox"]');
				//如果选中【全选】，将所有店铺选中
				if($(this).prop('checked')){
					allShop.prop('checked',true);
				}else{
					allShop.prop('checked',false);
				}
			})
		},
		//往付款购物车中添加商品
		addPaycart: function(obj){
			//把当前商品添加到	[结算cookie]		中
			var id = obj.parents('.item-box').attr('data-id');
			var gid = obj.parents('.shop-table').attr('data-gid');
			if(!this.payCart[id]){
				this.payCart[id] = {
					id: id,
					name: this.cart[id].name,
					goods: {
						length: 0
					}
				}
			}
			if(!this.payCart[id].goods[gid]){
				this.payCart[id].goods[gid] = this.cart[id].goods[gid];
				this.payCart[id].goods.length++;
			}
		},
		//从付款购物车中移除商品
		decPaycart:function(obj){
			//把当前商品从	[结算cookie]		中删除
			var id = obj.parents('.item-box').attr('data-id');
			var gid = obj.parents('.shop-table').attr('data-gid');
			if(this.payCart[id]){
				if(this.payCart[id].goods[gid]){
					delete this.payCart[id].goods[gid];
					this.payCart[id].goods.length--;
				}
				if(!this.payCart[id].goods.length){
					delete this.payCart[id];
				}
			}
		},
		//结算
		payInfo: function(){
			//payCart
			var goodsTotal = 0;
			var moneyTotal = 0;
			for(var shop in this.payCart){
				var shop = this.payCart[shop];
				for(var key in shop.goods){
					var goods = shop.goods[key];
					if(typeof goods == 'object'){
						goodsTotal += goods.gamount;
						moneyTotal += goods.gamount * goods.gprice;
					}
				}
			}
			if(goodsTotal){
				$('.account').addClass('allow-pay');
			}else {
				$('.account').removeClass('allow-pay');
			}
			$('.total-num').html(goodsTotal);
			$('.total-money').html(moneyTotal.toFixed(2));
		},
		//数据处理
		optionHandle: function(obj,val){
			var money = obj.parents('.shop-table').find('.col-total');
			var price = obj.parents('.shop-table').find('.col-price');
			var totalMoney = val*parseInt(price.text());
			totalMoney = totalMoney.toFixed(2);		// cjt.toFixed(2)   cjt保留2位小数
			money.text( totalMoney );
			var id = obj.parents('.item-box').attr('data-id'); //2 种型号
			var gid = obj.parents('.shop-table').attr('data-gid'); //3 种颜色
			this.cart[id].goods[gid].gamount = val;
			//重新存储cookie
			this.setCart();
		},
		//读取购物车cookie
		readCart: function(){
			this.cart = $.cookie('carters');
			this.cart = JSON.parse(this.cart);
			console.log(this.cart);
		},
		//设置购物车cookie
		setCart: function(){
			$.cookie('carters',JSON.stringify(this.cart),{expires: 14,path:'/cheart21'})
		},
		//页面总商品数量
		totalAmount: function(){
			var total = 0;
			for(var i=0; i<$('.item-box').length; i++){
				total += parseInt( $('.item-box').find('input[type="text"]').eq(i).val() ) ;
			}
			$('.now-num').html(total);
		}
	}
	cartHandle.init();
  });
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	