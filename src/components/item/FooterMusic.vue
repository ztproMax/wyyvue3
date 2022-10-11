<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updataDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div>
        <p>{{playList[playListIndex].name}}</p>
        <span>横划切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%', width:'100%',}">
      <!-- 歌曲详情页 父组件传值 -->
      <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"></MusicDetail>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex'
import MusicDetail from './MusicDetail.vue';
export default {
  data() {
    return {
      interVal: 0
    }
  },
  components: {
    MusicDetail
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow'])
  },
  mounted() {
    console.log(this.$refs)
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
    // this.updataTime()
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
    this.addDuration()
  },
  methods: {
    play: function() {
      // 判断音乐是否播放
      if(this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updataIsbtnShow(false)
        // 播放调用函数传值
        this.updataTime()
      }else {
        this.$refs.audio.pause()
        this.updataIsbtnShow(true)
        // 暂停就清除定时器
        clearInterval(this.interVal)
      }
      
    },
    addDuration: function() {
      this.updataDuration(this.$refs.audio.duration)
    },
    updataTime: function() {
      this.interVal = setInterval(() => {
        this.updataCurrentTime(this.$refs.audio.currentTime)
      },10)
    },
    // 对 改变播放按钮的图标显示 方法进行解构
    ...mapMutations(['updataIsbtnShow', 'updataDetailShow', 'updataCurrentTime', 'updataDuration'])
  },
  watch: {
    // 监听歌曲下标，如果改变就自动播放
    playListIndex: function() {
      this.$refs.audio.autoplay = true
      // 更改图标
      if(this.$refs.audio.paused) {
        this.updataIsbtnShow(false)
      }
      
    },
    playList: function() {
      if(this.isbtnShow) {
        this.$refs.audio.autoplay = true
        this.updataIsbtnShow(false)
      }
    }
  }
}

</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: .02rem solid #999;
  display: flex;
  padding: .2rem;
  justify-content: space-between;
  .footerLeft {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        width: .6rem;
        height: .6rem;
      }
    }
}
</style>