$(function(){
	$("#reset").click(function(){
		localStorage["dojo_top"] = "0";
		localStorage["count"] = "0";
		console.log(localStorage["dojo_top"]+";"+localStorage["dojo_top"]);
	})
});