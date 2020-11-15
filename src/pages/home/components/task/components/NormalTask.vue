<template>
  <div>
    <div class="list-item">
      <div class="time">{{getTime(time)}}</div>
      <div>
        <span class="type">{{issueType}}</span>
        <span class="period">{{period}}</span>
        <span class="status">{{status}}</span>
        <p>{{content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {timestampToTime} from '@/assets/util/utils'
export default {
    name: "NormalTask",
    props: {
      time: String,
      issueType: String,
      period: String,
      status: String,
      content: String
    },
    methods: {
      getTime (time) {
        let {YMD,hms,day} = timestampToTime(time)
        let MD = YMD.split('-').slice(1,3).join('-')
        //console.log(MD)
        let hm = hms.split(':').slice(0,2).join(':')
        return `${day} (${MD} ${hm})`
      }
    }
}
</script>

<style scoped>
  .list-item {
    position: relative;
    width: 7rem;
    height: 2.5rem;
    border: 1px solid #000;
    margin: .3rem auto 0 auto;
  }
  span {
    display: inline-block;
    width: 1.5rem;
    height: .5rem;
    margin-top: .2rem;
    margin-left: .2rem;
    line-height: .5rem;
    border: 1px solid #aaa;
    text-align: center;
  }
  .status {
    margin-left: 1.7rem;
  }

  p {
    margin-left: .2rem;
    margin-top: .2rem;
    line-height: .4rem;
  }

  .time {
    position: absolute;
    bottom: .1rem;
    left: .2rem;
  }
</style>
