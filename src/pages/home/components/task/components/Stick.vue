<template>
  <div>
    <article class="stick">
      <h2>小拿提醒</h2>
      <p>{{content}}</p>
    </article>
  </div>
</template>

<script>
export default {
    name: "Stick",
    props: {
      content: String
    }
}
</script>

<style scoped>
  .stick {
    height: 1.5rem;
    width: 7rem;
    margin: 0 auto .3rem auto;
    border: 1px solid #000;
  }
  .stick h2 {
    margin: .1rem 0 .2rem .2rem;
    font-size: .3rem;
  }
  .stick p {
    margin-left: .2rem;
    line-height: .4rem;
  }
</style>
