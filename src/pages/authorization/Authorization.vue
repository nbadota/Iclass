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
          params: {
            code: token
          }
        }).then(this.wxAuthSuc)
      },
      wxAuthSuc (res) {
        res = res.data
        let msg = res.data.msg
        let token = res.data.token
        //如果返回need bind，则重定向至手机绑定页面
        if(msg === "need bind"){
          this.$router.push({name:'Binding'})
        }else {
          //如果手机已绑定，则重定向至登录页
          this.$router.push({ path: '/home/tasks'})
        }
      }
    }
}
</script>

<style scoped>

</style>
