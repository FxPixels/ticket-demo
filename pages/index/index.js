//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indexStatus: '1',
    title: [{
      key: '0',
      name: '购票',
      icon: 'md-bus'
    }, {
      key: '1',
      name: '我的',
      icon: 'md-person'
    }],
    imgUrls: [
      'http://pic.fxpixels.site/ticket_bg_2.jpg?v=1.2'
    ],
    spinning: false,
    show: false,
    popupType: 0,
    address: ['海珠校区','白云校区'],
    value: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  onShow() {
    wx.setNavigationBarTitle({
      title: this.data.title[0].name
    })

  },
  onTabChange(e) {
    console.log(e)
    let index = e.detail.key
    this.setData({
      indexStatus: index
    })

    wx.setNavigationBarTitle({
      title: this.data.title[Number(index)].name
    })
  },
  onSearchBus() {
    // this.setData({
    //   spinning: !this.data.spinning,
    // })
    wx.navigateTo({
      url: '/pages/ticketList/index'
    })
  },
  onSelectAddress(){
    this.setData({
      popupType: 0,
      show: !this.data.show,
    })
  },
  openCalendar() {
    this.setData({
      popupType: 1,
      show: !this.data.show,
    })
  },
  onPopupClose(){
    this.setData({
      show: !this.data.show,
    })
  },
  dataClick(e){
    console.log(e.detail)
    this.onPopupClose()
  }
})
