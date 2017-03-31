
//显示购物车（购物车列表）
    $(function(){
		var str=$(".kount").text();
		var reg=/[0-9]/
		if(reg.test(str)){
				$.get("http://10.35.161.52:8020/myWeb/getShoppingCart.jsp",
				{stuId:"53",userName:"11258957856"},
				function(responseStr,status){
					if(status=="success"){
						var countGoods=eval("("+responseStr+")");
					        // alert(responseStr);				
						for(var i=0;i<countGoods.length;i++){
						    //alert(countGoods[0].goodsImg)
							$("<tr><td>"+
							   "<div class='getimg'><img src='allgoodsimg/"+countGoods[i].goodsImg+"'/></div>"+
								"<div class='forspan'>"+	
									"<span class='name'>"+countGoods[i].goodsName+"</span><br/>"+
									"<span class='coloro'>颜色 "+countGoods[i].goodsColor+"</span><br />"+
									"<span class='bigh'>容量 3GB/64GB</span><br/></div></td>"+
								"<td class='price'>"+countGoods[i].goodsPrice+"</td><td>--</td><td>"+
								"<input class='reduce' value='-' type='button' />"+
								"<input class='addoroth' value='0' type='text' />"+
								"<input class='add' type='button' value='+'>"+
								"</td><td>有库存</td><td class='totall'>"+countGoods[i].goodsCount+"</td><td>"+
								" <a href=''><span>收藏</span></a><span class='out'>删除</span></td></tr>"
							
							).appendTo($(".forbuy"))
							
						} 
					}
				}
			)	
		}
		
	})
	


//服务器删除购物车的商品
$(function(){
	$(".out").live("click",
	    function(){
			$.get("http://10.35.161.52:8020/myWeb/deleteGoods.jsp?t="+new Date(),
			{stuId:"53",userName:"11258957856",goodsId:"1000101"},
			    function(responseStr,status){
				    $(this).closest("tr").remove();
					for(i=0;i<4;i++){
					    $(".counttall dd:eq("+i+")").text(0);	
					}
				
			    }
			)
			
		}
	)
	
})

//客户端删除商品
	$(function(){
	   $(".out").live("click",
		function(){
			$(this).closest("tr").remove();
			for(i=0;i<4;i++){
				$(".counttall dd:eq("+i+")").text(0);	
			}
		}
	)
})
/*		
//修改数量
    $(function(){
	    $("")
	   
    })
*/






