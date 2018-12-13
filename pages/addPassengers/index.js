import { $wuxToptips } from '../../dist/wux/index'

Page({
  data: {

  },
  onLoad: function () {

  },
  onShow() {
    wx.setNavigationBarTitle({
      title: '填写乘客资料'
    })
  },
  revisePassengers() {

  },
  showToptips() {
    $wuxToptips().success({
      hidden: false,
      text: 'Toptips Title',
      duration: 30000,
      success() { },
    })
  },
  onCancel() {
    wx.navigateBack({
      delta: 1
    })
  }
})