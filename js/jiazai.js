/**
 * Created by Administrator on 2016/11/16.
 */
    window.onload = function(){
        var moreBtn = document.getElementsByClassName('more')[0];
        var content = document.getElementsByClassName('phone_list')[0];
        moreBtn.addEventListener('click',function(){
            var xhr = null;
            //第一步 获取和服务器通信的代理对象 到邮局那信封和邮票
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else if(window.ActiveXObject){
                xhr = new ActiveXObject(Microsoft.XMLHTTP);
            }
            //第二部 连接（声明请求对象或请求地址）填写邮箱地址及邮寄方式
            xhr.open('get','js/data.js?key='+Math.random(),true);
            //第三部 发送数据 把写好的信塞到信封中
            xhr.send(null);
            //焦急的等待服务器的响应（监听服务是否返回）焦急等待女神是否回信
            xhr.onreadystatechange = function(){
                //判断服务器是否响应
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        //console.log(xhr.responseText);
                        var result = eval( '(' + xhr.responseText + ')' );
                        //console.log(result);
                        var str = '';
                        for(var i=0;i<result.length;i++){
                            var dataImg = result[i].dataImg;
                            var dataName = result[i].dataName;
                            str += '<li><a><img class="img_1" src="' + dataImg +'"><p class="p_1">'+ dataName +'</p></a></li>';
                        }
                        content.innerHTML += str;
                    }
                }
            }
        });
    }
/*function $(className){
    className = className.substr(1);
    var eles = document.getElementsByClassName(className)[0];
    if(eles.length == 1){
        return eles[0];
    }
    return eles;
}*/

