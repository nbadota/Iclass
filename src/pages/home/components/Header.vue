<template>
    <div>
      <section class = "header_content">
        <img :src="currList.cover" class="head_img">
        <header>{{currList.name}}</header>
        <div class = "period header_bot">{{typeof currList.period === 'number' ? `${currList.period}/30`: currList.period}}</div>
        <div class = "position header_bot">{{currList.role}}</div>
        <div class = "switch header_bot" @click="showPopup" v-show="showSwitch">切换学团</div>
        <van-popup  position="top" :style="{ height: '40%' }" v-model="show" @click="showPopup">
          <div class="cancel">取消</div>
          <ul>
            <router-link class="switchLink" tag="li" :to="'/home/' + item.zutuanId + '/tasks'"  v-for="item of list" :key="item.zutuanId">
              <p>{{item.name}}</p>
            </router-link>
          </ul>
        </van-popup>
      </section>
      <nav class="nav_content">
        <router-link :to="'/home/' + currList.zutuanId + '/tasks'" tag="li" >本周任务</router-link>
        <router-link :to="'/home/' + currList.zutuanId + '/documents'" tag="li" >官方文档</router-link>
        <router-link :to="'/home/' + currList.zutuanId + '/statistics'" tag="li" >统计</router-link>
      </nav>
    </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';
import { Cell } from 'vant';
Vue.use(Popup);
Vue.use(Cell);
export default {
  name: "HomeHeader",
  props: {
    list: Array
  },
  data() {
    return {
      show: false,
      currList : this.list[0]
    }
  },
  computed: {
    showSwitch () {
      return this.list.length
    }
  },
  methods: {
    showPopup() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
.header_content {
  width: 7rem;
  height: 2rem;
  border: 1px solid black;
  margin: 0 auto;
}
.switchLink {
  width: 7rem;
  height: .7rem;
  margin: 0 auto .2rem auto;
  line-height: .7rem;
  padding-left: .2rem;
  border: 1px solid #ccc;
}
.cancel {
  position: relative;
  left: 5.5rem;
  width: 1rem;
  margin-bottom: .3rem;
  margin-top: .3rem;
  padding: .1rem;
  text-align: center;
  border: 1px solid #ccc;
}

.head_img {
  float: left;
  height: 1.6rem;
  width: 1.6rem;
  margin-top: .2rem;
  margin-left: .2rem;
}

header {
  margin-left: 3rem;
  margin-top: .2rem;
  font-size: .4rem;
  font-weight: bold;
}

.header_bot {
  display: inline-block;
  margin-top: .6rem;
  margin-left: .2rem;
}

.period {
  height: .5rem;
  width: 1.5rem;
  line-height: .5rem;
  border: 1px solid #ccc;
  text-align: center;
}

.position {
  height: .5rem;
  width: 1.5rem;
  line-height: .5rem;
  border: 1px solid #ccc;
  text-align: center;
}

.nav_content {
  display: flex;
  overflow: hidden;
  width: 7rem;
  margin: .6rem auto 0 auto;
}

li {
  flex: 1;
  height: .5rem;
  line-height: .5rem;
  border: 1px solid black;
  text-align: center;
  list-style-type: none;
}
</style>
