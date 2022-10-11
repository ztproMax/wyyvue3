// 首页的数据请求
import service from '../../request/index'
// 获取首页轮播图数据
export function getBanner() {
  return service({
    method: "GET",
    url: "/banner?type=2",
  })
}
// 获取发现好歌单数据
export function getMusicList() {
  return service({
    method: "GET",
    url: "/personalized?limit=10"

  })
}
// 获取搜索返回数据
export function getSearchMusic(data) {
  return service({
    method: "GET",
    url: `/search?keywords=${data}`
  })
}
// 获取登陆数据
export function getPhoneLogin(data) {
  return service({
    method: "GET",
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}
// 获取用户详情
export function getUser(data) {
  return service({
    method: "GET",
    url: `/user/detail?uid=${data}`
  })
}
