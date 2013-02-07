var url = location.href;
count = 0;

var port = chrome.extension.connect({name: "connect"});
port.postMessage({pageurl: url});

port.onMessage.addListener(function(msg) {
	if(msg.stat == "go"){
		jump(msg.id);
	}else if(msg.stat == "select"){
		waitpush(2000);
	}else if(msg.stat == "return"){
		waitmypage(2000);
	}else if(msg.stat =="retFun"){
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

function waitpush(time){
	setInterval("stay()",time);
}

function stay(){
	if(count == 0){
		count++;
	}else if(count == 1){
		push();
	}
}

function waitmypage(time){
	setInterval("staymypage()",time);
}

function staymypage(){
	if(count == 0){
		count++;
	}else if(count == 1){
		toMypage();
	}
}

function retFun(){
	var dom = $(".statusArea")[0].innerText;
	port.postMessage({html: dom});
}