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
    $stopWuxRefresher()
  },
  onLoadmore(){
      $stopWuxLoader(true)
  }
})