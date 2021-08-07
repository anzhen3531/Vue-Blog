<template>
  <div class="edit">
<!--    <div class="site-content">-->
      <div class="content-warp">
        <div class="edit-site edit-info">
          <mavon-editor
              :value="mdContent"
              @save="save"></mavon-editor>
        </div>
      </div>
    </div>
<!--  </div>-->
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import {queryMdContent, updateBlogContent} from "@/api/blog";
import Banner from "@/components/banner";
import LayoutHeader from "@/components/layout/layout-header";
export default {
  name: "Markdown",
  components: {
    LayoutHeader,
    Banner,
    mavonEditor
  },
  data () {
    return {
      mdContent: '',
      blogInfo: {}
    }
  },
  created() {
    // 直接请求到数据  通过返回字符串 进行展示
    this.editMdFunction()
  },
  methods: {
    editMdFunction(){
      queryMdContent(this.$route.params.id).then(result => {
        this.mdContent = result.data
      })
    },
    save(value){
      // 封装数据集进行 请求保存
      this.blogInfo.id = this.$route.params.id
      this.blogInfo.mdContent = value
      // 给定修改接口   确定博客修改
      updateBlogContent(this.blogInfo).then( result => {
        alert(result.message)
      })
    }
  }
};
</script>
<style scoped lang="less">
.edit {
  padding-top: 40px;
}
.content-warp {
  margin-top: 40px;

  .edit-info {
    margin: 30px 0;
    position: relative;
    z-index: 8;
  }

}
.site-content {
  position: relative;
}

</style>
