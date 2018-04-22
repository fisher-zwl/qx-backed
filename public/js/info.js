$(document).ready(function () {
  function info() {
    this.postObject = {
      productId: 1,
    }
    this.isPost = false

  }

  info.prototype.tip = function (text) {
    $('.tip').html(text)
    $('#tip').css('display', 'block')
    setTimeout(function () {
      $('#tip').css('display', 'none')
    }, 1000 * 1.4)
  }
  info.prototype.selectInit = function () {
    $('#select li').each(function (i) {
      $(this).find('img').attr('src', '../img/checkbox.png')
    })
  }
  info.prototype.selectLi = function () {
    var that = this
    $('#select li').each(function (i) {
      if(i==0){
        var val = $(this).attr('value')
        that.postObject.productId = parseInt(val)
      }
      $(this).on('click', function (i) {
        var value = $(this).attr('value')
        that.postObject.productId = parseInt(value)
        that.selectInit()
        $(this).find('img').attr('src', '../img/checkbox_a.png')
      })
    })
  }
  info.prototype.ajax = function (data, callback) {
    var that = this
    if (that.isPost == true) {
      return
    }
    that.isPost=true
    $.ajax({
        url: "/api/v1/create",
        data: data,
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
          that.isPost = false
          callback(data)
        },
        error: function () {
          // view("异常！");
          that.tip('系统异常！')
          this.isPost=false

        }
      }
    );


  }
  info.prototype.submit = function () {
    var that = this
    $('#submit-production').on('click', function () {
      var name = $('#name').val()
      if (name.length == '') {
        that.tip('请输入姓名')
        return
      }
      that.postObject.name = name
      var address = $('#address').val()
      if (address == '') {
        that.tip('请输入地址')
        return
      }
      that.postObject.address = address
      var mobile = $('#mobile').val()
      var myMobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myMobileReg.test(mobile)) {
        that.tip('请输入正确的手机号码')
        return
      }
      if (typeof (that.postObject.productId) == 'undefined') {
        that.tip('请选择产品')
        return
      }
      that.postObject.mobile = mobile
      var url = location.search
      url = url.replace("?", '')
      var urls = url.split('&')
      var oneCode = urls[0].split('=')[1]
      var twoCode = urls[1].split('=')[1]
      that.postObject.oneCode = oneCode
      that.postObject.twoCode = twoCode
      that.ajax(that.postObject, function (data) {
        if (data.code == 103) {
          that.tip('兑换码有误！')
          return
        } else if (data.code == 0) {
          window.location.href = '/success'
        } else {
          that.tip('系统异常')
        }

      })


    })
  }
  var info = new info()
  info.selectLi()
  info.submit()
})