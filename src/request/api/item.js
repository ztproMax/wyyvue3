// 获取歌单详情页的数据
import service from "../../request/index"
export function getMusicItemList(data) {
  return service({
    method: "GET",
    url: `/playlist/detail?id=${data}`
  })
}
// 获取歌单所有歌曲
export function getItemList(data) {
  return service({
    method: "GET",
    url: `/playlist/track/all?id=${data}&limit=20&offset=0`
  })
}
// 获取歌词数据
export function getMusicLyric(data) {
  return service({
    method: "GET",
    url: `/lyric?id=${data}`
  })
}