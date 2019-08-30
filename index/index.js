var dataList = [];

for (var i = 0; i < 8; i++) {
  dataList.push({
    "lockGroupId": i,
    "lockGroupSort": i,
    "lockGroupName": "g_" + i
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 60,
    height: 50,
    dataList: [


    ],
    isLongPress: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refresh();
  },

  touchstart: function (e) {
    var self = this;

    console.log("touchstart e=>", e);

    let startY = e.changedTouches[0].clientY;
    let activeIndex = e.currentTarget.dataset.index || 0;

    self.setData({
      startY: startY,
      activeIndex: activeIndex
    });


  },
  touchmove: function (e) {
    var self = this;

    // console.log("touchmove e=>", e)


  },
  touchend: function (e) {
    var self = this;

    console.log("touchend e=>", e);

    if (!self.data.isLongPress) {

      return
    }

    var dataList = this.data.dataList;

    var moveY = e.changedTouches[0].clientY - self.data.startY;

    var activeIndex = e.currentTarget.dataset.item.index || 0;


    var dragNumber = Math.round(moveY / this.data.height);

    var moveUnit = 0;

    if (dragNumber + activeIndex >= dataList.length - 1) {
      moveUnit = (dataList.length - 1) - activeIndex
    } else if (dragNumber + activeIndex < 0) {
      moveUnit = -activeIndex
    } else {
      moveUnit = dragNumber
    }

    let spareIndex = parseInt(activeIndex) + parseInt(moveUnit);

    const activeEle = dataList.findIndex((item, index) => {
      return item.index == activeIndex
    })

    console.log("activeEle=>", activeEle)
    console.log("spareIndex=>", spareIndex)

    const spareEle = dataList.findIndex((item, index) => {
      return item.index == spareIndex
    });


    // return
    const temIndex = dataList[activeEle].index
    dataList[activeEle].index = dataList[spareEle].index
    dataList[spareEle].index = temIndex

    const temY = dataList[activeEle].y
    dataList[activeEle].y = dataList[spareEle].y
    dataList[spareEle].y = temY


    // this.setData({
    //   dataList: dataList
    // })


    var setObj = {
      dataList: dataList
    }

    if (self.data.isLongPress) {
      // self.setData({
      //   isLongPress: false
      // })
      setObj.isLongPress = false;
    }

    self.setData(setObj)

  },
  longpress: function (e) {

    var self = this;

    console.log("longpress e=>", e);

    if (!self.data.isLongPress) {
      self.setData({
        isLongPress: true
      })
    }


  },
  refresh() {
    var self = this;
    let newRows = dataList.map((item, index) => {
      return {
        y: index * self.data.y,
        lockGroupName: item.lockGroupName,
        index: index
      }
    })

    // wx.createSelectorQuery().select('.m-list').boundingClientRect(function (rects) {
    //   // rects.forEach(function (rect) {
    //   //   rect.id      // 节点的ID
    //   //   rect.dataset // 节点的dataset
    //   //   rect.left    // 节点的左边界坐标
    //   //   rect.right   // 节点的右边界坐标
    //   //   rect.top     // 节点的上边界坐标
    //   //   rect.bottom  // 节点的下边界坐标
    //   //   rect.width   // 节点的宽度
    //   //   rect.height  // 节点的高度
    //   // })

    //   self.setData({
    //     height: rect.height,
    //     movableViewHeight: dataList.length * this.data.height
    //   })

    // }).exec()

    self.setData({

      movableViewHeight: newRows.length * self.data.y,
      // dataList: dataList,
    })

    setTimeout(() => {

      self.setData({

        // movableViewHeight: dataList.length * self.data.y,
        dataList: newRows,
      })
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})