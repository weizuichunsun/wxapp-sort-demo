
var dataList = [];
for (var i = 0; i < 5; i++) {
  dataList.push({
    "lockGroupId": i,
    "lockGroupSort": i,
    "lockGroupName": "g_" + i
  })
}

var y, y1, y2;



Page({

  /**
   * 页面的初始数据
   */
  data: {
    fIndex: -1,
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
  pageTo: function () {
    console.log("pageTo")
  },
  touchstart: function (e) {
    var self = this;

    console.log("touchstart e=>", e);

    // var tart_clientY , start_offsetTop;

    y = e.touches[0].clientY
    y1 = e.currentTarget.offsetTop;


    var activeIndex = e.currentTarget.dataset.item.index || 0;


    self.setData({
      activeIndex: activeIndex,
    });


  },
  touchmove: function (e) {

    var self = this;

    if (!self.data.isLongPress) {
      return
    }
    // console.log("touchmove e=>", e)

    y2 = e.touches[0].clientY - y + y1;


    var item = e.currentTarget.dataset.item || {};
    var activeIndex = item.index || 0;


    var indexItems = `dataList[${activeIndex}].y`;

    self.setData({
      [indexItems]: y2
    })


  },

  touchend: function (e) {

    var self = this;

    console.log("touchend e=>", e);

    if (!self.data.isLongPress) {
      return
    }



    let endTop = e.currentTarget.offsetTop;
    let arrRows = self.data.dataList || [];

    function getListIndex(endTop, dataList) {
      var arr = [];

      dataList.forEach((item, index, array) => {
        var obj = {
          index: index,
          number: Math.abs(index * self.data.y - endTop)
        }
        arr.push(obj);
      })

      arr.sort((a, b) => {
        return a.number - b.number;
      });

      console.log("touchend arr=>", arr);
      var retIndex = arr[0].index
      if (!arr.length) {
        retIndex = activeIndex;
      }
      return retIndex;
    }


    let index = parseInt(getListIndex(endTop, arrRows));


    var item = e.currentTarget.dataset.item || {};

    var activeIndex = item.index || 0;

    var activeItems = `dataList[${activeIndex}].y`;

    console.log("touchend index=>", index);
    console.log("touchend activeIndex=>", activeIndex);
    console.log("touchend activeIndex * self.data.y=>", activeIndex * self.data.y);

    console.log("touchend arrRows=>", arrRows)
    console.log("touchend y1=>", y1)


    // arrRows.sort((a, b) => {
    //   return a.y - b.y;
    // })

    // console.log("arrRows=>", (arrRows));
    var fIndex = -1;
    arrRows.find((item, idx) => {
      // console.log("idx * self.data.y=>", idx * self.data.y)
      if (item.y == index * self.data.y && idx != activeIndex) {
        // console.log("idx * self.data.y=>", idx * self.data.y, item)
        fIndex = idx;
        return;
      }
    });

    console.log("fIndex===>", fIndex)
    var fItems = `dataList[${fIndex}].y`;

    if (fIndex == -1) {
      self.setData({
        [activeItems]: index * self.data.y,
        isLongPress: false

        // [fItems]: y1
      })
    } else {
      self.setData({
        [activeItems]: index * self.data.y,
        [fItems]: y1,
        fIndex: fIndex,
        isLongPress: false
      })
    }
  },
  longpress: function (e) {

    var self = this;

    console.log("longpress e=>", e);

    let item = e.currentTarget.dataset.item || {};

    if (!self.data.isLongPress) {
      self.setData({
        isLongPress: true,
        dragItem: item
      })
    }


  },
  submit: function () {

    var self = this;

    var dataList = self.data.dataList || [];

    console.log("dataList=>", dataList);


    var arrRows = []
    Object.assign(arrRows, dataList)


    arrRows.sort((a, b) => {
      return a.y - b.y;
    })
    console.log("arrRows=>", arrRows);


    return;

    // 需要修改 dataList 值的话，记得修改 dataList 下的 index 重新排序,如下，但是只取值（arrRows），dataList 不需要重新赋值

    dataList.map((item, index) => {
      item.index = index;
    })

    self.setData({
      dataList: dataList
    })

  },
  refresh() {
    var self = this;
    let newRows = dataList.map((item, index) => {
      return {
        y: index * self.data.y,
        // top: index * self.data.y,
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

    // self.setData({

    //   movableViewHeight: newRows.length * self.data.y,
    //   // dataList: dataList,
    // })

    // setTimeout(() => {

    self.setData({
      // movableViewHeight: dataList.length * self.data.y,
      dataList: newRows,
    })
    // }, 1500)
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