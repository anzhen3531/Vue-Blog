<template>
    <div class="home">
<!--      <layout-header></layout-header>-->
        <banner></banner>
        <div class="site-content animate">
<!--           修改通知 -->
          <!--通知栏-->
          <div class="notify">
            <div class="search-result" v-if="hideSlogan">
<!--              搜索和分类都是从这个search 组件 传递过来的 -->
              <span v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</span>
              <span v-else-if="category">分类 "{{category}}" 相关文章</span>
            </div>
            <quote v-else>{{notice}}</quote>
          </div>
            <!--文章列表-->
            <main class="site-main" :class="{'search':hideSlogan}">
                <section-title v-if="!hideSlogan">博客</section-title>
                <template v-for="item in searchInfo">
                    <post :post="item" :key="item.id"></post>
                </template>
            </main>

            <!--加载更多-->
            <div class="more"  v-show="hasNextPage">
                <div class="more-btn" @click="loadMore">More</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import sectionTitle from '@/components/section-title'
    import Post from '@/components/post'
    import SmallIco from '@/components/small-ico'
    import Quote from '@/components/quote'
    import { queryList} from "@/api/blog"
    import LayoutHeader from "@/components/layout/layout-header";
    export default {
      name: 'Home',
      props: ['cate', 'words'],  //  组件之间数据传递
      data() {
        return {
          // features: [],   //
          postList: [],   // 文章页面
          currPage: 1,   // 当前页
          hasNextPage: false,
          isHome: false,
          times: {},
        }
      },
      components: {
        LayoutHeader,
        Banner,
        sectionTitle,   // 章节标题
        Post,
        SmallIco,
        Quote
      },
      // 计算属性
      computed: {
        searchWords() {
          return this.$route.params.words
        },
        category() {
          return this.$route.params.cate
        },
        hideSlogan() {
          return this.category || this.searchWords
        },
        notice() {
          return this.$store.getters.notice
        },
        // 通过计算属性 进行数据展示
        searchInfo(){
          if (this.$route.name === "home"){
            // 在首页时显示当前页面信息
            return this.postList
          }else {
            return this.$store.getters.getSearchInfo;
          }
        }
      },
      //  周期函数 只会调用一次
      mounted() {
        this.fetchList();
        console.log("home  mounted 调用")
      },
      destroyed() {
        // 销毁函数
        console.log("销毁 函数 ")
      },
      methods: {
        // 请求虚拟数据的  文章
        fetchList() {
          // 判断如果有url 有数据的话就直接 模糊查询
          // if (this.searchWords)
          queryList({currentPage:this.currPage, pageSize: 2}).then(res => {
            this.postList = res.data.items
            // 为什么要传递这个信息
            this.currPage = res.data.currPage
            this.hasNextPage = res.data.hasNextPage
          })
        },
        // 请求虚拟数据分页
        loadMore() {
          // 传入参数为  当前页面 + 1
          queryList({currentPage :this.currPage+1, pageSize:2}).then(res => {
            this.postList = this.postList.concat(res.data.items)
            this.currPage = res.data.currPage
            this.hasNextPage = res.data.hasNextPage
          }).catch(err => {
            console.log(err);
          })
        },
      },
    }
</script>
<style scoped lang="less">

    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;
            & > div {
                padding: 20px;
            }
        }


        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;
        }
    }

    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }

    .site-main {
        padding-top: 80px;

        &.search {
            padding-top: 0;
        }
    }

    .more{
        margin: 50px 0;
        .more-btn{
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;
            &:hover{
                color: #8fd0cc;
                border: 1px dashed #8fd0cc;
            }
        }
    }

    /******/
    @media (max-width: 800px) {
        .top-feature {
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

        .site-content {
            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }

    /******/
</style>
