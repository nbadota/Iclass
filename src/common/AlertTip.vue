<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <!--
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      -->
      <p class="tip_text">{{alertText}}</p>
      <div class="conf" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      alertText: String
    },

    methods: {
      closeTip() {
        // 分发自定义事件(事件名: closeTip)
        this.$emit('closeTip')
      }
    }
  }
</script>

<style scoped>
.tip_text_container {
  position: fixed;
  top: 3rem;
  left: 1.75rem;
  width: 4rem;
  height: 2rem;
  border: 2px solid #ccc;
  background: #fff;
  color: #f0952c;
}
.tip_text {
  width: 3.6rem;
  margin: 0 auto;
  font-size: .5rem;
}
.conf {
  position: absolute;
  width: 4rem;
  bottom: .1rem;
  text-align: center;
}
</style>
