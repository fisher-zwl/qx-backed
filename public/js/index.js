/**
 * Created by bobocat on 2018/3/11.
 */
$(document).ready(function () {
  function index() {
    this.codes = {}

  }

  index.prototype.tip = function (text) {
    $('.tip').html(text)
    $('#tip').css('display', 'block')
    setTimeout(function () {
      $('#tip').css('display', 'none')
    }, 1000 * 1.4)
  }
  index.prototype.handleAjax = function (code, callback) {
    if (typeof code == 'undefined') {
      return
    }
    var that = this
    $.ajax({
      url: "/api/v1/vertify-code",
      data: {
        code: code
      },
      type: 'post',
      cache: false,
      dataType: 'json',
      success: function (data) {
        console.info(data.data.code)
        if (data.data.code == 0) {
          if (callback) {
            callback(data)
          }
        } else {
          that.tip('兑换码不存在，请输入正确的兑换码！')
          callback(data)
        }
      },
      error: function () {
        // view("异常！");
        that.tip('系统异常！')
      }
    });
  }

  index.prototype.handleCode = function () {

  }
  index.prototype.handleCodeClick = function () {
    var that = this
    $('#b1').on("click", function () {
      var c1Value = $("#c1").val()
      if (c1Value.length != 6) {
        that.tip('请输入正确的兑换码！')
        return
      }
      if (that.codes.two) {
        if (that.codes.two == c1Value) {
          that.tip('不能输入相同的兑换码')
          return
        }
      }
      that.handleAjax(c1Value, function callback(data) {
        that.codes.one = c1Value
        if (data.data.code == 0) {
          $('#t1').attr('src', '../img/n_a.png')
          if (typeof (that.codes.two) == 'undefined') {
            $('#code-tip').html('温馨提示：您已经激活"奈"字，再激活"儿"字即可领取奖品"')
          } else {
            $('#code-tip').html('温馨提示：您已经激活"奈"字和"儿"字，快去领取奖品吧')
          }
        } else {
          that.codes.one = undefined
          $('#t1').attr('src', '../img/n.png')
          if (typeof (that.codes.two) == 'undefined') {
            $('#code-tip').html('温馨提示：激活"奈"字和"儿"字即可领取奖品')
          } else {
            $('#code-tip').html('温馨提示：您已经激活"奈"字，再激活"儿"字即可领取奖品"')
          }
        }
      })

    })
    $('#b2').on("click", function () {
      var c2Value = $("#c2").val()
      if (c2Value.length != 6) {
        that.tip('请输入正确的兑换码！')
        return
      }
      if (that.codes.one) {
        if (that.codes.one == c2Value) {
          that.tip('不能输入相同的兑换码')
          return
        }
      }
      that.handleAjax(c2Value, function callback(data) {
        $('#t2').attr('src', '../img/er_a.png')
        if (data.data.code == 0) {
          that.codes.two = c2Value
          if (typeof (that.codes.one) == 'undefined') {
            $('#code-tip').html('温馨提示：您已经激活"儿"字，再激活"奈"字即可领取奖品"')
          } else {
            $('#code-tip').html('温馨提示：您已经激活"奈"字和"儿"字，快去领取奖品吧')
          }
        }else {
          that.codes.two = undefined
          $('#t2').attr('src', '../img/er.png')
          if (typeof (that.codes.one) == 'undefined') {
            $('#code-tip').html('温馨提示：激活"奈"字和"儿"字即可领取奖品')
          } else {
            $('#code-tip').html('温馨提示：您已经激活"儿"字，再激活"奈"字即可领取奖品"')
          }
        }
      })

    })

    $('#bt').on('click', function () {
      if (that.codes.one && that.codes.two) {
        window.location.href = '/info?oneCode=' + that.codes.one + '&twoCode=' + that.codes.two
      } else {
        that.tip('请激活"奈"字和"儿"字')
      }
    })

  }


  var iObj = new index()
  iObj.handleCodeClick()
})