<template>
    <div></div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Authorization",
    data () {
      return {
        token: this.$route.query.code
      }
    },
    created() {
      this.wxAuth(this.token)
    },
    methods: {
      wxAuth (token) {
        axios({
          method: 'get',
          url: '/static/mock/auth.json',
          /*
          params: {
            code: token
          }
           */
        }).then(this.wxAuthSuc)
      },
      wxAuthSuc (res) {
        res = res.data
        let msg = res.data.msg
        let token = res.data.token
        /*
        如果此时返回need bind则说明需要手机绑定，但仍需刷新用户的token，个人认为后端不管在哪种情况，
        只要用户进行了微信授权，都应该返回相应加密串，因为微信授权与手机绑定是相互分离的，还有这个项目
        的用户唯一标识不应该是放在请求头中的吗。
         */
        //如果返回need bind，则先刷新用户微信授权后，再重定向至手机绑定页面
        if(msg === "need bind"){
          //30天后登录过期
          let date = new Date().getTime() + 2592000000
          localStorage.setItem('tokenTime', date)
          localStorage.setItem('token',token)
          localStorage.setItem('phoneBinding','false')
          this.$router.push({name:'Binding'})
        }else {
          //如果手机已绑定，则刷新token后直接进入主页
          let date = new Date().getTime() + 2592000000
          localStorage.setItem('tokenTime', date)
          localStorage.setItem('token',token)
          this.$router.push({ path: '/home/tasks'})
        }
      }
    }
}
</script>

<style scoped>

</style>
