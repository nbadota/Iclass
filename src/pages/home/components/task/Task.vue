<template>
    <div class="wrapper" ref="wrapper">
      <section class="task-content">
          <section class="task-list">
            <article v-for="item in taskList" :key="item.issueId">
                <component :is="item.type" :time="item.endTime" :issueType="item.issueType" :period="item.period"
                :status="item.status" :content="item.content"/>
            </article>
          </section>
      </section>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
import axios from 'axios'
import Stick from './components/Stick'
import NormalTask from './components/NormalTask'
export default {
  name: "HomeTask",
  data () {
    return {
      taskList: [],
      stick: ''
    }
  },
  components: {
    Stick,
    NormalTask
  },
  methods: {
    getTaskInfo () {
      axios({
        method: 'get',
        url: '/static/mock/taskInfo.json',
        params: {
          id: this.$route.params.id
        }
      }).then(this.getTaskInfoSuc)
    },
    getTaskInfoSuc(res) {
      res = res.data
      if(res.success) {
        this.taskList = res.data
      }
    },
    getStickInfo () {
      axios({
        method: 'get',
        url: '/static/mock/stick.json',
        params: {
          id: this.$route.params.id
        }
      }).then(this.getStickInfoSuc)
    },
    getStickInfoSuc(res) {
      res = res.data
      if(res.success) {
        this.stick = res.data
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new Bscroll(this.$refs.wrapper, {})
        //console.log(this.scroll)
      }
    })
    this.getTaskInfo()
    this.getStickInfo()
    //createSocket('')
    //this.getInfo()
  },
  updated () {
    this.scroll.refresh();
  },

}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 3.6rem;
  left: 0;
  right: 0;
  bottom: 1rem;
}
</style>
