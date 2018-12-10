//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indexStatus: '0',
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
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
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
    this.setData({
      spinning: !this.data.spinning,
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
  }
})
