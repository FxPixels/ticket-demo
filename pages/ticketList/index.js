Page({
  data: {
   
  },
  onLoad: function () {

  },
  onShow() {
    wx.setNavigationBarTitle({
      title: '班次列表'
    })

  },
  goToOrderSettlement(){
    wx.navigateTo({
      url: '/pages/orderSettlement/index'
    })
  }
})
