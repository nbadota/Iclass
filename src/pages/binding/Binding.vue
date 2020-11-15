<template>
    <div class="Binding_container">
      <header>绑定手机号</header>
      <section class="Binding_content">
        <form @submit.prevent="submit">
            <input  type="tel" maxlength="11" placeholder="输入手机号" v-model="phone" @blur="handlePhoneVerify">
            <div class="warnBox">{{warning}}</div>
            <input  class="get" type="text" maxlength="4" placeholder="输入图中验证码" v-model="captcha">
            <img class="get_verification" src="http://localhost:8080/captcha.json" alt="captcha"
               @click="getCaptcha" ref="captcha">
            <input  type="text" maxlength="5" placeholder="输入验证码" v-model="code">
            <button :disabled="!bindPhone" @click.prevent="getCode">
              {{computeTime>0 ? `${computeTime}s` : '获取验证码'}}
            </button>
            <div class="warnBox"></div>
            <button>
              提交
            </button>
            <router-link to="/changePhone" class="change_phone">手机号变更</router-link>
        </form>
      </section>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
    </div>
</template>

<script>
import axios from 'axios';
//提示框组件
import AlertTip from '../../common/AlertTip.vue'
export default {
name: "Binding",
data() {
  return {
    computeTime: 0, // 计时的时间
    phone: '', // 手机号
    code: '', // 短信验证码
    captcha: '', // 图形验证码
    alertText: '', // 提示文本
    warning: '',//警告文本
    alertShow: false, // 是否显示警告框
    bindPhone: false,  //是否绑定手机
    timer: null,
    lastTime: null
  }
},
components: {
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
      this.warning = "手机号格式错误"
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
      this.bindPhone = true
      this.warning = ""
    }else {
      this.warning = "该手机号没有权限"
    }
  },
  //获取验证文字
  getCaptcha () {
    //节流
    let that = this
    let now = +new Date();
    if(that.lastTime && that.lastTime - now < 1000){
      clearTimeout(that.timer)
    }
    that.timer = setTimeout(function () {
      // 每次指定的src要不一样
      this.$refs.captcha.src = 'http://localhost:8080/captcha?time='+Date.now()
      that.lastTime = +new Date()
    },1000)
  },
  //获取手机验证码
  async getCode () {
    // 如果当前没有计时
    if(!this.computeTime) {
      // 启动倒计时
      this.computeTime = 60
      this.intervalId = setInterval(() => {
        this.computeTime--
        if(this.computeTime<=0) {
          // 停止计时
          clearInterval(this.intervalId)
        }
      }, 1000)

      // 发送ajax请求(向指定手机号发送验证码短信)
      const {data} = await this.reqSendCode(this.phone,this.captcha)
      //如果失败
      if(data.code===0) {
        // 显示提示
        this.showAlert(data.msg)
        // 停止计时
        if(this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
      }
    }
  },
  reqSendCode (phone,captcha) {
    return axios({
      method: 'get',
      url: '/static/mock/getCode.json',
      params: {
        phone: phone,
        captcha: captcha
      }
    })
  },
  //提交
  submit () {
    if(!this.bindPhone){
      this.showAlert('手机号不正确')
      return
    }else if(this.code === ''){
      this.showAlert('请输入短信验证码')
      return
    }else {
      axios({
        method: 'get',
        url: '/static/mock/submit.json',
        data: {
          phone: this.phone,
          code: this.code
        }
      }).then(res => {
        let data = res.data
        if(data.code === 0){
          localStorage.setItem('phoneBinding','true')
          this.$router.push({ path: '/home/tasks'})
        }else {
          this.showAlert(data.msg)
        }
      })
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
  },
}
}
</script>

<style scoped>
header {
  margin-top: 1.2rem;
  text-align: center;
  font-size: .64rem;
}

form {
  width: 6rem;
  margin: 1.6rem auto 0 auto;
}

input {
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: .06rem;
}

input[type="tel"] {
  width: 6rem;
  padding: .1rem 0 .1rem .1rem;
}

input[type="text"] {
  width: 4rem;
  padding: .1rem 0 .1rem .1rem;
}

input:nth-of-type(3) {
  margin-top: .5rem;
}

.warnBox {
  box-sizing: border-box;
  height: .5rem;
  padding: .1rem 0;
  color: #ff0000;
}

button {
  border: 2px solid  #f0952c;
  border-radius: .4rem;
}

button:nth-of-type(1) {
  width: 1.8rem;
  padding: .1rem;
  margin-top: .5rem;
  margin-left: .1rem;
  background: #fff;
  color: #f0952c;
}

button:nth-of-type(2) {
  width: 6rem;
  padding: .1rem;
  margin-top: 1.2rem;
  background:  #f0952c;
  color: #fff;
}

.change_phone {
  position: relative;
  top: .5rem;
  left: 4.5rem;
  color: #f0952c;
}
</style>
