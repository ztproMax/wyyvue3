<template>
  <div class="content">
    <div class="login-content">
      <a href="" class="banner-box"></a>
      <div class="login-box">
        <h1>账号登录</h1>
        <input type="text" placeholder="请输入手机号" v-model="phone">
        <input type="text" placeholder="请输入密码" v-model="password">
        <button @click="Login">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import {getUser} from '@/request/api/home'

export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    Login:async function() {
      let res = await this.$store.dispatch('getLogin', {phone:this.phone,password:this.password})
      console.log(res);
      if(res.data.code == 200) {
        this.$store.commit('updataIsLogin', true)
        this.$store.commit('updataToken', res.data.token)
        // 获取返回的个人信息
        let result = await getUser(res.data.account.id)
        console.log(result);
        this.$store.commit('updataUserDetail', result)
        // 如果返回的code是200就跳转到个人中心
        this.$router.push('/infoUser')
      }else {
        alert("手机号码/密码错误")
        this.password = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.content {
  width: 100vw;
  height: 100vh;
  // background-color: aqua;
  display: flex;
  background: url(@/assets/R-C.jpg) no-repeat;
  justify-content: center;
  align-items: center;
  .login-content {
    width: 800px;
    height: 360px;
    background-color: rgb(61, 37, 57);
    border-radius: 30px;
    padding: 30px;
    position: relative;
    .banner-box {
      display: inline-block;
      width: 500px;
      height: 100%;
      // background-color: rgb(0, 92, 92);
      background: url(@/assets/R-C.jpg) no-repeat;
      background-size: cover;
      border-radius: 20px 0 0 20px;
    }
    .login-box {
      width: 330px;
      height: 100%;
      // background-color: bisque;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 30px 30px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        font-size: 36px;
        margin: 60px 0;
        color: #fff;
      }
      input {
        margin-bottom: 20px;
        width: 200px;
        height: 36px;
        padding: 0 20px;
        border-radius: 36px;
        border: none;
        outline: none;
        font-size: 15px;
      }
      button {
        margin-top: 20px;
        width: 200px;
        height: 40px;
        background-color: rgb(122, 0, 223);
        border: none;
        border-radius: 40px;
        color: #fff;
        font-size: 18px;

      }
    }
    @media screen and (max-width: 900px) {
    .login-content {
      margin: 0 30px;
    }
    .banner-box {
      border-radius: 20px;
    }
    .login-box {
      background-color: rgba(52, 0, 73 0.5);
    }
  }
  @media screen and (max-width: 600px) {
    .content {
      background: url(@/assets/R-C.jpg) no-repeat center;
    }
    .login-content {
      background-color: rgba(52, 0, 73 0);
    }
    .banner-box {
      display: none;
    }
    .login-box {
      position: initial;
      margin: -40px auto;
      background-color: rgba(52, 0, 73 0);
    }
  }
  }
}
</style>