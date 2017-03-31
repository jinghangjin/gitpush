$(function(){
	$("#username").focus(function(){
	$(".heats").css("display","block");
	});
	$("#username").blur(function(){
		var username = $("#username").val();
		var reg = /^[a-zA-Z_]\w{5,14}$/;
		if(!reg.test(username)){
			$(".heats").css({"display":"block","color":"#c33"});
			$(".cense").css("display","none");
		}else{
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
			$(".yezt").css({"display":"block","color":"#c33"});
			$(".censes").css("display","none");
		}else{
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
			$(".sets").css({"display":"block","color":"#c33"});
			$(".censesd").css("display","none");
		}else{
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
		}else{
		$(".suffes").css({"display":"block","color":"#c33"});
		}
	});
	var resicurts = {
		init: function(){
			this.logoGo();
		},
		btnes:$(".btnes"),
		username:$("#username"),
		userpass:$("#userpass"),
		userpasses:$("#userpasses"),
		vocule:$("#vocule"),
		cense:$(".cense"),
		logoGo: function(){
			var that = this;
			this.btnes.on('click',function(){
			 if(that.username.val() == "" || that.userpass.val() == ""){
			     alert("用户名或密码不能为空");
			  }else{
				$.post('http://10.35.161.52:8080/myWeb/login.jsp',{
					stuId:'53',
					userName: that.username.val(),
					userPass: that.userpass.val(),
				},function(responseStr,status){
					console.log(responseStr);
					if(status == "success"){
						console.log(1);
						if(responseStr.indexOf("true") > -1){
							var user2 = {
								userName: that.username.val(),
					            userPass: that.userpass.val(),
							}
							$.cookie('keepUps',JSON.stringify(user2),{expires:14,path:'/cheart21'});
							if(confirm('点击跳转到主页')){
								location.href="index.html";
							}
						}else{
							alert('用户名密码错误');
						}
					}else{
						alert.html("系统繁忙");
					}
				});
			  };
			});
			//$.cookie('keepes',-1);
		}
	}
	resicurts.init();
	/*$(".btness").click(function(){
		var userName = $("#username").val();
		var reg = /^[a-zA-Z_]\w{5,14}$/;
		var userPass = $("#userpass").val();
		var reg1 = /^[a-zA-Z0-9][a-zA-Z0-9]{5,19}$/;
		if(reg.test(userName) == true && reg1.test(userPass) == true){
			alert("登录成功");
			var usert = {
				userName:$("#username").val(),
				userPass:$("#userpass").val()
			}
			$.cookie('keepes',JSON.stringify(usert),{expires:14,path:'/cheart21'});
			if(confirm('点击跳转到主页')) {
				location.href = "index.html";
			}
		}else{
			alert("用户名或密码错误");
		}
	})*/
});