var url = location.href;
stat = "";

var port = chrome.extension.connect({name: "connect"});
port.postMessage({pageurl: url});

port.onMessage.addListener(function(msg) {
	stat = msg.stat;
	if(msg.stat == "go"){
		jump(msg.id);
	}else if(msg.stat == "select"){	
		delay(1000);
	}else if(msg.stat == "return"){
		delay(2000);
	}else if(msg.stat == "retFun"){
		retFun();
	}
});

function push(){
	$("input[type*='submit']")[0].click();
}

function jump(id){
	location.href = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fbattle%2Fbattle_check%2F"+id;
}

function toMypage(){
	location.href="http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fmypage";
}

function delay(time){
	setTimeout("callMethod()",time);
}

function callMethod(){
	if(stat == "select"){
		push();
	}else if(stat == "return"){
		toMypage();
	}else if(stat == "request"){
		port.postMessage({req: "request"});
	}
}

function retFun(){
	var dom = $(".statusArea")[0].innerText;
	port.postMessage({html: dom});
	stat = "request";
	delay(300000);
}