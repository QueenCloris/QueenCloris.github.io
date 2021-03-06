$(window).on("load",function(){
	waterfall();
	var dataInt={"data":[{"src":"1.jpeg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
	$(window).on("scroll",function(){
		if(checkScrollSlide){
			$.each(dataInt.data,function(key,value){
				var oBox=$("<div>").addClass("box").appendTo($("#main"));
				var oPic=$("<div>").addClass("pic").appendTo($(oBox));
				oImg=$("<img>").attr("src","image/"+$(value).attr("src")).appendTo($(oPic));

			})
			waterfall();
		}
	})
})

function waterfall(){
	var $boxs=$("#main>div");
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$("#main").width(w*cols).css("margin","0 auto");
	var hArr=[];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minIndex=$.inArray(minH,hArr);
			$(value).css({
				"position":"absolute",
				"top":minH+"px",
				"left":minIndex*w+"px"
			});
			hArr[minIndex]+=$boxs.eq(index).outerHeight();
		}
	})
}
function checkScrollSlide(){
	var $lastBox=$("#main>div").last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}