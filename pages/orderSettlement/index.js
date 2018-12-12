
Page({
  data: {
    visible: false
  },
  onLoad: function () {

  },
  onShow() {
    wx.setNavigationBarTitle({
      title: '填写订单'
    })

  },
  showIntro(){
    this.setData({
      visible: true
    })
  },
  onClose(){
    this.setData({
      visible: false
    })
  }
})