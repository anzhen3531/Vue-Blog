import request from "@/utils/userlogin";


export function queryList(param) {
    return request({
        url: "/blog/queryAll",
        method: 'get',
        params: param
    })
}


export function markdownAndHtml(id) {
    return request({
        url: `/article/${id}`,
        method: 'get',
    })
}

//  模糊查询

export function queryLikeByTitle(title) {
    return request({
        url: `/search/${title}`,
        method: 'get',
    })
}


export function queryCategory() {
    return request({
        url: `/category`,
        method: 'get',
    })
}


export function queryMdContent(id) {
    return request({
        url: `/editBlog/${id}`,
        method: 'get',
    })
}



// 修改博客内容
export function updateBlogContent(blogInfo) {
    return request({
        url: "/updateBlogContent",
        method: 'post',
        data: {
             id: blogInfo.id,
             mdContent: blogInfo.mdContent
        }
    })
}



// 修改前台显示博客数据
export function updateBlog(id, blog) {
    return request({
        url: `/updateBlog/${id}`,
        method: 'post',
        data: {
            blog
        }
    })
}


export function queryBlogInfo(id) {
    return request({
        url: `/queryBlogInfo/${id}`,
        method: 'get',
    })
}


export function addBlogFile(fileData) {
    return request({
        url: `/addBlogFile`,
        method: 'post',
        data: fileData,
        headers: {
            //请求头很重要，我看见有人说可以不写，但我不写不行
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function addBlogInfo(blogInfo) {
    return request({
        url: `/addBlogInfo`,
        method: 'post',
        data: blogInfo,
    })
}
