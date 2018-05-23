$(document).ready(function () {
    
	$('#messageBtn_hide').on('click',hideBoard_hide);//留言板点击隐藏事件
	$('#messageBtn_show').on('click',hideBoard_show);//留言板点击显示事件
	$('#mbCommit').on('click',function(){//留言板发送
		var params = {
			'mbName':$('#mbName').val(),
			'mbPhone':$('#mbPhone').val(),
			'mbEmail':$('#mbEmail').val(),
			'mbAddress':$('#mbAddress').val(),
			'mbWord':$('#mbWord').val()
		}
		if(params.mbPhone){
			$('.mb-content-phone').removeClass('isnull')
		}else{
			$('.mb-content-phone').addClass('isnull')
			return
		}
		$.ajax({
			url: "/api/v1/message-board",
			data: params,
			type: 'post',
			cache: false,
			dataType: 'json',
			success: function (data) {
				console.info(data.data.code)
				
			},
			error: function () {
				// view("异常！");
				//that.tip('系统异常！')
				console.log('系统异常！');
			}
		});
	});
})
function phoneBlur(){
	let phoneVal = $('#mbPhone').val()
	if(!phoneVal){
		$('.mb-content-phone').addClass('isnull')
		return
	}
	$('.mb-content-phone').removeClass('isnull')
}
function phoneFocus(){
	$('.mb-content-phone').removeClass('isnull')
}
function hideBoard_hide(){//留言板点击隐藏事件
	$('#mbContent').removeClass('mb-content-show');
	$('#mbContent').addClass("mb-content-hide");
	$('#messageBtn_hide').removeClass('isShow');
	$('#messageBtn_show').addClass('isShow');
}
function hideBoard_show(){//留言板点击显示事件
	$('#mbContent').removeClass('mb-content-hide');
	$('#mbContent').addClass("mb-content-show");
	$('#messageBtn_show').removeClass('isShow');
	$('#messageBtn_hide').addClass('isShow');
}