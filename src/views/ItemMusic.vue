<template>
  <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
  <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
</template>
<script>
// 引入useRouter可以从这个方法里面获取到路由的参数及一些数据
import {useRouter} from 'vue-router'
import { onMounted, reactive } from 'vue';
import { getMusicItemList ,getItemList} from '@/request/api/item.js';
import ItemMusicTop from '@/components/item/ItemMusicTop.vue';
import ItemMusicList from '@/components/item/ItemMusicList.vue';
export default {
  components: {
    ItemMusicTop,
    ItemMusicList
  },
  setup() {
    const state = reactive({
      // 歌单详情页数据
      playlist: {},
      // 歌曲列表
      itemList: []
    })
    onMounted(async() => {
      let id = useRouter().currentRoute.value.query.id
      console.log(id)
      // 获取歌单详情页
      let res = await getMusicItemList(id)
      console.log(res)
      state.playlist = res.data.playlist
      // 获取歌单歌曲列表
      let result = await getItemList(id)
      console.log(result)
      state.itemList = result.data.songs
    })
    return {state}
  }
}
</script>
<style lang="less" scoped>

</style>