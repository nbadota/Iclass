<template>
    <div>
      <section class="changePhone_content">
        <header>输入原注册手机号码</header>
        <input type="tel" maxlength="11" placeholder="输入手机号" v-model="phone">
        <!--<div class="warnBox">{{warning}}</div>-->
        <button @click="handlePhoneVerify">下一步</button>
        <router-link to="/contact" class="contactService">忘记原手机号</router-link>
      </section>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
    </div>
</template>

<script>
import axios from "axios";
import AlertTip from '../../common/AlertTip.vue'
import Binding from "../binding/Binding";
export default {
name: "changePhone",
data () {
  return {
    phone: '',
    bindPhone: false,
    alertText: '',
    alertShow: false
  }
},
components : {
  AlertTip
},
computed: {
//验证手机号格式
  rightPhone () {
    return /^1\d{10}$/.test(this.phone)
  }
},
methods: {
  //输入框失去焦点后验证手机号
  handlePhoneVerify () {
    //如果手机号格式错误，不请求手机号权限验证接口
    if(!this.rightPhone){
      this.showAlert("手机号格式错误")
    }else{
      axios({
        method: 'get',
        url: '/static/mock/phoneVerify.json',
        params: {
          phone: this.phone
        }
      }).then(this.handlePhoneVerifySuc)
    }
  },
  handlePhoneVerifySuc(res) {
    let data = res.data
    //console.log(data.msg)
    if(data.msg === 'Bind') {
      this.$router.push({name:'Binding'})
    }else {
      this.showAlert("该手机号没有权限")
    }
  },
  //控制提示框显示
  showAlert(alertText) {
    this.alertShow = true
    this.alertText = alertText
  },
  closeTip () {
    this.alertShow = false
    this.alertText = ''
  }
}
}
</script>

<style scoped>
  .changePhone_content {
    width: 6rem;
    margin: 3rem auto 0 auto;
  }
  header {
    font-size: .5rem;
    text-align: left;
  }
  input {
    box-sizing: border-box;
    width: 6rem;
    padding: .1rem 0 .1rem .1rem;
    margin-top: .6rem;
    border: 2px solid #ccc;
    border-radius: .06rem;
  }
  button {
    width: 6rem;
    padding: .1rem;
    margin-top: 1rem;
    background:  #f0952c;
    color: #fff;
    border: 2px solid  #f0952c;
    border-radius: .1rem;
  }
  .contactService {
    position: relative;
    top: .5rem;
    left: 4.2rem;
    color: #f0952c;
  }
</style>
