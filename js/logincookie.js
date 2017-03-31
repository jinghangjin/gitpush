function saveCookie(key,value,dayCount){
  
	var d=new Date();
	d.setMonth(d.getMonth()+dayCount);
	document.cookie=key+"="+encodeURIComponent(value)+";expires="+d.toGMTString();                                                                                    +encodeURIComponent(value)+";expires="+d.toGMTString();
	
}
function getCookie(key){
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i=0;i<arr.length;i++){
		if(arr[i].indexOf(key+"=")==0){
			return decodeURIComponent(arr[i].substring((key+"=").length));
		}
	}	
  return "";
}
function reMoveCookie(key){
	saveCookie(key,"gfsh",-9)
	
}
