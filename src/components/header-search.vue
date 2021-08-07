<template>
    <div class="header-search">
        <i class="iconfont iconsearch" @click.stop="click"></i>
        <input ref="searchInput"
               :class="{'show':show}"
               v-model="searchValue"
               type="text" @click.stop=""
               @keyup.enter="search"/>
    </div>
</template>

<script>
    import {queryLikeByTitle} from "@/api/blog";
    export default {
        name: "header-search",
        data(){
          return{
              searchValue: '',    // 动态绑定输入数据
              show: false // 表示是否是点击状态 如果是点击状态 就让他展开
          }
        },
      // 监测函数
        watch:{
            show(value) {
                if (value) {
                  console.log("进入了 watch 函数内 ")
                  // 添加事件监听
                    document.body.addEventListener('click', this.close)
                } else {
                  //
                    document.body.removeEventListener('click', this.close)
                }
            }
        },
        methods:{
            search(){
                console.log("header search  ->  " +this.searchValue)   // 搜索函数
              // 路由跳转  但是没有   数据 真实的数据应该有后台请求过来

              // 跳转首页  将数据 传递给  主页
              queryLikeByTitle(this.searchValue).then(res => {
                console.log(res.data.items);
                this.$store.commit("SAVE_SEARCH_INFO", res.data.items)
                this.$router.push({name:'search',params:{words:this.searchValue}});
              })
                this.close()
            },
            click(){
                this.searchValue = ''
                this.show = !this.show
                if (this.show) {
                    this.$refs.searchInput && this.$refs.searchInput.focus()   // 焦点函数
                }
            },
            close(){
                this.$refs.searchInput && this.$refs.searchInput.blur()   //   模糊
                this.show = false
            }
        }
    }
</script>

<style scoped lang="less">
.header-search{
    display: inline-block;
    position: relative;
    i{
        font-size: 18px;
        position: relative;
        top: 3px;
    }
    input{
        border:none;
        outline:none;
        overflow: hidden;
        background: transparent;
        height: 30px;
        width: 0;
        transition: .2s all;
        &.show{
            width: 200px;
            margin-left: 10px;
        }
        &:focus{
            border-bottom: 1px solid #8fd0cc;
        }
    }
}
</style>
