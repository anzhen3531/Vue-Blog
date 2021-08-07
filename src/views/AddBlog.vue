<template>
  <div class="edit-home">
    <div class="site-content">
      <div class="content-warp">
        <div class="about-me about-info">
          <div class="info-card">
            <div class="contactForm">
              <form action="">
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

                <div class="form-item">
                  <label>文件上传:</label>
                  <input type="file" @change="iii($event)" ref="file">
                </div>
                <!--给该input标签绑定了change事件，绑定到了iii并且通过$event将该标签传递进去-->

                <span class="form-item">
                  <button class="v" type="button" @click="submitForm">提交</button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {addBlogFile, addBlogInfo} from "@/api/blog";

export default {
  name: "AddBlog",
  data(){
    return {
      blog: {
        title: "",
        summary: "",
        banner: "",
        createTime: "",
        isHot: false,
        isTop: false,
        content: {},
      },
    }
  },
  methods: {
    submitForm: function (event) {
      let fd = new FormData();
      fd.append("file",this.file);
      addBlogFile(fd).then(res => {
        console.log(res)
      })
      addBlogInfo(this.blog).then(res => {
        console.log(res);
      })
    },
    iii:function (e){
      //次函数主要是将input里的文件存入data里的file里
      this.file=e.target.files[0];
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

