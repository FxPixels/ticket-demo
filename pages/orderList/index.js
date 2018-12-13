import { $stopWuxRefresher, $stopWuxLoader } from '../../dist/wux/index'


Page({
  data: {
    active: 0
  },
  onLoad: function () {

  },
  onShow() {
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
  },
  onTabsChange(e){
    console.log(e.detail)
    this.setData({
      active: e.detail.index
    })
  },
  onRefresh(){
    console.log('刷新')
    $stopWuxRefresher()
  },
  onLoadmore(){
    console.log('加载')
      $stopWuxLoader(true)
  }
})