<template>
  <div class="infoTop">
    <img :src="user.data.profile.avatarUrl" alt="" class="pic">
    <div class="infoname">{{user.data.profile.nickname}}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style lang="less" scoped>
.infoTop{
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  .pic {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  }
  .infoname {
    font-weight: 600;
    font-size: .4rem;
  }
}
</style>