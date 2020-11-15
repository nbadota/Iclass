<template>
    <div>
      <section v-if="isShow">
        <home-header :list = "headerList"></home-header>
        <router-view/>
        <home-footer></home-footer>
      </section>
      <section v-else class="none">
        <P>您还未参加任何学团哟</P>
      </section>
    </div>
</template>

<script>
import axios from 'axios'
import HomeHeader from './components/Header'
import HomeFooter from "./components/Footer"
export default {
    name: "Home",
    components: {
      HomeFooter,
      HomeHeader
    },
    data () {
      return {
        isShow: false,
        headerList: []
      }
    },
    methods: {
      getHomeInfo () {
        axios({
          method: 'get',
          url: '/static/mock/homeInfo.json',
          params: {
            id: this.$route.params.id,
            token: localStorage.getItem('token')
          }
        }).then(this.getHomeInfoSuc)
      },
      getHomeInfoSuc(res) {
          res = res.data
          if(res.success) {
              this.isShow = true
              this.headerList = res.data
          }
      }
    },
    mounted() {
      this.getHomeInfo()
    }
}
</script>

<style scoped>
</style>
