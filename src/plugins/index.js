// 对vant组件库进行集中管理
import { Swipe, SwipeItem, Popup  } from 'vant';
// 放入数组中
let plugins = [Swipe, SwipeItem, Popup ]

export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}