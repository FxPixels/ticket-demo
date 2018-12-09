//index.js
//获取应用实例
const app = getApp()
import { $stopWuxRefresher,$stopWuxLoader,$wuxLoaderEnd } from '../../dist/wux/index'

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indexStatus: '0',
    title: [{
      key: '0',
      name: '推荐',
      icon: ''
    }, {
      key: '1',
      name: '我的',
      icon: ''
    }]
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

})
