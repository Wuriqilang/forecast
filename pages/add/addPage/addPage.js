// pages/add/addPage/addPage.js
const app = getApp();
//调用日期组件
import utils from '../../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    date: '',
    Nashuirenmingcheng: '',
    total1: 0,
    total11: 0,
    total12: 0,
    total13: 0,
    total14: 0,
    total2: 0,
    total3: 0,
    Guoneizengzhishui: 0,
    Qizhongmianditiaozengzengzhishui: 0,
    Guoneixiaofeishui: 0,
    Qiyesuodeshui: 0,
    Gerensuodeshui: 0,
    Ziyuanshui: 0,
    Chengzhentudishiyongshui: 0,
    Chengshiweihujiansheshui: 0,
    Yinhuashui: 0,
    Tudizengzhishui: 0,
    Fangchanshui: 0,
    Chechuanshui: 0,
    Chelianggouzhishui: 0,
    Yanyeshui: 0,
    Gengdizhanyongshui: 0,
    Qishui: 0,
    Huanjingbaohushui: 0,
    Qitashuishou: 0,
    //==========================
    Jiaoyufeifujiashouru: 0,
    Difangjiaoyufujia: 0,
    Wenhuashiyejianshefeishouru: 0,
    Shuiwubumenfamoshouru: 0,
    Canjirenjiuyebaozhangjinshouru: 0,
    Difangshuilijianshejijin: 0,
    Feiqidianqidianzichanpinchulijijinshouru: 0,
    Dazhongxingshuikuyiminhouqifuchijijinshouru: 0,
    Kezaishengnengyuanfazhanjijin: 0,
    Lushangshiyoukuangqushiyongfeishouru: 0,
    Meitanjiagetiaojiejijin: 0,
    Qita: 0,
    //===================//
    Gonghuijingfeishouru: 0,
    Zhiyenianjin: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //==========初始化==================
    //日期初始化
    console.log(options);
    this.setData({
      id:options.id,
      date: options.date,
      Nashuirenmingcheng: options.Nashuirenmingcheng
    })
  },

  //方法组
  DateChange(e) {
    this.setData({
      date: e.detail.value,
      year: e.detail.value.substring(0, 4),
      month: e.detail.value.substr(5, 2)
    })
  },
  TotalCount() {
    var count11 = Number(this.data.Guoneizengzhishui) + Number(this.data.Guoneixiaofeishui) + Number(this.data.Qiyesuodeshui) + Number(this.data.Gerensuodeshui) + Number(this.data.Ziyuanshui) + Number(this.data.Chengzhentudishiyongshui) + Number(this.data.Chengshiweihujiansheshui) + Number(this.data.Yinhuashui) + Number(this.data.Tudizengzhishui) + Number(this.data.Fangchanshui) + Number(this.data.Chechuanshui) + Number(this.data.Chelianggouzhishui) + Number(this.data.Yanyeshui) + Number(this.data.Gengdizhanyongshui) + Number(this.data.Qishui) + Number(this.data.Huanjingbaohushui) + Number(this.data.Qitashuishou);
    var count13 = Number(this.data.Jiaoyufeifujiashouru) + Number(this.data.Wenhuashiyejianshefeishouru) + Number(this.data.Shuiwubumenfamoshouru) + Number(this.data.Canjirenjiuyebaozhangjinshouru) + Number(this.data.Difangjiaoyufujia) + Number(this.data.Feiqidianqidianzichanpinchulijijinshouru) + Number(this.data.Dazhongxingshuikuyiminhouqifuchijijinshouru) + Number(this.data.Kezaishengnengyuanfazhanjijin) + Number(this.data.Lushangshiyoukuangqushiyongfeishouru) + Number(this.data.Meitanjiagetiaojiejijin) + Number(this.data.Qita);
    var count14 = Number(this.data.Gonghuijingfeishouru) + Number(this.data.Zhiyenianjin);
    var count1 = count11 + Number(this.data.total12) + count13 + count14;
    this.setData({
      total11: count11,
      total13: count13,
      total14: count14,
      total1: count1
    })
  },
  //每一个input绑定一个事件，小程序不支持dom操作
  GuoneizengzhishuiInput(e) {
    this.setData({
      Guoneizengzhishui: e.detail.value
    })
    this.TotalCount();
  },
  QizhongmianditiaozengzengzhishuiInput(e) {
    this.setData({
      Qizhongmianditiaozengzengzhishui: e.detail.value
    })
    this.TotalCount();
  },
  GuoneixiaofeishuiInput(e) {
    this.setData({
      Guoneixiaofeishui: e.detail.value
    })
    this.TotalCount();
  },
  QiyesuodeshuiInput(e) {
    this.setData({
      Qiyesuodeshui: e.detail.value
    })
    this.TotalCount();
  },
  GerensuodeshuiInput(e) {
    this.setData({
      Gerensuodeshui: e.detail.value
    })
    this.TotalCount();
  },
  ZiyuanshuiInput(e) {
    this.setData({
      Ziyuanshui: e.detail.value
    })
    this.TotalCount();
  },
  ChengzhentudishiyongshuiInput(e) {
    this.setData({
      Chengzhentudishiyongshui: e.detail.value
    })
    this.TotalCount();
  },
  ChengshiweihujiansheshuiInput(e) {
    this.setData({
      Chengshiweihujiansheshui: e.detail.value
    })
    this.TotalCount();
  },
  YinhuashuiInput(e) {
    this.setData({
      Yinhuashui: e.detail.value
    })
    this.TotalCount();
  },
  TudizengzhishuiInput(e) {
    this.setData({
      Tudizengzhishui: e.detail.value
    })
    this.TotalCount();
  },
  FangchanshuiInput(e) {
    this.setData({
      Fangchanshui: e.detail.value
    })
    this.TotalCount();
  },
  ChechuanshuiInput(e) {
    this.setData({
      Chechuanshui: e.detail.value
    })
    this.TotalCount();
  },
  ChelianggouzhishuiInput(e) {
    this.setData({
      Chelianggouzhishui: e.detail.value
    })
    this.TotalCount();
  },
  YanyeshuiInput(e) {
    this.setData({
      Yanyeshui: e.detail.value
    })
    this.TotalCount();
  },
  GengdizhanyongshuiInput(e) {
    this.setData({
      Gengdizhanyongshui: e.detail.value
    })
    this.TotalCount();
  },
  QishuiInput(e) {
    this.setData({
      Qishui: e.detail.value
    })
    this.TotalCount();
  },
  HuanjingbaohushuiInput(e) {
    this.setData({
      Huanjingbaohushui: e.detail.value
    })
    this.TotalCount();
  },
  QitashuishouInput(e) {
    this.setData({
      Qitashuishou: e.detail.value
    })
    this.TotalCount();
  },
  //===================//
  JiaoyufeifujiashouruInput(e) {
    this.setData({
      Jiaoyufeifujiashouru: e.detail.value
    })
    this.TotalCount();
  },
  DifangjiaoyufujiaInput(e) {
    this.setData({
      Difangjiaoyufujia: e.detail.value
    })
    this.TotalCount();
  },
  WenhuashiyejianshefeishouruInput(e) {
    this.setData({
      Wenhuashiyejianshefeishouru: e.detail.value
    })
    this.TotalCount();
  },
  ShuiwubumenfamoshouruInput(e) {
    this.setData({
      Shuiwubumenfamoshouru: e.detail.value
    })
    this.TotalCount();
  },
  CanjirenjiuyebaozhangjinshouruInput(e) {
    this.setData({
      Canjirenjiuyebaozhangjinshouru: e.detail.value
    })
    this.TotalCount();
  },
  DifangshuilijianshejijinInput(e) {
    this.setData({
      Difangshuilijianshejijin: e.detail.value
    })
    this.TotalCount();
  },
  FeiqidianqidianzichanpinchulijijinshouruInput(e) {
    this.setData({
      Feiqidianqidianzichanpinchulijijinshouru: e.detail.value
    })
    this.TotalCount();
  },
  DazhongxingshuikuyiminhouqifuchijijinshouruInput(e) {
    this.setData({
      Dazhongxingshuikuyiminhouqifuchijijinshouru: e.detail.value
    })
    this.TotalCount();
  },
  KezaishengnengyuanfazhanjijinInput(e) {
    this.setData({
      Kezaishengnengyuanfazhanjijin: e.detail.value
    })
    this.TotalCount();
  },
  LushangshiyoukuangqushiyongfeishouruInput(e) {
    this.setData({
      Lushangshiyoukuangqushiyongfeishouru: e.detail.value
    })
    this.TotalCount();
  },
  MeitanjiagetiaojiejijinInput(e) {
    this.setData({
      Meitanjiagetiaojiejijin: e.detail.value
    })
    this.TotalCount();
  },
  QitaInput(e) {
    this.setData({
      Qita: e.detail.value
    })
    this.TotalCount();
  },
  //============
  GonghuijingfeishouruInput(e) {
    this.setData({
      Gonghuijingfeishouru: e.detail.value
    })
    this.TotalCount();
  },
  ZhiyenianjinInput(e) {
    this.setData({
      Zhiyenianjin: e.detail.value
    })
    this.TotalCount();
  },
  //===========几个total的数据
  ShehuibaoxianfeishouruhejiInput(e) {
    this.setData({
      total12: e.detail.value
    })
    this.TotalCount();
  },
  ChukoutuishuiInput(e) {
    this.setData({
      total2: e.detail.value
    })
  },
  HaiguandaizhengInput(e) {
    this.setData({
      total3: e.detail.value
    })
  },


  formBindSubmit(e) {
    console.log(e);
    var that = this;
    setTimeout(function() {
      wx.request({
        method: 'POST',
        url: app.globalData.BaseURL + 'forecastSubmit', //接口地址
        data: {
          'id':that.data.id,
          'date':that.data.date,
          'Nashuirenmingcheng':that.data.Nashuirenmingcheng,
          'detail':e.detail.value
        },
        header: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${app.globalData.token}`
        },
        success: function(res) {
          console.log(res);
          if (res.statusCode == 200) {
            wx.showToast({
              title: res.data.code,
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '失败，本月已有数据！',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function(res) {
          console.log('Error' + ':' + res)
        }
      })
    }, 1000);
  },
})