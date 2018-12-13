
Page({
  data: {
    
  },
  onLoad: function () {

  },
  onShow() {
    wx.setNavigationBarTitle({
      title: '常用乘客'
    })
  },
  revisePassengers(){

  },
  deletePassengers(){

  },
  goToAddPassengers(){
    wx.navigateTo({
      url: '/pages/addPassengers/index'
    })
  }
})