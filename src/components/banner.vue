<template>
    <div id="banner" :class="{'home-banner':true}">
<!--      头像信息 -->
        <div class="banner-img" :style="{'background-image': `url(${src})`}">
            <template>
<!--             数据有请求过来    -->
                <!--博主信息-->
                <div class="focusinfo" v-show="!active">
                    <!-- 头像 -->
<!--                  判断活跃状态 如果没有登录则 -->
                    <div class="header-tou">
                        <router-link to="/">
                          <img :src="websiteInfoComputed.head">
                        </router-link>
                    </div>
                    <!-- 简介 -->
                    <div class="header-info">
                        <p>{{websiteInfoComputed.slogan}}</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data(){
            return{
                websiteInfo: {},  //  返回信息  网站基本信息
                socials: [],   // 定义社交信息   入qq
            }
        },
        props:{
          // 博主信息由服务器请求过来
            src:{
                type: String,
                  // 默认显示的图片
               // 后台图片
                default: 'https://w.wallhaven.cc/full/pk/wallhaven-pk8pzj.png'
            }
        },
        computed: {
          active(){
            console.log("banner  -> ",this.$store.getters.token === null)
            return (this.$store.getters.token === null)
          },
          websiteInfoComputed(){
            console.log("banner into web info   ->  " ,this.$store.getters.getUserInfo);
            if ( this.$store.getters.getUserInfo === null){
              return this.websiteInfo
            }else{
              this.websiteInfo = this.$store.getters.getUserInfo
              return this.websiteInfo
            }
          }
        }
    }
</script>

<style scoped lang="less">

    #banner {
        position: relative;
        margin-top: 80px;
        width: 100%;
        height: 500px;
        .banner-img{
          //
            width: inherit;
            height: inherit;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          //
            transition: all 0.2s linear;
            overflow: hidden;
            &:hover {
                //transform: scale(1.1, 1.1);
                transform: scale(1.1, 1.1);
                filter: contrast(130%);
            }
        }
        &.home-banner {
            height: 550px;
            .banner-img{
                background-position: center center;
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-size: cover;
                z-index: -1;
                transition: unset;
                &:hover {
                    transform: unset;
                    filter: unset;
                }
            }
            .slant-left {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-bottom: 100px solid #FFF;
                border-right: 800px solid transparent;
                left: 0;
                bottom: 0;
            }
            .slant-right {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-bottom: 100px solid #FFF;
                border-left: 800px solid transparent;
                right: 0;
                bottom: 0;
            }
        }
    }
    .focusinfo {
        position: relative;
        max-width: 800px;
        padding: 0 10px;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        text-align: center;
        img {
            width: 80px;
            height: auto;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.3);
        }
        .header-info {
            width: 60%;
            font-size: 14px;
            color: #EAEADF;
            background: rgba(0, 0, 0, 0.66);
            padding: 20px 30px;
            margin: 30px auto 0 auto;
            font-family: miranafont,"Hiragino Sans GB",STXihei,"Microsoft YaHei",SimSun,sans-serif;
            letter-spacing: 1px;
            line-height: 30px;
        }
        .top-social {
            height: 32px;
            margin-top: 30px;
            margin-left: 10px;
            list-style: none;
            display: inline-block;
            font-family: miranafont,"Hiragino Sans GB",STXihei,"Microsoft YaHei",SimSun,sans-serif;
            div {
                float: left;
                margin-right: 10px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                width: 32px;
                background: white;
                border-radius: 100%;
            }
        }
    }
    @media (max-width: 960px){
        #banner {height: 400px;}
    }
    @media (max-width: 800px){
        #banner {display: none;}
    }
</style>
