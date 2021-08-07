<template>
  <div class="login">
    <div class="site-content">
      <div class="content-warp">
        <div class="about-me about-info">
          <section-title id="Guestbook"><span>❤</span>请登录</section-title>
              <div class="info-card">
                <div class="contactForm">
                  <div class="form-item">
                    <span>{{message}}</span>
                  </div>
                  <div class="form-item">
                    <label>账号</label>
                    <input class="v" type="text"v-model="username">
                  </div>
                  <div class="form-item">
                    <label for="password">密码</label>
                    <input class="v" type="password" id="password" name="password" v-model="password">
                  </div>
                  <span class="form-item">
                    <button  class="v" type="button" @click="loginIndex">提交</button>
                  </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {login} from "@/api/login";
import LayoutHeader from "@/components/layout/layout-header";
import sectionTitle from '@/components/section-title'

export default {
  name: "Login",
  components: {LayoutHeader, sectionTitle},
  data() {
    return {
      username: "",
      password: "",
      data: {},
      message: ""
    }
  },
  methods:{
    loginIndex(){
      if (this.username === "" || this.password ===""){
        this.message = "请输入账号密码"
      }else {
        login(this.username, this.password).then(request => {
          if (this.$store.getters.token !== null){
            console.log("Login 组件  登录之后的用户数据" , this.$store.getters.getUserInfo)
          }
          console.log( request)
          if (request.data === null || request.data == undefined){
            this.message = request.message
            console.log(request.message);
          }else{
            if (request.code === "200"){
              console.log(request.data.userinfo)
              this.data = request.data.userinfo
              this.$store.commit("SET_SITE_INFO", this.data)
              console.log(request.data.token);
              this.$store.commit("SET_TOKEN", request.data.token)
              console.log("站点信息存储成功")
              this.$router.push("/")
            }
          }
        }).catch( err => {
          console.log(err);
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.login {
  padding-top: 40px;
}

.content-warp {
  margin-top: 80px;

  .about-info {
    margin: 30px 0;

    span {
      color: red;
      margin-right: 10px;
    }

    .info-card {
      min-height: 50px;
      padding: 20px;
      border-radius: 3px;
      margin: 30px 0 50px 0;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      p{
        line-height: 1.7rem;
      }
    }
  }
  .contactForm{
    width: 100%;
    padding: 20px;
    .form-item{
      // 居中对其
      align-items: center;
      display: flex;
      &:not(:last-child){
        margin-bottom: 20px;
      }
      label{
        width: 80px;
      }
      .v{
        min-height: 40px;
        line-height: 20px;
        border-radius: 3px;
        padding: 2px 10px;
        outline:none;
        border: 1px solid #8fd0cc;
        width: 100%;
        resize: vertical;
      }
      button{
        width: 100px;
        height: 40px;
        border-radius: 3px;
        outline:0;
        border-style: none;
        cursor: pointer;
        background-color: #409eff;
        color: white;
        &:hover{
          opacity: 0.8;
        }
      }
    }
  }
}

/*******/
@media (max-width: 800px) {
  .content-warp {
    margin-top: 0;
  }
}
</style>
