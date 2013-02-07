var myport = null;
var dojoId = [9803820,64249408,66717238,58367118,61410596,38335324,60785960,65349258,61332207,60796160,66215638,57137423,60722314,56678005,66506554,59881437,62897418,61168865,66176833,37543223,63267032,59647843,60003042,61863374,16064520,7054900,9013840,15586190,54874033,59466093,61075637,58908513,63946801,62056410,60071414,59275512,46042298,62187020];
var dojoTop = getDojo_top();
var count = getCount();
var pre = 0;

chrome.extension.onConnect.addListener(function(port){
	port.onMessage.addListener(function(msg){
		myport = port;
		if(msg.html){
			var str = msg.html;
			var txt = checkDisplacement(parseInt(str.match(/[0-9]+/g)[4],10));
			chrome.browserAction.setBadgeText({text:"+"+txt});
			console.log("+"+txt);
		}else{
		checkpattern(msg.pageurl);
		}
	});
});

chrome.browserAction.onClicked.addListener(function(tab){
	var id = getID();
	//console.log(""+id);
	myport.postMessage({stat: "go",id: id});
});

function checkpattern(url){
	if(url.match("mypage")){
		console.log("battle:"+count+"::"+dojoTop);
		myport.postMessage({stat: "retFun"});
	}else if(url.match("battle_check")){
		count++;
		saveCount();
		myport.postMessage({stat: "select"});
	}else if(url.match("battle%2Fflash")){
		myport.postMessage({stat: "return"});
	}
	
}

function getID(){
	if(count == 3){
		count = 0;
		saveCount();
		dojoTop++;
		saveTop();
	}
	return dojoId[dojoTop];
}

function getDojo_top(){
	var temp = localStorage["dojo_top"]?localStorage["dojo_top"]:"0";
	return parseInt(temp,10);
}

function getCount(){
	var temp = localStorage["count"]?localStorage["count"]:"0";
	return parseInt(temp,10);
}

function savaTop(){
	localStorage["dojo_top"] = ""+dojoTop;
}

function saveCount(){
	localStorage["count"] = ""+count;
}

function checkDisplacement(now){
	var disp = now-pre;
	pre = now;
	return disp;
}