$(function () {
	operationFnc();
	// $.ajax({
	// 	url: "/api/v1/banner-img",
	// 	type: 'get',
	// 	cache: false,
	// 	dataType: 'json',
	// 	success: function (ret) {
	// 		let html = '',
	// 				jsHtml = '';
	// 		ret.data.forEach((el,index) => {
	// 			// console.info(el,index)
	// 			if(index==0){
	// 				html += '<img src="' + el.href + '">';
	// 				jsHtml += '<a class="trigger imgSelected" href="javascript:void(0)"></a>';
	// 			}else{
	// 				html += '<img style="DISPLAY: none" src="' + el.href + '">';
	// 				jsHtml += '<a class="trigger" href="javascript:void(0)"></a>';
	// 			}
	// 		});
	// 		$('#bannerImg').append(html);
	// 		$('#jsNav').append(jsHtml);
	// 		operationFnc();
	// 	},
	// 	error: function () {
	// 		// view("异常！");
	// 		//that.tip('系统异常！')
	// 		console.log('系统异常！666');
	// 	}
	// });
});
function operationFnc(){
	var curr = 0;
	$("#jsNav a.trigger").each(function(i){
		$(this).click(function(){
			curr = i;
			$("#js img").eq(i).fadeIn("fast").siblings("img").fadeOut("fast");
			$(this).addClass("imgSelected").siblings().removeClass("imgSelected");
		});
	});
	var timer = setInterval(function(){
		var go = (curr + 1) % 5;
		$("#jsNav a.trigger").eq(go).click();
	},5000);
	$("#js,#next,#prev").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
		var go = (curr + 1) % 5;
		$("#jsNav a.trigger").eq(go).click();
	},3000);
	});
	$("#next").click(function(){
		if(curr == 4){
			var go = 0;
		}else{
			var go = (curr + 1) % 5;
		}
		$("#jsNav a.trigger").eq(go).click();
	});
	$("#prev").click(function(){
		if(curr == 0){
			var go = 4;
		}else{
			var go = (curr - 1) % 5;
		}
		$("#jsNav a.trigger").eq(go).click();
	});
}