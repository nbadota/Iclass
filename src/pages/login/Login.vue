<template>
    <div class="content">
      <div class="button-content" @click="handleLogin">重新登录</div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data () {
    return {
      token: this.$route.query.code
    }
  },
  methods:{
    handleLogin (token) {
      axios({
        method: 'get',
        url: '/static/mock/auth.json',
        params: {
          code: token
        }
      }).then(this.handleLoginSuc)
    },
    handleLoginSuc (res) {
      res = res.data
      let token = res.data.token
      this.$store.commit('$_setToken',token);
      this.$router.push({ path: '/home/tasks'})
    }
  }
}
</script>

<style scoped>
.button-content {
  width: 2rem;
  height: .8rem;
  margin: 3rem auto 0 auto;
  font-size: .6rem;
  line-height: .8rem;
}
</style>
