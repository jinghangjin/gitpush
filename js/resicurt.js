$(function(){
	var a = 0,b = 0,c = 0,d = 0;
	$("#username").focus(function(){
	$(".heats").css("display","block");
	});
	$("#username").blur(function(){
		var username = $("#username").val();
		var reg = /^[a-zA-Z_]\w{5,14}$/;
		if(!reg.test(username)){
			a = 0;
			$(".heats").css({"display":"block","color":"#c33"});
			$(".cense").css("display","none");
		}else{
			a = 1;
			$(".cense").css("display","block");
			$(".heats").css("display","none");
		}
	});
	$("#userpass").focus(function(){
		$(".yezt").css("display","block");
	});
	$("#userpass").blur(function(){
		var userpass = $("#userpass").val();
		var reg1 = /^[a-zA-Z0-9][a-zA-Z0-9]{5,19}$/;
		if(!reg1.test(userpass)){
			b = 0;
			$(".yezt").css({"display":"block","color":"#c33"});
			$(".censes").css("display","none");
		}else{
			b = 1;
			$(".censes").css("display","block");
			$(".yezt").css("display","none");
		}
	});
	$("#userpasses").focus(function(){
		$(".sets").css("display","block");
	});
	$("#userpasses").blur(function(){
		var userpass = $("#userpass").val();
		var userpasses = $("#userpasses").val();
		if(userpass != userpasses){
			c = 0;
			$(".sets").css({"display":"block","color":"#c33"});
			$(".censesd").css("display","none");
		}else{
			c = 1;
			$(".censesd").css("display","block");
			$(".sets").css("display","none");
		}
	});
	$("#vocule").focus(function(){
		$(".suffes").css("display","block");
	});
	$("#vocule").blur(function(){
		var vocule = $("#vocule").val();
		if(vocule == shrut){
		$(".suffes").css("display","none");
		d = 0;
		}else{
		d = 1;
		$(".suffes").css({"display":"block","color":"#c33"});
		}
	});
	var sets ={
		init:function(){
			this.subgit();
		},
		btnes:$(".btnes"),
		username:$("#username"),
		userpass:$("#userpass"),
		userpasses:$("#userpasses"),
		vocule:$("#vocule"),
		cense:$(".cense"),
		subgit:function(){
	     var that = this;
	     var username = $("#username").val();
		 var reg = /^[a-zA-Z_]\w{5,14}$/;
		 var userpass = $("#userpass").val();
		 var reg1 = /^[a-zA-Z0-9][a-zA-Z0-9]{5,19}$/;
	     //验证用户名是否存在	
			this.username.on('blur',function(){
			$.post('http://10.35.161.52:8080/myWeb/checkUser.jsp',{
					stuId:"53",
					userName: that.username.val(),
					//userPass: that.userPass.val(),
			},function(responseStr,status){
					if(status == "success"){
						if(responseStr.indexOf("0") > -1){
						var reg = /^[a-zA-Z_]\w{5,14}$/;
						if(reg.test(that.username.val())){
								that.cense.css({
									display:'block'
								});
						}else{
							that.cense.css({
									display:'none'
							});
						 }
					 }else{
						    alert('该用户已被注册！');
					 }
	             }else{
	             	alert('系统繁忙')
	             }
		     });
		   })
	//注册
	  this.btnes.on('click',function(){
	         //阻止用户在不输入的情况下直接点击注册
			/*if(that.username.val() == "" || that.userpass.val() == ""){
				alert("用户名或密码不能为空");
			}else if(that.userpass.val() != that.userpasses.val()){
				alert("两次密码不一致");
			}else if(that.vocule.val() == ""){
				alert("请输入验证码");
			}else */
			console.log(a);
			console.log(b);
			console.log(c);
			console.log(d);
				$.post('http://10.35.161.52:8080/myWeb/reg.jsp',{
						stuId:'53',
						userName:that.username.val(),
						userPass:that.userpass.val(),
				},function(responseStr,status){
						if(status == "success"){
							        console.log(0)
							  if(a == 1&&b == 1&&c == 1&&d == 1){      
								if(responseStr.indexOf("true") > -1){
									console.log(4);
									location.href="resicurts.html";

								}else {
									alert("亲，不好意思，注册失败");
									console.log(2)
								}
						  
							 }else{
							   alert("用户名密码错误");
							   location.reload();
							}
						}else{
							alert.html("系统繁忙");
						}
					});
		  });
		}
    }
	sets.init();
	var shrut = {
		idDiv:$(".yzm_z"),
		idBtn:$(".centes .btnes"),
		idUsername:$(".hello #username"),
		init: function(){
			this.meat();
			this.hert();
			//this.btn();
			//this.upusername();
		},
		meat: function(){
			var that = this;
			var yzmStr = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
			var yzmStrShow = '';
			for(var i=0; i<6; i++){
				yzmStrShow += yzmStr.charAt(parseInt(Math.random()*yzmStr.length))
			}
			this.idDiv.html(yzmStrShow);
			var yzmColor = ["red","green","blue","magenta","orange","purple","deeppink","tomato","tan","purple"];
			var yzmColorShow = yzmColor[parseInt(Math.random()*yzmColor.length)];
			this.idDiv.css({"color":yzmColorShow})
		},
		hert: function(){
			var that = this;
			this.idDiv.click(function(e){
				e.stopPropagation();
				that.meat();
			})
		},
	}
	shrut.init();
});