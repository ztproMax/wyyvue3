import { getPhoneLogin } from '@/request/api/home';
import { getMusicLyric } from '@/request/api/item';
import { createStore } from 'vuex'
export default createStore({
  state: {
    playList: [{
      // 底部播放列表默认数据
      al: {
        id: 86043909,
        name: "Blind faith",
        pic: 109951164748120900,
        picUrl: "https://p2.music.126.net/zRR00_u7IY2h52YxiTXdKA==/109951164748120892.jpg",
        pic_str: "109951164748120892"
      },
      id: 1426572175,
      ar: [{
        name: "zt"
      }],
      name: "Blind faith",
    }],
    // 播放列表下标，用来切换歌曲
    playListIndex: 0,
    // 暂停按钮的显示
    isbtnShow: true,
    // 歌曲详情页的展示
    detailShow: false,
    // 歌词
    lyricList: {},
    // 歌词播放当前时间
    currentTime: 0,
    // 歌曲总时长
    duration: 0,
    // 是否登录
    isLogin: false,
    // 是否显示底部组件
    isFooterMusic: true,
    token: "",
    // 用户信息数据
    user: {},
  },
  getters: {
  },
  mutations: {
    // 改变播放按钮的图标显示
    updataIsbtnShow: function(state, value) {
      state.isbtnShow = value
    },
    // 在搜索页面将歌曲添加到下面组件中
    pushPlayList: function(state, value){
      state.playList.push(value)
    },
    // 歌单切换
    updataPlayList: function(state, value) {
      state.playList = value
      console.log(state.playList);
    },
    // 歌单里面歌曲的切换
    updataPlayListIndex: function(state, value) {
      state.playListIndex = value
    },
    // 歌曲详情页的显示与隐藏
    updataDetailShow: function(state) {
      state.detailShow = !state.detailShow
    },
    updataLyricList: function(state, value) {
      state.lyricList = value
    },
    updataCurrentTime: function(state, value) {
      // console.log(state.currentTime);
      state.currentTime = value
    },
    updataDuration: function(state, value) {
      state.duration = value
    },
    // 登录成功改变isLogin的值
    updataIsLogin: function(state, value) {
      state.isLogin = true
    },
    updataToken: function(state, value) {
      state.token = value
      // 触发这个函数就将token保存到localStorage
      localStorage.setItem('token',state.token)
    },
    updataUserDetail: function(state, value) {
      state.user = value
      // localStorage.setItem('user',state.user)
    }
  },
  actions: {
    // 将获取歌词的方法保存在veux中
    getLyric: async function(context, value) {
      let res = await getMusicLyric(value)
      console.log(res);
      context.commit("updataLyricList", res.data.lrc)
    },
    // 登录
    getLogin:async function(context,value) {
      let res = await getPhoneLogin(value)
      console.log(res);
      return res
    }
  },
  modules: {
  }
})
