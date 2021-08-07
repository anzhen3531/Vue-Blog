// 搭建修改博客属性

最后一个表单 

后面直接对接后台接口

剩余 : 
博客添加  : 这个和注册使用一个组件
文件上传  :     
展示博客修改 : 和注册使用同一个组件 


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
                  <div class="form-item" v-show="true">
                    <label for="content">内容</label>
                    <input class="v" type="file" id="content" name="content">
                  </div>
                  <span class="form-item">
                  <button class="v" type="button" >提交</button>
              </span>
