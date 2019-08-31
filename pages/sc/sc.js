// pages/sc/sc.js
var app=getApp();
Page({

  data: {
    result: "",                 // 结果文本
    resimg:"",                  //结果图片地址
    resulttop: "请上传车辆照片",
    img_url: "",                //上传图片地址
    isLoading: false,           //判断正在上传的中间变量
    result_status: 'none',
    picture: 'https://lamaric.goho.co/media/icon/upload_bg.png',    //初始显示图片（可改）
    buttonLoad: "查看结果",

    // 以下数据含义同上，只用来显示四角照
    isLoading1: false,
    result_status1: 'none',
    img_url1: "",
    picture1: 'https://lamaric.goho.co/media/icon/icon_lefttop.png',

    isLoading2: false,
    result_status2: 'none',
    img_ur2: "",
    picture2: 'https://lamaric.goho.co/media/icon/icon_righttop.png',

    isLoading3: false,
    result_status3: 'none',
    img_url3: "",
    picture3: 'https://lamaric.goho.co/media/icon/icon_leftbottom.png',

    isLoading4: false,
    result_status4: 'none',
    img_url4: "",
    picture4: 'https://lamaric.goho.co/media/icon/icon_rightbottom.png',
  },

  // 上传图片函数
  upload: function(e) {
    console.log("upload")
    let that = this
    wx.chooseImage({
      success: function(res) {
        let tmpFile = res.tempFilePaths[0]
        that.setData({
          img_url: tmpFile
        })
        that.setData({
          isLoading: true
        })
        wx.showToast({
          title: '加载中...',
          mask: true,
          icon: 'loading',
          duration: 10000
        }),
        wx.uploadFile({
          url: 'https://lamaric.goho.co/upload/', //app.ai_api.File.file
          filePath: tmpFile, //文件路径  这里是img文件
          name: 'file', //与后端适配，一般别动
          formData: {
            method: 'POST' //请求方式
          },
          success(res) {
            if (res.statusCode == 200) {
              var data = JSON.parse(res.data);
              console.log('OK')
              wx.showToast({
                title: '上传成功！',
              })
              that.setData({
                isLoading: false
              })
              // let data = JSON.parse(data.result)
              console.log(data)
              // 以下赋值
              that.setData({
                result: data.result,
                resimg: data.combine_url
              })
              if (data.result===null){
                var by=[{"part":"未检测到","type":"--","price":0}]
                getApp().globalData.resultfinally = by,
                getApp().globalData.resultimg = data.combine_url
              }else{
                getApp().globalData.resultfinally = data.result,
                getApp().globalData.resultimg = data.combine_url
              }
              that.setData({
                result_status: 'inline'
              })
              that.tapToRes()
            } else {
              console.log('上传失败')
              wx.showToast({
                title: '上传失败！',
                icon: 'none'
              })
            }
          }
        })

      },
    })
  },

  // 选择图片显示函数（不上传，用于四角照）
  upload1: function(e) {
    console.log("upload")
    let that = this
    wx.chooseImage({
      success: function(res) {
        // console.log(res)
        let tmpFile = res.tempFilePaths[0]
        that.setData({
          img_url1: tmpFile
        })
        that.setData({
          isLoading1: true
        })
      },
    })
  },
// 选择图片显示函数（不上传，用于四角照）
  upload2: function (e) {
    console.log("upload")
    let that = this
    wx.chooseImage({
      success: function (res) {
        // console.log(res)
        let tmpFile = res.tempFilePaths[0]
        that.setData({
          img_url2: tmpFile
        })
        that.setData({
          isLoading2: true
        })

      },
    })
  },
// 选择图片显示函数（不上传，用于四角照）
  upload3: function (e) {
    console.log("upload")
    let that = this
    wx.chooseImage({
      success: function (res) {
        // console.log(res)
        let tmpFile = res.tempFilePaths[0]
        that.setData({
          img_url3: tmpFile
        })
        that.setData({
          isLoading3: true
        })

      },
    })
  },
// 选择图片显示函数（不上传，用于四角照）
  upload4: function (e) {
    console.log("upload")
    let that = this
    wx.chooseImage({
      success: function (res) {
        // console.log(res)
        let tmpFile = res.tempFilePaths[0]
        that.setData({
          img_url4: tmpFile
        })
        that.setData({
          isLoading4: true
        })
      },
    })
  },
  // 页面跳转函数
  // 跳转结果界面
  tapToRes: function(e){
    wx.navigateTo({
      url: '../result/result',
    })
  },
// 跳转函数
  // 跳转到main界面(只能用switchTab)
  taptomain: function (e) {
    wx:wx.switchTab({
      url: '../main/main',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})