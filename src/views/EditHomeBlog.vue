<template>
  <div class="edit-home">
    <div class="site-content">
      <div class="content-warp">
        <div class="about-me about-info">
        <div class="info-card">
          <div class="contactForm">
            <div class="form-item">
              <label>标题</label>
              <input class="v" type="text" v-model="blog.title">
            </div>
            <div class="form-item">
              <label>描述</label>
              <input class="v" type="text" v-model="blog.summary">
            </div>
            <div class="form-item">
              <label>头像</label>
              <input class="v" type="text" v-model="blog.banner">
            </div>
            <div class="form-item">
              <label>创建时间</label>
              <input class="v" type="text" v-model="blog.createTime">
            </div>
            <div class="form-item">
              <label>是否置顶</label>
              <input type="checkbox" v-model="blog.isTop">
            </div>
            <div class="form-item">
              <label>Hot</label>
              <input type="checkbox" v-model="blog.isHot">
            </div>
            <div class="form-item" v-show="false">
              <label for="content">内容</label>
              <input class="v" type="file" id="content" name="content">
            </div>
            <span class="form-item">
              <button class="v" type="button" @click="updateBlogInfo">提交</button>
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import {queryBlogInfo, updateBlog} from "@/api/blog";

export default {
  name: "EditHomeBlog",
  data(){
    return {
      blog: {}
    }
  },
  created() {
    this.queryBlogInfoById();
  },
  methods: {
    updateBlogInfo(){
      console.log(this.$route.params.id, this.blog)
      updateBlog(this.$route.params.id, this.blog).then(result => {
        console.log(result)
        // 打印返回值信息
        alert(result.message)
        //
        console.log(result.code)
        console.log(result.code === "207");
        if (result.code === "207" && result.status === false){
          // 表示账号已经过期
          // 需要清理数据
          console.log("进入清理数据阶段")
          this.$store.commit("REMOVE_SEARCH_INFO")
          // 重新登录
          this.$router.push("/login");
        }else if (this.$store.getters.token === null){
          this.$router.push("/login")
        }else {
          this.$router.replace("/")
        }
      })
    },
    queryBlogInfoById(){
      queryBlogInfo(this.$route.params.id).then(result => {
        this.blog = result.data;
        console.log(result)
      })
    }
  }

}

</script>

<style scoped lang="less">

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

      p {
        line-height: 1.7rem;
      }
    }
  }

  .contactForm {
    width: 100%;
    padding: 20px;

    .form-item {
      // 居中对其
      align-items: center;
      display: flex;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      label {
        width: 80px;
      }

      .v {
        min-height: 40px;
        line-height: 20px;
        border-radius: 3px;
        padding: 2px 10px;
        outline: none;
        border: 1px solid wheat;
        width: 100%;
        resize: vertical;
      }

      button {
        width: 100px;
        height: 40px;
        border-radius: 3px;
        outline: 0;
        border-style: none;
        cursor: pointer;
        background-color: #409eff;
        color: white;

        &:hover {
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
