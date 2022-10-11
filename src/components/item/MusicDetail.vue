<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg">
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <!-- 跑马灯 -->
        <Vue3Marquee style="color: #999">
          {{musicList.al.name}}
        </Vue3Marquee>
        <span v-for="item in musicList.ar" :key="item">{{item.name}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" alt="" class="img-needle" :class="{'img-needle-active':!isbtnShow}"/>
    <img src="@/assets/cd.png" alt="" class="img-cd"/>
    <img :src="musicList.al.picUrl" alt="" class="img-ar" @click="isLyricShow = true" :class="{'img-ar-active':!isbtnShow, 'img-ar-stop':isbtnShow}"/>
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p v-for="item in lyric" :key="item" :class="{active:(currentTime * 1000 >=item.time && currentTime * 1000 < item.pre)}">
      {{item.lrc}}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinle"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-repeatOnce2"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-if="isbtnShow" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenlei"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      isLyricShow: false
    }
  },
  computed: {
    ...mapState(["lyricList", "currentTime", "playListIndex", "playList", "duration"]),
    // 对歌词的处理
    lyric: function () {
      let arr;
      if(this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i) => {
          let min = item.slice(1,3)
          let sec = item.slice(4,6)
          let mill = item.slice(7,10)
          let lrc = item.slice(11,item.length)
          let time  = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill) 
          if(isNaN(Number(mill))) {
            mill = item.slice(7,9)
            lrc = item.slice(10,item.length) 
            let time  = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill)
          }
          return {min, sec, mill, lrc, time}
        })
        arr.forEach((item,i) => {
          if(i === arr.length-1) {
            item.pre = 0
          }else {
            item.pre = arr[i+1].time
          }
        })
      }
      return arr
    }
  },
  components: {
    Vue3Marquee
  },
  mounted() {
    // console.log(this.musicList);
    // console.log(this.lyricList.lyric);
    this.addDuration()
  },
  // 接收父组件FooterMusic的传值
  props: ['musicList', 'play', 'isbtnShow', 'addDuration'],
  methods: {
    backHome: function() {
      this.isLyricShow = false
      this.updataDetailShow()
    },
    // 上下首切换
    goPlay: function(num) {
      let index = this.playListIndex + num
      if(index < 0) {
        index = this.playList.length - 1
      }else if(index == this.playList.length) {
        index = 0
      }
      this.updataPlayListIndex(index)
    },
    ...mapMutations(['updataDetailShow', 'updataPlayListIndex'])
  },
  watch: {
    currentTime:function(newValue) {
      let p = document.querySelector("p.active")
      if(p && p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTop = p.offsetTop -300
      }
      if(newValue === this.duration) {
        if(this.playListIndex === this.playList.length - 1) {
          this.updataPlayListIndex(0)
          this.play()
        }else {
          this.updataPlayListIndex(this.playListIndex)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(20px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: .2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    font-size: .3rem;
    .leftMarquee {
      width: 2.4rem;
      height: 100%;
      margin-left: .4rem;
      span {
        color: #999;
        font-size: .24rem;
      }
      .icon {
        width: .3rem;
        height: .3rem;
        fill: #999;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img-needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-14deg);
    transition: all 2s;
  }
  .img-needle-active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img-cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img-ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    // 将动画添加到图片上
    animation: rotate-ar 16s linear infinite;
  }
  .img-ar-active {
    // 控制动画启动
    animation-play-state: running;
  }
  .img-ar-stop {
    // 控制动画暂停
    animation-play-state: paused;
  }
  // 中间图片旋转动画
  @keyframes rotate-ar {
    0% {
      transfrom: rotateZ(0deg)
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .8rem;
  overflow: scroll;
  scroll-behavior: smooth;
  p {
    color: rgb(175, 168, 168);
    margin-bottom: .4rem;
  }
  .active {
    color: aqua;
    font-size: .36rem;
  }
}

.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>